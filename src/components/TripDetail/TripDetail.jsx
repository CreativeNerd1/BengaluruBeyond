import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTripBySlug } from "../../data/tripData";
import { siteInfo } from "../../data/siteData";
import "./TripDetail.css";

// Image Gallery Carousel
const ImageGallery = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="detail-gallery">
      <div className="gallery-main">
        <img src={images[currentIndex]} alt={`${name} - ${currentIndex + 1}`} />
        <button
          className="gallery-nav prev"
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          }
        >
          ‹
        </button>
        <button
          className="gallery-nav next"
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % images.length)
          }
        >
          ›
        </button>
      </div>
      <div className="gallery-thumbs">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumb ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

// Package Card Component
const PackageCard = ({ pkg, tripName }) => {
  const [expanded, setExpanded] = useState(false);
  const whatsappLink = `${siteInfo.socialLinks.whatsapp}?text=I%20want%20to%20book%20a%20cab%20for%20${encodeURIComponent(tripName)}%20-%20${encodeURIComponent(pkg.name)}`;

  return (
    <div className="package-card">
      <div className="package-header">
        <div className="package-icon">{pkg.vehicleIcon}</div>
        <div className="package-info">
          <h3>{pkg.name}</h3>
          <div className="package-tags">
            <span className="tag vehicle">{pkg.vehicleType}</span>
            <span className="tag duration">{pkg.duration}</span>
          </div>
        </div>
        <div className="package-price">
          <span className="currency">₹</span>
          <span className="amount">{pkg.price.toLocaleString()}</span>
        </div>
      </div>

      <div className={`package-itinerary ${expanded ? "expanded" : ""}`}>
        {pkg.itinerary.map((day) => (
          <div key={day.day} className="itinerary-day">
            <div className="day-marker">
              <span className="day-number">{day.day}</span>
            </div>
            <div className="day-content">
              <h4>{day.title}</h4>
              <p>{day.activities}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="package-actions">
        <button
          className="toggle-itinerary"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Itinerary ↑" : "View Itinerary ↓"}
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="book-btn"
        >
          📱 Book Now
        </a>
      </div>
    </div>
  );
};

// Contact Form Component
const ContactForm = ({ tripName }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `I'm interested in ${tripName} trip packages.`,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will contact you shortly.");
  };

  return (
    <div className="detail-contact-form">
      <h3>📞 Contact Us</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Message *"
          rows="4"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const TripDetail = () => {
  const { slug } = useParams();
  const trip = getTripBySlug(slug);

  if (!trip) {
    return (
      <section className="trip-detail-page">
        <div className="not-found">
          <h1>Trip Not Found</h1>
          <p>Sorry, we couldn't find the trip you're looking for.</p>
          <Link to="/packages" className="back-btn">
            ← Back to Packages
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="trip-detail-page">
      {/* Hero Banner with Background Image */}
      <div
        className="trip-detail-hero"
        style={{ backgroundImage: `url(${trip.images[0]})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Link to="/packages" className="back-link">
            ← All Packages
          </Link>
          <h1>{trip.name.toUpperCase()} TRIP PACKAGES</h1>
          <p>{trip.tagline}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="trip-detail-content">
        <div className="content-grid">
          {/* Left Column - Packages */}
          <div className="packages-section">
            <h2>Available Packages</h2>
            <div className="packages-list">
              {trip.packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} tripName={trip.name} />
              ))}
            </div>
          </div>

          {/* Right Column - Gallery & Contact */}
          <div className="sidebar">
            <ImageGallery images={trip.images} name={trip.name} />
            <ContactForm tripName={trip.name} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripDetail;
