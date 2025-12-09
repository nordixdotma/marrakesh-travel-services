export type OfferType = "tours" | "excursions" | "activities" | "packages" | "transfers" | "best-offers"

export interface DetailSection {
  title: string
  content: string
}

export interface DetailedDescription {
  overview: string
  highlights: string[]
  sections: DetailSection[]
  itinerary?: {
    time: string
    activity: string
  }[]
  tips?: string[]
  duration?: string
  difficulty?: string
  groupSize?: string
}

export interface Offer {
  id: string
  type: OfferType
  title: string
  description: string
  detailedDescription: DetailedDescription
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
  // Transfer-specific fields
  transferDetails?: {
    from: string
    to: string
    duration: string
    distance?: string
    vehicleOptions: {
      type: string
      capacity: string
      price: number
      features: string[]
    }[]
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
    detailedDescription: {
      overview: "Immerse yourself in the vibrant heart of Marrakesh with our expertly guided walking tour through the ancient medina. This UNESCO World Heritage site comes alive as you explore its labyrinthine streets, uncovering centuries of history, culture, and artisan traditions.",
      highlights: [
        "Navigate the famous souks with a local expert",
        "Visit historic mosques and madrasas (exterior views)",
        "Discover hidden riads with stunning architecture",
        "Learn about traditional Moroccan crafts",
        "Sample local street food and mint tea"
      ],
      sections: [
        {
          title: "What to Expect",
          content: "Your journey begins at the iconic Jemaa el-Fnaa square, where you'll meet your knowledgeable guide. From there, you'll venture deep into the medina's winding alleys, visiting artisan workshops, spice markets, and leather tanneries. Your guide will share fascinating stories about the city's rich history and cultural significance."
        },
        {
          title: "Cultural Insights",
          content: "Learn about the daily life of medina residents, the art of Moroccan bargaining, and the significance of traditional crafts like zellige tilework, leather goods, and metalwork. Your guide will help you understand the social fabric that makes Marrakesh unique."
        },
        {
          title: "Meeting Point",
          content: "We offer convenient hotel pickup from any location within Marrakesh. Alternatively, meet us at the designated meeting point near Café de France overlooking Jemaa el-Fnaa square."
        }
      ],
      itinerary: [
        { time: "09:00", activity: "Hotel pickup or meeting at Jemaa el-Fnaa" },
        { time: "09:30", activity: "Explore the spice souk and herbalist shops" },
        { time: "10:30", activity: "Visit the leather tanneries" },
        { time: "11:30", activity: "Artisan quarter and craft workshops" },
        { time: "12:30", activity: "Traditional lunch break (optional)" },
        { time: "13:30", activity: "Return to starting point" }
      ],
      tips: [
        "Wear comfortable walking shoes",
        "Bring cash for small purchases",
        "Dress modestly out of respect for local customs",
        "Stay close to your guide in crowded areas"
      ],
      duration: "4-5 hours",
      difficulty: "Easy",
      groupSize: "2-12 people"
    },
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
    detailedDescription: {
      overview: "Discover the architectural splendor of Marrakesh's most iconic palaces and gardens during the magical golden hour. This carefully timed tour captures the beauty of Moroccan royal architecture bathed in warm evening light, offering unparalleled photo opportunities.",
      highlights: [
        "Skip-the-line access to Bahia Palace",
        "Explore the famous Majorelle Gardens",
        "Capture stunning golden hour photography",
        "Learn about Moroccan royal history",
        "Visit the Yves Saint Laurent Museum (exterior)"
      ],
      sections: [
        {
          title: "Bahia Palace",
          content: "Marvel at the intricate tilework, carved cedarwood, and painted ceilings of this 19th-century masterpiece. Built for a grand vizier, the palace showcases the finest examples of Moroccan craftsmanship and Islamic architecture."
        },
        {
          title: "Majorelle Gardens",
          content: "Stroll through the vibrant blue gardens created by French painter Jacques Majorelle and later restored by Yves Saint Laurent. The cobalt blue buildings, exotic plants, and tranquil pools create a photographer's paradise."
        },
        {
          title: "Photography Tips",
          content: "Our guides are trained to help you find the best angles and lighting for your photos. Whether you're using a smartphone or professional camera, you'll capture memories that last a lifetime."
        }
      ],
      itinerary: [
        { time: "15:00", activity: "Hotel pickup" },
        { time: "15:30", activity: "Bahia Palace guided tour" },
        { time: "17:00", activity: "Transfer to Majorelle Gardens" },
        { time: "17:30", activity: "Majorelle Gardens exploration" },
        { time: "19:00", activity: "Sunset viewing and refreshments" },
        { time: "19:30", activity: "Return to hotel" }
      ],
      tips: [
        "Bring a camera with good low-light capability",
        "Wear comfortable shoes for walking",
        "Book in advance during peak season",
        "Consider a tripod for sunset shots"
      ],
      duration: "4-5 hours",
      difficulty: "Easy",
      groupSize: "2-10 people"
    },
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
    detailedDescription: {
      overview: "Escape the bustling city for a day of breathtaking mountain scenery and authentic Berber culture. This full-day excursion takes you through winding mountain roads to traditional villages where ancient ways of life continue unchanged.",
      highlights: [
        "Scenic drive through the High Atlas Mountains",
        "Visit authentic Berber villages",
        "Traditional Moroccan tea ceremony",
        "Home-cooked Berber lunch with mountain views",
        "Meet local artisans and families"
      ],
      sections: [
        {
          title: "The Journey",
          content: "Travel along the Tizi n'Test pass, one of Morocco's most spectacular mountain roads. Stop at panoramic viewpoints for photos of the stunning landscape, including views of North Africa's highest peak, Jebel Toubkal."
        },
        {
          title: "Berber Village Experience",
          content: "Visit a traditional Berber village where you'll be welcomed into a local home. Learn about daily life, traditional crafts, and the hospitality that defines Berber culture. Participate in bread-making or other traditional activities."
        },
        {
          title: "Culinary Experience",
          content: "Enjoy a delicious home-cooked tagine lunch prepared by local women using fresh, locally-sourced ingredients. The meal is accompanied by traditional mint tea and stunning mountain panoramas."
        }
      ],
      itinerary: [
        { time: "08:00", activity: "Hotel pickup in Marrakesh" },
        { time: "09:30", activity: "First mountain viewpoint stop" },
        { time: "10:30", activity: "Arrive at Berber village" },
        { time: "11:00", activity: "Village tour and home visit" },
        { time: "12:30", activity: "Traditional Berber lunch" },
        { time: "14:00", activity: "Optional short hike or free time" },
        { time: "15:30", activity: "Begin return journey" },
        { time: "17:30", activity: "Arrive back in Marrakesh" }
      ],
      tips: [
        "Dress in layers as mountain weather can change",
        "Bring sunscreen and a hat",
        "Wear sturdy footwear for village walks",
        "Bring small gifts for children if you wish"
      ],
      duration: "Full day (9-10 hours)",
      difficulty: "Easy to Moderate",
      groupSize: "2-15 people"
    },
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
    detailedDescription: {
      overview: "Uncover the multicultural history of Marrakesh with this fascinating tour through the ancient Kasbah and the historic Mellah (Jewish Quarter). Explore centuries of coexistence between different communities and discover architectural treasures often missed by visitors.",
      highlights: [
        "Explore the ancient Kasbah district",
        "Visit the historic Jewish Quarter (Mellah)",
        "See the Lazama Synagogue",
        "Discover Saadian Tombs",
        "Learn about Marrakesh's multicultural heritage"
      ],
      sections: [
        {
          title: "The Kasbah",
          content: "Walk through the ancient fortified district that once housed the royal palace and administrative buildings. Marvel at the massive walls, decorative gates, and the famous El Badi Palace ruins, once considered one of the most beautiful palaces in the world."
        },
        {
          title: "The Mellah",
          content: "Enter the historic Jewish Quarter, established in 1558. Visit the Lazama Synagogue, one of the oldest in Morocco, and explore the unique architecture featuring balconies and larger windows than typical Moroccan homes. Learn about the rich history of Moroccan Jews."
        },
        {
          title: "Hidden Treasures",
          content: "Discover the Saadian Tombs, rediscovered in 1917, containing the remains of 60 members of the Saadian dynasty. The intricate tilework and carved cedar are among the finest examples of Islamic art in Morocco."
        }
      ],
      itinerary: [
        { time: "09:00", activity: "Meet at Jemaa el-Fnaa" },
        { time: "09:30", activity: "Kasbah district exploration" },
        { time: "10:30", activity: "Saadian Tombs visit" },
        { time: "11:30", activity: "Walk to the Mellah" },
        { time: "12:00", activity: "Jewish Quarter and synagogue visit" },
        { time: "13:00", activity: "Local refreshments and wrap-up" }
      ],
      tips: [
        "Synagogue visits require modest dress",
        "Bring a small donation for the synagogue",
        "Photography may be restricted in some areas",
        "Ask your guide about kosher food options"
      ],
      duration: "4 hours",
      difficulty: "Easy",
      groupSize: "2-12 people"
    },
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
    detailedDescription: {
      overview: "Witness the legendary transformation of Jemaa el-Fnaa square from daytime market to evening spectacle. As UNESCO's first proclamation of a Masterpiece of the Oral and Intangible Heritage of Humanity, this experience captures the essence of Marrakesh's living culture.",
      highlights: [
        "Watch the famous sunset from a rooftop terrace",
        "Experience street performers and storytellers",
        "Sample authentic street food safely",
        "Learn about the square's UNESCO heritage",
        "Capture stunning golden hour photos"
      ],
      sections: [
        {
          title: "The Magic of Sunset",
          content: "As the sun descends, the square undergoes a remarkable transformation. Snake charmers, henna artists, and musicians give way to food stalls, storytellers, and Gnawa musicians. The energy is electric and unlike anywhere else on Earth."
        },
        {
          title: "Street Food Experience",
          content: "Your guide will navigate you safely through the food stalls, recommending the best and safest options. Try grilled meats, fresh orange juice, snail soup, and traditional sweets while learning the stories behind each dish."
        },
        {
          title: "Evening Entertainment",
          content: "Encounter the unique performers of the square: Berber musicians, acrobats, traditional healers, and the famous Halqa (circle) performances. Your guide will explain the cultural significance of each tradition."
        }
      ],
      itinerary: [
        { time: "17:00", activity: "Meet at designated café" },
        { time: "17:30", activity: "Rooftop sunset viewing" },
        { time: "18:30", activity: "Descend into the square" },
        { time: "19:00", activity: "Street food tasting tour" },
        { time: "20:00", activity: "Evening performers and Halqa" },
        { time: "21:00", activity: "Tour concludes" }
      ],
      tips: [
        "Keep valuables secure in the crowds",
        "Bring an appetite for street food",
        "Ask before photographing performers (tips expected)",
        "Wear comfortable shoes"
      ],
      duration: "4 hours",
      difficulty: "Easy",
      groupSize: "2-10 people"
    },
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
    detailedDescription: {
      overview: "Join our professional photographer guide for an immersive photography experience through Marrakesh's most photogenic locations. Whether you're a beginner or advanced photographer, you'll leave with stunning images and improved skills.",
      highlights: [
        "Guided by a professional travel photographer",
        "Access to secret photogenic locations",
        "Personalized tips for your skill level",
        "Best lighting conditions guaranteed",
        "Digital copies of guide's shots included"
      ],
      sections: [
        {
          title: "Photography Instruction",
          content: "Learn composition techniques, how to capture motion in busy markets, portrait photography with local subjects, and architectural photography in the medina. Instruction is tailored to your equipment and experience level."
        },
        {
          title: "Secret Locations",
          content: "Visit hidden riads, rooftop terraces, and lesser-known corners of the medina that most tourists never see. These locations offer unique backdrops and lighting conditions for exceptional photographs."
        },
        {
          title: "Post-Processing Tips",
          content: "Receive guidance on editing your Marrakesh photos to bring out the vibrant colors and unique atmosphere of the city. Optional post-tour online session available for advanced editing techniques."
        }
      ],
      itinerary: [
        { time: "06:00", activity: "Early morning light session" },
        { time: "08:00", activity: "Breakfast break" },
        { time: "09:00", activity: "Medina street photography" },
        { time: "11:00", activity: "Architectural details session" },
        { time: "12:30", activity: "Portrait photography with locals" },
        { time: "14:00", activity: "Review session and tour ends" }
      ],
      tips: [
        "Bring fully charged batteries and extra memory cards",
        "Any camera works - smartphone to professional",
        "Wear neutral colors to blend in",
        "Bring a lightweight tripod if you have one"
      ],
      duration: "8 hours",
      difficulty: "Moderate (lots of walking)",
      groupSize: "2-6 people (small group for personalized attention)"
    },
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
    detailedDescription: {
      overview: "Embark on an unforgettable journey to the Sahara Desert, Morocco's most iconic natural wonder. This three-day adventure takes you from Marrakesh through dramatic landscapes to the golden dunes of Erg Chebbi, where you'll experience authentic desert life under a canopy of stars.",
      highlights: [
        "Cross the High Atlas Mountains via Tizi n'Tichka pass",
        "Visit the UNESCO site of Ait Benhaddou",
        "Camel trek into the Erg Chebbi dunes",
        "Sleep in a traditional Berber desert camp",
        "Watch sunrise over the Sahara dunes",
        "Explore the Todra Gorges"
      ],
      sections: [
        {
          title: "Day 1: Marrakesh to Dades Valley",
          content: "Depart Marrakesh early morning and cross the spectacular High Atlas Mountains via the Tizi n'Tichka pass (2,260m). Stop at Ait Benhaddou, the famous fortified village featured in many Hollywood films. Continue through the Valley of Roses and Skoura oasis to the dramatic Dades Gorges for overnight."
        },
        {
          title: "Day 2: Dades to Merzouga & Desert Camp",
          content: "Journey through the Todra Gorges, Morocco's Grand Canyon, before continuing to Merzouga at the edge of the Sahara. In the late afternoon, mount your camel for the trek into the dunes. Watch the sunset paint the sand golden before arriving at your traditional desert camp for dinner, music, and stargazing."
        },
        {
          title: "Day 3: Desert Sunrise & Return",
          content: "Wake before dawn to climb a dune and witness the spectacular Sahara sunrise. After breakfast, ride camels back to Merzouga, then begin the scenic return journey to Marrakesh via a different route, arriving in the evening."
        }
      ],
      tips: [
        "Pack layers - desert nights are cold, days are hot",
        "Bring sunglasses, sunscreen, and a scarf for sand",
        "Charge all devices before the desert camp",
        "Book during full moon for magical night lighting"
      ],
      duration: "3 days / 2 nights",
      difficulty: "Moderate",
      groupSize: "4-16 people"
    },
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
    detailedDescription: {
      overview: "Escape the heat of Marrakesh for a refreshing day in the lush Ourika Valley, nestled in the foothills of the High Atlas Mountains. Just an hour from the city, this verdant paradise offers stunning waterfalls, traditional Berber villages, and a cool mountain retreat.",
      highlights: [
        "Visit the spectacular Setti Fatma waterfalls",
        "Swim in crystal-clear mountain pools",
        "Traditional Berber lunch by the river",
        "Explore authentic mountain villages",
        "Visit a traditional Berber house",
        "See aromatic and medicinal plant gardens"
      ],
      sections: [
        {
          title: "The Waterfalls",
          content: "The famous seven waterfalls of Setti Fatma cascade down the mountainside, with the first two easily accessible. For the adventurous, continue climbing to discover more secluded falls. The pools at the base offer perfect spots for a refreshing swim."
        },
        {
          title: "Berber Culture",
          content: "Experience authentic Berber hospitality in the mountain villages. Visit a traditional home to learn about daily life, and enjoy mint tea with local families. The valley is known for its terracotta pottery and woven goods."
        },
        {
          title: "Riverside Dining",
          content: "Enjoy lunch at a riverside restaurant where tables are set on platforms over the rushing water. Savor traditional tagines, fresh salads, and grilled meats while listening to the sound of the river below."
        }
      ],
      itinerary: [
        { time: "09:00", activity: "Depart Marrakesh" },
        { time: "10:00", activity: "Arrive at Ourika Valley" },
        { time: "10:30", activity: "Hike to waterfalls" },
        { time: "12:00", activity: "Swimming and relaxation" },
        { time: "13:30", activity: "Traditional lunch" },
        { time: "15:00", activity: "Visit Berber village" },
        { time: "16:00", activity: "Return journey" },
        { time: "17:30", activity: "Arrive in Marrakesh" }
      ],
      tips: [
        "Wear water shoes or sandals with good grip",
        "Bring swimwear and a towel",
        "The waterfall hike involves rock scrambling",
        "Visit on weekdays to avoid crowds"
      ],
      duration: "Full day (8-9 hours)",
      difficulty: "Moderate",
      groupSize: "2-12 people"
    },
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
    detailedDescription: {
      overview: "Discover the heart of the High Atlas Mountains with this trekking adventure to Imlil, the gateway to North Africa's highest peak. Walk through terraced farmland, walnut groves, and traditional villages while experiencing the warm hospitality of the Berber people.",
      highlights: [
        "Trek through stunning alpine scenery",
        "Visit the traditional village of Imlil",
        "Views of Jebel Toubkal (4,167m)",
        "Meet local Berber families",
        "Traditional mountain lunch",
        "Visit the Kasbah du Toubkal"
      ],
      sections: [
        {
          title: "The Trek",
          content: "Starting from Imlil, follow ancient mule tracks through walnut and cherry orchards. Pass through small hamlets where life has changed little over centuries. The trails offer spectacular views of the surrounding peaks and valleys."
        },
        {
          title: "Village Life",
          content: "Experience authentic Berber culture in mountain villages. Visit local homes, see traditional crafts like carpet weaving, and learn about the sustainable farming practices that have supported these communities for generations."
        },
        {
          title: "The Kasbah",
          content: "Visit the renowned Kasbah du Toubkal, a former summer residence of a local chief, now a stunning mountain retreat. Enjoy lunch on the terrace with panoramic views of the Toubkal massif."
        }
      ],
      itinerary: [
        { time: "07:30", activity: "Depart Marrakesh" },
        { time: "09:00", activity: "Arrive in Imlil" },
        { time: "09:30", activity: "Begin trek with local guide" },
        { time: "11:00", activity: "Village visits en route" },
        { time: "12:30", activity: "Lunch at Kasbah du Toubkal" },
        { time: "14:00", activity: "Explore Imlil village" },
        { time: "15:30", activity: "Return journey" },
        { time: "17:30", activity: "Arrive in Marrakesh" }
      ],
      tips: [
        "Wear proper hiking boots",
        "Bring layers - mountain weather changes quickly",
        "Trek poles recommended but not essential",
        "Bring cash for local purchases"
      ],
      duration: "Full day (10 hours)",
      difficulty: "Moderate to Challenging",
      groupSize: "2-10 people"
    },
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
    detailedDescription: {
      overview: "Trade the heat of Marrakesh for the refreshing Atlantic breezes of Essaouira, Morocco's most charming coastal town. This laid-back port city offers beautiful beaches, fresh seafood, historic ramparts, and a thriving arts scene all within a relaxed, bohemian atmosphere.",
      highlights: [
        "Explore the UNESCO-listed medina",
        "Walk along the historic ramparts",
        "Fresh seafood lunch at the port",
        "Beach time on Atlantic shores",
        "Visit artisan workshops",
        "See the argan oil cooperatives"
      ],
      sections: [
        {
          title: "The Medina",
          content: "Unlike Marrakesh's maze-like medina, Essaouira's was designed by a French architect in the 18th century with wide, straight streets. Explore art galleries, antique shops, and the famous thuya wood carvers whose intricate work is found nowhere else."
        },
        {
          title: "The Port & Seafood",
          content: "Watch fishing boats unload their daily catch at the bustling port. Choose your own fish at the outdoor grills and have it cooked to order. The sardines, prawns, and lobster are unbeatable in freshness and flavor."
        },
        {
          title: "Beach & Water Sports",
          content: "Essaouira's wide, sandy beach stretches for miles. The consistent Atlantic winds make it a world-renowned destination for windsurfing and kitesurfing. For those who prefer calm, simply relax on the sand or take a leisurely stroll."
        }
      ],
      itinerary: [
        { time: "08:00", activity: "Depart Marrakesh" },
        { time: "09:30", activity: "Stop at argan cooperative" },
        { time: "10:30", activity: "Arrive in Essaouira" },
        { time: "11:00", activity: "Guided medina and ramparts tour" },
        { time: "12:30", activity: "Seafood lunch at the port" },
        { time: "14:00", activity: "Free time - beach or shopping" },
        { time: "17:00", activity: "Depart for Marrakesh" },
        { time: "19:30", activity: "Arrive in Marrakesh" }
      ],
      tips: [
        "Bring a jacket - sea breezes can be cool",
        "Essaouira is windier than Marrakesh",
        "Best day for fish market is morning",
        "Cash recommended for small purchases"
      ],
      duration: "Full day (11-12 hours)",
      difficulty: "Easy",
      groupSize: "2-15 people"
    },
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
    detailedDescription: {
      overview: "Journey to Morocco's most spectacular fortified village, Ait Benhaddou, a UNESCO World Heritage site that has served as backdrop for countless Hollywood productions. This day trip along the legendary Kasbah Route reveals centuries of Moroccan history and architectural grandeur.",
      highlights: [
        "Explore the UNESCO site of Ait Benhaddou",
        "Cross the Tizi n'Tichka mountain pass",
        "Visit Ouarzazate - Hollywood of Africa",
        "See the Atlas Film Studios",
        "Traditional lunch in a kasbah",
        "Learn about earthen architecture"
      ],
      sections: [
        {
          title: "Ait Benhaddou",
          content: "This stunning ksar (fortified village) is a masterpiece of southern Moroccan earthen architecture. Still inhabited by a few families, it has appeared in Game of Thrones, Gladiator, and Lawrence of Arabia. Explore its narrow alleys and climb to the granary at the top for panoramic views."
        },
        {
          title: "The Mountain Pass",
          content: "The drive over the Tizi n'Tichka (2,260m) is spectacular, with hairpin bends offering ever-changing views of the Atlas Mountains. Stop at viewpoints and meet local mineral sellers along the way."
        },
        {
          title: "Ouarzazate",
          content: "Known as the 'Hollywood of Africa,' this desert city is home to major film studios. Optional visit to Atlas Film Studios where sets from Kingdom of Heaven and other blockbusters still stand."
        }
      ],
      itinerary: [
        { time: "07:00", activity: "Depart Marrakesh" },
        { time: "09:30", activity: "Tizi n'Tichka summit stop" },
        { time: "11:00", activity: "Arrive at Ait Benhaddou" },
        { time: "11:30", activity: "Guided exploration of the ksar" },
        { time: "13:00", activity: "Lunch in a traditional kasbah" },
        { time: "14:30", activity: "Visit Ouarzazate (optional studios)" },
        { time: "16:00", activity: "Begin return journey" },
        { time: "19:30", activity: "Arrive in Marrakesh" }
      ],
      tips: [
        "This is a long day trip - be prepared",
        "Wear comfortable walking shoes",
        "Bring sun protection",
        "Mountain weather can be cooler"
      ],
      duration: "Full day (12-13 hours)",
      difficulty: "Easy to Moderate",
      groupSize: "2-15 people"
    },
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
    detailedDescription: {
      overview: "Immerse yourself in the rich culinary traditions of Morocco with this comprehensive food and culture experience. From market shopping to hands-on cooking, you'll discover the secrets of Moroccan cuisine while connecting with local families and traditions.",
      highlights: [
        "Guided market tour with a local chef",
        "Learn to select authentic ingredients",
        "Hands-on Moroccan cooking class",
        "Prepare multiple traditional dishes",
        "Dinner with a local family",
        "Take home recipe booklet"
      ],
      sections: [
        {
          title: "Market Experience",
          content: "Begin in the bustling souks with our expert chef guide. Learn to identify quality spices, select the freshest vegetables, and navigate the meat and olive markets like a local. Discover ingredients unique to Moroccan cuisine and their traditional uses."
        },
        {
          title: "Cooking Class",
          content: "In a traditional riad kitchen, learn to prepare iconic Moroccan dishes: tagine, couscous, pastilla, and Moroccan salads. Master the art of spice blending and traditional cooking techniques passed down through generations."
        },
        {
          title: "Family Dinner",
          content: "The day culminates with dinner at a local family home. Share the meal you've prepared with your hosts, learning about Moroccan dining traditions, hospitality customs, and daily life. This intimate experience creates lasting connections."
        }
      ],
      itinerary: [
        { time: "09:00", activity: "Meet at designated riad" },
        { time: "09:30", activity: "Market tour and shopping" },
        { time: "11:30", activity: "Return to cooking venue" },
        { time: "12:00", activity: "Cooking class begins" },
        { time: "14:00", activity: "Lunch break (taste your creations)" },
        { time: "15:00", activity: "Continue cooking - dinner prep" },
        { time: "17:00", activity: "Free time / rest" },
        { time: "19:00", activity: "Dinner at family home" },
        { time: "21:30", activity: "Tour concludes" }
      ],
      tips: [
        "Inform us of dietary restrictions in advance",
        "Wear comfortable clothes for cooking",
        "Bring an appetite!",
        "Vegetarian options available"
      ],
      duration: "Full day (12 hours)",
      difficulty: "Easy",
      groupSize: "2-8 people"
    },
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
    detailedDescription: {
      overview: "Float serenely above the stunning landscapes surrounding Marrakesh as the sun rises over the Atlas Mountains. This magical hot air balloon experience offers unparalleled views of traditional villages, palm groves, and the distant snow-capped peaks, followed by a celebratory champagne breakfast.",
      highlights: [
        "Spectacular sunrise views from above",
        "Float over palm groves and Berber villages",
        "Atlas Mountains panorama",
        "Champagne breakfast upon landing",
        "Berber village visit",
        "Flight certificate and photos"
      ],
      sections: [
        {
          title: "The Flight Experience",
          content: "Watch in wonder as the balloon inflates in the pre-dawn darkness, then gently rise into the sky as the first light paints the landscape in golden hues. Float silently over olive groves, mud-brick villages, and the winding rivers of the Marrakesh plains."
        },
        {
          title: "Safety & Comfort",
          content: "Our experienced pilots hold international licenses and have thousands of flight hours. Modern equipment and comprehensive safety briefings ensure a secure and comfortable experience. The spacious basket accommodates up to 20 passengers."
        },
        {
          title: "Post-Flight Celebration",
          content: "After landing, enjoy a traditional Berber breakfast with fresh bread, local cheeses, fruits, and champagne. Visit a nearby village to meet local families and learn about rural life before returning to Marrakesh."
        }
      ],
      itinerary: [
        { time: "05:00", activity: "Hotel pickup" },
        { time: "06:00", activity: "Arrival at launch site" },
        { time: "06:30", activity: "Safety briefing and inflation" },
        { time: "07:00", activity: "Takeoff at sunrise" },
        { time: "08:00", activity: "Landing and celebration" },
        { time: "08:30", activity: "Champagne breakfast" },
        { time: "09:30", activity: "Village visit" },
        { time: "10:30", activity: "Return to Marrakesh" }
      ],
      tips: [
        "Dress in layers - mornings can be cool",
        "Wear flat, closed-toe shoes",
        "Flights may be cancelled due to weather",
        "Not recommended for those with vertigo"
      ],
      duration: "5-6 hours (1 hour flight)",
      difficulty: "Easy",
      groupSize: "Up to 20 people per balloon"
    },
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
    detailedDescription: {
      overview: "Rev up for an adrenaline-pumping adventure through the Agafay desert and palm groves surrounding Marrakesh. This quad biking experience takes you through diverse landscapes, from rocky trails to sandy dunes, offering an exciting way to explore the region.",
      highlights: [
        "Powerful quad bikes for all skill levels",
        "Ride through the Agafay desert",
        "Pass through palm groves and villages",
        "Professional guides and safety gear",
        "Traditional Berber tea break",
        "Photo opportunities at scenic spots"
      ],
      sections: [
        {
          title: "The Ride",
          content: "After a comprehensive safety briefing and training session, set off on powerful, modern quad bikes. Navigate through varied terrain including hard-packed desert, sandy trails, and oasis-like palm groves. Our routes are designed to thrill while remaining safe."
        },
        {
          title: "Equipment & Safety",
          content: "All necessary safety equipment is provided including helmets, goggles, and gloves. Our quad bikes are regularly maintained and suitable for beginners and experienced riders alike. Guides carry first-aid kits and communication equipment."
        },
        {
          title: "Berber Experience",
          content: "Stop at a traditional Berber village for refreshing mint tea and learn about life in the desert. This cultural interlude provides a perfect contrast to the high-energy riding experience."
        }
      ],
      itinerary: [
        { time: "09:00 or 14:00", activity: "Pickup from hotel" },
        { time: "+30 min", activity: "Arrive at base camp" },
        { time: "+45 min", activity: "Safety briefing and training" },
        { time: "+1 hour", activity: "Quad biking adventure begins" },
        { time: "+2 hours", activity: "Tea break at Berber village" },
        { time: "+2.5 hours", activity: "Return ride" },
        { time: "+3 hours", activity: "Return to Marrakesh" }
      ],
      tips: [
        "Wear long pants and closed-toe shoes",
        "Bring sunglasses and sunscreen",
        "A dust scarf is recommended",
        "Minimum age is typically 16 to drive"
      ],
      duration: "3-4 hours",
      difficulty: "Moderate",
      groupSize: "2-12 people"
    },
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
    detailedDescription: {
      overview: "Indulge in centuries-old Moroccan wellness rituals at a luxurious traditional spa. Experience the purifying hammam steam bath, exfoliating black soap scrub, and nourishing argan oil massage - the ultimate relaxation experience that has rejuvenated Moroccans for generations.",
      highlights: [
        "Authentic hammam steam bath",
        "Traditional black soap scrub",
        "Rhassoul clay body mask",
        "Argan oil massage",
        "Mint tea and Moroccan pastries",
        "Relaxation in beautiful surroundings"
      ],
      sections: [
        {
          title: "The Hammam Ritual",
          content: "Begin in the steam room, where warm, humid air opens your pores and prepares your skin. The attendant then applies traditional black soap (savon noir) made from olives, massaging it into your skin before a vigorous exfoliation with a kessa glove that leaves your skin incredibly soft."
        },
        {
          title: "Argan Oil Treatment",
          content: "After the hammam, enjoy a full-body massage using pure argan oil - Morocco's 'liquid gold.' This precious oil, rich in vitamin E, deeply nourishes the skin while the skilled massage releases tension and promotes total relaxation."
        },
        {
          title: "The Setting",
          content: "Our partner spa is housed in a beautifully restored riad, featuring traditional zellige tiles, carved plaster, and tranquil fountains. The atmosphere transports you to another era while providing modern comfort and hygiene standards."
        }
      ],
      itinerary: [
        { time: "Flexible", activity: "Arrival and welcome tea" },
        { time: "+15 min", activity: "Change and relax" },
        { time: "+30 min", activity: "Hammam steam session" },
        { time: "+1 hour", activity: "Black soap and kessa scrub" },
        { time: "+1.5 hours", activity: "Rhassoul clay mask" },
        { time: "+2 hours", activity: "Argan oil massage" },
        { time: "+3 hours", activity: "Relaxation with tea and pastries" }
      ],
      tips: [
        "Remove all jewelry before treatment",
        "Arrive 15 minutes early to relax",
        "Communicate pressure preferences",
        "Drink plenty of water afterwards"
      ],
      duration: "3-4 hours",
      difficulty: "Easy (relaxation)",
      groupSize: "Individual or couples"
    },
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
    detailedDescription: {
      overview: "Catch your first wave or improve your skills at Morocco's legendary surf coast. Just two hours from Marrakesh, Tamraght offers perfect conditions for learners with consistent waves, sandy beaches, and expert instructors who'll have you standing up in no time.",
      highlights: [
        "Professional ISA-certified instructors",
        "Quality surfboards and wetsuits provided",
        "Small group instruction",
        "Video analysis available",
        "Beachside lunch included",
        "Scenic coastal drive"
      ],
      sections: [
        {
          title: "The Lesson",
          content: "Begin with a beach warm-up and safety briefing. Learn the fundamentals on the sand before hitting the waves. Our patient instructors specialize in getting beginners standing on their first session, while more advanced surfers receive tips to improve technique."
        },
        {
          title: "The Location",
          content: "Tamraght is nestled between Taghazout and Agadir on Morocco's famous surf coast. The beach offers consistent, gentle waves perfect for learning, with a backdrop of traditional fishing villages and dramatic cliffs."
        },
        {
          title: "Surf Culture",
          content: "Experience the laid-back surf culture of coastal Morocco. Enjoy fresh seafood at a beachside café, mingle with local and international surfers, and soak up the unique atmosphere that makes this coast special."
        }
      ],
      itinerary: [
        { time: "07:00", activity: "Pickup from Marrakesh" },
        { time: "09:30", activity: "Arrive at Tamraght Beach" },
        { time: "10:00", activity: "Equipment fitting and warm-up" },
        { time: "10:30", activity: "Beach instruction" },
        { time: "11:00", activity: "In-water lesson" },
        { time: "13:00", activity: "Lunch at beach café" },
        { time: "14:00", activity: "Free surf time or relax" },
        { time: "15:30", activity: "Depart for Marrakesh" },
        { time: "18:00", activity: "Arrive in Marrakesh" }
      ],
      tips: [
        "No prior experience needed",
        "Bring swimwear, towel, and sunscreen",
        "Surfing uses muscles you didn't know you had!",
        "Best conditions are morning sessions"
      ],
      duration: "Full day (11 hours)",
      difficulty: "Moderate (physical activity)",
      groupSize: "4-8 people per instructor"
    },
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
    detailedDescription: {
      overview: "Experience the romance of Marrakesh on horseback as you ride through the famous Palmeraie, a 13,000-hectare palm grove oasis on the outskirts of the city. Our well-trained horses and experienced guides create an unforgettable journey through this unique landscape.",
      highlights: [
        "Well-trained Arabian and Barb horses",
        "Ride through the historic Palmeraie",
        "Suitable for all experience levels",
        "Traditional Moroccan tack and attire available",
        "Sunset rides available",
        "Views of Atlas Mountains"
      ],
      sections: [
        {
          title: "The Horses",
          content: "Our stable features beautiful Arabian and Barb horses, the traditional breeds of Morocco. Each horse is carefully selected for its temperament and matched to your experience level. All horses receive excellent care and training."
        },
        {
          title: "The Palmeraie",
          content: "Legend says the palm grove grew from date pits discarded by soldiers of the Almoravid dynasty. Today, it's a peaceful haven of over 100,000 palm trees, traditional gardens, and luxury villas - best experienced on horseback."
        },
        {
          title: "The Experience",
          content: "After a brief introduction and safety briefing, set off on sandy trails weaving through the palms. Stop at a traditional Berber tent for mint tea, and enjoy the tranquility away from the bustling medina."
        }
      ],
      itinerary: [
        { time: "09:00 or 15:00", activity: "Pickup from hotel" },
        { time: "+30 min", activity: "Arrive at stables" },
        { time: "+45 min", activity: "Meet your horse and safety briefing" },
        { time: "+1 hour", activity: "Begin riding through palm groves" },
        { time: "+1.5 hours", activity: "Tea break at Berber tent" },
        { time: "+2 hours", activity: "Continue riding" },
        { time: "+2.5 hours", activity: "Return to stables" },
        { time: "+3 hours", activity: "Return to hotel" }
      ],
      tips: [
        "Wear long pants and closed-toe shoes",
        "Beginners welcome - no experience needed",
        "Book sunset ride for magical light",
        "Helmets provided for all riders"
      ],
      duration: "3 hours",
      difficulty: "Easy to Moderate",
      groupSize: "2-8 people"
    },
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
    detailedDescription: {
      overview: "Discover the ancient art of Moroccan pottery in a hands-on workshop led by master artisans. Learn techniques passed down through generations, from shaping clay on the wheel to painting intricate geometric patterns that define Moroccan decorative arts.",
      highlights: [
        "Learn from master Moroccan potters",
        "Hands-on wheel throwing experience",
        "Traditional pattern painting techniques",
        "Create your own piece to keep",
        "Visit artisan workshops",
        "Tea and pastries included"
      ],
      sections: [
        {
          title: "The Craft",
          content: "Moroccan pottery traditions date back centuries, with each region developing distinctive styles. Learn about the different techniques, from the rustic Berber pottery of the mountains to the sophisticated painted ceramics of Fes and Safi."
        },
        {
          title: "The Workshop",
          content: "Work alongside skilled artisans who will guide your hands on the potter's wheel. Experience the satisfaction of creating a vessel from raw clay. Then learn the art of traditional painting using natural pigments and geometric patterns."
        },
        {
          title: "Take Home",
          content: "Your creation will be fired in a traditional kiln and can be collected later or shipped to your home. You'll also receive a certificate of completion and recipe card for the traditional mint tea you'll enjoy during the workshop."
        }
      ],
      itinerary: [
        { time: "Flexible", activity: "Welcome and introduction to Moroccan pottery" },
        { time: "+30 min", activity: "Demonstration by master potter" },
        { time: "+1 hour", activity: "Wheel throwing practice" },
        { time: "+1.5 hours", activity: "Tea break" },
        { time: "+2 hours", activity: "Painting techniques class" },
        { time: "+2.5 hours", activity: "Decorate your creation" },
        { time: "+3 hours", activity: "Wrap-up and workshop tour" }
      ],
      tips: [
        "Wear clothes you don't mind getting clay on",
        "Pieces need time to fire - pickup or shipping arranged",
        "Great activity for families with kids",
        "No prior experience needed"
      ],
      duration: "3-4 hours",
      difficulty: "Easy",
      groupSize: "2-10 people"
    },
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
    detailedDescription: {
      overview: "The perfect introduction to Marrakesh for first-time visitors. This comprehensive 4-day package covers all the essential experiences - from the historic medina to the Atlas Mountains - with carefully selected accommodations and expert guides throughout.",
      highlights: [
        "3 nights in a beautiful traditional riad",
        "Guided medina and souk tour",
        "Atlas Mountains day excursion",
        "Bahia Palace and Majorelle Gardens",
        "Traditional hammam experience",
        "Airport transfers included"
      ],
      sections: [
        {
          title: "Day 1: Arrival & Medina Discovery",
          content: "Welcome to Marrakesh! After airport pickup, settle into your charming riad. In the afternoon, explore the vibrant medina with your guide, discovering the souks, historical monuments, and the famous Jemaa el-Fnaa square. Evening at leisure to enjoy dinner in the medina."
        },
        {
          title: "Day 2: Palaces, Gardens & Hammam",
          content: "Morning visits to Bahia Palace and the Ben Youssef Madrasa. Lunch in the medina. Afternoon at the stunning Majorelle Gardens. End the day with a traditional hammam experience, the perfect way to relax after exploring."
        },
        {
          title: "Day 3: Atlas Mountains Excursion",
          content: "Full-day excursion to the High Atlas Mountains. Drive through spectacular scenery to visit traditional Berber villages. Enjoy a home-cooked lunch with mountain views and meet local families. Return to Marrakesh in the evening."
        },
        {
          title: "Day 4: Departure",
          content: "Enjoy breakfast at your riad and some free time for last-minute shopping in the souks. Transfer to the airport for your departure, taking with you memories of an unforgettable Marrakesh experience."
        }
      ],
      tips: [
        "Best time to visit: March-May or September-November",
        "Pack comfortable walking shoes",
        "Bring layers for mountain excursion",
        "Cash useful for souk shopping"
      ],
      duration: "4 days / 3 nights",
      difficulty: "Easy",
      groupSize: "2-12 people (Private available)"
    },
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
    detailedDescription: {
      overview: "The definitive Moroccan adventure covering the country's most iconic destinations. From the imperial cities to the Sahara Desert, from coastal gems to mountain villages, this 10-day journey reveals Morocco in all its diversity and wonder.",
      highlights: [
        "9 nights in carefully selected accommodations",
        "Marrakesh, Fes, and Chefchaouen",
        "Sahara Desert camp under the stars",
        "Ait Benhaddou UNESCO site",
        "Coastal Essaouira",
        "Atlas Mountains crossing",
        "All meals and transportation included"
      ],
      sections: [
        {
          title: "Days 1-2: Marrakesh",
          content: "Arrive in Marrakesh and immerse yourself in the Red City. Explore the medina, visit palaces and gardens, and experience the magic of Jemaa el-Fnaa. Stay in a beautiful riad in the heart of the old city."
        },
        {
          title: "Days 3-4: Atlas & Sahara",
          content: "Cross the spectacular High Atlas via Tizi n'Tichka pass. Visit Ait Benhaddou, then continue to the Sahara. Camel trek into the dunes for an unforgettable night in a desert camp under countless stars."
        },
        {
          title: "Days 5-6: Fes",
          content: "Journey to the imperial city of Fes, home to the world's oldest university. Explore the UNESCO-listed medina, visit ancient tanneries, and discover the intellectual heart of Morocco."
        },
        {
          title: "Days 7-8: Chefchaouen & Coast",
          content: "Travel to the magical blue city of Chefchaouen, nestled in the Rif Mountains. Wander photogenic streets before heading to Essaouira, Morocco's artistic coastal gem with its Atlantic beaches."
        },
        {
          title: "Days 9-10: Return to Marrakesh",
          content: "Return to Marrakesh with free time for shopping and relaxation. Enjoy a farewell dinner before your departure, taking with you memories of an incredible Moroccan odyssey."
        }
      ],
      tips: [
        "Pack for varied climates - coast to desert",
        "Comfortable shoes essential",
        "Desert nights can be very cold",
        "Flexible itinerary based on conditions"
      ],
      duration: "10 days / 9 nights",
      difficulty: "Moderate",
      groupSize: "4-16 people"
    },
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
    detailedDescription: {
      overview: "Experience Marrakesh in ultimate luxury with this premium 5-day retreat. Stay in an exquisite 5-star riad, enjoy exclusive private tours, indulge in world-class spa treatments, and dine at the finest restaurants - all with impeccable personalized service.",
      highlights: [
        "5 nights in a prestigious 5-star riad",
        "Private guided tours throughout",
        "Daily luxury spa treatments",
        "Fine dining experiences",
        "Hot air balloon at sunrise",
        "Exclusive access experiences",
        "Personal concierge service"
      ],
      sections: [
        {
          title: "Day 1: VIP Arrival",
          content: "Private airport transfer in luxury vehicle. Welcome to your stunning suite in one of Marrakesh's most exclusive riads. Evening champagne reception followed by dinner at a Michelin-recommended restaurant."
        },
        {
          title: "Day 2: Private Cultural Immersion",
          content: "Private guided tour of Marrakesh's treasures with exclusive access to sites. Lunch at a celebrity chef's restaurant. Afternoon at leisure with spa treatment. Evening cooking class with a master chef."
        },
        {
          title: "Day 3: Sky & Earth",
          content: "Sunrise hot air balloon experience with champagne breakfast. Rest and spa time. Afternoon private shopping experience with a personal style guide. Sunset dinner on a private rooftop terrace."
        },
        {
          title: "Day 4: Atlas Luxury",
          content: "Luxury 4x4 excursion to the Atlas Mountains. Private lunch at the renowned Kasbah Tamadot (Richard Branson's retreat). Afternoon relaxation or optional activities. Evening hammam ritual and gala dinner."
        },
        {
          title: "Day 5: Departure in Style",
          content: "Leisurely breakfast and final spa treatment. Personal shopping assistance for last-minute gifts. Luxury transfer to airport with VIP departure assistance."
        }
      ],
      tips: [
        "All experiences can be customized",
        "Dietary requirements catered to",
        "Butler service available 24/7",
        "Upgrades and additions available"
      ],
      duration: "5 days / 4 nights",
      difficulty: "Easy (pampered experience)",
      groupSize: "Private (1-4 people)"
    },
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
    detailedDescription: {
      overview: "For travelers who want to combine physical adventure with cultural discovery, this action-packed 7-day package delivers the best of both worlds. Trek mountains, ride camels, surf waves, and immerse yourself in Morocco's rich heritage.",
      highlights: [
        "6 nights varied accommodation",
        "Atlas Mountains trekking",
        "Sahara camel trek and camping",
        "Surfing on the Atlantic coast",
        "Quad biking adventure",
        "Cultural tours and cooking class",
        "All activities and equipment included"
      ],
      sections: [
        {
          title: "Days 1-2: Mountains",
          content: "Arrive and transfer to Imlil in the High Atlas. Spend a full day trekking through Berber villages with stunning mountain views. Stay in a traditional mountain gite and experience authentic village hospitality."
        },
        {
          title: "Days 3-4: Desert",
          content: "Journey across the dramatic landscape to the Sahara. Quad bike through desert terrain. At sunset, mount camels for the trek into the dunes. Camp under the stars with traditional music and food."
        },
        {
          title: "Days 5-6: Coast",
          content: "Travel to the Atlantic coast for a complete change of pace. Learn to surf (or improve your skills) at world-famous breaks. Explore the charming port town and enjoy fresh seafood. Optional windsurfing or kitesurfing."
        },
        {
          title: "Day 7: Marrakesh & Departure",
          content: "Return to Marrakesh for a morning cooking class and souk tour. Create traditional dishes you've enjoyed throughout the trip. Transfer to airport for departure."
        }
      ],
      tips: [
        "Good fitness level recommended",
        "Pack for all activities (list provided)",
        "All equipment provided",
        "Activities can be modified for ability"
      ],
      duration: "7 days / 6 nights",
      difficulty: "Moderate to Challenging",
      groupSize: "4-12 people"
    },
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
    detailedDescription: {
      overview: "Designed specifically for families, this 6-day package balances kid-friendly adventures with enough downtime to keep everyone happy. Age-appropriate activities, family-style accommodations, and flexible scheduling ensure a stress-free Moroccan adventure.",
      highlights: [
        "5 nights in family-friendly riad with pool",
        "Child-friendly medina tour",
        "Camel riding in the Palmeraie",
        "Pottery and craft workshops",
        "Splash time at resort pool",
        "Cooking class for the whole family",
        "Magical evening entertainment"
      ],
      sections: [
        {
          title: "Day 1: Welcome to Morocco!",
          content: "Arrive and settle into your family riad with pool. Kids can splash while parents relax. Evening orientation walk through the medina with child-friendly introduction to Moroccan culture. Dinner at a family-friendly restaurant."
        },
        {
          title: "Day 2: Discover & Create",
          content: "Morning visit to Majorelle Gardens (kids love the fish!). Afternoon pottery workshop where the whole family creates Moroccan crafts. Evening at leisure with swimming and games."
        },
        {
          title: "Day 3: Animal Adventures",
          content: "Morning camel ride through the palm groves - a highlight for kids of all ages! Picnic lunch. Afternoon at a family-friendly resort with pool, games, and activities. Evening cooking class making kid-approved Moroccan dishes."
        },
        {
          title: "Day 4: Mountain Day",
          content: "Easy day trip to the Atlas foothills. Short walks suitable for children, mule rides available. Traditional lunch in a Berber home. Kids can play with local children. Return for pool time."
        },
        {
          title: "Day 5: Treasure Hunt",
          content: "Interactive treasure hunt through the medina designed for families. Discover hidden gems while solving clues. Afternoon free for shopping or pool. Evening traditional dinner with entertainment."
        },
        {
          title: "Day 6: Farewell",
          content: "Final morning activities based on interests. Last chance shopping for souvenirs. Transfer to airport with wonderful family memories."
        }
      ],
      tips: [
        "Activities adapted for children's ages",
        "Child-friendly food options available",
        "Baby/toddler equipment available",
        "Nap time built into schedule"
      ],
      duration: "6 days / 5 nights",
      difficulty: "Easy (family-paced)",
      groupSize: "Private family booking"
    },
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
    detailedDescription: {
      overview: "Celebrate your love in one of the world's most romantic destinations. This carefully curated honeymoon package combines luxury, intimacy, and unforgettable experiences designed for couples. Every detail is arranged to create the perfect romantic escape.",
      highlights: [
        "5 nights in romantic luxury riad suite",
        "Private tours throughout",
        "Couples hammam and massage",
        "Rooftop sunset dinners",
        "Rose petal turndown service",
        "Champagne and flowers",
        "Hot air balloon sunrise"
      ],
      sections: [
        {
          title: "Day 1: Romance Begins",
          content: "VIP airport welcome with rose petals and champagne in your luxury transfer. Arrive at your exquisite riad suite decorated with flowers. Welcome couples massage. Private candlelit dinner on the rooftop terrace under the stars."
        },
        {
          title: "Day 2: Magical Sunrise",
          content: "Pre-dawn departure for a hot air balloon ride, floating over the landscape as the sun rises. Return for champagne breakfast. Afternoon at leisure for romance. Evening horse-drawn carriage ride and dinner at a palace restaurant."
        },
        {
          title: "Day 3: Sensory Journey",
          content: "Private guided tour of Marrakesh's most beautiful spaces - secret gardens, palatial riads, hidden courtyards. Lunch at a romantic garden restaurant. Afternoon traditional couples hammam ritual. Sunset drinks and dinner."
        },
        {
          title: "Day 4: Desert Romance",
          content: "Private excursion to the Agafay Desert. Enjoy a luxury picnic with champagne amidst stunning scenery. Optional camel ride at sunset. Return to Marrakesh for a special farewell dinner with traditional music."
        },
        {
          title: "Day 5: Sweet Departure",
          content: "Leisurely breakfast in bed. Last-minute shopping for keepsakes. Private transfer to airport, taking with you the memories of a perfect honeymoon."
        }
      ],
      tips: [
        "All experiences completely private",
        "Dietary preferences accommodated",
        "Special requests welcomed",
        "Anniversary couples equally welcome"
      ],
      duration: "5 days / 4 nights",
      difficulty: "Easy (romantic pacing)",
      groupSize: "Couples only"
    },
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

// Transfer offers
export const transfersOffers: Offer[] = [
  {
    id: "transfer-001",
    type: "transfers",
    title: "Airport to Marrakesh City Transfer",
    description:
      "Comfortable private transfer from Marrakesh Menara Airport to your hotel or riad in the city center.",
    detailedDescription: {
      overview: "Start your Moroccan adventure stress-free with our premium airport transfer service. A professional driver will greet you at arrivals and transport you directly to your accommodation in a comfortable, air-conditioned vehicle.",
      highlights: [
        "Meet & greet at airport arrivals",
        "Private air-conditioned vehicle",
        "Professional English-speaking driver",
        "Complimentary bottled water",
        "24/7 availability",
        "Flight monitoring for delays"
      ],
      sections: [
        {
          title: "How It Works",
          content: "Upon booking, you'll receive confirmation with your driver's contact details. Your driver will track your flight and adjust pickup time accordingly. They'll meet you at arrivals holding a sign with your name and assist with luggage."
        },
        {
          title: "Medina Access",
          content: "For accommodations in the medina, we'll drop you at the nearest accessible point. For riads deep within the medina, we can arrange porter assistance to help with your luggage."
        }
      ],
      tips: [
        "Provide your flight number for flight tracking",
        "Have your accommodation address ready",
        "Book in advance during peak season",
        "Request child seats in advance if needed"
      ],
      duration: "20-40 minutes",
      difficulty: "Easy",
      groupSize: "1-7 passengers"
    },
    mainImage: "https://images.unsplash.com/photo-1609281362702-f46a060b2044?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumbnailImages: [
      "https://images.unsplash.com/photo-1609281362702-f46a060b2044?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1169&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1121&auto=format&fit=crop"
    ],
    includedItems: ["Private vehicle", "Professional driver", "Meet & greet", "Bottled water", "Luggage assistance", "WiFi in vehicle"],
    excludedItems: ["Porter service in medina", "Tips"],
    priceAdult: 25,
    priceChild: 0,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
    transferDetails: {
      from: "Marrakesh Menara Airport",
      to: "Marrakesh City Center",
      duration: "20-40 minutes",
      distance: "6 km",
      vehicleOptions: [
        { type: "Sedan", capacity: "1-3 passengers", price: 25, features: ["Air conditioning", "Luggage space", "WiFi"] },
        { type: "SUV", capacity: "1-4 passengers", price: 35, features: ["Air conditioning", "Extra luggage space", "WiFi", "Leather seats"] },
        { type: "Minivan", capacity: "1-7 passengers", price: 45, features: ["Air conditioning", "Large luggage space", "WiFi", "Spacious seating"] },
      ]
    },
  },
  {
    id: "transfer-002",
    type: "transfers",
    title: "Marrakesh to Essaouira Transfer",
    description:
      "Scenic private transfer from Marrakesh to the coastal town of Essaouira with optional stops along the way.",
    detailedDescription: {
      overview: "Travel in comfort from Marrakesh to the charming coastal town of Essaouira. Enjoy the scenic journey through argan tree forests and dramatic landscapes, with optional stops at argan oil cooperatives and goat trees.",
      highlights: [
        "Door-to-door private transfer",
        "Scenic coastal route",
        "Optional argan oil cooperative stop",
        "See famous goats in argan trees",
        "Comfortable air-conditioned vehicle",
        "Flexible departure times"
      ],
      sections: [
        {
          title: "The Journey",
          content: "The 2.5-3 hour drive takes you through changing landscapes, from the red earth of Marrakesh to the windswept Atlantic coast. The route passes through argan forests unique to Morocco, home to tree-climbing goats."
        },
        {
          title: "Argan Oil Stop",
          content: "Visit a women's cooperative where argan oil is produced using traditional methods. Learn about the extraction process and sample the oil. Purchase authentic products directly supporting local women."
        },
        {
          title: "About Essaouira",
          content: "Arrive at this UNESCO-listed coastal town known for its blue and white medina, fresh seafood, art galleries, and excellent windsurfing conditions. A perfect contrast to bustling Marrakesh."
        }
      ],
      tips: [
        "Morning departures offer best lighting for photos",
        "Bring cash for argan oil purchases",
        "Essaouira can be windy - bring a jacket",
        "Book round-trip for better rates"
      ],
      duration: "2.5-3 hours",
      difficulty: "Easy",
      groupSize: "1-7 passengers"
    },
    mainImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumbnailImages: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1169&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1332&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1170&auto=format&fit=crop"
    ],
    includedItems: ["Private vehicle", "Professional driver", "Hotel pickup", "Bottled water", "Argan cooperative stop"],
    excludedItems: ["Meals", "Argan oil purchases", "Tips"],
    priceAdult: 85,
    priceChild: 45,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
    transferDetails: {
      from: "Marrakesh",
      to: "Essaouira",
      duration: "2.5-3 hours",
      distance: "175 km",
      vehicleOptions: [
        { type: "Sedan", capacity: "1-3 passengers", price: 85, features: ["Air conditioning", "Luggage space", "WiFi"] },
        { type: "SUV", capacity: "1-4 passengers", price: 100, features: ["Air conditioning", "Extra luggage space", "WiFi", "Leather seats"] },
        { type: "Minivan", capacity: "1-7 passengers", price: 120, features: ["Air conditioning", "Large luggage space", "WiFi", "Spacious seating"] },
      ]
    },
  },
  {
    id: "transfer-003",
    type: "transfers",
    title: "Marrakesh to Ouarzazate Transfer",
    description:
      "Scenic transfer through the High Atlas Mountains to Ouarzazate, the gateway to the Sahara Desert.",
    detailedDescription: {
      overview: "Cross the spectacular High Atlas Mountains on this scenic transfer to Ouarzazate, known as the 'Hollywood of Morocco.' Pass through the famous Tizi n'Tichka mountain pass and optionally stop at the UNESCO World Heritage site of Ait Benhaddou.",
      highlights: [
        "Cross the High Atlas via Tizi n'Tichka pass",
        "Optional stop at Ait Benhaddou kasbah",
        "Stunning mountain panoramas",
        "Visit Berber villages along the way",
        "Professional mountain-experienced driver",
        "Photo stops at scenic viewpoints"
      ],
      sections: [
        {
          title: "Mountain Crossing",
          content: "The Tizi n'Tichka pass reaches 2,260 meters, offering breathtaking views of the Atlas Mountains. Your experienced driver knows the best viewpoints for photos of the dramatic landscape."
        },
        {
          title: "Ait Benhaddou",
          content: "This UNESCO World Heritage site is a stunning example of traditional earthen architecture. Featured in films like Gladiator and Game of Thrones, the kasbah is worth exploring if time permits."
        },
        {
          title: "Ouarzazate",
          content: "Known as the gateway to the desert, Ouarzazate is home to Atlas Studios and the Taourirt Kasbah. It's the perfect starting point for desert adventures or continuing to the Draa Valley."
        }
      ],
      tips: [
        "Book early departure to allow time for stops",
        "Bring warm clothing - mountains are cool",
        "Some winding roads - take motion sickness prevention if needed",
        "Combine with desert tour for best experience"
      ],
      duration: "4-5 hours",
      difficulty: "Easy",
      groupSize: "1-7 passengers"
    },
    mainImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumbnailImages: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1121&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1169&auto=format&fit=crop"
    ],
    includedItems: ["Private 4x4 vehicle", "Experienced mountain driver", "Hotel pickup", "Bottled water", "Photo stops"],
    excludedItems: ["Ait Benhaddou entrance fee", "Meals", "Tips"],
    priceAdult: 120,
    priceChild: 60,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
    transferDetails: {
      from: "Marrakesh",
      to: "Ouarzazate",
      duration: "4-5 hours",
      distance: "200 km",
      vehicleOptions: [
        { type: "SUV 4x4", capacity: "1-4 passengers", price: 120, features: ["Air conditioning", "4x4 capability", "WiFi", "Mountain experienced driver"] },
        { type: "Minivan", capacity: "1-7 passengers", price: 150, features: ["Air conditioning", "Large luggage space", "WiFi", "Spacious seating"] },
        { type: "Luxury SUV", capacity: "1-4 passengers", price: 180, features: ["Premium leather seats", "4x4 capability", "WiFi", "Refreshments included"] },
      ]
    },
  },
  {
    id: "transfer-004",
    type: "transfers",
    title: "Luxury VIP Airport Transfer",
    description:
      "Premium airport transfer service with luxury vehicle, VIP meet & greet, and extra amenities for discerning travelers.",
    detailedDescription: {
      overview: "Experience the ultimate in comfort and style with our luxury VIP airport transfer. Travel in a premium Mercedes or BMW with professional chauffeur, enjoy VIP meet and greet service, and arrive at your destination in elegance.",
      highlights: [
        "Luxury Mercedes or BMW vehicle",
        "Professional uniformed chauffeur",
        "VIP meet and greet in arrivals",
        "Champagne and refreshments",
        "Premium WiFi and charging ports",
        "Leather interiors and privacy glass"
      ],
      sections: [
        {
          title: "VIP Experience",
          content: "Your chauffeur will meet you inside the arrivals hall with a personalized welcome sign. They'll assist with luggage and escort you to your waiting luxury vehicle, where champagne and refreshments await."
        },
        {
          title: "Additional Services",
          content: "We can arrange expedited customs assistance, porter services, and coordination with your hotel for seamless arrival. Perfect for business travelers or special occasions."
        }
      ],
      tips: [
        "Book 48 hours in advance for vehicle preferences",
        "Request specific champagne or beverage preferences",
        "Ideal for honeymoons and special celebrations",
        "Business travelers: laptop desk available on request"
      ],
      duration: "20-40 minutes",
      difficulty: "Easy",
      groupSize: "1-4 passengers"
    },
    mainImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumbnailImages: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=1074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609281362702-f46a060b2044?q=80&w=1170&auto=format&fit=crop"
    ],
    includedItems: ["Luxury vehicle", "Professional chauffeur", "VIP meet & greet", "Champagne", "Premium WiFi", "Phone chargers"],
    excludedItems: ["Customs expedite fees", "Additional stops"],
    priceAdult: 95,
    priceChild: 0,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
    transferDetails: {
      from: "Marrakesh Menara Airport",
      to: "Marrakesh City Center",
      duration: "20-40 minutes",
      distance: "6 km",
      vehicleOptions: [
        { type: "Mercedes E-Class", capacity: "1-3 passengers", price: 95, features: ["Leather interior", "Climate control", "WiFi", "Champagne", "Privacy glass"] },
        { type: "Mercedes S-Class", capacity: "1-3 passengers", price: 140, features: ["Premium leather", "Executive seating", "WiFi", "Champagne", "Massage seats"] },
        { type: "BMW 7 Series", capacity: "1-3 passengers", price: 140, features: ["Premium leather", "Executive seating", "WiFi", "Champagne", "Ambient lighting"] },
        { type: "Luxury SUV", capacity: "1-4 passengers", price: 160, features: ["Premium leather", "Extra space", "WiFi", "Champagne", "Privacy glass"] },
      ]
    },
  },
  {
    id: "transfer-005",
    type: "transfers",
    title: "Marrakesh to Fes Transfer",
    description:
      "Full-day scenic transfer from Marrakesh to Fes through the Middle Atlas Mountains with multiple stops.",
    detailedDescription: {
      overview: "Journey from the red city of Marrakesh to the ancient imperial city of Fes on this full-day scenic transfer. Cross the Middle Atlas Mountains, visit historic towns, and experience the changing landscapes of Morocco.",
      highlights: [
        "Cross the scenic Middle Atlas Mountains",
        "Visit the Roman ruins of Volubilis",
        "Stop at the holy city of Moulay Idriss",
        "See the blue town of Ifrane",
        "Cedar forests and Barbary macaques",
        "Comfortable full-day journey"
      ],
      sections: [
        {
          title: "The Route",
          content: "This 8-9 hour journey takes you through some of Morocco's most diverse landscapes. From the palm groves of Marrakesh, through the cedar forests of the Middle Atlas, past volcanic lakes, and into the historic heart of Fes."
        },
        {
          title: "Ifrane & Cedar Forests",
          content: "Stop in Ifrane, known as 'Little Switzerland' for its alpine architecture and clean streets. Visit the nearby cedar forests where wild Barbary macaque monkeys roam free."
        },
        {
          title: "Historical Stops",
          content: "Optional stops include Volubilis, Morocco's best-preserved Roman ruins, and the holy town of Moulay Idriss, the final resting place of Morocco's founder. Both offer fascinating glimpses into Morocco's rich history."
        }
      ],
      tips: [
        "Depart early morning for a relaxed journey",
        "Bring snacks and water for the drive",
        "Allow extra time for optional site visits",
        "Consider overnight stop in Fes to explore"
      ],
      duration: "8-9 hours",
      difficulty: "Easy",
      groupSize: "1-7 passengers"
    },
    mainImage: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumbnailImages: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1332&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1169&auto=format&fit=crop"
    ],
    includedItems: ["Private vehicle", "Professional driver", "Hotel pickup & dropoff", "Bottled water", "Photo stops", "WiFi"],
    excludedItems: ["Entrance fees", "Meals", "Tips", "Guide at historical sites"],
    priceAdult: 180,
    priceChild: 90,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
    transferDetails: {
      from: "Marrakesh",
      to: "Fes",
      duration: "8-9 hours",
      distance: "530 km",
      vehicleOptions: [
        { type: "Sedan", capacity: "1-3 passengers", price: 180, features: ["Air conditioning", "Luggage space", "WiFi", "Multiple photo stops"] },
        { type: "SUV", capacity: "1-4 passengers", price: 220, features: ["Air conditioning", "Extra luggage space", "WiFi", "Leather seats", "Multiple photo stops"] },
        { type: "Minivan", capacity: "1-7 passengers", price: 280, features: ["Air conditioning", "Large luggage space", "WiFi", "Spacious seating", "Multiple photo stops"] },
      ]
    },
  },
  {
    id: "transfer-006",
    type: "transfers",
    title: "Casablanca Airport to Marrakesh",
    description:
      "Private transfer from Casablanca Mohammed V Airport to Marrakesh with optional city tour stop.",
    detailedDescription: {
      overview: "For travelers arriving at Casablanca's Mohammed V International Airport, we offer comfortable private transfers directly to Marrakesh. The 3-hour journey can include an optional stop to explore Casablanca's highlights.",
      highlights: [
        "Direct airport pickup at Casablanca",
        "Comfortable 3-hour journey to Marrakesh",
        "Optional Casablanca city tour",
        "Visit Hassan II Mosque (optional)",
        "Highway driving with scenic views",
        "Flexible scheduling"
      ],
      sections: [
        {
          title: "Airport Pickup",
          content: "Your driver will meet you at Casablanca Mohammed V Airport arrivals with a personalized sign. After collecting your luggage, you'll be escorted to your private vehicle for the journey south to Marrakesh."
        },
        {
          title: "Optional Casablanca Stop",
          content: "Add a 2-3 hour stop in Casablanca to visit the magnificent Hassan II Mosque, one of the world's largest mosques and the only one in Morocco open to non-Muslims. Also see the Art Deco architecture and Corniche waterfront."
        },
        {
          title: "The Journey",
          content: "The modern highway takes you through agricultural plains and past small towns. Rest stops are available along the way. Arrive in Marrakesh refreshed and ready to explore."
        }
      ],
      tips: [
        "Hassan II Mosque visits require modest dress",
        "Mosque tours run on set schedules - plan accordingly",
        "Book late afternoon departure for evening arrival",
        "Combine with return transfer for best rates"
      ],
      duration: "3-5 hours",
      difficulty: "Easy",
      groupSize: "1-7 passengers"
    },
    mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumbnailImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1332&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609281362702-f46a060b2044?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1169&auto=format&fit=crop"
    ],
    includedItems: ["Private vehicle", "Professional driver", "Airport meet & greet", "Bottled water", "WiFi", "Highway tolls"],
    excludedItems: ["Mosque entrance fee", "Casablanca guide", "Meals", "Tips"],
    priceAdult: 150,
    priceChild: 75,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
    transferDetails: {
      from: "Casablanca Mohammed V Airport",
      to: "Marrakesh",
      duration: "3-5 hours",
      distance: "240 km",
      vehicleOptions: [
        { type: "Sedan", capacity: "1-3 passengers", price: 150, features: ["Air conditioning", "Luggage space", "WiFi", "Highway tolls included"] },
        { type: "SUV", capacity: "1-4 passengers", price: 180, features: ["Air conditioning", "Extra luggage space", "WiFi", "Leather seats", "Highway tolls included"] },
        { type: "Minivan", capacity: "1-7 passengers", price: 220, features: ["Air conditioning", "Large luggage space", "WiFi", "Spacious seating", "Highway tolls included"] },
      ]
    },
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
  transfers: transfersOffers,
  "best-offers": bestOffers,
}

// Helper function to get an offer by its ID
export function getOfferById(id: string): Offer | undefined {
  const allOffersArray = [
    ...toursOffers,
    ...excursionsOffers,
    ...activitiesOffers,
    ...packagesOffers,
    ...transfersOffers,
  ]
  return allOffersArray.find((offer) => offer.id === id)
}
