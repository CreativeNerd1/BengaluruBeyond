import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://vrudhicabs.in";

const pageTitles = {
  "/": "Vrudhi Cabs - Reliable Cab Booking Service in Bangalore | Local, Airport & Outstation",
  "/about": "About Vrudhi Cabs | Bangalore's Trusted Cab & Travel Service Since 2019",
  "/local-cabs": "Local Cabs in Bangalore | Affordable City Rides | Vrudhi Cabs",
  "/airport-cabs": "Airport Taxi Bangalore | 24/7 Pickup & Drop | Vrudhi Cabs",
  "/outstation-cabs": "Outstation Cabs from Bangalore | Mysore, Ooty, Coorg Trips | Vrudhi Cabs",
  "/packages": "Trip Packages from Bangalore - Mysore, Ooty, Coorg, Wayanad, Tirupati | Vrudhi Cabs",
  "/contact": "Contact Vrudhi Cabs | Book a Cab in Bangalore | +91 63662 44686",
  "/privacy-policy": "Privacy Policy | Vrudhi Cabs",
  "/terms": "Terms & Conditions | Vrudhi Cabs",
};

const pageDescriptions = {
  "/": "Book reliable cabs in Bangalore with Vrudhi Cabs. Local city rides, airport transfers, outstation trips & curated travel packages to Mysore, Ooty, Coorg. Call +91 63662 44686.",
  "/about": "Vrudhi Cabs is Bangalore's trusted cab service since 2019. Professional drivers, clean vehicles, and 24/7 support for local, airport, and outstation travel.",
  "/local-cabs": "Book affordable local cabs in Bangalore for daily commute, shopping, hospital visits, and city tours. Well-maintained sedans and SUVs available 24/7.",
  "/airport-cabs": "Reliable airport pickup and drop services at Kempegowda International Airport, Bangalore. Flight tracking, on-time guarantee, and comfortable vehicles.",
  "/outstation-cabs": "Plan outstation trips from Bangalore with experienced drivers. Sedan & Innova available for Mysore (₹4,500), Ooty (₹9,500), Coorg (₹7,500), and more.",
  "/packages": "Explore curated trip packages from Bangalore. Mysore 1-day, Ooty 2-day, Coorg 2-day, Wayanad 2-day, and Tirupati 2-day packages with driver and vehicle included.",
  "/contact": "Contact Vrudhi Cabs for cab bookings in Bangalore. Phone: +91 63662 44686. WhatsApp available. Office: Mittiganahalli, Srinivasa Nagar Road, Bangalore - 562149.",
  "/privacy-policy": "Privacy policy for Vrudhi Cabs cab booking service in Bangalore.",
  "/terms": "Terms and conditions for using Vrudhi Cabs cab services in Bangalore.",
};

const tripPageMeta = {
  "1": { title: "Mysore Heritage Trip Package | 1-Day Sedan & Innova | Vrudhi Cabs", description: "Book Mysore day trip from Bangalore. Visit Srirangapatna, Chamundi Temple, Mysore Palace & Brindavan Gardens. Sedan ₹4,500, Innova ₹7,000. Call +91 63662 44686." },
  "2": { title: "Coorg / Madikeri Trip Package | 2-Day Nature Tour | Vrudhi Cabs", description: "Explore Coorg from Bangalore - 2 days covering Golden Temple, Abbey Falls, Dubare Elephant Camp, Raja's Seat & more. Sedan ₹7,500, Innova ₹11,000." },
  "3": { title: "Ooty & Coonoor Trip Package | 2-Day Hill Station Tour | Vrudhi Cabs", description: "Ooty & Coonoor 2-day trip from Bangalore. Doddabetta Peak, Rose Garden, Tea Factory, Dolphin's Nose & more. Sedan ₹9,500, Innova ₹13,500." },
  "4": { title: "Wayanad Trip Package | 2-Day Kerala Adventure | Vrudhi Cabs", description: "Wayanad 2-day trip from Bangalore. Chembra Peak, Glass Bridge, Waterfalls, Edakkal Caves & Pookode Lake. Sedan ₹8,500, Innova ₹12,500." },
  "5": { title: "Tirupati Trip Package | 2-Day Pilgrimage Tour | Vrudhi Cabs", description: "Tirupati temple trip from Bangalore. 2 days covering Kanipakam, Sri Vari Mettu, Padmavathi Temple & more. Sedan ₹8,000, Innova ₹12,000." },
};

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    let title = pageTitles[path];
    let description = pageDescriptions[path];
    
    // Handle package detail pages
    if (path.startsWith("/packages/")) {
      const id = path.split("/packages/")[1];
      if (tripPageMeta[id]) {
        title = tripPageMeta[id].title;
        description = tripPageMeta[id].description;
      } else {
        const formattedName = id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        title = `${formattedName} Trip Package | Vrudhi Cabs Bangalore`;
        description = `Book your ${formattedName} trip package from Bangalore with Vrudhi Cabs. Comfortable vehicles and experienced drivers.`;
      }
    }

    // Default fallback
    if (!title) {
      title = "Vrudhi Cabs - Reliable Cab Booking Service in Bangalore";
    }
    if (!description) {
      description = "Book reliable cabs in Bangalore with Vrudhi Cabs. Local, airport, and outstation trips.";
    }

    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update/create canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${path}`);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDescription) ogDescription.setAttribute("content", description);
    if (ogUrl) ogUrl.setAttribute("content", `${BASE_URL}${path}`);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterTitle) twitterTitle.setAttribute("content", title);
    if (twitterDescription) twitterDescription.setAttribute("content", description);
    if (twitterUrl) twitterUrl.setAttribute("content", `${BASE_URL}${path}`);

  }, [location]);

  return null;
};

export default SEO;
