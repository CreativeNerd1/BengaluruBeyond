import { useState } from "react";
import { useSiteData } from "../../context/SiteDataContext";
import CarDetailModal from "./CarDetailModal";
import "./CabServices.css";

// Service types configuration (static config, not dynamic data)
const serviceTypes = {
  local: {
    title: "Local Cabs",
    slug: "local-cabs",
    tagline: "City Rides Made Easy",
    description: "Comfortable rides within the city for your daily commute, shopping trips, or meetings. Available in multiple car options to suit your needs.",
    heroImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200",
    features: [
      { icon: "⏱️", title: "Hourly Packages", desc: "Flexible 4hr, 8hr, 12hr packages" },
      { icon: "📍", title: "Multiple Stops", desc: "Make stops anywhere in the city" },
      { icon: "💳", title: "Easy Payments", desc: "Cash, UPI, or Card payments" },
      { icon: "🛡️", title: "Safe Rides", desc: "Verified drivers & sanitized cars" },
    ],
    pricingNote: "Base fare includes first 40 km. Extra km charged as per rate.",
  },
  airport: {
    title: "Airport Cabs",
    slug: "airport-cabs",
    tagline: "Never Miss a Flight",
    description: "Reliable airport pickup and drop services available 24/7. Track your flight and we'll be there on time, every time.",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    features: [
      { icon: "✈️", title: "Flight Tracking", desc: "We track your flight for delays" },
      { icon: "🕐", title: "24/7 Service", desc: "Available round the clock" },
      { icon: "🧳", title: "Meet & Greet", desc: "Driver waits with name board" },
      { icon: "⏰", title: "Free Waiting", desc: "45 min free waiting time" },
    ],
    pricingNote: "Toll and parking charges extra. Night charges (11PM-5AM) +20%.",
  },
  outstation: {
    title: "Outstation Cabs",
    slug: "outstation-cabs",
    tagline: "Journey Beyond the City",
    description: "Explore destinations beyond Bangalore with our comfortable outstation cab services. One-way, round trip, and multi-day packages available.",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200",
    features: [
      { icon: "🗺️", title: "One-way & Round", desc: "Flexible trip options" },
      { icon: "🏨", title: "Multi-day Trips", desc: "Perfect for holidays" },
      { icon: "👨‍✈️", title: "Expert Drivers", desc: "Know all the routes" },
      { icon: "🔄", title: "Unlimited Stops", desc: "Stop wherever you want" },
    ],
    pricingNote: "Toll, parking, state permit extra. Driver allowance included for overnight trips.",
  },
};

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
    <img 
      src={driver.photo || driver.imageUrl || driver.image || 'https://randomuser.me/api/portraits/men/32.jpg'} 
      alt={driver.name} 
      className="driver-photo" 
    />
    <div className="driver-info">
      <span className="driver-name">{driver.name}</span>
      <div className="driver-meta">
        <span className="driver-rating">⭐ {driver.rating || 4.8}</span>
        <span className="driver-exp">{driver.experience || `${driver.experienceYears || 0}+ years`}</span>
      </div>
    </div>
    {(driver.verified || driver.isVerified) && <span className="verified-badge">✓</span>}
  </div>
);

// Car Card Component
const CarCard = ({ car, serviceType, onViewDetails, drivers, siteInfo }) => {
  const pricing = car.pricing?.[serviceType] || { baseFare: 0, baseKm: 0, perKm: 0, oneway: 0 };
  const assignedDriver = drivers?.[car.id % (drivers.length || 1)] || null;

  const getPriceDisplay = () => {
    switch (serviceType) {
      case "local":
        return (
          <>
            <span className="price-main">₹{pricing.baseFare || car.pricePerDay || 800}</span>
            <span className="price-sub">for {pricing.baseKm || 40} km</span>
          </>
        );
      case "airport":
        return (
          <>
            <span className="price-main">₹{pricing.oneway || 1200}</span>
            <span className="price-sub">one way</span>
          </>
        );
      case "outstation":
        return (
          <>
            <span className="price-main">₹{pricing.perKm || car.pricePerKm || 12}</span>
            <span className="price-sub">per km</span>
          </>
        );
      default:
        return null;
    }
  };

  const whatsappLink = `${siteInfo.socialLinks?.whatsapp || '#'}?text=I%20want%20to%20book%20${encodeURIComponent(car.name)}%20for%20${encodeURIComponent(serviceTypes[serviceType]?.title || 'Cab Service')}`;

  const carImages = car.images?.length > 0 ? car.images : 
    (car.imageUrl ? [car.imageUrl] : ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800']);
  
  const carFeatures = car.features || [];

  return (
    <div className="car-card">
      <CarCarousel
        images={carImages}
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
            <span className="stars">⭐ {car.rating || 4.8}</span>
            <span className="trips">{car.totalTrips || 0} trips</span>
          </div>
        </div>

        <p className="car-description">{car.description}</p>

        <div className="car-specs">
          <div className="spec">
            <span className="spec-icon">👥</span>
            <span>{car.capacity || car.seatingCapacity || '4+1'}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">🧳</span>
            <span>{car.luggage || '2 Bags'}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">❄️</span>
            <span>{car.ac || car.hasAC ? "AC" : "Non-AC"}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">⚙️</span>
            <span>{car.transmission || 'Manual'}</span>
          </div>
        </div>

        <div className="car-features">
          {carFeatures.slice(0, 4).map((feature, idx) => (
            <span key={idx} className="feature-tag">
              {feature}
            </span>
          ))}
          {carFeatures.length > 4 && (
            <span className="feature-more">+{carFeatures.length - 4}</span>
          )}
        </div>

        {assignedDriver && (
          <div className="driver-section">
            <span className="driver-label">Your Driver</span>
            <DriverMiniCard driver={assignedDriver} />
          </div>
        )}

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
  const { cars, drivers, siteInfo, loading } = useSiteData();
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

  if (loading.cars && cars.length === 0) {
    return (
      <section className="cab-services-page">
        <div className="cab-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>{service.title}</h1>
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {filteredCars.length === 0 ? (
            <p className="no-cars">No cars available in this category.</p>
          ) : (
            filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                serviceType={serviceType}
                onViewDetails={handleViewDetails}
                drivers={drivers}
                siteInfo={siteInfo}
              />
            ))
          )}
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
          siteInfo={siteInfo}
        />
      )}
    </section>
  );
};

export default CabServices;
