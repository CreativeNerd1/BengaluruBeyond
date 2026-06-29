import { Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const { siteInfo } = useSiteData();
  const companyName = siteInfo?.name || "VrudhiCabs";

  return (
    <section className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-link">← Back to Home</Link>
        
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="legal-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              When you use {companyName} services, we may collect the following information:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Name, phone number, email address when you make a booking or inquiry</li>
              <li><strong>Trip Information:</strong> Pickup and drop locations, travel dates, and preferences</li>
              <li><strong>Device Information:</strong> Browser type, IP address for service improvement</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process and confirm your cab bookings</li>
              <li>Contact you regarding your trips and inquiries</li>
              <li>Send booking confirmations and trip updates</li>
              <li>Improve our services and user experience</li>
              <li>Respond to your questions and support requests</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul>
              <li><strong>Drivers:</strong> Necessary contact details to complete your trip</li>
              <li><strong>Legal Requirements:</strong> If required by law or legal process</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information 
              from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information we hold</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              We use cookies to improve your browsing experience and analyze website traffic. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li><strong>Phone:</strong> {siteInfo?.phone || "+91 63662 44686"}</li>
              <li><strong>Email:</strong> {siteInfo?.email || "Vrudhicabs@gmail.com"}</li>
            </ul>
          </section>

          <section>
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              significant changes by posting the new policy on this page.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
