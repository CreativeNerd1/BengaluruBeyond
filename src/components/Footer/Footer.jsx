import { Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import "./Footer.css";

// Helper function to generate service link from service data
const getServiceLink = (service) => {
  // If service has a custom link, use it (but make sure it's a valid route)
  if (service.link && !service.link.startsWith('/services/')) {
    return service.link;
  }
  
  // Generate link based on service title
  const title = (service.title || '').toLowerCase();
  if (title.includes('local')) return '/local-cabs';
  if (title.includes('airport')) return '/airport-cabs';
  if (title.includes('outstation')) return '/outstation-cabs';
  
  // Default: use the cab services with a generic type
  return '/local-cabs';
};

const Footer = () => {
  const { siteInfo, tripPackages, services } = useSiteData();
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
              {siteInfo.address?.line1 || ''}
              <br />
              {siteInfo.address?.line2 || ''}
              <br />
              {siteInfo.address?.city || ''}
            </p>
          </div>

          {/* Trip Packages */}
          <div className="footer-section">
            <h4 className="footer-title">Trip Packages</h4>
            <ul className="footer-links">
              {tripPackages.slice(0, 6).map((pkg) => (
                <li key={pkg.id}>
                  <Link to={`/packages/${pkg.id}`}>{pkg.title || pkg.name}</Link>
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
                  <Link to={getServiceLink(service)}>{service.title}</Link>
                </li>
              ))}
            </ul>
            <div className="footer-legal">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
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
                href={siteInfo.socialLinks?.google || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Google Maps"
              >
                📍
              </a>
              <a
                href={siteInfo.socialLinks?.whatsapp || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link whatsapp"
                aria-label="WhatsApp"
              >
                💬
              </a>
              <a
                href={siteInfo.socialLinks?.instagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href={siteInfo.socialLinks?.youtube || '#'}
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
          href={siteInfo.socialLinks?.whatsapp || '#'}
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
