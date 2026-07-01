import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://www.vrudhicabs.in";

const pageTitles = {
  "/": "Vrudhi Cabs - Best Cab Service in Bangalore | Taxi Booking, Airport Cabs & Outstation Trips",
  "/about": "About Vrudhi Cabs | Bangalore's Most Trusted Cab & Taxi Service Since 2020",
  "/local-cabs": "Local Cabs in Bangalore | Affordable Hourly & Full Day Cab Service | Vrudhi Cabs",
  "/airport-cabs": "Airport Taxi Bangalore | 24/7 Pickup & Drop at Kempegowda Airport | Vrudhi Cabs",
  "/outstation-cabs": "Outstation Cabs from Bangalore | One Way Cab to Mysore, Ooty, Coorg | Vrudhi Cabs",
  "/packages": "Trip Packages from Bangalore - Mysore, Ooty, Coorg, Wayanad, Tirupati | Affordable Rates | Vrudhi Cabs",
  "/contact": "Contact Vrudhi Cabs | Book a Cab in Bangalore Online | Call +91 63662 44686",
  "/privacy-policy": "Privacy Policy | Vrudhi Cabs - Cab Service Bangalore",
  "/terms": "Terms & Conditions | Vrudhi Cabs - Cab Service Bangalore",
};

const pageDescriptions = {
  "/": "Vrudhi Cabs - Bangalore's best & most affordable cab service. Book reliable cabs for local city rides, airport pickup & drop, outstation trips to Mysore, Coorg, Ooty. 24/7 online cab booking with safe, verified drivers. Call +91 63662 44686.",
  "/about": "Vrudhi Cabs is Bangalore's trusted & reliable cab service since 2020. Professional verified drivers, clean well-maintained vehicles, and 24/7 customer support for local, airport, and outstation travel across Karnataka.",
  "/local-cabs": "Book affordable local cabs in Bangalore for daily commute, shopping, hospital visits, city tours. Hourly & full day cab packages with well-maintained sedans, Innovas & SUVs. Safe taxi service available 24/7. Best cab service near me.",
  "/airport-cabs": "Reliable & cheap airport taxi at Kempegowda International Airport Bangalore. 24/7 airport pickup and drop service with flight tracking, on-time guarantee, 45 min free waiting. Best airport cab service in Bangalore.",
  "/outstation-cabs": "Best outstation cabs from Bangalore. One way & round trip cabs to Mysore (₹4,500), Ooty (₹9,500), Coorg (₹7,500), Wayanad (₹8,500), Tirupati (₹8,000). Experienced drivers, comfortable sedans & Innovas.",
  "/packages": "Explore affordable trip packages from Bangalore. Mysore 1-day, Ooty 2-day, Coorg 2-day, Wayanad 2-day, and Tirupati 2-day packages with driver and vehicle included. Best outstation travel packages.",
  "/contact": "Contact Vrudhi Cabs for cab bookings in Bangalore. Phone: +91 63662 44686. WhatsApp booking available. Office: Mittiganahalli, Srinivasa Nagar Road, Bangalore 562149. Best cab service in Bangalore.",
  "/privacy-policy": "Privacy policy for Vrudhi Cabs - Bangalore's trusted cab booking service.",
  "/terms": "Terms and conditions for using Vrudhi Cabs cab and taxi services in Bangalore.",
};

const pageKeywords = {
  "/": "best cab service in Bangalore, best taxi service in Bangalore, cab service Bangalore, taxi service Bangalore, Bangalore cabs, cab booking Bangalore, online cab booking Bangalore, affordable cab service Bangalore, reliable cab service Bangalore, trusted cab service Bangalore, safe taxi Bangalore, 24 hour cab service Bangalore, cheap cab Bangalore, vrudhi cabs",
  "/local-cabs": "local cab Bangalore, hourly cab Bangalore, full day cab Bangalore, city cab Bangalore, cab near me Bangalore, local taxi service Bangalore, cab for shopping Bangalore, daily commute cab Bangalore, affordable local cab Bangalore",
  "/airport-cabs": "airport taxi Bangalore, Bangalore airport cab, airport pickup Bangalore, airport drop taxi Bangalore, Kempegowda airport taxi, cheap airport cab Bangalore, 24/7 airport taxi, airport transfer Bangalore, flight pickup taxi Bangalore",
  "/outstation-cabs": "outstation cabs Bangalore, one way cab Bangalore, Bangalore to Mysore cab, Bangalore to Coorg cab, Bangalore to Ooty taxi, Bangalore to Wayanad cab, Bangalore to Tirupati cab, round trip cab Bangalore, outstation taxi Bangalore",
  "/packages": "Bangalore trip packages, Mysore trip from Bangalore, Coorg trip package, Ooty trip from Bangalore, Wayanad trip package, Tirupati trip from Bangalore, weekend trip from Bangalore, holiday packages Bangalore",
  "/about": "about vrudhi cabs, trusted cab service Bangalore, reliable taxi Bangalore, safe cab service Bangalore, best cab company Bangalore",
  "/contact": "contact vrudhi cabs, book cab Bangalore, cab booking phone number Bangalore, cab service contact Bangalore",
};

const tripPageMeta = {
  "1": { title: "Bangalore to Mysore Cab | 1-Day Trip Package ₹4,500 | Vrudhi Cabs", description: "Book Bangalore to Mysore cab - 1 day trip covering Srirangapatna, Chamundi Temple, Mysore Palace & Brindavan Gardens. Sedan ₹4,500, Innova ₹7,000. Best Mysore trip from Bangalore. Call +91 63662 44686.", keywords: "Bangalore to Mysore cab, Mysore trip from Bangalore, Mysore day trip, Mysore cab booking, Mysore Palace trip, cheap Mysore cab" },
  "2": { title: "Bangalore to Coorg Cab | 2-Day Trip Package ₹7,500 | Vrudhi Cabs", description: "Book Bangalore to Coorg cab - 2 day trip covering Golden Temple, Abbey Falls, Dubare Elephant Camp, Raja's Seat & more. Sedan ₹7,500, Innova ₹11,000. Best Coorg trip from Bangalore.", keywords: "Bangalore to Coorg cab, Coorg trip from Bangalore, Madikeri trip, Coorg cab booking, Coorg weekend trip, cheap Coorg cab" },
  "3": { title: "Bangalore to Ooty Cab | 2-Day Trip Package ₹9,500 | Vrudhi Cabs", description: "Book Bangalore to Ooty taxi - 2 day trip covering Doddabetta Peak, Rose Garden, Tea Factory, Dolphin's Nose & more. Sedan ₹9,500, Innova ₹13,500. Best Ooty trip from Bangalore.", keywords: "Bangalore to Ooty taxi, Bangalore to Ooty cab, Ooty trip from Bangalore, Coonoor trip, Ooty cab booking, cheap Ooty cab" },
  "4": { title: "Bangalore to Wayanad Cab | 2-Day Trip Package ₹8,500 | Vrudhi Cabs", description: "Book Bangalore to Wayanad cab - 2 day trip covering Chembra Peak, Glass Bridge, Waterfalls, Edakkal Caves & Pookode Lake. Sedan ₹8,500, Innova ₹12,500. Best Wayanad trip from Bangalore.", keywords: "Bangalore to Wayanad cab, Wayanad trip from Bangalore, Wayanad weekend trip, Wayanad cab booking, cheap Wayanad cab" },
  "5": { title: "Bangalore to Tirupati Cab | 2-Day Trip Package ₹8,000 | Vrudhi Cabs", description: "Book Bangalore to Tirupati cab - 2 day trip covering Kanipakam, Sri Vari Mettu, Padmavathi Temple & more. Sedan ₹8,000, Innova ₹12,000. Best Tirupati trip from Bangalore.", keywords: "Bangalore to Tirupati cab, Tirupati trip from Bangalore, Tirupati cab booking, Tirumala trip, cheap Tirupati cab" },
};

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    let title = pageTitles[path];
    let description = pageDescriptions[path];
    let keywords = pageKeywords[path];
    
    // Handle package detail pages
    if (path.startsWith("/packages/")) {
      const id = path.split("/packages/")[1];
      if (tripPageMeta[id]) {
        title = tripPageMeta[id].title;
        description = tripPageMeta[id].description;
        keywords = tripPageMeta[id].keywords;
      } else {
        const formattedName = id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        title = `Bangalore to ${formattedName} Cab | Trip Package | Vrudhi Cabs`;
        description = `Book Bangalore to ${formattedName} cab with Vrudhi Cabs. Affordable trip package with comfortable vehicles and experienced drivers. Best ${formattedName} trip from Bangalore.`;
        keywords = `Bangalore to ${formattedName} cab, ${formattedName} trip from Bangalore, ${formattedName} cab booking`;
      }
    }

    // Default fallback
    if (!title) {
      title = "Vrudhi Cabs - Best Cab Service in Bangalore | Taxi Booking 24/7";
    }
    if (!description) {
      description = "Vrudhi Cabs - Bangalore's best & most affordable cab service. Book reliable cabs for local, airport, and outstation trips. Call +91 63662 44686.";
    }
    if (!keywords) {
      keywords = "cab service Bangalore, taxi service Bangalore, Bangalore cabs, cab booking Bangalore, vrudhi cabs";
    }

    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    }

    // Update/create canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${path === "/" ? "/" : path}`);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDescription) ogDescription.setAttribute("content", description);
    if (ogUrl) ogUrl.setAttribute("content", `${BASE_URL}${path}`);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterTitle) twitterTitle.setAttribute("content", title);
    if (twitterDescription) twitterDescription.setAttribute("content", description);
    if (twitterUrl) twitterUrl.setAttribute("content", `${BASE_URL}${path}`);

  }, [location]);

  return null;
};

export default SEO;
