export type OfferType = "tours" | "excursions" | "activities" | "packages" | "best-offers"

export interface Offer {
  id: string
  type: OfferType
  title: string
  description: string
  mainImage: string
  thumbnailImages: string[]
  video?: string
  includedItems: string[]
  excludedItems: string[]
  priceAdult: number
  priceChild: number
  availabilityDates: {
    startDate: string
    endDate: string
  }
}

// Tours offers
export const toursOffers: Offer[] = [
  {
    id: "tour-001",
    type: "tours",
    title: "Medina Guided Walking Tour",
    description:
      "Explore the historic medina of Marrakesh with an expert guide. Discover hidden souks, traditional riads, and historical landmarks.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Professional guide", "Water & snacks", "City map", "Hotel pickup/dropoff"],
    excludedItems: ["Meals", "Shopping items", "Personal expenses"],
    priceAdult: 45,
    priceChild: 25,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "tour-002",
    type: "tours",
    title: "Palaces & Gardens Evening Tour",
    description:
      "Experience the stunning Bahia Palace and Majorelle Gardens in the golden evening light. Perfect for photography enthusiasts.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Skip-the-line tickets", "Professional guide", "Transport", "Refreshments"],
    excludedItems: ["Meals", "Souvenir purchases"],
    priceAdult: 65,
    priceChild: 40,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "tour-003",
    type: "tours",
    title: "Atlas Mountains Day Excursion",
    description:
      "Journey to the majestic Atlas Mountains, visit Berber villages, and enjoy traditional Moroccan tea with mountain views.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Hotel pickup/dropoff", "Professional guide", "Lunch", "Tea ceremony", "Transport"],
    excludedItems: ["Personal shopping", "Additional activities"],
    priceAdult: 85,
    priceChild: 55,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "tour-004",
    type: "tours",
    title: "Old Casbah & Jewish Quarter Tour",
    description:
      "Discover the rich cultural heritage of Marrakesh through this comprehensive tour of historical quarters and architectural gems.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Guided tour", "Local insights", "Transport", "Water"],
    excludedItems: ["Meals", "Museum fees"],
    priceAdult: 55,
    priceChild: 30,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "tour-005",
    type: "tours",
    title: "Sunset at Jemaa el-Fnaa Square",
    description:
      "Experience the vibrant energy of Jemaa el-Fnaa square as the sun sets. Street performers, local food vendors, and magical atmosphere.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Guided walk", "Traditional snacks", "Photography tips", "Local stories"],
    excludedItems: ["Vendor purchases", "Meals"],
    priceAdult: 35,
    priceChild: 20,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "tour-006",
    type: "tours",
    title: "Photography Tour of Marrakesh",
    description:
      "Professional photography tour capturing the best angles and hidden gems of Marrakesh. Perfect for all photography levels.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Professional photographer guide", "Tips & techniques", "Digital copies of photos", "Transport"],
    excludedItems: ["Meals", "Equipment rental"],
    priceAdult: 75,
    priceChild: 45,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
]

// Excursions offers
export const excursionsOffers: Offer[] = [
  {
    id: "excur-001",
    type: "excursions",
    title: "Sahara Desert 3-Day Adventure",
    description:
      "Experience the magic of the Sahara with camel trekking, desert camping, and sunrise over golden dunes.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Transport", "Camel trekking", "Desert camp", "Meals", "Bedouin guide", "Blankets"],
    excludedItems: ["Personal purchases", "Tips"],
    priceAdult: 320,
    priceChild: 200,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "excur-002",
    type: "excursions",
    title: "Ourika Valley & Waterfalls",
    description: "Visit the scenic Ourika Valley, swim in refreshing waterfalls, and enjoy a traditional Berber lunch.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Transport", "Guide", "Lunch", "Swimming access", "Towel"],
    excludedItems: ["Souvenir purchases", "Extra snacks"],
    priceAdult: 65,
    priceChild: 40,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "excur-003",
    type: "excursions",
    title: "High Atlas Trek & Imlil Village",
    description:
      "Trek through alpine meadows to Imlil village, meet local families, and discover traditional mountain life.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Professional trekking guide", "Packed lunch", "Transport", "Water", "Insurance"],
    excludedItems: ["Equipment rental", "Personal gear"],
    priceAdult: 95,
    priceChild: 60,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "excur-004",
    type: "excursions",
    title: "Essaouira Coastal Getaway",
    description:
      "Beach day in the charming coastal town of Essaouira with fresh seafood, windsurf beaches, and artistic vibes.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Transport", "Guide", "Beach access", "Seafood lunch", "Town tour"],
    excludedItems: ["Personal shopping", "Water sports"],
    priceAdult: 75,
    priceChild: 45,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "excur-005",
    type: "excursions",
    title: "Ait Benhaddou & Kasbah Route",
    description: "UNESCO World Heritage site adventure visiting ancient kasbahs and traditional Berber architecture.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Transport", "Expert guide", "Lunch", "Kasbah access", "Photo stops"],
    excludedItems: ["Souvenir shopping"],
    priceAdult: 125,
    priceChild: 75,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "excur-006",
    type: "excursions",
    title: "Full-Day Food & Culture Tour",
    description: "Culinary journey through Marrakesh markets, cooking class, and dinner at a local family home.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Market tour", "Cooking class", "Dinner", "Drinks", "Transport"],
    excludedItems: ["Additional beverages", "Souvenir shopping"],
    priceAdult: 110,
    priceChild: 70,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
]

// Activities offers
export const activitiesOffers: Offer[] = [
  {
    id: "activ-001",
    type: "activities",
    title: "Hot Air Balloon Ride at Sunrise",
    description: "Spectacular sunrise hot air balloon experience over Marrakesh with champagne breakfast upon landing.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Balloon ride", "Breakfast", "Champagne", "Transport", "Photos"],
    excludedItems: ["Hotel pickup for early start"],
    priceAdult: 185,
    priceChild: 120,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "activ-002",
    type: "activities",
    title: "Quad Bike Desert Adventure",
    description: "Thrilling quad bike ride through desert trails with experienced guides and safety equipment.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Quad bike rental", "Guide", "Helmet", "Insurance", "Water", "Snacks"],
    excludedItems: ["Photography service"],
    priceAdult: 95,
    priceChild: 60,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "activ-003",
    type: "activities",
    title: "Traditional Moroccan Spa Day",
    description: "Relax with traditional hammam treatment, argan oil massage, and beauty treatments at luxury spa.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Hammam access", "Massage", "Beauty treatments", "Tea & pastries", "Towels"],
    excludedItems: ["Extra product purchases"],
    priceAdult: 105,
    priceChild: 65,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "activ-004",
    type: "activities",
    title: "Surfing Lesson at Tamraght Beach",
    description: "Professional surfing lessons at famous Tamraght Beach with equipment and instruction for all levels.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Surfboard rental", "Wetsuit", "Professional instructor", "Transport", "Lunch"],
    excludedItems: ["Souvenir shopping"],
    priceAdult: 85,
    priceChild: 55,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "activ-005",
    type: "activities",
    title: "Horseback Riding in Palm Groves",
    description: "Scenic horseback riding through lush palm groves and traditional gardens with traditional tack.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Horse rental", "Guide", "Safety helmet", "Snacks", "Water"],
    excludedItems: ["Professional photos"],
    priceAdult: 75,
    priceChild: 50,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "activ-006",
    type: "activities",
    title: "Pottery Workshop & Painting Class",
    description: "Learn traditional Moroccan pottery and painting techniques from master artisans in their studio.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Workshop access", "Materials", "Instruction", "Tea", "Your creation to take"],
    excludedItems: ["Shipping of artwork"],
    priceAdult: 65,
    priceChild: 40,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
]

// Packages offers
export const packagesOffers: Offer[] = [
  {
    id: "pkg-001",
    type: "packages",
    title: "Marrakesh Classic 4-Day Package",
    description: "Complete Marrakesh experience including medina tour, mountain excursion, and cultural highlights.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["3 nights accommodation", "Daily breakfast", "4x guided tours", "Transport", "Airport transfers"],
    excludedItems: ["Flights", "Travel insurance", "Personal expenses"],
    priceAdult: 550,
    priceChild: 350,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "pkg-002",
    type: "packages",
    title: "Ultimate Morocco 10-Day Journey",
    description: "Complete tour of Morocco including Marrakesh, Sahara, coastal towns, and mountain villages.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "/cultural-sites.jpg",
    ],
    includedItems: ["9 nights accommodation", "Daily meals", "All entrance fees", "Professional guides", "Transport"],
    excludedItems: ["International flights", "Tips"],
    priceAdult: 1200,
    priceChild: 800,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "pkg-003",
    type: "packages",
    title: "Luxury Marrakesh Retreat 5 Days",
    description: "Premium 5-star experience in Marrakesh with luxury riad, spa, and exclusive tours.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["5 nights 5-star riad", "All meals", "Spa treatments", "Private guide", "Airport transport"],
    excludedItems: ["Shopping"],
    priceAdult: 1850,
    priceChild: 1200,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "pkg-004",
    type: "packages",
    title: "Adventure & Culture 7-Day Package",
    description: "Mix of adventure activities and cultural experiences with trekking, Sahara, and coastal visits.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    includedItems: ["6 nights accommodation", "Meals", "All activities", "Equipment", "Guides", "Transport"],
    excludedItems: ["Travel insurance"],
    priceAdult: 850,
    priceChild: 550,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "pkg-005",
    type: "packages",
    title: "Family Marrakesh Fun 6-Day Package",
    description: "Family-friendly package with activities suitable for children and relaxation time.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    includedItems: ["5 nights accommodation", "All meals", "Family tours", "Kids activities", "Transport"],
    excludedItems: ["Entertainment purchases"],
    priceAdult: 650,
    priceChild: 450,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "pkg-006",
    type: "packages",
    title: "Honeymoon Romance 5-Day Escape",
    description: "Romantic getaway with luxury accommodation, couples spa, sunset dinners, and private tours.",
    mainImage: "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    includedItems: ["5 nights luxury riad", "Romantic dinners", "Couples spa", "Private guide", "Wine", "Flowers"],
    excludedItems: ["Engagement photos"],
    priceAdult: 1400,
    priceChild: 0,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
]

// Best Offers (mix from other types)
export const bestOffers: Offer[] = [
  toursOffers[1], // Palaces & Gardens Evening Tour
  excursionsOffers[0], // Sahara Desert 3-Day Adventure
  activitiesOffers[0], // Hot Air Balloon Ride at Sunrise
  packagesOffers[0], // Marrakesh Classic 4-Day Package
  toursOffers[2], // Atlas Mountains Day Excursion
  excursionsOffers[2], // High Atlas Trek & Imlil Village
]

export const allOffers = {
  tours: toursOffers,
  excursions: excursionsOffers,
  activities: activitiesOffers,
  packages: packagesOffers,
  "best-offers": bestOffers,
}

// Helper function to get an offer by its ID
export function getOfferById(id: string): Offer | undefined {
  const allOffersArray = [
    ...toursOffers,
    ...excursionsOffers,
    ...activitiesOffers,
    ...packagesOffers,
  ]
  return allOffersArray.find((offer) => offer.id === id)
}
