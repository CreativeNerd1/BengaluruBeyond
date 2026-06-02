import { useState } from "react";
import { Link } from "react-router-dom";
import { tripDestinations } from "../../data/tripData";
import "./TripPackages.css";

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
            <img src={image} alt={`${name} - ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-btn prev" onClick={prevSlide}>
        ‹
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        ›
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Trip Card Component
const TripCard = ({ trip }) => {
  const lowestPrice = Math.min(...trip.packages.map((pkg) => pkg.price));

  return (
    <div className="trip-card">
      <ImageCarousel images={trip.images} name={trip.name} />
      <div className="trip-card-content">
        <span className="trip-tagline">{trip.tagline}</span>
        <h3 className="trip-name">{trip.name}</h3>
        <p className="trip-description">{trip.description}</p>
        <div className="trip-meta">
          <span className="trip-packages-count">
            {trip.packages.length} Package{trip.packages.length > 1 ? "s" : ""}
          </span>
          <span className="trip-price">From ₹{lowestPrice.toLocaleString()}</span>
        </div>
        <Link to={`/packages/${trip.slug}`} className="trip-explore-btn">
          Explore Packages →
        </Link>
      </div>
    </div>
  );
};

const TripPackages = () => {
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
          {tripDestinations.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripPackages;
