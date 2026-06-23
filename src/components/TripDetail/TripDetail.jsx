import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import BookingForm from "../BookingForm/BookingForm";
import "./TripDetail.css";

// Image Gallery Carousel
const ImageGallery = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="detail-gallery" aria-label={`${name} photo gallery`}>
      <div className="gallery-main">
        <img src={images[currentIndex]} alt={`${name} - Photo ${currentIndex + 1} of ${images.length}`} />
        <button
          className="gallery-nav prev"
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          }
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          className="gallery-nav next"
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % images.length)
          }
          aria-label="Next image"
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
            aria-label={`View photo ${index + 1}`}
            aria-selected={index === currentIndex}
          >
            <img src={image} alt={`${name} thumbnail ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Places to Visit Carousel
const PlacesCarousel = ({ places, destination, placeImages }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Generate Google Maps URL for a place
  const getGoogleMapsUrl = (place) => {
    const searchQuery = `${place}, ${destination}, India`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
  };

  // Get the place image from the trip's placeImages map or fallback
  const getPlaceImage = (place) => {
    if (placeImages && placeImages[place]) {
      return placeImages[place];
    }
    // Fallback: use a consistent placeholder
    const seed = place.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
                <img src={getPlaceImage(place)} alt={place} loading="lazy" />
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
        <div className="form-success" role="alert" aria-live="polite">
          ✅ Thank you! We will contact you shortly.
        </div>
      )}
      {error && (
        <div className="form-error" role="alert">
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
          aria-label="Your name"
          autoComplete="name"
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          disabled={isSubmitting}
          aria-label="Phone number"
          autoComplete="tel"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isSubmitting}
          aria-label="Email address"
          autoComplete="email"
        />
        <textarea
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          disabled={isSubmitting}
          aria-label="Your message"
        ></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send via WhatsApp"}
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
          <h1>{tripName}</h1>
          <p className="hero-tagline">{trip.tagline || trip.destination}</p>
          <div className="hero-meta">
            <span className="hero-badge">📍 {trip.destination}</span>
            <span className="hero-badge">⏱️ {trip.duration}</span>
            <span className="hero-badge">👥 Up to {trip.maxGroupSize} people</span>
          </div>
        </div>
      </div>

      {/* Main Content - Single column layout */}
      <div className="trip-detail-content">
        {/* Trip Description & Quick Info */}
        <div className="trip-overview">
          <p className="trip-description">{trip.description}</p>
          
          {/* Book This Trip Button */}
          <button 
            className="book-trip-btn"
            onClick={() => setShowBooking(true)}
          >
            <span>🚖</span> Book This Trip
          </button>
        </div>

        {/* Image Gallery - Full width */}
        {tripImages.length > 0 && (
          <div className="gallery-section">
            <ImageGallery images={tripImages} name={tripName} />
          </div>
        )}

        {/* Places to Visit Carousel */}
        {tripHighlights.length > 0 && (
          <PlacesCarousel places={tripHighlights} destination={trip.destination} placeImages={trip.placeImages} />
        )}

        {/* Google Maps Embed */}
        {trip.mapEmbedUrl && (
          <div className="trip-map-section">
            <h3>📍 Location on Map</h3>
            <div className="map-embed-container">
              <iframe
                src={trip.mapEmbedUrl}
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${trip.destination}`}
              />
            </div>
          </div>
        )}

        {/* Inclusions & Exclusions - side by side */}
        <div className="trip-details-grid">
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
        </div>

        {/* Contact Form - Full width */}
        <ContactForm tripName={tripName} siteInfo={siteInfo} />
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div role="dialog" aria-modal="true" aria-label="Book this trip">
          <div 
            className="booking-modal-overlay" 
            onClick={() => setShowBooking(false)}
            aria-hidden="true"
          />
          <BookingForm 
            isModal={true} 
            preSelectedTrip={trip}
            preSelectedService="outstation"
            onClose={() => setShowBooking(false)} 
          />
        </div>
      )}
    </section>
  );
};

export default TripDetail;
