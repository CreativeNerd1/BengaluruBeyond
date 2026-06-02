import { Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import "../PrivacyPolicy/PrivacyPolicy.css"; // Reuse legal page styles

const Terms = () => {
  const { siteInfo } = useSiteData();
  const companyName = siteInfo?.name || "CabMitra";

  return (
    <section className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-link">← Back to Home</Link>
        
        <h1>Terms & Conditions</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using {companyName} services, you agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>2. Booking & Reservations</h2>
            <ul>
              <li>All bookings are subject to vehicle availability</li>
              <li>Booking confirmation will be sent via phone/WhatsApp/email</li>
              <li>Accurate pickup/drop details must be provided at booking time</li>
              <li>Changes to bookings should be communicated at least 4 hours in advance</li>
            </ul>
          </section>

          <section>
            <h2>3. Pricing & Payment</h2>
            <ul>
              <li>Prices are inclusive of base fare, driver allowance, and toll charges as mentioned</li>
              <li>Additional charges may apply for extra kilometers, waiting time, or night driving</li>
              <li>Parking fees at tourist spots are to be paid by the customer</li>
              <li>Payment can be made via cash, UPI, or online transfer</li>
              <li>For outstation trips, advance payment may be required</li>
            </ul>
          </section>

          <section>
            <h2>4. Cancellation Policy</h2>
            <ul>
              <li>Free cancellation up to 24 hours before trip</li>
              <li>50% charge for cancellation within 24 hours</li>
              <li>No refund for no-shows or last-minute cancellations</li>
              <li>Refunds will be processed within 5-7 business days</li>
            </ul>
          </section>

          <section>
            <h2>5. Passenger Responsibilities</h2>
            <ul>
              <li>Be ready at the pickup location on time</li>
              <li>Maintain cleanliness in the vehicle</li>
              <li>No smoking or alcohol consumption inside the vehicle</li>
              <li>Maximum passenger capacity as per vehicle type must be followed</li>
              <li>Luggage should be within reasonable limits</li>
            </ul>
          </section>

          <section>
            <h2>6. Driver & Vehicle</h2>
            <ul>
              <li>All drivers are verified and experienced professionals</li>
              <li>Vehicles are well-maintained and cleaned before each trip</li>
              <li>AC will be operational during the trip (weather permitting)</li>
              <li>Driver's decision on route and safety matters is final</li>
            </ul>
          </section>

          <section>
            <h2>7. Outstation Trip Terms</h2>
            <ul>
              <li>One day is counted as 24 hours from pickup time</li>
              <li>Minimum 250 km per day is charged for outstation trips</li>
              <li>Driver's food and accommodation arranged by customer OR driver bata included</li>
              <li>Night driving charges may apply between 10 PM - 6 AM</li>
            </ul>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              {companyName} strives to provide safe and reliable service. However, we are not liable for:
            </p>
            <ul>
              <li>Delays due to traffic, weather, or unforeseen circumstances</li>
              <li>Loss or damage to personal belongings left in the vehicle</li>
              <li>Issues arising from incorrect information provided by customer</li>
            </ul>
          </section>

          <section>
            <h2>9. Disputes</h2>
            <p>
              Any disputes shall be subject to the jurisdiction of Bengaluru courts. 
              We encourage customers to contact us first for amicable resolution.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              For any questions or concerns regarding these terms, please contact us:
            </p>
            <ul>
              <li><strong>Phone:</strong> {siteInfo?.phone || "+91 9606919300"}</li>
              <li><strong>Email:</strong> {siteInfo?.email || "info@cabmitra.com"}</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Terms;
