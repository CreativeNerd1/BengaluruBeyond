import { useState } from "react";
import { useSiteData } from "../../context/SiteDataContext";
import CarDetailModal from "./CarDetailModal";
import "./CabServices.css";

// Service types configuration (static config, not dynamic data)
const serviceTypes = {
  local: {
    title: "Local Cabs in Bangalore",
    slug: "local-cabs",
    tagline: "Best Local Cab Service in Bangalore",
    description: "Book affordable local cabs in Bangalore for daily commute, shopping, hospital visits, city tours, or any intra-city travel. Available 24/7 with hourly and full day cab packages. Trusted by thousands as the best local taxi service in Bangalore.",
    heroImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200",
    features: [
      { icon: "⏱️", title: "Hourly & Full Day Packages", desc: "Flexible 4hr, 8hr, 12hr cab packages in Bangalore" },
      { icon: "📍", title: "Multiple Stops", desc: "Make unlimited stops anywhere in Bangalore city" },
      { icon: "🧭", title: "Flexible Routes", desc: "Plan pickups and stops your way across Bangalore" },
      { icon: "🛡️", title: "Safe & Reliable Rides", desc: "Verified drivers & sanitized cabs for safe travel" },
    ],
  },
  airport: {
    title: "Airport Taxi Bangalore",
    slug: "airport-cabs",
    tagline: "Best Airport Cab Service – Kempegowda International Airport",
    description: "Book reliable and affordable airport taxi in Bangalore for pickup and drop at Kempegowda International Airport (KIA). 24/7 airport cab service with flight tracking, 45 minutes free waiting, and on-time guarantee. The most trusted airport transfer service in Bangalore.",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    features: [
      { icon: "✈️", title: "Flight Tracking", desc: "We track your flight for delays & early arrivals" },
      { icon: "🕐", title: "24/7 Airport Service", desc: "Available round the clock for all flights" },
      { icon: "🧳", title: "Meet & Greet", desc: "Driver waits with name board at arrival gate" },
      { icon: "⏰", title: "45 Min Free Waiting", desc: "No extra charges for airport pickup delays" },
    ],
  },
  outstation: {
    title: "Outstation Cabs from Bangalore",
    slug: "outstation-cabs",
    tagline: "Best Outstation Cab Service from Bangalore",
    description: "Book affordable outstation cabs from Bangalore to Mysore, Coorg, Ooty, Wayanad, Tirupati & more. One-way cabs, round trips, and multi-day packages with experienced drivers. Sedan and Innova available. The most reliable outstation taxi service in Bangalore.",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200",
    features: [
      { icon: "🗺️", title: "One-way & Round Trip", desc: "Flexible one way cab and round trip options" },
      { icon: "🏨", title: "Multi-day Trips", desc: "Perfect for weekend getaways & holidays" },
      { icon: "👨‍✈️", title: "Expert Drivers", desc: "Know all outstation routes from Bangalore" },
      { icon: "🔄", title: "Unlimited Stops", desc: "Stop at any sightseeing point on the way" },
    ],
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

// Car Card Component
const CarCard = ({ car, serviceType, onViewDetails, siteInfo }) => {
  const whatsappLink = `${siteInfo.socialLinks?.whatsapp || '#'}?text=I%20want%20to%20book%20${encodeURIComponent(car.name)}%20for%20${encodeURIComponent(serviceTypes[serviceType]?.title || 'Cab Service')}`;

  const carImages = car.images?.length > 0 ? car.images : 
    (car.imageUrl ? [car.imageUrl] : ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800']);
  
  const carFeatures = car.features || [];

  return (
    <div className="car-card">
      <CarCarousel
        images={carImages}
        name={car.name}
        onImageClick={() => onViewDetails(car)}
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

        <div className="car-footer">
          <div className="car-actions">
            <button
              className="btn-details"
              onClick={() => onViewDetails(car)}
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
  const { cars, siteInfo, loading } = useSiteData();
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const service = serviceTypes[serviceType];

  const filteredCars =
    filter === "all" ? cars : cars.filter((car) => car.category === filter);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
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
              className={`filter-tab ${filter === "4-seater" ? "active" : ""}`}
              onClick={() => setFilter("4-seater")}
            >
              4 Seater
            </button>
            <button
              className={`filter-tab ${filter === "5-seater" ? "active" : ""}`}
              onClick={() => setFilter("5-seater")}
            >
              5 Seater
            </button>
            <button
              className={`filter-tab ${filter === "7-seater" ? "active" : ""}`}
              onClick={() => setFilter("7-seater")}
            >
              7 Seater
            </button>
            <button
              className={`filter-tab ${filter === "12-seater" ? "active" : ""}`}
              onClick={() => setFilter("12-seater")}
            >
              12 Seater
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
                siteInfo={siteInfo}
              />
            ))
          )}
        </div>

      </div>

      {/* SEO Content Section */}
      <div className="seo-content-section">
        {serviceType === "local" && (
          <div className="seo-content">
            <h2>Why Vrudhi Cabs is the Best Local Cab Service in Bangalore</h2>
            <p>
              Looking for an <strong>affordable local cab in Bangalore</strong>? Vrudhi Cabs offers the most reliable and budget-friendly 
              <strong> city cab service</strong> with hourly and full-day packages. Whether you need a cab for shopping, hospital visits, 
              office commute, or city sightseeing, our well-maintained sedans, Innovas, and SUVs are available <strong>24 hours</strong>. 
              We are rated as one of the <strong>best cab services near me</strong> by hundreds of happy customers in Bangalore. 
              Book your <strong>local taxi in Bangalore</strong> online or call us for instant booking.
            </p>
          </div>
        )}
        {serviceType === "airport" && (
          <div className="seo-content">
            <h2>Best Airport Taxi Service in Bangalore – Kempegowda Airport</h2>
            <p>
              Need an <strong>airport taxi in Bangalore</strong>? Vrudhi Cabs provides the most reliable <strong>airport pickup and drop service</strong> at 
              Kempegowda International Airport (KIA). Our <strong>Bangalore airport cab</strong> service includes real-time flight tracking, 
              45 minutes free waiting, and a meet-and-greet by your driver. Whether it's an early morning flight or a late-night arrival, 
              our <strong>24/7 airport transfer service</strong> ensures you never miss a ride. Book the <strong>cheapest airport cab in Bangalore</strong> with Vrudhi Cabs.
            </p>
          </div>
        )}
        {serviceType === "outstation" && (
          <div className="seo-content">
            <h2>Best Outstation Cabs from Bangalore – One Way & Round Trip</h2>
            <p>
              Planning a trip outside Bangalore? Book the best <strong>outstation cabs from Bangalore</strong> with Vrudhi Cabs. 
              We offer <strong>one way cabs</strong> and round-trip options to popular destinations: <strong>Bangalore to Mysore cab</strong> (₹4,500), 
              <strong> Bangalore to Coorg cab</strong> (₹7,500), <strong>Bangalore to Ooty taxi</strong> (₹9,500), 
              <strong> Bangalore to Wayanad cab</strong> (₹8,500), and <strong>Bangalore to Tirupati cab</strong> (₹8,000). 
              Our experienced drivers know all the routes and ensure a comfortable, safe journey. 
              The most <strong>affordable and trusted outstation taxi service in Bangalore</strong>.
            </p>
          </div>
        )}
      </div>

      {/* Car Detail Modal */}
      {modalOpen && selectedCar && (
        <CarDetailModal
          car={selectedCar}
          serviceType={serviceType}
          onClose={closeModal}
          siteInfo={siteInfo}
        />
      )}
    </section>
  );
};

export default CabServices;
