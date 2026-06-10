import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import BookingForm from "../BookingForm/BookingForm";
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

// Places to Visit Carousel
const PlacesCarousel = ({ places, destination }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Generate Google Maps URL for a place
  const getGoogleMapsUrl = (place) => {
    const searchQuery = `${place}, ${destination}, India`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
  };

  // Generate a consistent image based on place name using picsum.photos
  // This creates unique but consistent images for each place
  const getPlaceImage = (place, index) => {
    // Use a hash of the place name to get a consistent seed
    const seed = place.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index;
    return `https://picsum.photos/seed/${seed}/400/300`;
  };

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollability);
      return () => carousel.removeEventListener('scroll', checkScrollability);
    }
  }, [places]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!places || places.length === 0) return null;

  return (
    <div className="places-carousel-section">
      <div className="places-header">
        <h3>🗺️ Places to Visit</h3>
        <p>Click on any place to view it on Google Maps</p>
      </div>
      <div className="places-carousel-container">
        {canScrollLeft && (
          <button 
            className="carousel-nav carousel-prev" 
            onClick={() => scroll('left')}
            aria-label="Previous places"
          >
            ‹
          </button>
        )}
        <div className="places-carousel" ref={carouselRef}>
          {places.map((place, index) => (
            <a
              key={index}
              href={getGoogleMapsUrl(place)}
              target="_blank"
              rel="noopener noreferrer"
              className="place-card"
            >
              <div className="place-image">
                <img src={getPlaceImage(place, index)} alt={place} />
                <div className="place-overlay">
                  <span className="maps-icon">📍</span>
                  <span className="view-text">View on Maps</span>
                </div>
              </div>
              <div className="place-info">
                <h4>{place}</h4>
                <span className="place-destination">{destination}</span>
              </div>
            </a>
          ))}
        </div>
        {canScrollRight && (
          <button 
            className="carousel-nav carousel-next" 
            onClick={() => scroll('right')}
            aria-label="Next places"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

// Package Card Component
const PackageCard = ({ pkg, tripName, siteInfo }) => {
  const [expanded, setExpanded] = useState(false);
  const whatsappLink = `${siteInfo.socialLinks?.whatsapp || '#'}?text=I%20want%20to%20book%20a%20cab%20for%20${encodeURIComponent(tripName)}%20-%20${encodeURIComponent(pkg.name)}`;

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
const ContactForm = ({ tripName, siteInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `I'm interested in ${tripName} trip packages.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const whatsappUrl = `${siteInfo?.socialLinks?.whatsapp || '#'}?text=${encodeURIComponent(formData.message || `I'm interested in ${tripName} trip packages.`)}`;
      window.open(whatsappUrl, '_blank');
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: `I'm interested in ${tripName} trip packages.`,
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Unable to open WhatsApp. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="detail-contact-form">
      <h3>📞 Contact Us</h3>
      {submitted && (
        <div className="form-success">
          ✅ Thank you! We will contact you shortly.
        </div>
      )}
      {error && (
        <div className="form-error">
          ❌ {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          disabled={isSubmitting}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isSubmitting}
        />
        <textarea
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          disabled={isSubmitting}
        ></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

const TripDetail = () => {
  const { slug } = useParams();
  const { tripPackages, siteInfo, loading } = useSiteData();
  const [showBooking, setShowBooking] = useState(false);
  
  // Find trip by ID (if numeric) or slug
  const trip = tripPackages.find(t => {
    // Check if slug param is a numeric ID
    if (!isNaN(slug) && !isNaN(parseInt(slug))) {
      return t.id === parseInt(slug) || t.id === slug;
    }
    // Otherwise try to match by slug or generated slug from title
    const tripSlug = t.slug || (t.title || t.name || '').toLowerCase().replace(/\s+/g, '-');
    return tripSlug === slug;
  });

  if (loading.tripPackages) {
    return (
      <section className="trip-detail-page">
        <div className="not-found">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

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

  // Normalize trip data for display
  const tripName = trip.name || trip.title;
  const tripImages = trip.images || (trip.imageUrl ? [trip.imageUrl] : []);
  const tripHighlights = typeof trip.highlights === 'string' 
    ? trip.highlights.split(',').map(h => h.trim()) 
    : (trip.highlights || []);
  const tripInclusions = typeof trip.inclusions === 'string'
    ? trip.inclusions.split(',').map(i => i.trim())
    : (trip.inclusions || []);
  const tripExclusions = typeof trip.exclusions === 'string'
    ? trip.exclusions.split(',').map(e => e.trim())
    : (trip.exclusions || []);

  return (
    <section className="trip-detail-page">
      {/* Hero Banner with Background Image */}
      <div
        className="trip-detail-hero"
        style={{ backgroundImage: `url(${tripImages[0] || ''})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Link to="/packages" className="back-link">
            ← All Packages
          </Link>
          <h1>{tripName?.toUpperCase()} TRIP</h1>
          <p>{trip.tagline || trip.destination}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="trip-detail-content">
        <div className="content-grid">
          {/* Left Column - Trip Info */}
          <div className="packages-section">
            <h2>{tripName}</h2>
            <p className="trip-description">{trip.description}</p>
            
            <div className="trip-info-grid">
              <div className="info-item">
                <span className="info-label">📍 Destination</span>
                <span className="info-value">{trip.destination}</span>
              </div>
              <div className="info-item">
                <span className="info-label">⏱️ Duration</span>
                <span className="info-value">{trip.duration}</span>
              </div>
              <div className="info-item">
                <span className="info-label">👥 Max Group</span>
                <span className="info-value">{trip.maxGroupSize} people</span>
              </div>
            </div>

            {/* Book This Trip Button */}
            <button 
              className="book-trip-btn"
              onClick={() => setShowBooking(true)}
            >
              <span>🚖</span> Book This Trip
            </button>

            {/* Places to Visit Carousel */}
            {tripHighlights.length > 0 && (
              <PlacesCarousel places={tripHighlights} destination={trip.destination} />
            )}

            {tripInclusions.length > 0 && (
              <div className="trip-section">
                <h3>✅ Inclusions</h3>
                <ul className="inclusion-list">
                  {tripInclusions.map((inc, i) => <li key={i}>{inc}</li>)}
                </ul>
              </div>
            )}

            {tripExclusions.length > 0 && (
              <div className="trip-section">
                <h3>❌ Exclusions</h3>
                <ul className="exclusion-list">
                  {tripExclusions.map((exc, i) => <li key={i}>{exc}</li>)}
                </ul>
              </div>
            )}

            {/* Legacy packages support */}
            {trip.packages && trip.packages.length > 0 && (
              <>
                <h2>Available Packages</h2>
                <div className="packages-list">
                  {trip.packages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} tripName={tripName} siteInfo={siteInfo} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Column - Gallery & Contact */}
          <div className="sidebar">
            {tripImages.length > 0 && (
              <ImageGallery images={tripImages} name={tripName} />
            )}
            <ContactForm tripName={tripName} siteInfo={siteInfo} />
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <>
          <div 
            className="booking-modal-overlay" 
            onClick={() => setShowBooking(false)}
          />
          <BookingForm 
            isModal={true} 
            preSelectedTrip={trip}
            preSelectedService="outstation"
            onClose={() => setShowBooking(false)} 
          />
        </>
      )}
    </section>
  );
};

export default TripDetail;
