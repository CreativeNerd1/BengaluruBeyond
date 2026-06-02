import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-container">
        <div className="error-illustration">
          <span className="error-icon">🚖</span>
          <div className="error-code">404</div>
        </div>
        
        <h1>Oops! Wrong Route</h1>
        <p>
          Looks like this road doesn't exist. Don't worry, even the best drivers 
          take wrong turns sometimes!
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            🏠 Back to Home
          </Link>
          <Link to="/contact" className="btn-secondary">
            📞 Contact Us
          </Link>
        </div>

        <div className="quick-links">
          <h3>Popular Destinations</h3>
          <div className="links-grid">
            <Link to="/local-cabs">Local Cabs</Link>
            <Link to="/airport-cabs">Airport Cabs</Link>
            <Link to="/outstation-cabs">Outstation Cabs</Link>
            <Link to="/packages">Trip Packages</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
