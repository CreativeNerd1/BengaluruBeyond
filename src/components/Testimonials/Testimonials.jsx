import { useEffect, useMemo, useState } from "react";
import { useSiteData } from "../../context/SiteDataContext";
import "./Testimonials.css";

const Testimonials = () => {
  const { testimonials, googleRating, loading } = useSiteData();
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStartIndex = useMemo(
    () => Math.max(0, testimonials.length - visibleCount),
    [testimonials.length, visibleCount]
  );

  useEffect(() => {
    setStartIndex((prev) => Math.min(prev, maxStartIndex));
  }, [maxStartIndex]);

  useEffect(() => {
    if (isPaused || testimonials.length <= visibleCount) {
      return;
    }

    const timer = window.setInterval(() => {
      setStartIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, testimonials.length, visibleCount, maxStartIndex]);

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const slidePrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const slideNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            {loading.testimonials && testimonials.length === 0
              ? "Loading testimonials..."
              : "Read reviews from our happy travelers"}
          </p>
        </div>

        {testimonials.length > 0 && (
          <div
            className="testimonials-slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <button
              className="slider-btn"
              onClick={slidePrevious}
              disabled={startIndex === 0}
              aria-label="Previous testimonials"
            >
              ‹
            </button>

            <div className="testimonials-viewport">
              <div
                className="testimonials-track"
                style={{
                  transform: `translateX(-${(100 / visibleCount) * startIndex}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="testimonial-card"
                    style={{ flex: `0 0 ${100 / visibleCount}%` }}
                  >
                    <div className="testimonial-card-inner">
                      <div className="testimonial-header">
                        <div className="testimonial-avatar">{testimonial.avatar || testimonial.name?.slice(0, 2).toUpperCase()}</div>
                        <div className="testimonial-info">
                          <h4 className="testimonial-name">{testimonial.name}</h4>
                          <span className="testimonial-date">{testimonial.date}</span>
                        </div>
                      </div>
                      <div className="testimonial-rating">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="testimonial-text">{testimonial.review || testimonial.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="slider-btn"
              onClick={slideNext}
              disabled={startIndex >= maxStartIndex}
              aria-label="Next testimonials"
            >
              ›
            </button>
          </div>
        )}

        <div className="google-rating">
          <div className="rating-badge">
            <span className="rating-icon">G</span>
            <div className="rating-content">
              <div className="rating-score">
                <strong>{googleRating?.score || googleRating?.rating || 5.0}</strong> / 5
              </div>
              <div className="rating-reviews">
                Based on <strong>{googleRating?.totalReviews || 100}</strong> reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
