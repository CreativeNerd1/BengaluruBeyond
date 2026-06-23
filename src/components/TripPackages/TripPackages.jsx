import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import "./TripPackages.css";

const FALLBACK_TRIP_IMAGE = "https://picsum.photos/seed/vrudhicabs-trip/800/500";

const getTripImages = (trip) => {
  const candidates = [
    ...(Array.isArray(trip.images) ? trip.images : []),
    trip.imageUrl,
    trip.image,
  ].filter(Boolean);

  return candidates.length > 0 ? candidates : [FALLBACK_TRIP_IMAGE];
};

// Image Carousel Component
const ImageCarousel = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div
      className="carousel"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={image}
              alt={`${name} - ${index + 1}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_TRIP_IMAGE;
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous slide">
        ‹
      </button>
      <button className="carousel-btn next" onClick={nextSlide} aria-label="Next slide">
        ›
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots" role="tablist" aria-label="Slide navigation">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
};

// Trip Card Component
const TripCard = ({ trip }) => {
  // Handle both formats: images array and single image fields
  const images = getTripImages(trip);
  
  // Handle title/name field
  const name = trip.name || trip.title;
  
  // Generate slug from title if not present
  const slug = trip.slug || name?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="trip-card">
      <ImageCarousel images={images} name={name} />
      <div className="trip-card-content">
        <span className="trip-tagline">{trip.tagline || trip.destination}</span>
        <h3 className="trip-name">{name}</h3>
        <p className="trip-description">{trip.description}</p>
        <div className="trip-meta">
          <span className="trip-packages-count">
            {trip.duration}
          </span>
        </div>
        <Link to={`/packages/${trip.id}`} className="trip-explore-btn">
          View Details →
        </Link>
      </div>
    </div>
  );
};

const TripPackages = () => {
  const { tripPackages, loading } = useSiteData();

  if (loading.tripPackages && tripPackages.length === 0) {
    return (
      <section className="trip-packages-page">
        <div className="trip-packages-hero">
          <h1>Trip Packages</h1>
          <p>Loading packages...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="trip-packages-page">
      {/* Hero Banner */}
      <div className="trip-packages-hero">
        <h1>Trip Packages</h1>
        <p>Discover amazing destinations with our curated travel packages</p>
      </div>

      {/* Trip Grid */}
      <div className="trip-packages-content">
        <div className="trip-grid">
          {tripPackages.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripPackages;
