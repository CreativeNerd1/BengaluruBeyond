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
            d="M0,96L40,101.3C80,107,160,117,240,112C320,107,400,85,480,80C560,75,640,85,720,96C800,107,880,117,960,112C1040,107,1120,85,1160,74.7L1200,64V120H1160C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120H0Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
