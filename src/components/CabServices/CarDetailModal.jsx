import { useState, useEffect } from "react";
import "./CarDetailModal.css";

// Service types configuration
const serviceTypes = {
  local: { title: "Local Cabs" },
  airport: { title: "Airport Cabs" },
  outstation: { title: "Outstation Cabs" },
};

const CarDetailModal = ({ car, serviceType, onClose, siteInfo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("gallery");
  const service = serviceTypes[serviceType] || serviceTypes.local;

  const whatsappLink = `${siteInfo?.socialLinks?.whatsapp || '#'}?text=I%20want%20to%20book%20${encodeURIComponent(car.name)}%20for%20${encodeURIComponent(service.title)}`;

  const carImages = car.images?.length > 0 ? car.images : 
    (car.imageUrl ? [car.imageUrl] : ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800']);
  
  const carFeatures = car.features || [];

  // Close on Escape and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label={`${car.name} details`}>
      <div className="modal-container">
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
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
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="gallery-nav next"
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev + 1) % carImages.length)
                }
                aria-label="Next image"
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

            </div>

            {/* Book Now Section */}
            <div className="modal-actions">
              <a
                href={`tel:${siteInfo?.phone || '+916366244686'}`}
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
