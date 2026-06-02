import { useSiteData } from "../../context/SiteDataContext";
import "./Testimonials.css";

const Testimonials = () => {
  const { testimonials, googleRating, loading } = useSiteData();

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (loading.testimonials && testimonials.length === 0) {
    return (
      <section className="testimonials" id="testimonials">
        <div className="testimonials-container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

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
          ))}
        </div>

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
