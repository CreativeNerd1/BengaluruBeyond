// Trip Packages Data with images and detailed itineraries

export const tripDestinations = [
  {
    id: 1,
    slug: "mysore-heritage",
    name: "Mysore Heritage",
    tagline: "City of Palaces",
    description: "Explore the royal heritage of Mysore with its magnificent palace, temples, and beautiful gardens.",
    images: [
      "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
    ],
    places: [
      "Srirangapatna",
      "Nimishamba Temple",
      "Chamundi Temple",
      "Mysuru Zoo",
      "Mysore Palace",
      "Brindavan Gardens",
    ],
    packages: [
      {
        id: 1,
        name: "Mysore Heritage Sedan Package",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 4500,
        duration: "1 Day",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Srirangapatna → Nimishamba Temple → Chamundi Temple → Mysuru Zoo → Mysore Palace → Brindavan Gardens → Drop back to Bangalore",
          },
        ],
      },
      {
        id: 2,
        name: "Mysore Heritage Innova Package",
        vehicleType: "Innova",
        vehicleIcon: "🚐",
        price: 7000,
        duration: "1 Day",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Srirangapatna → Nimishamba Temple → Chamundi Temple → Mysuru Zoo → Mysore Palace → Brindavan Gardens → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "coorg",
    name: "Coorg / Madikeri",
    tagline: "Scotland of India",
    description: "Discover the enchanting beauty of Coorg with its misty landscapes, temples, waterfalls, and rich culture.",
    images: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
    ],
    places: [
      "Golden Temple",
      "Nisargadhama",
      "Dubare Elephant Camp",
      "Raja's Seat",
      "Omkareshwara Temple",
      "Bhagamandala",
      "Talakaveri",
      "Abbey Falls",
    ],
    packages: [
      {
        id: 1,
        name: "Coorg Sedan Package 2 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 7500,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Golden Temple → Nisargadhama → Dubare Elephant Camp → Raja's Seat → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Omkareshwara Temple → Bhagamandala → Talakaveri → Abbey Falls → Drop back to Bangalore",
          },
        ],
      },
      {
        id: 2,
        name: "Coorg Innova Package 2 Days",
        vehicleType: "Innova",
        vehicleIcon: "🚐",
        price: 11000,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Golden Temple → Nisargadhama → Dubare Elephant Camp → Raja's Seat → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Omkareshwara Temple → Bhagamandala → Talakaveri → Abbey Falls → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "ooty-coonoor",
    name: "Ooty & Coonoor",
    tagline: "Queen of Hill Stations",
    description: "Experience the timeless charm of Ooty and Coonoor with scenic viewpoints, gardens, and tea estates.",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800",
    ],
    places: [
      "Doddabetta Peak",
      "Murugan Temple",
      "Rose Garden",
      "Government Botanical Garden",
      "Karnataka Siri Horticulture Garden",
      "Doddabetta",
      "Tea Factory",
      "Dolphin's Nose View Point",
      "Lamb's Rock",
      "Sims Park",
    ],
    packages: [
      {
        id: 1,
        name: "Ooty & Coonoor Sedan Package 2 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 9500,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1 - Ooty",
            activities: "Pick up from Bangalore → Doddabetta Peak → Murugan Temple → Rose Garden → Government Botanical Garden → Karnataka Siri Horticulture Garden → Tea Factory → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2 - Coonoor",
            activities: "Dolphin's Nose View Point → Lamb's Rock → Sims Park → Drop back to Bangalore",
          },
        ],
      },
      {
        id: 2,
        name: "Ooty & Coonoor Innova Package 2 Days",
        vehicleType: "Innova",
        vehicleIcon: "🚐",
        price: 13500,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1 - Ooty",
            activities: "Pick up from Bangalore → Doddabetta Peak → Murugan Temple → Rose Garden → Government Botanical Garden → Karnataka Siri Horticulture Garden → Tea Factory → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2 - Coonoor",
            activities: "Dolphin's Nose View Point → Lamb's Rock → Sims Park → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "wayanad",
    name: "Wayanad",
    tagline: "Green Paradise of Kerala",
    description: "Immerse yourself in the natural beauty of Wayanad with its peaks, waterfalls, lakes, and ancient caves.",
    images: [
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
      "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    ],
    places: [
      "Chembra Peak",
      "900 Kandi Glass Bridge",
      "Soochipara Waterfalls",
      "Banasura Sagar Dam",
      "Edakkal Caves",
      "Pookode Lake",
      "Lakkidi View Point",
    ],
    packages: [
      {
        id: 1,
        name: "Wayanad Sedan Package 2 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 8500,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Lakkidi View Point → Chembra Peak → 900 Kandi Glass Bridge → Soochipara Waterfalls → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Banasura Sagar Dam → Edakkal Caves → Pookode Lake → Drop back to Bangalore",
          },
        ],
      },
      {
        id: 2,
        name: "Wayanad Innova Package 2 Days",
        vehicleType: "Innova",
        vehicleIcon: "🚐",
        price: 12500,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Lakkidi View Point → Chembra Peak → 900 Kandi Glass Bridge → Soochipara Waterfalls → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Banasura Sagar Dam → Edakkal Caves → Pookode Lake → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "tirupati",
    name: "Tirupati",
    tagline: "Abode of Lord Venkateswara",
    description: "Experience the divine journey to Tirupati with visits to sacred temples and holy sites.",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
      "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800",
    ],
    places: [
      "Kanipakam Vinayaka Temple",
      "Kapila Theertham",
      "Sri Vari Mettu",
      "Padmavathi Temple",
      "Govindaraja Swamy Temple",
      "Alamelu Mangapuram",
    ],
    packages: [
      {
        id: 1,
        name: "Tirupati Sedan Package 2 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 8000,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Kanipakam Vinayaka Temple → Kapila Theertham → Sri Vari Mettu → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Padmavathi Temple → Govindaraja Swamy Temple → Alamelu Mangapuram → Drop back to Bangalore",
          },
        ],
      },
      {
        id: 2,
        name: "Tirupati Innova Package 2 Days",
        vehicleType: "Innova",
        vehicleIcon: "🚐",
        price: 12000,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Kanipakam Vinayaka Temple → Kapila Theertham → Sri Vari Mettu → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Padmavathi Temple → Govindaraja Swamy Temple → Alamelu Mangapuram → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
];

export const getTripBySlug = (slug) => {
  return tripDestinations.find((trip) => trip.slug === slug);
};
