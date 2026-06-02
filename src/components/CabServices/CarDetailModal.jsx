import { useState } from "react";
import "./CarDetailModal.css";

// Service types configuration
const serviceTypes = {
  local: {
    title: "Local Cabs",
    pricingNote: "Base fare includes first 40 km. Extra km charged as per rate.",
  },
  airport: {
    title: "Airport Cabs",
    pricingNote: "Toll and parking charges extra. Night charges (11PM-5AM) +20%.",
  },
  outstation: {
    title: "Outstation Cabs",
    pricingNote: "Toll, parking, state permit extra. Driver allowance included for overnight trips.",
  },
};

const CarDetailModal = ({ car, driver, serviceType, onClose, siteInfo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("gallery");

  const pricing = car.pricing?.[serviceType] || {
    baseFare: car.pricePerDay || 800,
    baseKm: 40,
    extraKmRate: car.pricePerKm || 14,
    oneway: 1200,
    roundTrip: 2000,
    perKm: car.pricePerKm || 12,
    minKmPerDay: 300,
    driverAllowance: 400,
  };
  const service = serviceTypes[serviceType] || serviceTypes.local;

  const whatsappLink = `${siteInfo?.socialLinks?.whatsapp || '#'}?text=I%20want%20to%20book%20${encodeURIComponent(car.name)}%20for%20${encodeURIComponent(service.title)}`;

  const carImages = car.images?.length > 0 ? car.images : 
    (car.imageUrl ? [car.imageUrl] : ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800']);
  
  const carFeatures = car.features || [];

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
              <img src={carImages[currentImageIndex]} alt={car.name} />
              <button
                className="gallery-nav prev"
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev - 1 + carImages.length) % carImages.length
                  )
                }
              >
                ‹
              </button>
              <button
                className="gallery-nav next"
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev + 1) % carImages.length)
                }
              >
                ›
              </button>
              <div className="image-counter">
                {currentImageIndex + 1} / {carImages.length}
              </div>
            </div>
            <div className="gallery-thumbnails">
              {carImages.map((img, idx) => (
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
                      ⭐ {car.rating || 4.8} • {car.totalTrips || 0} trips completed
                    </div>
                  </div>

                  <p className="car-desc-modal">{car.description}</p>

                  <div className="specs-grid">
                    <div className="spec-item">
                      <span className="spec-icon">👥</span>
                      <div>
                        <span className="spec-label">Capacity</span>
                        <span className="spec-value">{car.capacity || car.seatingCapacity || '4+1'}</span>
                      </div>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">🧳</span>
                      <div>
                        <span className="spec-label">Luggage</span>
                        <span className="spec-value">{car.luggage || '2 Bags'}</span>
                      </div>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">⛽</span>
                      <div>
                        <span className="spec-label">Fuel</span>
                        <span className="spec-value">{car.fuel || car.fuelType || 'Diesel'}</span>
                      </div>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">⚙️</span>
                      <div>
                        <span className="spec-label">Transmission</span>
                        <span className="spec-value">{car.transmission || 'Manual'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="features-list">
                    <h4>Features & Amenities</h4>
                    <div className="features-tags">
                      {carFeatures.map((feature, idx) => (
                        <span key={idx} className="feature-tag-modal">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "driver" && driver && (
                <div className="driver-details-tab">
                  <div className="driver-profile">
                    <img
                      src={driver.photo || driver.imageUrl || driver.image || 'https://randomuser.me/api/portraits/men/32.jpg'}
                      alt={driver.name}
                      className="driver-photo-large"
                    />
                    <div className="driver-header-info">
                      <h3>
                        {driver.name}
                        {(driver.verified || driver.isVerified) && (
                          <span className="verified-icon">✓ Verified</span>
                        )}
                      </h3>
                      <div className="driver-stats">
                        <span className="stat">
                          ⭐ {driver.rating || 4.8} Rating
                        </span>
                        <span className="stat">
                          🚗 {driver.totalTrips || 0} Trips
                        </span>
                        <span className="stat">
                          📅 {driver.experience || `${driver.experienceYears || 0}+ Years`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {driver.badges?.length > 0 && (
                    <div className="driver-badges">
                      {driver.badges.map((badge, idx) => (
                        <span key={idx} className="badge">
                          🏆 {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {driver.about && <p className="driver-about">{driver.about}</p>}

                  <div className="driver-info-grid">
                    <div className="info-item">
                      <span className="info-label">Languages</span>
                      <span className="info-value">
                        {Array.isArray(driver.languages) ? driver.languages.join(", ") : (driver.languages || 'English, Hindi, Kannada')}
                      </span>
                    </div>
                    {driver.specialization && (
                      <div className="info-item">
                        <span className="info-label">Specialization</span>
                        <span className="info-value">
                          {Array.isArray(driver.specialization) ? driver.specialization.join(", ") : driver.specialization}
                        </span>
                      </div>
                    )}
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
              
              {activeTab === "driver" && !driver && (
                <div className="driver-details-tab">
                  <div className="no-driver">
                    <p>Driver information will be assigned upon booking.</p>
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
                href={`tel:${siteInfo?.phone || '+919606919300'}`}
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
