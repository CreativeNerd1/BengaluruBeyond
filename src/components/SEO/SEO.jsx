import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "CabMitra - Reliable Cab Booking Service in Bangalore",
  "/about": "About Us | CabMitra - Trusted Since 2014",
  "/local-cabs": "Local Cabs in Bangalore | CabMitra",
  "/airport-cabs": "Airport Cabs & Taxi Service | CabMitra Bangalore",
  "/outstation-cabs": "Outstation Cabs from Bangalore | CabMitra",
  "/packages": "Trip Packages - Mysore, Ooty, Coorg & More | CabMitra",
  "/contact": "Contact CabMitra | Book a Cab Now",
};

const pageDescriptions = {
  "/": "Book reliable cabs in Bangalore with CabMitra. Local cabs, airport transfers, outstation trips & curated travel packages.",
  "/about": "Learn about CabMitra - Bangalore's trusted cab service since 2014. 10+ years of experience with 50,000+ happy customers.",
  "/local-cabs": "Book affordable local cabs in Bangalore for shopping, commute, or city tours. Starting from ₹800 for 40 km.",
  "/airport-cabs": "Reliable airport pickup and drop services in Bangalore. 24/7 availability, flight tracking, and punctual drivers.",
  "/outstation-cabs": "Plan your outstation trip from Bangalore with CabMitra. Comfortable cars for Mysore, Ooty, Coorg, and more.",
  "/packages": "Explore curated trip packages from Bangalore to Mysore, Ooty, Coorg, Kodaikanal, and Wayanad.",
  "/contact": "Contact CabMitra for cab bookings. Call +91 9606919300 or WhatsApp us.",
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
      title = `${formattedName} Trip Package | CabMitra`;
      description = `Book your ${formattedName} trip package with CabMitra. Includes accommodation, sightseeing, and comfortable travel.`;
    }

    // Default fallback
    if (!title) {
      title = "CabMitra - Reliable Cab Booking Service";
    }
    if (!description) {
      description = "Book reliable cabs in Bangalore with CabMitra.";
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
