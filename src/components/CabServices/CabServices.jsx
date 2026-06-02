import { useState } from "react";
import { cars, drivers, serviceTypes } from "../../data/cabData";
import { siteInfo } from "../../data/siteData";
import CarDetailModal from "./CarDetailModal";
import "./CabServices.css";

// Car Image Carousel
const CarCarousel = ({ images, name, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="car-carousel" onClick={() => onImageClick(currentIndex)}>
      <div className="carousel-image">
        <img src={images[currentIndex]} alt={name} />
        <div className="image-count">
          📷 {currentIndex + 1}/{images.length}
        </div>
      </div>
      <div className="carousel-thumbs">
        {images.slice(0, 4).map((img, idx) => (
          <button
            key={idx}
            className={`thumb ${idx === currentIndex ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
          >
            <img src={img} alt={`${name} ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

// Driver Mini Card
const DriverMiniCard = ({ driver }) => (
  <div className="driver-mini">
    <img src={driver.photo} alt={driver.name} className="driver-photo" />
    <div className="driver-info">
      <span className="driver-name">{driver.name}</span>
      <div className="driver-meta">
        <span className="driver-rating">⭐ {driver.rating}</span>
        <span className="driver-exp">{driver.experience}</span>
      </div>
    </div>
    {driver.verified && <span className="verified-badge">✓</span>}
  </div>
);

// Car Card Component
const CarCard = ({ car, serviceType, onViewDetails }) => {
  const pricing = car.pricing[serviceType];
  const assignedDriver = drivers[car.id % drivers.length];

  const getPriceDisplay = () => {
    switch (serviceType) {
      case "local":
        return (
          <>
            <span className="price-main">₹{pricing.baseFare}</span>
            <span className="price-sub">for {pricing.baseKm} km</span>
          </>
        );
      case "airport":
        return (
          <>
            <span className="price-main">₹{pricing.oneway}</span>
            <span className="price-sub">one way</span>
          </>
        );
      case "outstation":
        return (
          <>
            <span className="price-main">₹{pricing.perKm}</span>
            <span className="price-sub">per km</span>
          </>
        );
      default:
        return null;
    }
  };

  const whatsappLink = `${siteInfo.socialLinks.whatsapp}?text=I%20want%20to%20book%20${encodeURIComponent(car.name)}%20for%20${encodeURIComponent(serviceTypes[serviceType].title)}`;

  return (
    <div className="car-card">
      <CarCarousel
        images={car.images}
        name={car.name}
        onImageClick={() => onViewDetails(car, assignedDriver)}
      />

      <div className="car-content">
        <div className="car-header">
          <div>
            <span className="car-type">{car.type}</span>
            <h3 className="car-name">{car.name}</h3>
          </div>
          <div className="car-rating">
            <span className="stars">⭐ {car.rating}</span>
            <span className="trips">{car.totalTrips} trips</span>
          </div>
        </div>

        <p className="car-description">{car.description}</p>

        <div className="car-specs">
          <div className="spec">
            <span className="spec-icon">👥</span>
            <span>{car.capacity}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">🧳</span>
            <span>{car.luggage}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">❄️</span>
            <span>{car.ac ? "AC" : "Non-AC"}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">⚙️</span>
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="car-features">
          {car.features.slice(0, 4).map((feature, idx) => (
            <span key={idx} className="feature-tag">
              {feature}
            </span>
          ))}
          {car.features.length > 4 && (
            <span className="feature-more">+{car.features.length - 4}</span>
          )}
        </div>

        <div className="driver-section">
          <span className="driver-label">Your Driver</span>
          <DriverMiniCard driver={assignedDriver} />
        </div>

        <div className="car-footer">
          <div className="car-price">{getPriceDisplay()}</div>
          <div className="car-actions">
            <button
              className="btn-details"
              onClick={() => onViewDetails(car, assignedDriver)}
            >
              View Details
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const CabServices = ({ serviceType }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const service = serviceTypes[serviceType];

  const filteredCars =
    filter === "all" ? cars : cars.filter((car) => car.category === filter);

  const handleViewDetails = (car, driver) => {
    setSelectedCar(car);
    setSelectedDriver(driver);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
    setSelectedDriver(null);
  };

  return (
    <section className="cab-services-page">
      {/* Hero Banner */}
      <div
        className="cab-hero"
        style={{ backgroundImage: `url(${service.heroImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-tagline">{service.tagline}</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          {service.features.map((feature, idx) => (
            <div key={idx} className="feature-item">
              <span className="feature-icon">{feature.icon}</span>
              <div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cars Section */}
      <div className="cars-section">
        <div className="section-header">
          <h2>Choose Your Ride</h2>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-tab ${filter === "sedan" ? "active" : ""}`}
              onClick={() => setFilter("sedan")}
            >
              Sedans
            </button>
            <button
              className={`filter-tab ${filter === "suv" ? "active" : ""}`}
              onClick={() => setFilter("suv")}
            >
              SUVs
            </button>
            <button
              className={`filter-tab ${filter === "tempo" ? "active" : ""}`}
              onClick={() => setFilter("tempo")}
            >
              Tempo
            </button>
          </div>
        </div>

        <div className="cars-grid">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              serviceType={serviceType}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <p className="pricing-note">💡 {service.pricingNote}</p>
      </div>

      {/* Car Detail Modal */}
      {modalOpen && selectedCar && (
        <CarDetailModal
          car={selectedCar}
          driver={selectedDriver}
          serviceType={serviceType}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default CabServices;
