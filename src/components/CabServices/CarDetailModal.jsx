import { useState } from "react";
import { siteInfo } from "../../data/siteData";
import { serviceTypes } from "../../data/cabData";
import "./CarDetailModal.css";

const CarDetailModal = ({ car, driver, serviceType, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("gallery");

  const pricing = car.pricing[serviceType];
  const service = serviceTypes[serviceType];

  const whatsappLink = `${siteInfo.socialLinks.whatsapp}?text=I%20want%20to%20book%20${encodeURIComponent(car.name)}%20for%20${encodeURIComponent(service.title)}`;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPricingDetails = () => {
    switch (serviceType) {
      case "local":
        return [
          { label: "Base Fare", value: `₹${pricing.baseFare}`, sub: `(includes ${pricing.baseKm} km)` },
          { label: "Extra Km Rate", value: `₹${pricing.extraKmRate}/km`, sub: "" },
          { label: "Waiting Charges", value: "₹5/min", sub: "(after 5 min)" },
        ];
      case "airport":
        return [
          { label: "One Way", value: `₹${pricing.oneway}`, sub: "" },
          { label: "Round Trip", value: `₹${pricing.roundTrip}`, sub: "" },
          { label: "Night Charges", value: "+20%", sub: "(11PM - 5AM)" },
          { label: "Free Waiting", value: "45 mins", sub: "" },
        ];
      case "outstation":
        return [
          { label: "Per Km Rate", value: `₹${pricing.perKm}`, sub: "" },
          { label: "Min Km/Day", value: `${pricing.minKmPerDay} km`, sub: "" },
          { label: "Driver Allowance", value: `₹${pricing.driverAllowance}/day`, sub: "" },
          { label: "Toll/Parking", value: "Extra", sub: "(as applicable)" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          {/* Left Side - Image Gallery */}
          <div className="modal-gallery">
            <div className="gallery-main-image">
              <img src={car.images[currentImageIndex]} alt={car.name} />
              <button
                className="gallery-nav prev"
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev - 1 + car.images.length) % car.images.length
                  )
                }
              >
                ‹
              </button>
              <button
                className="gallery-nav next"
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
                }
              >
                ›
              </button>
              <div className="image-counter">
                {currentImageIndex + 1} / {car.images.length}
              </div>
            </div>
            <div className="gallery-thumbnails">
              {car.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail ${idx === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={img} alt={`${car.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="modal-details">
            {/* Tabs */}
            <div className="detail-tabs">
              <button
                className={`tab ${activeTab === "gallery" ? "active" : ""}`}
                onClick={() => setActiveTab("gallery")}
              >
                🚗 Car Details
              </button>
              <button
                className={`tab ${activeTab === "driver" ? "active" : ""}`}
                onClick={() => setActiveTab("driver")}
              >
                👨‍✈️ Driver Info
              </button>
              <button
                className={`tab ${activeTab === "pricing" ? "active" : ""}`}
                onClick={() => setActiveTab("pricing")}
              >
                💰 Pricing
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "gallery" && (
                <div className="car-details-tab">
                  <div className="car-header-modal">
                    <span className="car-type-badge">{car.type}</span>
                    <h2>{car.name}</h2>
                    <div className="car-rating-modal">
                      ⭐ {car.rating} • {car.totalTrips} trips completed
                    </div>
                  </div>

                  <p className="car-desc-modal">{car.description}</p>

                  <div className="specs-grid">
                    <div className="spec-item">
                      <span className="spec-icon">👥</span>
                      <div>
                        <span className="spec-label">Capacity</span>
                        <span className="spec-value">{car.capacity}</span>
                      </div>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">🧳</span>
                      <div>
                        <span className="spec-label">Luggage</span>
                        <span className="spec-value">{car.luggage}</span>
                      </div>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">⛽</span>
                      <div>
                        <span className="spec-label">Fuel</span>
                        <span className="spec-value">{car.fuel}</span>
                      </div>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">⚙️</span>
                      <div>
                        <span className="spec-label">Transmission</span>
                        <span className="spec-value">{car.transmission}</span>
                      </div>
                    </div>
                  </div>

                  <div className="features-list">
                    <h4>Features & Amenities</h4>
                    <div className="features-tags">
                      {car.features.map((feature, idx) => (
                        <span key={idx} className="feature-tag-modal">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "driver" && (
                <div className="driver-details-tab">
                  <div className="driver-profile">
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="driver-photo-large"
                    />
                    <div className="driver-header-info">
                      <h3>
                        {driver.name}
                        {driver.verified && (
                          <span className="verified-icon">✓ Verified</span>
                        )}
                      </h3>
                      <div className="driver-stats">
                        <span className="stat">
                          ⭐ {driver.rating} Rating
                        </span>
                        <span className="stat">
                          🚗 {driver.totalTrips} Trips
                        </span>
                        <span className="stat">
                          📅 {driver.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="driver-badges">
                    {driver.badges.map((badge, idx) => (
                      <span key={idx} className="badge">
                        🏆 {badge}
                      </span>
                    ))}
                  </div>

                  <p className="driver-about">{driver.about}</p>

                  <div className="driver-info-grid">
                    <div className="info-item">
                      <span className="info-label">Languages</span>
                      <span className="info-value">
                        {driver.languages.join(", ")}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Specialization</span>
                      <span className="info-value">
                        {driver.specialization.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="driver-guarantee">
                    <span className="guarantee-icon">🛡️</span>
                    <div>
                      <h5>CabMitra Guarantee</h5>
                      <p>
                        All our drivers are verified, background-checked, and
                        trained for your safety and comfort.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="pricing-details-tab">
                  <h3>{service.title} Pricing</h3>
                  <p className="pricing-subtitle">
                    For {car.name} ({car.type})
                  </p>

                  <div className="pricing-table">
                    {getPricingDetails().map((item, idx) => (
                      <div key={idx} className="pricing-row">
                        <span className="pricing-label">{item.label}</span>
                        <div className="pricing-value">
                          <span className="value">{item.value}</span>
                          {item.sub && (
                            <span className="sub">{item.sub}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pricing-notes">
                    <h5>📌 Important Notes</h5>
                    <ul>
                      <li>{service.pricingNote}</li>
                      <li>GST applicable on all fares</li>
                      <li>Prices may vary during peak season</li>
                    </ul>
                  </div>

                  <div className="pricing-highlight">
                    <span className="highlight-label">Best Value</span>
                    <span className="highlight-text">
                      Book round trip for better rates!
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Book Now Section */}
            <div className="modal-actions">
              <a
                href={`tel:${siteInfo.phone}`}
                className="action-btn call-btn"
              >
                📞 Call Now
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn book-btn"
              >
                📱 Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;
