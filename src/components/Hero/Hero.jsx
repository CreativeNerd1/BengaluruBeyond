import { useSiteData } from "../../context/SiteDataContext";
import "./Hero.css";

const Hero = () => {
  const { siteInfo } = useSiteData();
  const whatsappBooking = `${siteInfo.socialLinks?.whatsapp || '#'}?text=I%20would%20like%20to%20book%20a%20cab`;

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-subtitle">{siteInfo.tagline}</p>
        <h1 className="hero-title">
          Your Trusted Travel Companion{" "}
          <span className="highlight">{siteInfo.name}!</span>
        </h1>
        <p className="hero-description">{siteInfo.description}</p>
        <div className="hero-buttons">
          <a
            href={whatsappBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span className="btn-icon">📱</span> Book Now
          </a>
          <a href={`tel:${siteInfo.phone}`} className="btn btn-secondary">
            <span className="btn-icon">📞</span> Call Now
          </a>
        </div>
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,94.17,208.18,70.28,googlea266.28,49.67,293.88,62,321.39,56.44Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
