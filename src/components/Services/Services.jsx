import { Link } from "react-router-dom";
import { services } from "../../data/siteData";
import "./Services.css";

const Services = () => {
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
              <Link to={service.link} className="service-link">
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
