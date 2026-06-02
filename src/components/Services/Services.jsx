import { Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import "./Services.css";

const Services = () => {
  const { services, loading } = useSiteData();

  if (loading.services && services.length === 0) {
    return (
      <section className="services" id="services">
        <div className="services-container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Choose from our wide range of cab services tailored to your needs
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <Link to={service.link || `/services/${service.id}`} className="service-link">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
