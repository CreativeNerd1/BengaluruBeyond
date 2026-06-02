import { useState } from "react";
import { useSiteData } from "../../context/SiteDataContext";
import { inquiriesApi } from "../../services/api";
import "./Contact.css";

const Contact = () => {
  const { siteInfo } = useSiteData();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await inquiriesApi.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        message: formData.message || null,
        source: "Contact",
      });

      if (result.success) {
        setSubmitted(true);
        // Reset form after submission
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-page">
      {/* Contact Hero Banner */}
      <div className="contact-hero">
        <h1>Contact</h1>
      </div>

      {/* Contact Content */}
      <div className="contact-content">
        <div className="contact-container">
          {/* Left Column - Contact Info */}
          <div className="contact-info">
            <h2>Get in Touch</h2>

            <div className="info-section">
              <h3>📞 Numbers</h3>
              <ul>
                <li>
                  <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
                </li>
              </ul>
            </div>

            <div className="info-section">
              <h3>✉️ Email</h3>
              <ul>
                <li>
                  <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
                </li>
              </ul>
            </div>

            <div className="info-section">
              <h3>🕐 Business Hours</h3>
              <ul>
                <li>Monday — Sunday (9AM - 8PM)</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>📍 Address</h3>
              <address>
                {siteInfo.address?.line1}
                <br />
                {siteInfo.address?.line2}
                <br />
                {siteInfo.address?.city}
                <br />
                <span className="landmark">
                  Landmark: Reva Independent PU College (Ganganagar)
                </span>
              </address>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Send Us a Message</h2>

            {submitted && (
              <div className="success-message">
                ✅ Thank you! Your message has been sent successfully. We will contact you shortly.
              </div>
            )}

            {error && (
              <div className="error-message">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8185147850974!2d77.57469731482222!3d12.983618990845168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sGanganagar%2C%20Bengaluru%2C%20Karnataka%20560024!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CabMitra Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
