import { testimonials, googleRating } from "../../data/siteData";
import "./Testimonials.css";

const Testimonials = () => {
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Read reviews from our happy travelers
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <span className="testimonial-date">{testimonial.date}</span>
                </div>
              </div>
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-text">{testimonial.review}</p>
            </div>
          ))}
        </div>

        <div className="google-rating">
          <div className="rating-badge">
            <span className="rating-icon">G</span>
            <div className="rating-content">
              <div className="rating-score">
                <strong>{googleRating.score}</strong> / 5
              </div>
              <div className="rating-reviews">
                Based on <strong>{googleRating.totalReviews}</strong> reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
