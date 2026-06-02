// Trip Packages Data with images and detailed itineraries

export const tripDestinations = [
  {
    id: 1,
    slug: "chikmagalur",
    name: "Chikmagalur",
    tagline: "Coffee Land of Karnataka",
    description: "Experience the misty hills, lush coffee plantations, and breathtaking waterfalls of Chikmagalur.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    ],
    packages: [
      {
        id: 1,
        name: "Chikmagalur Sedan Package 2 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 8800,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore at 6:00 AM → Bellur → Halebeedu → Belavadi → Hirekolale Lake",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Check out from Hotel → Mullayanagiri → Sitalayyanagiri → Jhari Waterfall / Butter Milk Falls → Datta Peeta / Baba Budan Giri → Drop back to Bangalore by 10:00 PM",
          },
        ],
      },
      {
        id: 2,
        name: "Chikmagalur Sedan Package 3 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 13200,
        duration: "3 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore at 6:00 AM → Bellur → Halebeedu → Belavadi → Hirekolale Lake",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Mullayanagiri → Sitalayyanagiri → Jhari Waterfall / Butter Milk Falls → Datta Peeta / Baba Budan Giri",
          },
          {
            day: 3,
            title: "Day 3",
            activities: "Check out from Hotel → Deviramma Temple → Kalhatti Falls → Hebbe Waterfalls → Z Point → Drop back to Bangalore by 10:00 PM",
          },
        ],
      },
      {
        id: 3,
        name: "Chikmagalur Innova Package 2 Days",
        vehicleType: "Innova",
        vehicleIcon: "🚐",
        price: 11800,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore at 6:00 AM → Bellur → Halebeedu → Belavadi → Hirekolale Lake",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Check out from Hotel → Mullayanagiri → Sitalayyanagiri → Jhari Waterfall / Butter Milk Falls → Datta Peeta / Baba Budan Giri → Drop back to Bangalore by 10:00 PM",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "coorg",
    name: "Coorg",
    tagline: "Scotland of India",
    description: "Discover the enchanting beauty of Coorg with its misty landscapes, spice plantations, and rich culture.",
    images: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
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
            activities: "Pick up from Bangalore → Mysore Road → Kushalnagar → Nisargadhama → Dubare Elephant Camp → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Abbey Falls → Raja's Seat → Madikeri Fort → Omkareshwara Temple → Drop back to Bangalore",
          },
        ],
      },
      {
        id: 2,
        name: "Coorg Innova Package 3 Days",
        vehicleType: "Innova",
        vehicleIcon: "🚐",
        price: 15000,
        duration: "3 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Nisargadhama → Golden Temple → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Abbey Falls → Raja's Seat → Madikeri Fort → Mandalpatti View Point",
          },
          {
            day: 3,
            title: "Day 3",
            activities: "Dubare Elephant Camp → Talacauvery → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "ooty",
    name: "Ooty",
    tagline: "Queen of Hill Stations",
    description: "Experience the timeless charm of Ooty with its colonial architecture, tea gardens, and scenic beauty.",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800",
    ],
    packages: [
      {
        id: 1,
        name: "Ooty Sedan Package 2 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 9500,
        duration: "2 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Bandipur Forest → Ooty Lake → Botanical Garden → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Doddabetta Peak → Tea Factory → Rose Garden → Pykara Falls → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "mysore",
    name: "Mysore",
    tagline: "City of Palaces",
    description: "Explore the royal heritage of Mysore with its magnificent palace, gardens, and rich history.",
    images: [
      "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
    ],
    packages: [
      {
        id: 1,
        name: "Mysore Day Trip",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 4500,
        duration: "1 Day",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Mysore Palace → Chamundi Hills → Brindavan Gardens → Drop back to Bangalore",
          },
        ],
      },
      {
        id: 2,
        name: "Mysore & Ooty Combo 3 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 12500,
        duration: "3 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Mysore Palace → Chamundi Hills → Hotel Check-in Mysore",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Brindavan Gardens → Drive to Ooty → Ooty Lake → Hotel Check-in Ooty",
          },
          {
            day: 3,
            title: "Day 3",
            activities: "Doddabetta → Botanical Garden → Tea Factory → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "kodaikanal",
    name: "Kodaikanal",
    tagline: "Princess of Hill Stations",
    description: "Discover the serene beauty of Kodaikanal with its misty hills, pristine lakes, and lush forests.",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
    ],
    packages: [
      {
        id: 1,
        name: "Kodaikanal Sedan Package 3 Days",
        vehicleType: "Sedan",
        vehicleIcon: "🚗",
        price: 14000,
        duration: "3 Days",
        itinerary: [
          {
            day: 1,
            title: "Day 1",
            activities: "Pick up from Bangalore → Drive to Kodaikanal → Hotel Check-in → Evening walk at Coaker's Walk",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Kodaikanal Lake → Bryant Park → Pillar Rocks → Green Valley View → Pine Forest",
          },
          {
            day: 3,
            title: "Day 3",
            activities: "Silver Cascade Falls → Bear Shola Falls → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "wayanad",
    name: "Wayanad",
    tagline: "Green Paradise of Kerala",
    description: "Immerse yourself in the natural beauty of Wayanad with its wildlife, waterfalls, and ancient caves.",
    images: [
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
      "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
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
            activities: "Pick up from Bangalore → Sultan Bathery → Edakkal Caves → Wayanad Wildlife Sanctuary → Hotel Check-in",
          },
          {
            day: 2,
            title: "Day 2",
            activities: "Soochipara Falls → Banasura Sagar Dam → Pookode Lake → Drop back to Bangalore",
          },
        ],
      },
    ],
  },
];

export const getTripBySlug = (slug) => {
  return tripDestinations.find((trip) => trip.slug === slug);
};
