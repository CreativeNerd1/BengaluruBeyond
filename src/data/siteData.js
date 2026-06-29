// Static data for VrudhiCabs website

export const siteInfo = {
  name: "Vrudhi Cabs",
  tagline: "Where Journeys Begin",
  description:
    "Explore the vibrant city of Bengaluru with our reliable cab services, or embark on unforgettable outstation journeys with customizable trip packages",
  phone: "+91 63662 44686",
  email: "Vrudhicabs@gmail.com",
  address: {
    line1: "No 17, Parents Paradise, Mittiganahalli",
    line2: "Srinivasa Nagar Road",
    city: "Bangalore - 562149",
  },
  socialLinks: {
    whatsapp: "https://wa.me/+916366244686",
    instagram: "https://www.instagram.com/vrudhicabs/",
    youtube: "https://www.youtube.com/@vrudhicabs",
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
  { id: 1, name: "Mysore Heritage", link: "/mysore-heritage" },
  { id: 2, name: "Coorg / Madikeri", link: "/coorg" },
  { id: 3, name: "Ooty & Coonoor", link: "/ooty-coonoor" },
  { id: 4, name: "Wayanad", link: "/wayanad" },
  { id: 5, name: "Tirupati", link: "/tirupati" },
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
  {
    id: 7,
    name: "Meghana V.",
    date: "2024-08-28",
    rating: 5,
    review:
      "Airport pickup was right on time even with a delayed flight. Very polite driver and smooth ride home.",
    avatar: "MV",
  },
  {
    id: 8,
    name: "Arjun P.",
    date: "2024-08-27",
    rating: 5,
    review:
      "Used their service for a 3-day Coorg trip with family. Car was clean, driver was patient, and pricing was transparent.",
    avatar: "AP",
  },
  {
    id: 9,
    name: "Nisha D.",
    date: "2024-08-25",
    rating: 5,
    review:
      "Booked for an early morning drop to the railway station. Reached before time and the support team was very responsive.",
    avatar: "ND",
  },
  {
    id: 10,
    name: "Vikram G.",
    date: "2024-08-24",
    rating: 5,
    review:
      "Great outstation experience to Coorg. Safe driving in ghat roads and helpful recommendations for stops.",
    avatar: "VG",
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
