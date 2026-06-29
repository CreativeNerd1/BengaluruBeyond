// Central static content for the public website.
// Edit this file to update text, links, testimonials, cars, and trip packages.

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

// Trip images - Mysore
import mysorePalaceImg from "../assets/trips/mysore/Mysore Palace.jpeg";
import chamundiTempleImg from "../assets/trips/mysore/Chamundi Temple.jpeg";
import srirangapatnaImg from "../assets/trips/mysore/Srirangapatna.jpeg";
import nimishambaTempleImg from "../assets/trips/mysore/Nimishamba Temple.jpeg";
import mysoreZooImg from "../assets/trips/mysore/Mysore Zoo.jpeg";
import brindavanGardensImg from "../assets/trips/mysore/Brindavan Gardens.jpeg";

// Trip images - Coorg
import goldenTempleImg from "../assets/trips/coorgmadikeri/Golden Temple.jpeg";
import nisargadhamaImg from "../assets/trips/coorgmadikeri/kaveri-nisargadhama-forest-park-coorg-tourism-holidays-closed-on-timings.jpg";
import dubareElephantImg from "../assets/trips/coorgmadikeri/dubare elephant camp.jpeg";
import rajaSeatImg from "../assets/trips/coorgmadikeri/Raja Seat.jpeg";
import omkareshwaraImg from "../assets/trips/coorgmadikeri/omkareshwara Temple Coorg.jpeg";
import bhagamandalaImg from "../assets/trips/coorgmadikeri/Bhagamandala.jpeg";
import talakaveriImg from "../assets/trips/coorgmadikeri/talakaveri.jpeg";
import abbeyFallsImg from "../assets/trips/coorgmadikeri/Abbe falls.jpeg";

// Trip images - Ooty & Coonoor
import doddabettaPeakImg from "../assets/trips/ootycoonor/Doddabetta peak.jpeg";
import muruganTempleImg from "../assets/trips/ootycoonor/Murugan Temple.jpeg";
import roseGardenImg from "../assets/trips/ootycoonor/Rose garden ooty.jpeg";
import karnatakaHorticultureImg from "../assets/trips/ootycoonor/Karnataka Siri Horticulture.jpeg";
import teaFactoryImg from "../assets/trips/ootycoonor/Doddabetta tea factory.jpeg";
import dolphinNoseImg from "../assets/trips/ootycoonor/Dolphin Nose Veiw Point.jpeg";
import lambsRockImg from "../assets/trips/ootycoonor/Lambs Rock.jpeg";
import simsParkImg from "../assets/trips/ootycoonor/Sims Park.jpeg";

// Trip images - Wayanad
import chembaraPeakImg from "../assets/trips/wayanad/Chembra Peak.jpeg";
import kandiGlassBridgeImg from "../assets/trips/wayanad/Kandi Glass Bridge.jpeg";
import soochipuraFallsImg from "../assets/trips/wayanad/Soochipura waterfalls.jpeg";
import banasuaraDamImg from "../assets/trips/wayanad/Banasura Sagar Dam.jpeg";
import edakkalCavesImg from "../assets/trips/wayanad/Edakkal Caves.jpeg";
import pookodeLakeImg from "../assets/trips/wayanad/Pookode Lake.jpeg";
import lakkidiViewImg from "../assets/trips/wayanad/Lakkidi View point.jpeg";

// Trip images - Tirupati
import kanipakamImg from "../assets/trips/tirupathi/Kanipakam Vinayaka temple.jpeg";
import kapilaTheerthamImg from "../assets/trips/tirupathi/kapila Theertham.jpeg";
import sriVariMettuImg from "../assets/trips/tirupathi/Sri vari mettilu.jpeg";
import padmavathiImg from "../assets/trips/tirupathi/Padmavathi temple.jpeg";
import govindarajaImg from "../assets/trips/tirupathi/Govindaraja Temple.jpeg";
import aleluMangapuramImg from "../assets/trips/tirupathi/Alamelu Mangapuram.jpeg";

export const siteInfo = {
  name: "Vrudhi Cabs",
  tagline: "Explore Beyond Boundaries",
  description:
    "Reliable city rides and curated outstation experiences with verified drivers and comfortable vehicles.",
  phone: "+91 63662 44686",
  email: "Vrudhicabs@gmail.com",
  address: {
    line1: "No 17, Parents Paradise, Mittiganahalli",
    line2: "Srinivasa Nagar Road",
    city: "Bangalore - 562149",
  },
  socialLinks: {
    whatsapp: "https://wa.me/916366244686",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    google: "https://maps.google.com/",
  },
};

export const googleRating = {
  score: 4.8,
  totalReviews: 256,
};

export const navLinks = [
  { id: 1, label: "Home", path: "/", icon: "🏠", children: [] },
  { id: 2, label: "Services", path: "/#services", icon: "🚗", children: [] },
  { id: 3, label: "Our Fleet", path: "/#cab-services", icon: "🚖", children: [] },
  { id: 4, label: "Trip Packages", path: "/#trip-packages", icon: "✈️", children: [] },
  { id: 5, label: "About", path: "/about", icon: "ℹ️", children: [] },
  { id: 6, label: "Contact", path: "/contact", icon: "📞", children: [] },
];

export const services = [
  {
    id: 1,
    title: "Local Cabs",
    description: "Comfortable city rides for commute, shopping, and meetings.",
    icon: "🚖",
    link: "/local-cabs",
  },
  {
    id: 2,
    title: "Airport Transfers",
    description: "On-time airport pickup and drop with 24/7 support.",
    icon: "✈️",
    link: "/airport-cabs",
  },
  {
    id: 3,
    title: "Outstation Trips",
    description: "Long-distance travel with experienced drivers.",
    icon: "🛣️",
    link: "/outstation-cabs",
  },
  {
    id: 4,
    title: "Trip Packages",
    description: "Handpicked destinations with complete itinerary support.",
    icon: "🗺️",
    link: "/packages",
  },
];

export const testimonials = [
  { id: 1, name: "Pawan S.", date: "2026-06-28", rating: 5, review: "Excellent service. Driver was professional and the car was clean.", avatar: "PS" },
  { id: 2, name: "Suyog T.", date: "2026-06-25", rating: 5, review: "Great support for our Ooty trip. Smooth experience throughout.", avatar: "ST" },
  { id: 3, name: "Abhinav K.", date: "2026-06-22", rating: 5, review: "Wonderful ride quality and timely pickup. Highly recommended.", avatar: "AK" },
  { id: 4, name: "Jayarama H.", date: "2026-06-18", rating: 5, review: "Mysore trip was very comfortable and stress-free.", avatar: "JH" },
  { id: 5, name: "Karan J.", date: "2026-06-15", rating: 5, review: "Family trip was managed well. Driver was courteous and helpful.", avatar: "KJ" },
  { id: 6, name: "Rohan R.", date: "2026-06-12", rating: 5, review: "Safe driving and excellent coordination from start to finish.", avatar: "RR" },
  { id: 7, name: "Meghana V.", date: "2026-06-08", rating: 5, review: "Airport pickup was punctual despite flight delay.", avatar: "MV" },
  { id: 8, name: "Arjun P.", date: "2026-05-30", rating: 5, review: "Perfect for a 3-day family trip. Clean vehicle and polite driver.", avatar: "AP" },
  { id: 9, name: "Nisha D.", date: "2026-05-25", rating: 5, review: "Quick response and smooth early-morning station transfer.", avatar: "ND" },
  { id: 10, name: "Vikram G.", date: "2026-05-20", rating: 5, review: "Great outstation experience and good route planning.", avatar: "VG" },
];

export const cars = [
  {
    id: 1,
    name: "Maruti Swift Dzire",
    type: "4+1 Seater",
    category: "4-seater",
    seatingCapacity: 5,
    capacity: "4+1",
    luggage: "2 Bags",
    fuelType: "Petrol/Diesel",
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    hasAC: true,
    ac: true,
    imageUrl: marutiSwiftDzireImg,
    images: [marutiSwiftDzireImg],
    features: ["AC", "Music System", "USB Charging", "GPS"],
    rating: 4.8,
    totalTrips: 1250,
    description: "Comfortable and fuel-efficient sedan for city rides and short trips.",
  },
  {
    id: 2,
    name: "Maruti Ciaz",
    type: "4+1 Seater",
    category: "4-seater",
    seatingCapacity: 5,
    capacity: "4+1",
    luggage: "2 Bags",
    fuelType: "Petrol/Diesel",
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    hasAC: true,
    ac: true,
    imageUrl: marutiCiazImg,
    images: [marutiCiazImg],
    features: ["AC", "Music System", "USB Charging", "Power Windows"],
    rating: 4.7,
    totalTrips: 980,
    description: "Spacious sedan with excellent legroom for long-distance travel.",
  },
  {
    id: 3,
    name: "Hyundai Xcent",
    type: "4+1 Seater",
    category: "4-seater",
    seatingCapacity: 5,
    capacity: "4+1",
    luggage: "2 Bags",
    fuelType: "Petrol/Diesel",
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    hasAC: true,
    ac: true,
    imageUrl: hyundaiXcentImg,
    images: [hyundaiXcentImg],
    features: ["AC", "Music System", "USB Charging", "Power Windows"],
    rating: 4.8,
    totalTrips: 850,
    description: "Compact sedan with great mileage and comfortable interiors.",
  },
  {
    id: 4,
    name: "Tata Tiago",
    type: "4+1 Seater",
    category: "4-seater",
    seatingCapacity: 5,
    capacity: "4+1",
    luggage: "2 Bags",
    fuelType: "Petrol/Diesel",
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    hasAC: true,
    ac: true,
    imageUrl: tataTiagoImg,
    images: [tataTiagoImg],
    features: ["AC", "Music System", "USB Charging"],
    rating: 4.7,
    totalTrips: 720,
    description: "Stylish hatchback with modern features for short trips.",
  },
  {
    id: 5,
    name: "Toyota Etios",
    type: "4+1 Seater",
    category: "4-seater",
    seatingCapacity: 5,
    capacity: "4+1",
    luggage: "2 Bags",
    fuelType: "Diesel",
    fuel: "Diesel",
    transmission: "Manual",
    hasAC: true,
    ac: true,
    imageUrl: toyotaEtiosImg,
    images: [toyotaEtiosImg],
    features: ["AC", "Music System", "USB Charging", "Power Windows"],
    rating: 4.8,
    totalTrips: 1100,
    description: "Reliable sedan with excellent boot space for outstation trips.",
  },
  {
    id: 6,
    name: "Maruti Ertiga",
    type: "6+1 Seater",
    category: "7-seater",
    seatingCapacity: 7,
    capacity: "6+1",
    luggage: "3 Bags",
    fuelType: "Petrol/Diesel",
    fuel: "Petrol/Diesel",
    transmission: "Manual",
    hasAC: true,
    ac: true,
    imageUrl: marutiErtigaImg,
    images: [marutiErtigaImg],
    features: ["AC", "Music System", "Rear AC", "Power Windows"],
    rating: 4.8,
    totalTrips: 950,
    description: "Versatile MPV perfect for family outings and group travel.",
  },
  {
    id: 7,
    name: "Toyota Innova",
    type: "7+1 Seater",
    category: "7-seater",
    seatingCapacity: 8,
    capacity: "7+1",
    luggage: "4 Bags",
    fuelType: "Diesel",
    fuel: "Diesel",
    transmission: "Manual",
    hasAC: true,
    ac: true,
    imageUrl: toyotaInnovaImg,
    images: [toyotaInnovaImg],
    features: ["AC", "Spacious Seating", "Rear AC", "GPS"],
    rating: 4.8,
    totalTrips: 1800,
    description: "Spacious and reliable SUV for family and group travel.",
  },
  {
    id: 8,
    name: "Toyota Innova Crysta",
    type: "7+1 Seater",
    category: "7-seater",
    seatingCapacity: 8,
    capacity: "7+1",
    luggage: "4 Bags",
    fuelType: "Diesel",
    fuel: "Diesel",
    transmission: "Automatic",
    hasAC: true,
    ac: true,
    imageUrl: toyotaInnovaCrystaImg,
    images: [toyotaInnovaCrystaImg],
    features: ["AC", "Captain Seats", "Rear AC", "Premium Audio"],
    rating: 4.9,
    totalTrips: 920,
    description: "Premium SUV with captain seats for comfortable family travel.",
  },
  {
    id: 9,
    name: "Toyota Innova Hycross",
    type: "7+1 Seater",
    category: "7-seater",
    seatingCapacity: 8,
    capacity: "7+1",
    luggage: "4 Bags",
    fuelType: "Hybrid",
    fuel: "Hybrid",
    transmission: "Automatic",
    hasAC: true,
    ac: true,
    imageUrl: toyotaInnovaHycrossImg,
    images: [toyotaInnovaHycrossImg],
    features: ["AC", "Captain Seats", "Panoramic Sunroof", "Wireless Charging"],
    rating: 4.9,
    totalTrips: 400,
    description: "Latest hybrid MPV with exceptional comfort and fuel efficiency.",
  },
  {
    id: 10,
    name: "Tempo Traveller",
    type: "12+1 Seater",
    category: "12-seater",
    seatingCapacity: 13,
    capacity: "12+1",
    luggage: "8 Bags",
    fuelType: "Diesel",
    fuel: "Diesel",
    transmission: "Manual",
    hasAC: true,
    ac: true,
    imageUrl: tempoTravellerImg,
    images: [tempoTravellerImg],
    features: ["AC", "Pushback Seats", "Music System", "Carrier on Top"],
    rating: 4.7,
    totalTrips: 450,
    description: "Best choice for larger groups and event travel.",
  },
];

export const tripPackages = [
  {
    id: 1,
    title: "Mysore Heritage",
    name: "Mysore Heritage",
    slug: "mysore-heritage",
    destination: "Mysore, Karnataka",
    duration: "1 Day",
    durationType: "Days",
    description: "Explore Srirangapatna, Chamundi Temple, Mysore Palace, and Brindavan Gardens.",
    tagline: "Royal heritage and iconic landmarks",
    imageUrl: mysorePalaceImg,
    images: [mysorePalaceImg, chamundiTempleImg, srirangapatnaImg, brindavanGardensImg],
    highlights: ["Srirangapatna", "Nimishamba Temple", "Chamundi Temple", "Mysuru Zoo", "Mysore Palace", "Brindavan Gardens"],
    placeImages: {
      "Srirangapatna": srirangapatnaImg,
      "Nimishamba Temple": nimishambaTempleImg,
      "Chamundi Temple": chamundiTempleImg,
      "Mysuru Zoo": mysoreZooImg,
      "Mysore Palace": mysorePalaceImg,
      "Brindavan Gardens": brindavanGardensImg,
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296514!2d76.49646052604736!3d12.311827428498068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf70381d572ef9%3A0x2b89ece8c0f8396d!2sMysuru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    inclusions: ["Vehicle", "Driver", "Toll & Parking"],
    exclusions: ["Entry Tickets", "Personal Expenses"],
    maxGroupSize: 10,
  },
  {
    id: 2,
    title: "Coorg / Madikeri",
    name: "Coorg / Madikeri",
    slug: "coorg",
    destination: "Coorg, Karnataka",
    duration: "2 Days",
    durationType: "Days",
    description: "Misty hills, temples, waterfalls, and elephant camp experiences.",
    tagline: "Scotland of India",
    imageUrl: rajaSeatImg,
    images: [rajaSeatImg, abbeyFallsImg, goldenTempleImg, dubareElephantImg],
    highlights: ["Golden Temple", "Nisargadhama", "Dubare Elephant Camp", "Raja's Seat", "Omkareshwara Temple", "Bhagamandala", "Talakaveri", "Abbey Falls"],
    placeImages: {
      "Golden Temple": goldenTempleImg,
      "Nisargadhama": nisargadhamaImg,
      "Dubare Elephant Camp": dubareElephantImg,
      "Raja's Seat": rajaSeatImg,
      "Omkareshwara Temple": omkareshwaraImg,
      "Bhagamandala": bhagamandalaImg,
      "Talakaveri": talakaveriImg,
      "Abbey Falls": abbeyFallsImg,
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296514!2d75.7!3d12.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5005dc1526985%3A0x66ad8b41aeac3354!2sCoorg%2C%20Kodagu%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    inclusions: ["Vehicle", "Driver", "Pickup & Drop"],
    exclusions: ["Food", "Entry Fees"],
    maxGroupSize: 10,
  },
  {
    id: 3,
    title: "Ooty & Coonoor",
    name: "Ooty & Coonoor",
    slug: "ooty-coonoor",
    destination: "Ooty & Coonoor, Tamil Nadu",
    duration: "2 Days",
    durationType: "Days",
    description: "Tea gardens, viewpoints, botanical gardens, and scenic hill station charm.",
    tagline: "Queen of Hill Stations",
    imageUrl: doddabettaPeakImg,
    images: [doddabettaPeakImg, roseGardenImg, dolphinNoseImg, lambsRockImg],
    highlights: ["Doddabetta Peak", "Murugan Temple", "Rose Garden", "Karnataka Siri Horticulture Garden", "Tea Factory", "Dolphin's Nose View Point", "Lamb's Rock", "Sims Park"],
    placeImages: {
      "Doddabetta Peak": doddabettaPeakImg,
      "Murugan Temple": muruganTempleImg,
      "Rose Garden": roseGardenImg,
      "Karnataka Siri Horticulture Garden": karnatakaHorticultureImg,
      "Tea Factory": teaFactoryImg,
      "Dolphin's Nose View Point": dolphinNoseImg,
      "Lamb's Rock": lambsRockImg,
      "Sims Park": simsParkImg,
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62588.39132741877!2d76.66!3d11.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8bd84b5f3d78d%3A0x179bdb14c93e3f42!2sOoty%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    inclusions: ["Vehicle", "Driver"],
    exclusions: ["Entry Tickets", "Personal Expenses"],
    maxGroupSize: 10,
  },
  {
    id: 4,
    title: "Wayanad",
    name: "Wayanad",
    slug: "wayanad",
    destination: "Wayanad, Kerala",
    duration: "2 Days",
    durationType: "Days",
    description: "Peaks, glass bridge, waterfalls, dam, caves, and lake exploration.",
    tagline: "Green Paradise of Kerala",
    imageUrl: chembaraPeakImg,
    images: [chembaraPeakImg, soochipuraFallsImg, banasuaraDamImg, pookodeLakeImg],
    highlights: ["Chembra Peak", "900 Kandi Glass Bridge", "Soochipara Waterfalls", "Banasura Sagar Dam", "Edakkal Caves", "Pookode Lake", "Lakkidi View Point"],
    placeImages: {
      "Chembra Peak": chembaraPeakImg,
      "900 Kandi Glass Bridge": kandiGlassBridgeImg,
      "Soochipara Waterfalls": soochipuraFallsImg,
      "Banasura Sagar Dam": banasuaraDamImg,
      "Edakkal Caves": edakkalCavesImg,
      "Pookode Lake": pookodeLakeImg,
      "Lakkidi View Point": lakkidiViewImg,
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245698.6219!2d75.78!3d11.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6121fae944a1f%3A0x13dce29ab5c8ec3!2sWayanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    inclusions: ["Vehicle", "Driver"],
    exclusions: ["Entry Fees", "Activity Charges"],
    maxGroupSize: 10,
  },
  {
    id: 5,
    title: "Tirupati",
    name: "Tirupati",
    slug: "tirupati",
    destination: "Tirupati, Andhra Pradesh",
    duration: "2 Days",
    durationType: "Days",
    description: "Divine journey to sacred temples and holy sites of Tirupati.",
    tagline: "Abode of Lord Venkateswara",
    imageUrl: kanipakamImg,
    images: [kanipakamImg, sriVariMettuImg, padmavathiImg, govindarajaImg],
    highlights: ["Kanipakam Vinayaka Temple", "Kapila Theertham", "Sri Vari Mettu", "Padmavathi Temple", "Govindaraja Swamy Temple", "Alamelu Mangapuram"],
    placeImages: {
      "Kanipakam Vinayaka Temple": kanipakamImg,
      "Kapila Theertham": kapilaTheerthamImg,
      "Sri Vari Mettu": sriVariMettuImg,
      "Padmavathi Temple": padmavathiImg,
      "Govindaraja Swamy Temple": govindarajaImg,
      "Alamelu Mangapuram": aleluMangapuramImg,
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124406.09!2d79.35!3d13.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb26373f7204721%3A0xd7b82c1064c02d6!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    inclusions: ["Vehicle", "Driver"],
    exclusions: ["Darshan Tickets", "Personal Expenses"],
    maxGroupSize: 10,
  },
];

const staticContent = {
  siteInfo,
  googleRating,
  navLinks,
  services,
  testimonials,
  tripPackages,
  cars,
};

export default staticContent;
