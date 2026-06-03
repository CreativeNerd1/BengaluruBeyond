// Cab Services Data - Cars and Pricing

export const cars = [
  {
    id: 1,
    name: "Swift Dzire",
    type: "4 Seater",
    category: "4-seater",
    capacity: "4",
    luggage: "2 Large Bags",
    ac: true,
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    description: "Perfect for city rides and short trips. Comfortable, fuel-efficient, and reliable sedan for up to 4 passengers.",
    features: ["AC", "Music System", "USB Charging", "GPS Enabled", "First Aid Kit", "Sanitized"],
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    ],
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
    name: "Toyota Etios",
    type: "4 Seater",
    category: "4-seater",
    capacity: "4",
    luggage: "2 Large Bags",
    ac: true,
    fuel: "Diesel",
    transmission: "Manual",
    description: "Spacious sedan with excellent legroom and boot space. Ideal for comfortable long-distance travel.",
    features: ["AC", "Music System", "USB Charging", "Power Windows", "Central Locking", "Sanitized"],
    images: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    ],
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
    name: "Honda City",
    type: "5 Seater",
    category: "5-seater",
    capacity: "5",
    luggage: "2 Large Bags",
    ac: true,
    fuel: "Petrol",
    transmission: "Automatic",
    description: "Premium sedan offering luxury comfort with automatic transmission. Perfect for executive travel.",
    features: ["AC", "Premium Audio", "Leather Seats", "Sunroof", "Cruise Control", "Rear AC Vents", "Sanitized"],
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
    ],
    pricing: {
      local: { baseKm: 40, baseFare: 1200, extraKmRate: 18 },
      airport: { oneway: 1800, roundTrip: 3000 },
      outstation: { perKm: 16, minKmPerDay: 300, driverAllowance: 500 },
    },
    rating: 4.9,
    totalTrips: 650,
  },
  {
    id: 4,
    name: "Toyota Innova",
    type: "7 Seater",
    category: "7-seater",
    capacity: "7",
    luggage: "4 Large Bags",
    ac: true,
    fuel: "Diesel",
    transmission: "Manual",
    description: "Spacious SUV perfect for family trips and group travel. Comfortable seating for 7 passengers with ample luggage space.",
    features: ["AC", "Music System", "USB Charging", "Power Windows", "Rear AC", "Spacious Boot", "Sanitized"],
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      "https://images.unsplash.com/photo-1568844293986-8c67e98c3cf7?w=800",
    ],
    pricing: {
      local: { baseKm: 40, baseFare: 1400, extraKmRate: 20 },
      airport: { oneway: 2000, roundTrip: 3500 },
      outstation: { perKm: 16, minKmPerDay: 300, driverAllowance: 400 },
    },
    rating: 4.8,
    totalTrips: 1800,
  },
  {
    id: 5,
    name: "Innova Crysta",
    type: "7 Seater",
    category: "7-seater",
    capacity: "7",
    luggage: "4 Large Bags",
    ac: true,
    fuel: "Diesel",
    transmission: "Automatic",
    description: "Premium luxury SUV with captain seats and advanced features. The ultimate choice for comfortable family travel.",
    features: ["AC", "Premium Audio", "Captain Seats", "Ambient Lighting", "Dual Zone AC", "Rear Entertainment", "Sanitized"],
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800",
    ],
    pricing: {
      local: { baseKm: 40, baseFare: 1800, extraKmRate: 25 },
      airport: { oneway: 2500, roundTrip: 4500 },
      outstation: { perKm: 20, minKmPerDay: 300, driverAllowance: 500 },
    },
    rating: 4.9,
    totalTrips: 920,
  },
  {
    id: 6,
    name: "Tempo Traveller",
    type: "12 Seater",
    category: "12-seater",
    capacity: "12",
    luggage: "8 Large Bags",
    ac: true,
    fuel: "Diesel",
    transmission: "Manual",
    description: "Ideal for large groups and corporate events. Spacious seating with pushback seats for long comfortable journeys.",
    features: ["AC", "Music System", "Pushback Seats", "Carrier on Top", "First Aid Kit", "GPS Enabled", "Sanitized"],
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800",
    ],
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
