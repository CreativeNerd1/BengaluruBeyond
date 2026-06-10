import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "VrudhiCabs - Reliable Cab Booking Service in Bangalore",
  "/about": "About Us | VrudhiCabs - Trusted Since 2014",
  "/local-cabs": "Local Cabs in Bangalore | VrudhiCabs",
  "/airport-cabs": "Airport Cabs & Taxi Service | VrudhiCabs Bangalore",
  "/outstation-cabs": "Outstation Cabs from Bangalore | VrudhiCabs",
  "/packages": "Trip Packages - Mysore, Ooty, Coorg & More | VrudhiCabs",
  "/contact": "Contact VrudhiCabs | Book a Cab Now",
};

const pageDescriptions = {
  "/": "Book reliable cabs in Bangalore with VrudhiCabs. Local cabs, airport transfers, outstation trips & curated travel packages.",
  "/about": "Learn about VrudhiCabs - Bangalore's trusted cab service since 2014. 10+ years of experience with 50,000+ happy customers.",
  "/local-cabs": "Book reliable local cabs in Bangalore for shopping, commute, and city tours.",
  "/airport-cabs": "Reliable airport pickup and drop services in Bangalore. 24/7 availability, flight tracking, and punctual drivers.",
  "/outstation-cabs": "Plan your outstation trip from Bangalore with VrudhiCabs. Comfortable cars for Mysore, Ooty, Coorg, and more.",
  "/packages": "Explore curated trip packages from Bangalore to Mysore, Ooty, Coorg, Kodaikanal, and Wayanad.",
  "/contact": "Contact VrudhiCabs for cab bookings. Call +91 9606919300 or WhatsApp us.",
};

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    // Handle dynamic routes
    let title = pageTitles[path];
    let description = pageDescriptions[path];
    
    // Handle package detail pages
    if (path.startsWith("/packages/")) {
      const slug = path.split("/packages/")[1];
      const formattedName = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      title = `${formattedName} Trip Package | VrudhiCabs`;
      description = `Book your ${formattedName} trip package with VrudhiCabs. Includes accommodation, sightseeing, and comfortable travel.`;
    }

    // Default fallback
    if (!title) {
      title = "VrudhiCabs - Reliable Cab Booking Service";
    }
    if (!description) {
      description = "Book reliable cabs in Bangalore with VrudhiCabs.";
    }

    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDescription) ogDescription.setAttribute("content", description);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterTitle) twitterTitle.setAttribute("content", title);
    if (twitterDescription) twitterDescription.setAttribute("content", description);

  }, [location]);

  return null;
};

export default SEO;
