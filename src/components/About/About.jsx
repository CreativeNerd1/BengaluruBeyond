import { useSiteData } from "../../context/SiteDataContext";
import "./About.css";

const About = () => {
  const { siteInfo } = useSiteData();
  
  const whyChooseUs = [
    {
      id: 1,
      icon: "🚗",
      title: "Quality Vehicles",
      description:
        "We offer a fleet of well-maintained and reliable vehicles to suit your preferences and ensure a comfortable ride.",
    },
    {
      id: 2,
      icon: "🎯",
      title: "Personalized Packages",
      description:
        "We understand that every traveler is unique. That's why we provide personalized trip packages to cater to your individual interests and preferences.",
    },
    {
      id: 3,
      icon: "💬",
      title: "Customer Service",
      description:
        "Our commitment to excellent customer service sets us apart. We are here to assist you at every step, from booking to the end of your trip.",
    },
    {
      id: 4,
      icon: "🧩",
      title: "Flexible Travel Plans",
      description:
        "From quick city rides to weekend getaways, our services adapt to your schedule and travel goals.",
    },
    {
      id: 5,
      icon: "✅",
      title: "Reliability",
      description:
        "You can trust us to deliver on our promises. We take pride in our reliability and strive to exceed your expectations.",
    },
  ];

  return (
    <section className="about-page">
      {/* About Hero Banner */}
      <div className="about-hero">
        <h1>About Vrudhi Cabs – Bangalore's Trusted Cab Service</h1>
      </div>

      {/* About Content */}
      <div className="about-content">
        {/* Established Section */}
        <div className="established-section">
          <h2>Best Cab Service in Bangalore Since 2020</h2>
          <div className="established-badge">
            <span className="years">6+</span>
            <span className="label">Years of Excellence</span>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <p className="welcome-text">
            Welcome to Vrudhi Cabs – Bangalore's most reliable and affordable cab service! 
            Whether you need a <strong>local cab in Bangalore</strong> for daily commute, an <strong>airport taxi</strong> for 
            Kempegowda International Airport pickup or drop, or an <strong>outstation cab</strong> for trips to 
            Mysore, Coorg, Ooty, Wayanad, or Tirupati – we're here to make your travel experience 
            seamless, safe, and comfortable. As a <strong>trusted taxi service in Bangalore</strong>, we've 
            been serving thousands of happy customers with <strong>24-hour cab service</strong> since 2020.
          </p>
        </div>

        {/* Our Expertise Section */}
        <div className="expertise-section">
          <h2>Our Expertise – Why We're the Best Cab Service in Bangalore</h2>
          <p>
            With over 6 years of experience as a leading <strong>cab service in Bangalore</strong>, we have 
            perfected our services to provide top-notch local cabs, airport transfers, and outstation trips. 
            Whether you're planning a family vacation, a romantic getaway, or a
            business trip, we have the expertise to tailor our services to your
            specific needs. Our team is passionate about travel and dedicated to
            ensuring that every aspect of your journey is enjoyable and
            stress-free.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            {whyChooseUs.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Section */}
        <div className="closing-section">
          <p>
            Thank you for considering us for your travel needs. We look forward
            to being a part of your journey and creating lasting memories for
            you and your loved ones. If you have any questions or special
            requests, feel free to contact us. We look forward to serving you!
          </p>
        </div>

        {/* Founder Section */}
        <div className="founder-section">
          <div className="founder-card">
            <div className="founder-avatar">MH</div>
            <div className="founder-info">
              <h3>Naveen Kumar N</h3>
              <p>Founder & CEO</p>
            </div>
          </div>
          <p className="founder-address">
            {siteInfo.address?.line1}, {siteInfo.address?.line2},{" "}
            {siteInfo.address?.city}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
