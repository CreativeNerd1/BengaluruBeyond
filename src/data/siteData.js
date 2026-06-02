// Static data for CabMitra-style website

export const siteInfo = {
  name: "CabMitra",
  tagline: "Where Journeys Begin",
  description:
    "Explore the vibrant city of Bengaluru with our reliable cab services, or embark on unforgettable outstation journeys with customizable trip packages",
  phone: "+91 9606919300",
  email: "info@cabmitra.com",
  address: {
    line1: "No 19, (Neralu), 11th cross",
    line2: "Lakshmaiah Block, Ganganagara",
    city: "Bengaluru - 560024",
  },
  socialLinks: {
    whatsapp: "https://wa.me/+919606919300",
    instagram: "https://www.instagram.com/cab_mitra/",
    youtube: "https://www.youtube.com/@cabmitra",
    google: "https://maps.app.goo.gl/kYVni73EEGRutGSQ6",
  },
};

export const services = [
  {
    id: 1,
    title: "Local Cabs",
    description: "Comfortable rides within the city for your daily commute",
    icon: "🚕",
    link: "/local-cabs",
  },
  {
    id: 2,
    title: "Airport Cabs",
    description: "Timely airport pickups and drops, 24/7 availability",
    icon: "✈️",
    link: "/airport-cabs",
  },
  {
    id: 3,
    title: "Outstation Cabs",
    description: "Travel beyond city limits with ease and comfort",
    icon: "🛣️",
    link: "/outstation-cabs",
  },
  {
    id: 4,
    title: "Trip Packages",
    description: "Curated travel packages for memorable experiences",
    icon: "🗺️",
    link: "/packages",
  },
];

export const tripPackages = [
  { id: 1, name: "Mysore & Ooty", link: "/mysore-ooty" },
  { id: 2, name: "Mysore", link: "/mysore" },
  { id: 3, name: "Kodaikanal", link: "/kodaikanal" },
  { id: 4, name: "Coorg, Wayanad & Ooty", link: "/coorg-wayanad-ooty" },
  { id: 5, name: "Coorg", link: "/coorg" },
  { id: 6, name: "Ooty", link: "/ooty" },
  { id: 7, name: "Chikmagalur", link: "/chikmagalur" },
];

export const testimonials = [
  {
    id: 1,
    name: "Pawan S.",
    date: "2024-09-03",
    rating: 5,
    review:
      "Excellent service! The driver was professional and the cab was very clean. Highly recommend for city travel.",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Suyog T.",
    date: "2024-09-02",
    rating: 5,
    review:
      "Booked for Ooty-Munnar trip. Great prices compared to others. Driver was flexible and helpful throughout the journey.",
    avatar: "ST",
  },
  {
    id: 3,
    name: "Abhinav K.",
    date: "2024-09-02",
    rating: 5,
    review:
      "Thanks for the wonderful cab service. Had a great experience and enjoyed our trip thoroughly!",
    avatar: "AK",
  },
  {
    id: 4,
    name: "Jayarama H.",
    date: "2024-09-01",
    rating: 5,
    review:
      "Fantastic experience visiting Mysore and Kabini. Smooth driving, clean car, and courteous driver. Highly recommended!",
    avatar: "JH",
  },
  {
    id: 5,
    name: "Karan J.",
    date: "2024-08-30",
    rating: 5,
    review:
      "5 nights 6 days trip to Mysuru and Coorg was amazing. Flexible driver, took us everywhere we wanted. Great service!",
    avatar: "KJ",
  },
  {
    id: 6,
    name: "Rohan R.",
    date: "2024-08-30",
    rating: 5,
    review:
      "Journey from Bangalore to Bandipur and Coorg was exceptional. Safe driving, professional service. Will book again!",
    avatar: "RR",
  },
];

export const googleRating = {
  score: 5.0,
  totalReviews: 245,
};

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { 
    name: "Services", 
    path: null,
    dropdown: [
      { name: "Local Cabs", path: "/local-cabs", icon: "🚕" },
      { name: "Airport Cabs", path: "/airport-cabs", icon: "✈️" },
      { name: "Outstation Cabs", path: "/outstation-cabs", icon: "🛣️" },
    ]
  },
  { name: "Trip Packages", path: "/packages" },
  { name: "Contact", path: "/contact" },
];
