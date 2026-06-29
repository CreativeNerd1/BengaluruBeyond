// Cab Services Data - Cars and Pricing

import marutiSwiftDzireImg from "../assets/cars/maruthiswiftdzire.webp";
import marutiCiazImg from "../assets/cars/maruthiciaz.jpeg";
import hyundaiXcentImg from "../assets/cars/hyundai-xcent.jpeg";
import tataTiagoImg from "../assets/cars/tigor.avif";
import toyotaEtiosImg from "../assets/cars/etios.jpeg";
import marutiErtigaImg from "../assets/cars/maruthiertiga.jpg";
import toyotaInnovaImg from "../assets/cars/toyotoinnova.avif";
import toyotaInnovaCrystaImg from "../assets/cars/toyota-innova-crysta.jpeg";
import toyotaInnovaHycrossImg from "../assets/cars/innovohycross.avif";
import tempoTravellerImg from "../assets/cars/tempo-traveller.jpeg";

export const cars = [
  {
    id: 1,
    name: "Maruti Swift Dzire",
    type: "4+1 Seater",
    category: "4-seater",
    capacity: "4+1",
    luggage: "2 Large Bags",
    ac: true,
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    description: "Perfect for city rides and short trips. Comfortable, fuel-efficient, and reliable sedan for up to 4 passengers.",
    features: ["AC", "Music System", "USB Charging", "GPS Enabled", "First Aid Kit", "Sanitized"],
    images: [marutiSwiftDzireImg],
    pricing: {
      local: { baseKm: 40, baseFare: 800, extraKmRate: 14 },
      airport: { oneway: 1200, roundTrip: 2000 },
      outstation: { perKm: 12, minKmPerDay: 300, driverAllowance: 400 },
    },
    rating: 4.8,
    totalTrips: 1250,
  },
  {
    id: 2,
    name: "Maruti Ciaz",
    type: "4+1 Seater",
    category: "4-seater",
    capacity: "4+1",
    luggage: "2 Large Bags",
    ac: true,
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    description: "Spacious sedan with excellent legroom and boot space. Ideal for comfortable long-distance travel.",
    features: ["AC", "Music System", "USB Charging", "Power Windows", "Central Locking", "Sanitized"],
    images: [marutiCiazImg],
    pricing: {
      local: { baseKm: 40, baseFare: 850, extraKmRate: 15 },
      airport: { oneway: 1300, roundTrip: 2200 },
      outstation: { perKm: 13, minKmPerDay: 300, driverAllowance: 400 },
    },
    rating: 4.7,
    totalTrips: 980,
  },
  {
    id: 3,
    name: "Hyundai Xcent",
    type: "4+1 Seater",
    category: "4-seater",
    capacity: "4+1",
    luggage: "2 Large Bags",
    ac: true,
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    description: "Compact sedan with great mileage and comfortable interiors. Perfect for daily commutes and city travel.",
    features: ["AC", "Music System", "USB Charging", "Power Windows", "Central Locking", "Sanitized"],
    images: [hyundaiXcentImg],
    pricing: {
      local: { baseKm: 40, baseFare: 800, extraKmRate: 14 },
      airport: { oneway: 1200, roundTrip: 2000 },
      outstation: { perKm: 12, minKmPerDay: 300, driverAllowance: 400 },
    },
    rating: 4.8,
    totalTrips: 850,
  },
  {
    id: 4,
    name: "Tata Tiago",
    type: "4+1 Seater",
    category: "4-seater",
    capacity: "4+1",
    luggage: "2 Large Bags",
    ac: true,
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    description: "Stylish and comfortable hatchback with modern features. Great for short trips and city rides.",
    features: ["AC", "Music System", "USB Charging", "Power Windows", "Sanitized"],
    images: [tataTiagoImg],
    pricing: {
      local: { baseKm: 40, baseFare: 750, extraKmRate: 13 },
      airport: { oneway: 1100, roundTrip: 1900 },
      outstation: { perKm: 11, minKmPerDay: 300, driverAllowance: 400 },
    },
    rating: 4.7,
    totalTrips: 720,
  },
  {
    id: 5,
    name: "Toyota Etios",
    type: "4+1 Seater",
    category: "4-seater",
    capacity: "4+1",
    luggage: "2 Large Bags",
    ac: true,
    fuel: "Diesel",
    transmission: "Manual",
    description: "Reliable and spacious sedan with excellent boot space. Ideal for outstation trips and airport transfers.",
    features: ["AC", "Music System", "USB Charging", "Power Windows", "Central Locking", "Sanitized"],
    images: [toyotaEtiosImg],
    pricing: {
      local: { baseKm: 40, baseFare: 850, extraKmRate: 15 },
      airport: { oneway: 1300, roundTrip: 2200 },
      outstation: { perKm: 13, minKmPerDay: 300, driverAllowance: 400 },
    },
    rating: 4.8,
    totalTrips: 1100,
  },
  {
    id: 6,
    name: "Maruti Ertiga",
    type: "6+1 Seater",
    category: "7-seater",
    capacity: "6+1",
    luggage: "3 Large Bags",
    ac: true,
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    description: "Versatile MPV perfect for family outings. Comfortable seating for 7 with good luggage space.",
    features: ["AC", "Music System", "USB Charging", "Power Windows", "Rear AC", "Sanitized"],
    images: [marutiErtigaImg],
    pricing: {
      local: { baseKm: 40, baseFare: 1200, extraKmRate: 18 },
      airport: { oneway: 1800, roundTrip: 3000 },
      outstation: { perKm: 15, minKmPerDay: 300, driverAllowance: 400 },
    },
    rating: 4.8,
    totalTrips: 950,
  },
  {
    id: 7,
    name: "Toyota Innova",
    type: "7+1 Seater",
    category: "7-seater",
    capacity: "7+1",
    luggage: "4 Large Bags",
    ac: true,
    fuel: "Diesel",
    transmission: "Manual",
    description: "Spacious and reliable SUV perfect for family trips and group travel. Comfortable seating with ample luggage space.",
    features: ["AC", "Music System", "USB Charging", "Power Windows", "Rear AC", "Spacious Boot", "Sanitized"],
    images: [toyotaInnovaImg],
    pricing: {
      local: { baseKm: 40, baseFare: 1400, extraKmRate: 20 },
      airport: { oneway: 2000, roundTrip: 3500 },
      outstation: { perKm: 16, minKmPerDay: 300, driverAllowance: 400 },
    },
    rating: 4.8,
    totalTrips: 1800,
  },
  {
    id: 8,
    name: "Toyota Innova Crysta",
    type: "7+1 Seater",
    category: "7-seater",
    capacity: "7+1",
    luggage: "4 Large Bags",
    ac: true,
    fuel: "Diesel",
    transmission: "Automatic",
    description: "Premium luxury SUV with captain seats and advanced features. The ultimate choice for comfortable family travel.",
    features: ["AC", "Premium Audio", "Captain Seats", "Ambient Lighting", "Dual Zone AC", "Rear Entertainment", "Sanitized"],
    images: [toyotaInnovaCrystaImg],
    pricing: {
      local: { baseKm: 40, baseFare: 1800, extraKmRate: 25 },
      airport: { oneway: 2500, roundTrip: 4500 },
      outstation: { perKm: 20, minKmPerDay: 300, driverAllowance: 500 },
    },
    rating: 4.9,
    totalTrips: 920,
  },
  {
    id: 9,
    name: "Toyota Innova Hycross",
    type: "7+1 Seater",
    category: "7-seater",
    capacity: "7+1",
    luggage: "4 Large Bags",
    ac: true,
    fuel: "Hybrid",
    transmission: "Automatic",
    description: "Latest hybrid MPV with exceptional fuel efficiency and premium comfort. Best-in-class ride quality for long journeys.",
    features: ["AC", "Premium Audio", "Captain Seats", "Panoramic Sunroof", "Dual Zone AC", "Wireless Charging", "Sanitized"],
    images: [toyotaInnovaHycrossImg],
    pricing: {
      local: { baseKm: 40, baseFare: 2000, extraKmRate: 28 },
      airport: { oneway: 2800, roundTrip: 5000 },
      outstation: { perKm: 22, minKmPerDay: 300, driverAllowance: 500 },
    },
    rating: 4.9,
    totalTrips: 400,
  },
  {
    id: 10,
    name: "Tempo Traveller",
    type: "12+1 Seater",
    category: "12-seater",
    capacity: "12+1",
    luggage: "8 Large Bags",
    ac: true,
    fuel: "Diesel",
    transmission: "Manual",
    description: "Ideal for large groups and corporate events. Spacious seating with pushback seats for long comfortable journeys.",
    features: ["AC", "Music System", "Pushback Seats", "Carrier on Top", "First Aid Kit", "GPS Enabled", "Sanitized"],
    images: [tempoTravellerImg],
    pricing: {
      local: { baseKm: 40, baseFare: 3500, extraKmRate: 35 },
      airport: { oneway: 4500, roundTrip: 8000 },
      outstation: { perKm: 28, minKmPerDay: 300, driverAllowance: 600 },
    },
    rating: 4.7,
    totalTrips: 450,
  },
];

export const serviceTypes = {
  local: {
    title: "Local Cabs",
    slug: "local-cabs",
    tagline: "City Rides Made Easy",
    description: "Comfortable rides within the city for your daily commute, shopping trips, or meetings. Available in multiple car options to suit your needs.",
    heroImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200",
    features: [
      { icon: "⏱️", title: "Hourly Packages", desc: "Flexible 4hr, 8hr, 12hr packages" },
      { icon: "📍", title: "Multiple Stops", desc: "Make stops anywhere in the city" },
      { icon: "💳", title: "Easy Payments", desc: "Cash, UPI, or Card payments" },
      { icon: "🛡️", title: "Safe Rides", desc: "Verified drivers & sanitized cars" },
    ],
    pricingNote: "Base fare includes first 40 km. Extra km charged as per rate.",
  },
  airport: {
    title: "Airport Cabs",
    slug: "airport-cabs",
    tagline: "Never Miss a Flight",
    description: "Reliable airport pickup and drop services available 24/7. Track your flight and we'll be there on time, every time.",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    features: [
      { icon: "✈️", title: "Flight Tracking", desc: "We track your flight for delays" },
      { icon: "🕐", title: "24/7 Service", desc: "Available round the clock" },
      { icon: "🧳", title: "Meet & Greet", desc: "Driver waits with name board" },
      { icon: "⏰", title: "Free Waiting", desc: "45 min free waiting time" },
    ],
    pricingNote: "Toll and parking charges extra. Night charges (11PM-5AM) +20%.",
  },
  outstation: {
    title: "Outstation Cabs",
    slug: "outstation-cabs",
    tagline: "Journey Beyond the City",
    description: "Explore destinations beyond Bangalore with our comfortable outstation cab services. One-way, round trip, and multi-day packages available.",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200",
    features: [
      { icon: "🗺️", title: "One-way & Round", desc: "Flexible trip options" },
      { icon: "🏨", title: "Multi-day Trips", desc: "Perfect for holidays" },
      { icon: "👨‍✈️", title: "Expert Drivers", desc: "Know all the routes" },
      { icon: "🔄", title: "Unlimited Stops", desc: "Stop wherever you want" },
    ],
    pricingNote: "Toll, parking, state permit extra. Driver allowance included for overnight trips.",
  },
};

export const getCarsByCategory = (category) => {
  if (category === "all") return cars;
  return cars.filter((car) => car.category === category);
};

export const getCarById = (id) => {
  return cars.find((car) => car.id === id);
};

export const getDriverById = (id) => {
  return drivers.find((driver) => driver.id === id);
};
