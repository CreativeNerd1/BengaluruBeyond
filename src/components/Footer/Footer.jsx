import { siteInfo, tripPackages, services } from "../../data/siteData";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand & Address */}
          <div className="footer-section">
            <div className="footer-brand">
              <span className="footer-logo-icon">🚖</span>
              <span className="footer-logo-text">{siteInfo.name}</span>
            </div>
            <p className="footer-address">
              {siteInfo.address.line1}
              <br />
              {siteInfo.address.line2}
              <br />
              {siteInfo.address.city}
            </p>
          </div>

          {/* Trip Packages */}
          <div className="footer-section">
            <h4 className="footer-title">Trip Packages</h4>
            <ul className="footer-links">
              {tripPackages.map((pkg) => (
                <li key={pkg.id}>
                  <a href={pkg.link}>{pkg.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cab Services */}
          <div className="footer-section">
            <h4 className="footer-title">Cab Services</h4>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={service.link}>{service.title}</a>
                </li>
              ))}
            </ul>
            <div className="footer-legal">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms">Terms & Conditions</a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-contact">
              <p>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
              </p>
            </div>
            <div className="footer-social">
              <a
                href={siteInfo.socialLinks.google}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Google Maps"
              >
                📍
              </a>
              <a
                href={siteInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link whatsapp"
                aria-label="WhatsApp"
              >
                💬
              </a>
              <a
                href={siteInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href={siteInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                🎬
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {siteInfo.name} | All Rights Reserved
          </p>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <a
          href={`tel:${siteInfo.phone}`}
          className="floating-btn phone-btn"
          aria-label="Call us"
        >
          📞
        </a>
        <a
          href={siteInfo.socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn whatsapp-btn"
          aria-label="WhatsApp"
        >
          💬
        </a>
      </div>
    </footer>
  );
};

export default Footer;
