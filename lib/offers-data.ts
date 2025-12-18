import type { Language } from "./translations"

export type OfferType = "tours" | "excursions" | "activities" | "packages" | "transfers" | "best-offers" | "blog"

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

export interface OfferTranslations {
  title: string
  description: string
  detailedDescription: DetailedDescription
  includedItems: string[]
  excludedItems: string[]
}

export interface Offer {
  id: string
  type: OfferType
  departCity: string
  title: string
  description: string
  detailedDescription: DetailedDescription
  translations?: {
    en?: OfferTranslations
    fr?: OfferTranslations
    es?: OfferTranslations
  }
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
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/2448418/pexels-photo-2448418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Professional guide", "Water & snacks", "City map", "Hotel pickup/dropoff"],
    excludedItems: ["Meals", "Shopping items", "Personal expenses"],
    translations: {
      en: {
        title: "Medina Guided Walking Tour",
        description: "Explore the historic medina of Marrakesh with an expert guide. Discover hidden souks, traditional riads, and historical landmarks.",
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
        includedItems: ["Professional guide", "Water & snacks", "City map", "Hotel pickup/dropoff"],
        excludedItems: ["Meals", "Shopping items", "Personal expenses"],
      },
      fr: {
        title: "Visite Guidée à Pied de la Médina",
        description: "Explorez la médina historique de Marrakech avec un guide expert. Découvrez les souks cachés, les riads traditionnels et les monuments historiques.",
        detailedDescription: {
          overview: "Plongez au cœur vibrant de Marrakech avec notre visite guidée à pied à travers l'ancienne médina. Ce site classé au patrimoine mondial de l'UNESCO prend vie lorsque vous explorez ses ruelles labyrinthiques, découvrant des siècles d'histoire, de culture et de traditions artisanales.",
          highlights: [
            "Parcourez les fameux souks avec un expert local",
            "Visitez les mosquées et madrasas historiques (vues extérieures)",
            "Découvrez des riads cachés à l'architecture époustouflante",
            "Apprenez les techniques de l'artisanat marocain traditionnel",
            "Dégustez la cuisine de rue locale et le thé à la menthe"
          ],
          sections: [
            {
              title: "À Quoi S'Attendre",
              content: "Votre voyage commence sur l'emblématique place Jemaa el-Fnaa, où vous rencontrerez votre guide compétent. De là, vous vous aventurerez au cœur des ruelles sinueuses de la médina, visitant des ateliers d'artisans, des marchés d'épices et des tanneries. Votre guide partagera des histoires fascinantes sur la riche histoire et l'importance culturelle de la ville."
            },
            {
              title: "Aperçus Culturels",
              content: "Découvrez la vie quotidienne des résidents de la médina, l'art du marchandage marocain et l'importance des métiers traditionnels comme le zellige, la maroquinerie et la ferronnerie. Votre guide vous aidera à comprendre le tissu social qui rend Marrakech unique."
            },
            {
              title: "Point de Rencontre",
              content: "Nous proposons une prise en charge pratique à l'hôtel depuis n'importe quel endroit de Marrakech. Sinon, retrouvez-nous au point de rencontre désigné près du Café de France surplombant la place Jemaa el-Fnaa."
            }
          ],
          itinerary: [
            { time: "09:00", activity: "Prise en charge à l'hôtel ou rencontre à Jemaa el-Fnaa" },
            { time: "09:30", activity: "Exploration du souk aux épices et des herboristes" },
            { time: "10:30", activity: "Visite des tanneries" },
            { time: "11:30", activity: "Quartier des artisans et ateliers" },
            { time: "12:30", activity: "Pause déjeuner traditionnel (optionnel)" },
            { time: "13:30", activity: "Retour au point de départ" }
          ],
          tips: [
            "Portez des chaussures de marche confortables",
            "Apportez de l'argent liquide pour les petits achats",
            "Habillez-vous modestement par respect pour les coutumes locales",
            "Restez proche de votre guide dans les zones bondées"
          ],
          duration: "4-5 heures",
          difficulty: "Facile",
          groupSize: "2-12 personnes"
        },
        includedItems: ["Guide professionnel", "Eau et collations", "Plan de la ville", "Prise en charge/dépose à l'hôtel"],
        excludedItems: ["Repas", "Articles de shopping", "Dépenses personnelles"],
      },
      es: {
        title: "Tour Guiado a Pie por la Medina",
        description: "Explore la histórica medina de Marrakech con un guía experto. Descubra zocos ocultos, riads tradicionales y monumentos históricos.",
        detailedDescription: {
          overview: "Sumérjase en el vibrante corazón de Marrakech con nuestro tour guiado a pie por la antigua medina. Este sitio Patrimonio de la Humanidad de la UNESCO cobra vida mientras explora sus calles laberínticas, descubriendo siglos de historia, cultura y tradiciones artesanales.",
          highlights: [
            "Navegue por los famosos zocos con un experto local",
            "Visite mezquitas y madrasas históricas (vistas exteriores)",
            "Descubra riads ocultos con impresionante arquitectura",
            "Aprenda sobre la artesanía tradicional marroquí",
            "Pruebe la comida callejera local y el té de menta"
          ],
          sections: [
            {
              title: "Qué Esperar",
              content: "Su viaje comienza en la icónica plaza Jemaa el-Fnaa, donde conocerá a su guía experto. Desde allí, se aventurará en los sinuosos callejones de la medina, visitando talleres de artesanos, mercados de especias y curtidurías. Su guía compartirá historias fascinantes sobre la rica historia y el significado cultural de la ciudad."
            },
            {
              title: "Perspectivas Culturales",
              content: "Conozca la vida cotidiana de los residentes de la medina, el arte del regateo marroquí y la importancia de las artesanías tradicionales como el zellige, los artículos de cuero y la metalurgia. Su guía le ayudará a comprender el tejido social que hace única a Marrakech."
            },
            {
              title: "Punto de Encuentro",
              content: "Ofrecemos recogida conveniente en el hotel desde cualquier lugar de Marrakech. Alternativamente, encuéntrenos en el punto de encuentro designado cerca del Café de France con vista a la plaza Jemaa el-Fnaa."
            }
          ],
          itinerary: [
            { time: "09:00", activity: "Recogida en el hotel o encuentro en Jemaa el-Fnaa" },
            { time: "09:30", activity: "Explorar el zoco de especias y tiendas de hierbas" },
            { time: "10:30", activity: "Visitar las curtidurías" },
            { time: "11:30", activity: "Barrio de artesanos y talleres" },
            { time: "12:30", activity: "Pausa para almuerzo tradicional (opcional)" },
            { time: "13:30", activity: "Regreso al punto de partida" }
          ],
          tips: [
            "Use zapatos cómodos para caminar",
            "Traiga efectivo para pequeñas compras",
            "Vista con modestia por respeto a las costumbres locales",
            "Permanezca cerca de su guía en áreas concurridas"
          ],
          duration: "4-5 horas",
          difficulty: "Fácil",
          groupSize: "2-12 personas"
        },
        includedItems: ["Guía profesional", "Agua y snacks", "Mapa de la ciudad", "Recogida/regreso al hotel"],
        excludedItems: ["Comidas", "Artículos de compras", "Gastos personales"],
      },
    },
    priceAdult: 45,
    priceChild: 25,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "tour-002",
    type: "tours",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/3889826/pexels-photo-3889826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Skip-the-line tickets", "Professional guide", "Transport", "Refreshments"],
    excludedItems: ["Meals", "Souvenir purchases"],
    translations: {
      en: {
        title: "Palaces & Gardens Evening Tour",
        description: "Experience the stunning Bahia Palace and Majorelle Gardens in the golden evening light. Perfect for photography enthusiasts.",
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
        includedItems: ["Skip-the-line tickets", "Professional guide", "Transport", "Refreshments"],
        excludedItems: ["Meals", "Souvenir purchases"],
      },
      fr: {
        title: "Visite des Palais et Jardins en Soirée",
        description: "Découvrez le magnifique Palais de la Bahia et les Jardins Majorelle dans la lumière dorée du soir. Parfait pour les passionnés de photographie.",
        detailedDescription: {
          overview: "Découvrez la splendeur architecturale des palais et jardins les plus emblématiques de Marrakech pendant l'heure magique dorée. Cette visite soigneusement programmée capture la beauté de l'architecture royale marocaine baignée de lumière chaude du soir, offrant des opportunités photo incomparables.",
          highlights: [
            "Accès coupe-file au Palais de la Bahia",
            "Explorez les célèbres Jardins Majorelle",
            "Capturez de superbes photos à l'heure dorée",
            "Découvrez l'histoire royale marocaine",
            "Visitez le Musée Yves Saint Laurent (extérieur)"
          ],
          sections: [
            {
              title: "Palais de la Bahia",
              content: "Admirez le travail de carrelage complexe, le cèdre sculpté et les plafonds peints de ce chef-d'œuvre du XIXe siècle. Construit pour un grand vizir, le palais présente les plus beaux exemples de l'artisanat marocain et de l'architecture islamique."
            },
            {
              title: "Jardins Majorelle",
              content: "Promenez-vous dans les jardins bleu vibrant créés par le peintre français Jacques Majorelle et restaurés plus tard par Yves Saint Laurent. Les bâtiments bleu cobalt, les plantes exotiques et les bassins tranquilles créent un paradis pour les photographes."
            },
            {
              title: "Conseils Photographie",
              content: "Nos guides sont formés pour vous aider à trouver les meilleurs angles et la meilleure lumière pour vos photos. Que vous utilisiez un smartphone ou un appareil photo professionnel, vous capturerez des souvenirs inoubliables."
            }
          ],
          itinerary: [
            { time: "15:00", activity: "Prise en charge à l'hôtel" },
            { time: "15:30", activity: "Visite guidée du Palais de la Bahia" },
            { time: "17:00", activity: "Transfert vers les Jardins Majorelle" },
            { time: "17:30", activity: "Exploration des Jardins Majorelle" },
            { time: "19:00", activity: "Vue du coucher de soleil et rafraîchissements" },
            { time: "19:30", activity: "Retour à l'hôtel" }
          ],
          tips: [
            "Apportez un appareil photo performant en basse lumière",
            "Portez des chaussures confortables pour marcher",
            "Réservez à l'avance pendant la haute saison",
            "Envisagez un trépied pour les photos de coucher de soleil"
          ],
          duration: "4-5 heures",
          difficulty: "Facile",
          groupSize: "2-10 personnes"
        },
        includedItems: ["Billets coupe-file", "Guide professionnel", "Transport", "Rafraîchissements"],
        excludedItems: ["Repas", "Achats de souvenirs"],
      },
      es: {
        title: "Tour de Palacios y Jardines al Atardecer",
        description: "Experimente el impresionante Palacio Bahía y los Jardines Majorelle en la luz dorada del atardecer. Perfecto para entusiastas de la fotografía.",
        detailedDescription: {
          overview: "Descubra el esplendor arquitectónico de los palacios y jardines más icónicos de Marrakech durante la mágica hora dorada. Este tour cuidadosamente programado captura la belleza de la arquitectura real marroquí bañada en cálida luz vespertina, ofreciendo oportunidades fotográficas incomparables.",
          highlights: [
            "Acceso sin colas al Palacio Bahía",
            "Explore los famosos Jardines Majorelle",
            "Capture impresionantes fotografías de la hora dorada",
            "Conozca la historia real marroquí",
            "Visite el Museo Yves Saint Laurent (exterior)"
          ],
          sections: [
            {
              title: "Palacio Bahía",
              content: "Maravíllese con el intrincado trabajo de azulejos, la madera de cedro tallada y los techos pintados de esta obra maestra del siglo XIX. Construido para un gran visir, el palacio muestra los mejores ejemplos de artesanía marroquí y arquitectura islámica."
            },
            {
              title: "Jardines Majorelle",
              content: "Pasee por los vibrantes jardines azules creados por el pintor francés Jacques Majorelle y posteriormente restaurados por Yves Saint Laurent. Los edificios azul cobalto, las plantas exóticas y las piscinas tranquilas crean un paraíso para fotógrafos."
            },
            {
              title: "Consejos de Fotografía",
              content: "Nuestros guías están capacitados para ayudarle a encontrar los mejores ángulos e iluminación para sus fotos. Ya sea que use un teléfono o una cámara profesional, capturará recuerdos que durarán toda la vida."
            }
          ],
          itinerary: [
            { time: "15:00", activity: "Recogida en el hotel" },
            { time: "15:30", activity: "Tour guiado del Palacio Bahía" },
            { time: "17:00", activity: "Traslado a los Jardines Majorelle" },
            { time: "17:30", activity: "Exploración de los Jardines Majorelle" },
            { time: "19:00", activity: "Vista del atardecer y refrescos" },
            { time: "19:30", activity: "Regreso al hotel" }
          ],
          tips: [
            "Traiga una cámara con buena capacidad en poca luz",
            "Use zapatos cómodos para caminar",
            "Reserve con anticipación durante la temporada alta",
            "Considere un trípode para fotos del atardecer"
          ],
          duration: "4-5 horas",
          difficulty: "Fácil",
          groupSize: "2-10 personas"
        },
        includedItems: ["Entradas sin colas", "Guía profesional", "Transporte", "Refrescos"],
        excludedItems: ["Comidas", "Compras de recuerdos"],
      },
    },
    priceAdult: 65,
    priceChild: 40,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "tour-003",
    type: "tours",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/30251304/pexels-photo-30251304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Hotel pickup/dropoff", "Professional guide", "Lunch", "Tea ceremony", "Transport"],
    excludedItems: ["Personal shopping", "Additional activities"],
    translations: {
      en: {
        title: "Atlas Mountains Day Excursion",
        description: "Journey to the majestic Atlas Mountains, visit Berber villages, and enjoy traditional Moroccan tea with mountain views.",
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
        includedItems: ["Hotel pickup/dropoff", "Professional guide", "Lunch", "Tea ceremony", "Transport"],
        excludedItems: ["Personal shopping", "Additional activities"],
      },
      fr: {
        title: "Excursion d'une Journée dans les Montagnes de l'Atlas",
        description: "Voyagez vers les majestueuses montagnes de l'Atlas, visitez des villages berbères et savourez un thé marocain traditionnel avec vue sur les montagnes.",
        detailedDescription: {
          overview: "Échappez à l'agitation de la ville pour une journée de paysages montagneux à couper le souffle et de culture berbère authentique. Cette excursion d'une journée complète vous emmène à travers des routes de montagne sinueuses vers des villages traditionnels où les modes de vie ancestraux perdurent.",
          highlights: [
            "Traversée panoramique du Haut Atlas",
            "Visite de villages berbères authentiques",
            "Cérémonie du thé marocain traditionnel",
            "Déjeuner berbère fait maison avec vue sur les montagnes",
            "Rencontre avec des artisans et des familles locales"
          ],
          sections: [
            {
              title: "Le Voyage",
              content: "Empruntez le col du Tizi n'Test, l'une des routes de montagne les plus spectaculaires du Maroc. Arrêtez-vous aux points de vue panoramiques pour photographier le paysage époustouflant, y compris les vues sur le plus haut sommet d'Afrique du Nord, le Jebel Toubkal."
            },
            {
              title: "Expérience du Village Berbère",
              content: "Visitez un village berbère traditionnel où vous serez accueillis dans une maison locale. Découvrez la vie quotidienne, l'artisanat traditionnel et l'hospitalité qui définit la culture berbère. Participez à la fabrication du pain ou à d'autres activités traditionnelles."
            },
            {
              title: "Expérience Culinaire",
              content: "Savourez un délicieux tagine fait maison préparé par des femmes locales avec des ingrédients frais et locaux. Le repas est accompagné de thé à la menthe traditionnel et de panoramas montagneux époustouflants."
            }
          ],
          itinerary: [
            { time: "08:00", activity: "Prise en charge à l'hôtel à Marrakech" },
            { time: "09:30", activity: "Premier arrêt point de vue montagne" },
            { time: "10:30", activity: "Arrivée au village berbère" },
            { time: "11:00", activity: "Visite du village et d'une maison" },
            { time: "12:30", activity: "Déjeuner berbère traditionnel" },
            { time: "14:00", activity: "Randonnée courte optionnelle ou temps libre" },
            { time: "15:30", activity: "Début du retour" },
            { time: "17:30", activity: "Arrivée à Marrakech" }
          ],
          tips: [
            "Habillez-vous en couches car le temps en montagne peut changer",
            "Apportez de la crème solaire et un chapeau",
            "Portez des chaussures solides pour les promenades au village",
            "Apportez de petits cadeaux pour les enfants si vous le souhaitez"
          ],
          duration: "Journée complète (9-10 heures)",
          difficulty: "Facile à Modéré",
          groupSize: "2-15 personnes"
        },
        includedItems: ["Prise en charge/dépose à l'hôtel", "Guide professionnel", "Déjeuner", "Cérémonie du thé", "Transport"],
        excludedItems: ["Shopping personnel", "Activités supplémentaires"],
      },
      es: {
        title: "Excursión de un Día a las Montañas del Atlas",
        description: "Viaje a las majestuosas montañas del Atlas, visite pueblos bereberes y disfrute del té tradicional marroquí con vistas a las montañas.",
        detailedDescription: {
          overview: "Escape del bullicio de la ciudad para un día de paisajes montañosos impresionantes y auténtica cultura bereber. Esta excursión de día completo le lleva por sinuosas carreteras de montaña hasta pueblos tradicionales donde los modos de vida ancestrales continúan sin cambios.",
          highlights: [
            "Recorrido panorámico por el Alto Atlas",
            "Visita a auténticos pueblos bereberes",
            "Ceremonia tradicional del té marroquí",
            "Almuerzo bereber casero con vistas a las montañas",
            "Encuentro con artesanos y familias locales"
          ],
          sections: [
            {
              title: "El Viaje",
              content: "Viaje por el paso Tizi n'Test, una de las carreteras de montaña más espectaculares de Marruecos. Deténgase en miradores panorámicos para fotografiar el impresionante paisaje, incluyendo vistas del pico más alto del norte de África, el Jebel Toubkal."
            },
            {
              title: "Experiencia en el Pueblo Bereber",
              content: "Visite un pueblo bereber tradicional donde será recibido en una casa local. Conozca la vida cotidiana, la artesanía tradicional y la hospitalidad que define la cultura bereber. Participe en la elaboración de pan u otras actividades tradicionales."
            },
            {
              title: "Experiencia Culinaria",
              content: "Disfrute de un delicioso tajín casero preparado por mujeres locales con ingredientes frescos y locales. La comida está acompañada de té de menta tradicional y espectaculares panoramas montañosos."
            }
          ],
          itinerary: [
            { time: "08:00", activity: "Recogida en el hotel en Marrakech" },
            { time: "09:30", activity: "Primera parada en mirador de montaña" },
            { time: "10:30", activity: "Llegada al pueblo bereber" },
            { time: "11:00", activity: "Tour del pueblo y visita a una casa" },
            { time: "12:30", activity: "Almuerzo bereber tradicional" },
            { time: "14:00", activity: "Caminata corta opcional o tiempo libre" },
            { time: "15:30", activity: "Inicio del regreso" },
            { time: "17:30", activity: "Llegada a Marrakech" }
          ],
          tips: [
            "Vista en capas ya que el clima de montaña puede cambiar",
            "Traiga protector solar y sombrero",
            "Use calzado resistente para caminar por el pueblo",
            "Traiga pequeños regalos para los niños si lo desea"
          ],
          duration: "Día completo (9-10 horas)",
          difficulty: "Fácil a Moderado",
          groupSize: "2-15 personas"
        },
        includedItems: ["Recogida/regreso al hotel", "Guía profesional", "Almuerzo", "Ceremonia del té", "Transporte"],
        excludedItems: ["Compras personales", "Actividades adicionales"],
      },
    },
    priceAdult: 85,
    priceChild: 55,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
]

// Excursions offers
export const excursionsOffers: Offer[] = [
  {
    id: "excur-001",
    type: "excursions",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/14267607/pexels-photo-14267607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Transport", "Camel trekking", "Desert camp", "Meals", "Bedouin guide", "Blankets"],
    excludedItems: ["Personal purchases", "Tips"],
    translations: {
      en: {
        title: "Sahara Desert 3-Day Adventure",
        description: "Experience the magic of the Sahara with camel trekking, desert camping, and sunrise over golden dunes.",
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
        includedItems: ["Transport", "Camel trekking", "Desert camp", "Meals", "Bedouin guide", "Blankets"],
        excludedItems: ["Personal purchases", "Tips"],
      },
      fr: {
        title: "Aventure de 3 Jours dans le Désert du Sahara",
        description: "Vivez la magie du Sahara avec une randonnée à dos de chameau, un camping dans le désert et un lever de soleil sur les dunes dorées.",
        detailedDescription: {
          overview: "Embarquez pour un voyage inoubliable vers le désert du Sahara, la merveille naturelle la plus emblématique du Maroc. Cette aventure de trois jours vous emmène de Marrakech à travers des paysages spectaculaires jusqu'aux dunes dorées de l'Erg Chebbi, où vous vivrez la vie authentique du désert sous un ciel étoilé.",
          highlights: [
            "Traversée du Haut Atlas via le col du Tizi n'Tichka",
            "Visite du site UNESCO d'Aït Benhaddou",
            "Randonnée à dos de chameau dans les dunes de l'Erg Chebbi",
            "Nuit dans un camp berbère traditionnel",
            "Lever de soleil sur les dunes du Sahara",
            "Exploration des Gorges du Todra"
          ],
          sections: [
            {
              title: "Jour 1 : Marrakech - Vallée du Dadès",
              content: "Départ de Marrakech tôt le matin et traversée du spectaculaire Haut Atlas via le col du Tizi n'Tichka (2 260 m). Arrêt à Aït Benhaddou, le célèbre village fortifié présent dans de nombreux films hollywoodiens. Continuation à travers la Vallée des Roses et l'oasis de Skoura jusqu'aux Gorges du Dadès pour la nuit."
            },
            {
              title: "Jour 2 : Dadès - Merzouga et Camp Désert",
              content: "Voyage à travers les Gorges du Todra, le Grand Canyon du Maroc, avant de continuer vers Merzouga aux portes du Sahara. En fin d'après-midi, montez sur votre chameau pour la randonnée dans les dunes. Admirez le coucher de soleil qui peint le sable en or avant d'arriver à votre camp traditionnel pour le dîner, la musique et l'observation des étoiles."
            },
            {
              title: "Jour 3 : Lever de Soleil et Retour",
              content: "Réveil avant l'aube pour gravir une dune et assister au spectaculaire lever de soleil saharien. Après le petit-déjeuner, retour à dos de chameau vers Merzouga, puis début du voyage de retour panoramique vers Marrakech par un itinéraire différent, arrivée en soirée."
            }
          ],
          tips: [
            "Emportez des vêtements en couches - les nuits sont froides, les jours chauds",
            "Apportez lunettes de soleil, crème solaire et un foulard contre le sable",
            "Chargez tous vos appareils avant le camp",
            "Réservez pendant la pleine lune pour un éclairage nocturne magique"
          ],
          duration: "3 jours / 2 nuits",
          difficulty: "Modéré",
          groupSize: "4-16 personnes"
        },
        includedItems: ["Transport", "Randonnée à dos de chameau", "Camp désert", "Repas", "Guide bédouin", "Couvertures"],
        excludedItems: ["Achats personnels", "Pourboires"],
      },
      es: {
        title: "Aventura de 3 Días en el Desierto del Sahara",
        description: "Experimente la magia del Sahara con paseo en camello, camping en el desierto y amanecer sobre las dunas doradas.",
        detailedDescription: {
          overview: "Embárquese en un viaje inolvidable al Desierto del Sahara, la maravilla natural más icónica de Marruecos. Esta aventura de tres días le lleva desde Marrakech a través de paisajes dramáticos hasta las dunas doradas de Erg Chebbi, donde experimentará la auténtica vida del desierto bajo un manto de estrellas.",
          highlights: [
            "Cruce del Alto Atlas por el paso Tizi n'Tichka",
            "Visita al sitio UNESCO de Ait Benhaddou",
            "Paseo en camello por las dunas de Erg Chebbi",
            "Dormir en un campamento bereber tradicional",
            "Amanecer sobre las dunas del Sahara",
            "Explorar las Gargantas del Todra"
          ],
          sections: [
            {
              title: "Día 1: Marrakech al Valle del Dades",
              content: "Salida temprano de Marrakech y cruce del espectacular Alto Atlas por el paso Tizi n'Tichka (2.260 m). Parada en Ait Benhaddou, la famosa aldea fortificada que aparece en muchas películas de Hollywood. Continúe por el Valle de las Rosas y el oasis de Skoura hasta las dramáticas Gargantas del Dades para pasar la noche."
            },
            {
              title: "Día 2: Dades a Merzouga y Campamento",
              content: "Viaje a través de las Gargantas del Todra, el Gran Cañón de Marruecos, antes de continuar hacia Merzouga en el borde del Sahara. Por la tarde, monte en su camello para el trek hacia las dunas. Vea el atardecer pintar la arena de oro antes de llegar a su campamento tradicional para la cena, música y observación de estrellas."
            },
            {
              title: "Día 3: Amanecer y Regreso",
              content: "Despierte antes del amanecer para subir una duna y presenciar el espectacular amanecer del Sahara. Después del desayuno, regrese en camello a Merzouga y luego comience el pintoresco viaje de regreso a Marrakech por una ruta diferente, llegando por la noche."
            }
          ],
          tips: [
            "Empaque en capas - las noches son frías, los días calientes",
            "Traiga gafas de sol, protector solar y una bufanda para la arena",
            "Cargue todos los dispositivos antes del campamento",
            "Reserve durante la luna llena para una iluminación nocturna mágica"
          ],
          duration: "3 días / 2 noches",
          difficulty: "Moderado",
          groupSize: "4-16 personas"
        },
        includedItems: ["Transporte", "Paseo en camello", "Campamento desierto", "Comidas", "Guía beduino", "Mantas"],
        excludedItems: ["Compras personales", "Propinas"],
      },
    },
    priceAdult: 320,
    priceChild: 200,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "excur-002",
    type: "excursions",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/11218102/pexels-photo-11218102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Transport", "Guide", "Lunch", "Swimming access", "Towel"],
    excludedItems: ["Souvenir purchases", "Extra snacks"],
    translations: {
      en: {
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
            { title: "The Waterfalls", content: "The famous seven waterfalls of Setti Fatma cascade down the mountainside, with the first two easily accessible. For the adventurous, continue climbing to discover more secluded falls. The pools at the base offer perfect spots for a refreshing swim." },
            { title: "Berber Culture", content: "Experience authentic Berber hospitality in the mountain villages. Visit a traditional home to learn about daily life, and enjoy mint tea with local families. The valley is known for its terracotta pottery and woven goods." },
            { title: "Riverside Dining", content: "Enjoy lunch at a riverside restaurant where tables are set on platforms over the rushing water. Savor traditional tagines, fresh salads, and grilled meats while listening to the sound of the river below." }
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
          tips: ["Wear water shoes or sandals with good grip", "Bring swimwear and a towel", "The waterfall hike involves rock scrambling", "Visit on weekdays to avoid crowds"],
          duration: "Full day (8-9 hours)",
          difficulty: "Moderate",
          groupSize: "2-12 people"
        },
        includedItems: ["Transport", "Guide", "Lunch", "Swimming access", "Towel"],
        excludedItems: ["Souvenir purchases", "Extra snacks"],
      },
      fr: {
        title: "Vallée de l'Ourika et Cascades",
        description: "Visitez la pittoresque vallée de l'Ourika, baignez-vous dans des cascades rafraîchissantes et savourez un déjeuner berbère traditionnel.",
        detailedDescription: {
          overview: "Échappez à la chaleur de Marrakech pour une journée rafraîchissante dans la luxuriante vallée de l'Ourika, nichée au pied du Haut Atlas. À seulement une heure de la ville, ce paradis verdoyant offre des cascades spectaculaires, des villages berbères traditionnels et une retraite de montagne fraîche.",
          highlights: [
            "Visitez les spectaculaires cascades de Setti Fatma",
            "Baignez-vous dans des bassins de montagne cristallins",
            "Déjeuner berbère traditionnel au bord de la rivière",
            "Explorez d'authentiques villages de montagne",
            "Visitez une maison berbère traditionnelle",
            "Découvrez les jardins de plantes aromatiques et médicinales"
          ],
          sections: [
            { title: "Les Cascades", content: "Les célèbres sept cascades de Setti Fatma dévalent la montagne, les deux premières étant facilement accessibles. Pour les plus aventureux, continuez l'ascension pour découvrir des chutes plus isolées. Les bassins au pied offrent des endroits parfaits pour se rafraîchir." },
            { title: "Culture Berbère", content: "Vivez l'hospitalité berbère authentique dans les villages de montagne. Visitez une maison traditionnelle pour découvrir la vie quotidienne et savourez un thé à la menthe avec les familles locales. La vallée est réputée pour sa poterie en terre cuite et ses tissages." },
            { title: "Déjeuner au Bord de la Rivière", content: "Déjeunez dans un restaurant au bord de la rivière où les tables sont installées sur des plateformes au-dessus de l'eau vive. Savourez des tagines traditionnels, des salades fraîches et des viandes grillées en écoutant le bruit de la rivière." }
          ],
          itinerary: [
            { time: "09:00", activity: "Départ de Marrakech" },
            { time: "10:00", activity: "Arrivée à la vallée de l'Ourika" },
            { time: "10:30", activity: "Randonnée vers les cascades" },
            { time: "12:00", activity: "Baignade et détente" },
            { time: "13:30", activity: "Déjeuner traditionnel" },
            { time: "15:00", activity: "Visite du village berbère" },
            { time: "16:00", activity: "Voyage de retour" },
            { time: "17:30", activity: "Arrivée à Marrakech" }
          ],
          tips: ["Portez des chaussures d'eau ou des sandales antidérapantes", "Apportez maillot de bain et serviette", "La randonnée vers les cascades implique de l'escalade sur rochers", "Visitez en semaine pour éviter la foule"],
          duration: "Journée complète (8-9 heures)",
          difficulty: "Modéré",
          groupSize: "2-12 personnes"
        },
        includedItems: ["Transport", "Guide", "Déjeuner", "Accès baignade", "Serviette"],
        excludedItems: ["Achats de souvenirs", "Snacks supplémentaires"],
      },
      es: {
        title: "Valle de Ourika y Cascadas",
        description: "Visite el pintoresco Valle de Ourika, nade en refrescantes cascadas y disfrute de un almuerzo bereber tradicional.",
        detailedDescription: {
          overview: "Escape del calor de Marrakech para un día refrescante en el exuberante Valle de Ourika, enclavado en las estribaciones del Alto Atlas. A solo una hora de la ciudad, este paraíso verde ofrece impresionantes cascadas, pueblos bereberes tradicionales y un fresco retiro de montaña.",
          highlights: [
            "Visite las espectaculares cascadas de Setti Fatma",
            "Nade en piscinas de montaña cristalinas",
            "Almuerzo bereber tradicional junto al río",
            "Explore auténticos pueblos de montaña",
            "Visite una casa bereber tradicional",
            "Vea jardines de plantas aromáticas y medicinales"
          ],
          sections: [
            { title: "Las Cascadas", content: "Las famosas siete cascadas de Setti Fatma descienden por la ladera de la montaña, siendo las dos primeras fácilmente accesibles. Para los aventureros, continúe subiendo para descubrir cascadas más aisladas. Las piscinas en la base ofrecen lugares perfectos para un baño refrescante." },
            { title: "Cultura Bereber", content: "Experimente la auténtica hospitalidad bereber en los pueblos de montaña. Visite una casa tradicional para conocer la vida cotidiana y disfrute de té de menta con las familias locales. El valle es conocido por su cerámica de terracota y tejidos." },
            { title: "Almuerzo Junto al Río", content: "Disfrute del almuerzo en un restaurante junto al río donde las mesas están sobre plataformas encima del agua corriente. Saboree tajines tradicionales, ensaladas frescas y carnes a la parrilla mientras escucha el sonido del río." }
          ],
          itinerary: [
            { time: "09:00", activity: "Salida de Marrakech" },
            { time: "10:00", activity: "Llegada al Valle de Ourika" },
            { time: "10:30", activity: "Caminata a las cascadas" },
            { time: "12:00", activity: "Natación y relajación" },
            { time: "13:30", activity: "Almuerzo tradicional" },
            { time: "15:00", activity: "Visita al pueblo bereber" },
            { time: "16:00", activity: "Viaje de regreso" },
            { time: "17:30", activity: "Llegada a Marrakech" }
          ],
          tips: ["Use zapatos de agua o sandalias con buen agarre", "Traiga traje de baño y toalla", "La caminata a las cascadas implica escalar rocas", "Visite entre semana para evitar multitudes"],
          duration: "Día completo (8-9 horas)",
          difficulty: "Moderado",
          groupSize: "2-12 personas"
        },
        includedItems: ["Transporte", "Guía", "Almuerzo", "Acceso a natación", "Toalla"],
        excludedItems: ["Compras de recuerdos", "Snacks extra"],
      },
    },
    priceAdult: 65,
    priceChild: 40,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "excur-003",
    type: "excursions",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/30251304/pexels-photo-30251304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Professional trekking guide", "Packed lunch", "Transport", "Water", "Insurance"],
    excludedItems: ["Equipment rental", "Personal gear"],
    translations: {
      en: {
        title: "High Atlas Trek & Imlil Village",
        description: "Trek through alpine meadows to Imlil village, meet local families, and discover traditional mountain life.",
        detailedDescription: {
          overview: "Discover the heart of the High Atlas Mountains with this trekking adventure to Imlil, the gateway to North Africa's highest peak. Walk through terraced farmland, walnut groves, and traditional villages while experiencing the warm hospitality of the Berber people.",
          highlights: ["Trek through stunning alpine scenery", "Visit the traditional village of Imlil", "Views of Jebel Toubkal (4,167m)", "Meet local Berber families", "Traditional mountain lunch", "Visit the Kasbah du Toubkal"],
          sections: [
            { title: "The Trek", content: "Starting from Imlil, follow ancient mule tracks through walnut and cherry orchards. Pass through small hamlets where life has changed little over centuries. The trails offer spectacular views of the surrounding peaks and valleys." },
            { title: "Village Life", content: "Experience authentic Berber culture in mountain villages. Visit local homes, see traditional crafts like carpet weaving, and learn about the sustainable farming practices that have supported these communities for generations." },
            { title: "The Kasbah", content: "Visit the renowned Kasbah du Toubkal, a former summer residence of a local chief, now a stunning mountain retreat. Enjoy lunch on the terrace with panoramic views of the Toubkal massif." }
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
          tips: ["Wear proper hiking boots", "Bring layers - mountain weather changes quickly", "Trek poles recommended but not essential", "Bring cash for local purchases"],
          duration: "Full day (10 hours)",
          difficulty: "Moderate to Challenging",
          groupSize: "2-10 people"
        },
        includedItems: ["Professional trekking guide", "Packed lunch", "Transport", "Water", "Insurance"],
        excludedItems: ["Equipment rental", "Personal gear"],
      },
      fr: {
        title: "Randonnée Haut Atlas et Village d'Imlil",
        description: "Randonnez à travers les prairies alpines jusqu'au village d'Imlil, rencontrez des familles locales et découvrez la vie traditionnelle en montagne.",
        detailedDescription: {
          overview: "Découvrez le cœur du Haut Atlas avec cette aventure de randonnée vers Imlil, la porte d'entrée vers le plus haut sommet d'Afrique du Nord. Marchez à travers des terres agricoles en terrasses, des noyers et des villages traditionnels tout en découvrant la chaleureuse hospitalité du peuple berbère.",
          highlights: ["Randonnez à travers des paysages alpins époustouflants", "Visitez le village traditionnel d'Imlil", "Vues sur le Jebel Toubkal (4 167 m)", "Rencontrez des familles berbères locales", "Déjeuner traditionnel en montagne", "Visitez la Kasbah du Toubkal"],
          sections: [
            { title: "La Randonnée", content: "Au départ d'Imlil, suivez d'anciens sentiers muletiers à travers les vergers de noyers et de cerisiers. Traversez de petits hameaux où la vie a peu changé au fil des siècles. Les sentiers offrent des vues spectaculaires sur les sommets et les vallées environnantes." },
            { title: "Vie de Village", content: "Découvrez la culture berbère authentique dans les villages de montagne. Visitez des maisons locales, observez l'artisanat traditionnel comme le tissage de tapis et découvrez les pratiques agricoles durables qui soutiennent ces communautés depuis des générations." },
            { title: "La Kasbah", content: "Visitez la célèbre Kasbah du Toubkal, ancienne résidence d'été d'un chef local, aujourd'hui une magnifique retraite de montagne. Déjeunez sur la terrasse avec une vue panoramique sur le massif du Toubkal." }
          ],
          itinerary: [
            { time: "07:30", activity: "Départ de Marrakech" },
            { time: "09:00", activity: "Arrivée à Imlil" },
            { time: "09:30", activity: "Début de la randonnée avec guide local" },
            { time: "11:00", activity: "Visites de villages en chemin" },
            { time: "12:30", activity: "Déjeuner à la Kasbah du Toubkal" },
            { time: "14:00", activity: "Exploration du village d'Imlil" },
            { time: "15:30", activity: "Voyage de retour" },
            { time: "17:30", activity: "Arrivée à Marrakech" }
          ],
          tips: ["Portez de bonnes chaussures de randonnée", "Apportez des couches - le temps en montagne change vite", "Bâtons de marche recommandés mais pas essentiels", "Apportez de l'argent pour les achats locaux"],
          duration: "Journée complète (10 heures)",
          difficulty: "Modéré à Difficile",
          groupSize: "2-10 personnes"
        },
        includedItems: ["Guide de randonnée professionnel", "Déjeuner pique-nique", "Transport", "Eau", "Assurance"],
        excludedItems: ["Location d'équipement", "Équipement personnel"],
      },
      es: {
        title: "Trekking Alto Atlas y Pueblo de Imlil",
        description: "Haga senderismo por praderas alpinas hasta el pueblo de Imlil, conozca familias locales y descubra la vida tradicional de montaña.",
        detailedDescription: {
          overview: "Descubra el corazón del Alto Atlas con esta aventura de senderismo a Imlil, la puerta de entrada al pico más alto del norte de África. Camine por tierras de cultivo en terrazas, nogales y pueblos tradicionales mientras experimenta la cálida hospitalidad del pueblo bereber.",
          highlights: ["Senderismo por impresionantes paisajes alpinos", "Visite el tradicional pueblo de Imlil", "Vistas del Jebel Toubkal (4.167 m)", "Conozca familias bereberes locales", "Almuerzo tradicional de montaña", "Visite la Kasbah du Toubkal"],
          sections: [
            { title: "El Trekking", content: "Partiendo de Imlil, siga antiguos senderos de mulas a través de huertos de nogales y cerezos. Pase por pequeños caseríos donde la vida ha cambiado poco a lo largo de los siglos. Los senderos ofrecen vistas espectaculares de los picos y valles circundantes." },
            { title: "Vida del Pueblo", content: "Experimente la auténtica cultura bereber en los pueblos de montaña. Visite hogares locales, observe artesanías tradicionales como el tejido de alfombras y aprenda sobre las prácticas agrícolas sostenibles que han sustentado estas comunidades durante generaciones." },
            { title: "La Kasbah", content: "Visite la renombrada Kasbah du Toubkal, antigua residencia de verano de un jefe local, ahora un impresionante refugio de montaña. Disfrute del almuerzo en la terraza con vistas panorámicas del macizo del Toubkal." }
          ],
          itinerary: [
            { time: "07:30", activity: "Salida de Marrakech" },
            { time: "09:00", activity: "Llegada a Imlil" },
            { time: "09:30", activity: "Inicio del trekking con guía local" },
            { time: "11:00", activity: "Visitas a pueblos en ruta" },
            { time: "12:30", activity: "Almuerzo en Kasbah du Toubkal" },
            { time: "14:00", activity: "Explorar el pueblo de Imlil" },
            { time: "15:30", activity: "Viaje de regreso" },
            { time: "17:30", activity: "Llegada a Marrakech" }
          ],
          tips: ["Use botas de senderismo apropiadas", "Traiga capas - el clima de montaña cambia rápido", "Bastones de trekking recomendados pero no esenciales", "Traiga efectivo para compras locales"],
          duration: "Día completo (10 horas)",
          difficulty: "Moderado a Desafiante",
          groupSize: "2-10 personas"
        },
        includedItems: ["Guía de trekking profesional", "Almuerzo empacado", "Transporte", "Agua", "Seguro"],
        excludedItems: ["Alquiler de equipos", "Equipo personal"],
      },
    },
    priceAdult: 95,
    priceChild: 60,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
]

// Activities offers
export const activitiesOffers: Offer[] = [
  {
    id: "activ-001",
    type: "activities",
    departCity: "Marrakech",
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
    mainImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Balloon ride", "Breakfast", "Champagne", "Transport", "Photos"],
    excludedItems: ["Hotel pickup for early start"],
    translations: {
      en: {
        title: "Hot Air Balloon Ride at Sunrise",
        description: "Spectacular sunrise hot air balloon experience over Marrakesh with champagne breakfast upon landing.",
        detailedDescription: {
          overview: "Float serenely above the stunning landscapes surrounding Marrakesh as the sun rises over the Atlas Mountains. This magical hot air balloon experience offers unparalleled views of traditional villages, palm groves, and the distant snow-capped peaks, followed by a celebratory champagne breakfast.",
          highlights: ["Spectacular sunrise views from above", "Float over palm groves and Berber villages", "Atlas Mountains panorama", "Champagne breakfast upon landing", "Berber village visit", "Flight certificate and photos"],
          sections: [
            { title: "The Flight Experience", content: "Watch in wonder as the balloon inflates in the pre-dawn darkness, then gently rise into the sky as the first light paints the landscape in golden hues. Float silently over olive groves, mud-brick villages, and the winding rivers of the Marrakesh plains." },
            { title: "Safety & Comfort", content: "Our experienced pilots hold international licenses and have thousands of flight hours. Modern equipment and comprehensive safety briefings ensure a secure and comfortable experience. The spacious basket accommodates up to 20 passengers." },
            { title: "Post-Flight Celebration", content: "After landing, enjoy a traditional Berber breakfast with fresh bread, local cheeses, fruits, and champagne. Visit a nearby village to meet local families and learn about rural life before returning to Marrakesh." }
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
          tips: ["Dress in layers - mornings can be cool", "Wear flat, closed-toe shoes", "Flights may be cancelled due to weather", "Not recommended for those with vertigo"],
          duration: "5-6 hours (1 hour flight)",
          difficulty: "Easy",
          groupSize: "Up to 20 people per balloon"
        },
        includedItems: ["Balloon ride", "Breakfast", "Champagne", "Transport", "Photos"],
        excludedItems: ["Hotel pickup for early start"],
      },
      fr: {
        title: "Vol en Montgolfière au Lever du Soleil",
        description: "Spectaculaire expérience en montgolfière au lever du soleil au-dessus de Marrakech avec petit-déjeuner champagne à l'atterrissage.",
        detailedDescription: {
          overview: "Flottez sereinement au-dessus des paysages époustouflants entourant Marrakech alors que le soleil se lève sur les montagnes de l'Atlas. Cette expérience magique en montgolfière offre des vues inégalées sur les villages traditionnels, les palmeraies et les sommets enneigés au loin, suivie d'un petit-déjeuner champagne festif.",
          highlights: ["Vues spectaculaires du lever de soleil depuis les airs", "Survolez les palmeraies et villages berbères", "Panorama des montagnes de l'Atlas", "Petit-déjeuner champagne à l'atterrissage", "Visite d'un village berbère", "Certificat de vol et photos"],
          sections: [
            { title: "L'Expérience de Vol", content: "Regardez avec émerveillement le ballon se gonfler dans l'obscurité de l'aube, puis montez doucement dans le ciel tandis que les premières lueurs peignent le paysage de teintes dorées. Flottez silencieusement au-dessus des oliveraies, des villages en terre et des rivières sinueuses des plaines de Marrakech." },
            { title: "Sécurité et Confort", content: "Nos pilotes expérimentés détiennent des licences internationales et ont des milliers d'heures de vol. Un équipement moderne et des briefings de sécurité complets assurent une expérience sûre et confortable. La nacelle spacieuse accueille jusqu'à 20 passagers." },
            { title: "Célébration Après-Vol", content: "Après l'atterrissage, savourez un petit-déjeuner berbère traditionnel avec du pain frais, des fromages locaux, des fruits et du champagne. Visitez un village voisin pour rencontrer les familles locales et découvrir la vie rurale avant de retourner à Marrakech." }
          ],
          itinerary: [
            { time: "05:00", activity: "Prise en charge à l'hôtel" },
            { time: "06:00", activity: "Arrivée au site de lancement" },
            { time: "06:30", activity: "Briefing sécurité et gonflage" },
            { time: "07:00", activity: "Décollage au lever du soleil" },
            { time: "08:00", activity: "Atterrissage et célébration" },
            { time: "08:30", activity: "Petit-déjeuner champagne" },
            { time: "09:30", activity: "Visite du village" },
            { time: "10:30", activity: "Retour à Marrakech" }
          ],
          tips: ["Habillez-vous en couches - les matinées peuvent être fraîches", "Portez des chaussures fermées et plates", "Les vols peuvent être annulés en cas de mauvais temps", "Déconseillé aux personnes sujettes au vertige"],
          duration: "5-6 heures (1 heure de vol)",
          difficulty: "Facile",
          groupSize: "Jusqu'à 20 personnes par montgolfière"
        },
        includedItems: ["Vol en montgolfière", "Petit-déjeuner", "Champagne", "Transport", "Photos"],
        excludedItems: ["Prise en charge à l'hôtel pour départ matinal"],
      },
      es: {
        title: "Paseo en Globo Aerostático al Amanecer",
        description: "Espectacular experiencia en globo aerostático al amanecer sobre Marrakech con desayuno con champán al aterrizar.",
        detailedDescription: {
          overview: "Flote serenamente sobre los impresionantes paisajes que rodean Marrakech mientras el sol sale sobre las montañas del Atlas. Esta mágica experiencia en globo aerostático ofrece vistas incomparables de pueblos tradicionales, palmerales y las distantes cumbres nevadas, seguida de un desayuno con champán de celebración.",
          highlights: ["Vistas espectaculares del amanecer desde arriba", "Sobrevuele palmerales y pueblos bereberes", "Panorama de las montañas del Atlas", "Desayuno con champán al aterrizar", "Visita a pueblo bereber", "Certificado de vuelo y fotos"],
          sections: [
            { title: "La Experiencia de Vuelo", content: "Observe con asombro cómo el globo se infla en la oscuridad del amanecer, luego ascienda suavemente al cielo mientras la primera luz pinta el paisaje con tonos dorados. Flote silenciosamente sobre olivares, pueblos de adobe y los sinuosos ríos de las llanuras de Marrakech." },
            { title: "Seguridad y Comodidad", content: "Nuestros pilotos experimentados tienen licencias internacionales y miles de horas de vuelo. Equipos modernos y briefings de seguridad completos garantizan una experiencia segura y cómoda. La espaciosa canasta acomoda hasta 20 pasajeros." },
            { title: "Celebración Post-Vuelo", content: "Después del aterrizaje, disfrute de un desayuno bereber tradicional con pan fresco, quesos locales, frutas y champán. Visite un pueblo cercano para conocer a las familias locales y aprender sobre la vida rural antes de regresar a Marrakech." }
          ],
          itinerary: [
            { time: "05:00", activity: "Recogida en el hotel" },
            { time: "06:00", activity: "Llegada al sitio de lanzamiento" },
            { time: "06:30", activity: "Briefing de seguridad e inflado" },
            { time: "07:00", activity: "Despegue al amanecer" },
            { time: "08:00", activity: "Aterrizaje y celebración" },
            { time: "08:30", activity: "Desayuno con champán" },
            { time: "09:30", activity: "Visita al pueblo" },
            { time: "10:30", activity: "Regreso a Marrakech" }
          ],
          tips: ["Vista en capas - las mañanas pueden ser frescas", "Use zapatos cerrados y planos", "Los vuelos pueden cancelarse por el clima", "No recomendado para personas con vértigo"],
          duration: "5-6 horas (1 hora de vuelo)",
          difficulty: "Fácil",
          groupSize: "Hasta 20 personas por globo"
        },
        includedItems: ["Paseo en globo", "Desayuno", "Champán", "Transporte", "Fotos"],
        excludedItems: ["Recogida en hotel para salida temprana"],
      },
    },
    priceAdult: 185,
    priceChild: 120,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "activ-002",
    type: "activities",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/9464160/pexels-photo-9464160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Quad bike rental", "Guide", "Helmet", "Insurance", "Water", "Snacks"],
    excludedItems: ["Photography service"],
    translations: {
      en: {
        title: "Quad Bike Desert Adventure",
        description: "Thrilling quad bike ride through desert trails with experienced guides and safety equipment.",
        detailedDescription: {
          overview: "Rev up for an adrenaline-pumping adventure through the Agafay desert and palm groves surrounding Marrakesh. This quad biking experience takes you through diverse landscapes, from rocky trails to sandy dunes, offering an exciting way to explore the region.",
          highlights: ["Powerful quad bikes for all skill levels", "Ride through the Agafay desert", "Pass through palm groves and villages", "Professional guides and safety gear", "Traditional Berber tea break", "Photo opportunities at scenic spots"],
          sections: [
            { title: "The Ride", content: "After a comprehensive safety briefing and training session, set off on powerful, modern quad bikes. Navigate through varied terrain including hard-packed desert, sandy trails, and oasis-like palm groves. Our routes are designed to thrill while remaining safe." },
            { title: "Equipment & Safety", content: "All necessary safety equipment is provided including helmets, goggles, and gloves. Our quad bikes are regularly maintained and suitable for beginners and experienced riders alike. Guides carry first-aid kits and communication equipment." },
            { title: "Berber Experience", content: "Stop at a traditional Berber village for refreshing mint tea and learn about life in the desert. This cultural interlude provides a perfect contrast to the high-energy riding experience." }
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
          tips: ["Wear long pants and closed-toe shoes", "Bring sunglasses and sunscreen", "A dust scarf is recommended", "Minimum age is typically 16 to drive"],
          duration: "3-4 hours",
          difficulty: "Moderate",
          groupSize: "2-12 people"
        },
        includedItems: ["Quad bike rental", "Guide", "Helmet", "Insurance", "Water", "Snacks"],
        excludedItems: ["Photography service"],
      },
      fr: {
        title: "Aventure en Quad dans le Désert",
        description: "Balade palpitante en quad à travers les pistes désertiques avec des guides expérimentés et équipement de sécurité.",
        detailedDescription: {
          overview: "Préparez-vous pour une aventure pleine d'adrénaline à travers le désert d'Agafay et les palmeraies entourant Marrakech. Cette expérience en quad vous emmène à travers des paysages variés, des pistes rocheuses aux dunes de sable, offrant une façon excitante d'explorer la région.",
          highlights: ["Quads puissants pour tous les niveaux", "Roulez à travers le désert d'Agafay", "Traversez les palmeraies et villages", "Guides professionnels et équipement de sécurité", "Pause thé berbère traditionnel", "Opportunités photo dans des endroits pittoresques"],
          sections: [
            { title: "La Balade", content: "Après un briefing de sécurité complet et une séance d'entraînement, partez sur des quads modernes et puissants. Naviguez à travers des terrains variés incluant le désert compact, les pistes de sable et les palmeraies style oasis. Nos itinéraires sont conçus pour procurer des sensations tout en restant sûrs." },
            { title: "Équipement et Sécurité", content: "Tout l'équipement de sécurité nécessaire est fourni, y compris casques, lunettes et gants. Nos quads sont régulièrement entretenus et adaptés aux débutants comme aux pilotes expérimentés. Les guides portent des trousses de premiers secours et du matériel de communication." },
            { title: "Expérience Berbère", content: "Arrêtez-vous dans un village berbère traditionnel pour un thé à la menthe rafraîchissant et découvrez la vie dans le désert. Cet intermède culturel offre un parfait contraste avec l'expérience de conduite énergique." }
          ],
          itinerary: [
            { time: "09:00 ou 14:00", activity: "Prise en charge à l'hôtel" },
            { time: "+30 min", activity: "Arrivée au camp de base" },
            { time: "+45 min", activity: "Briefing sécurité et entraînement" },
            { time: "+1 heure", activity: "Début de l'aventure en quad" },
            { time: "+2 heures", activity: "Pause thé au village berbère" },
            { time: "+2.5 heures", activity: "Balade retour" },
            { time: "+3 heures", activity: "Retour à Marrakech" }
          ],
          tips: ["Portez un pantalon long et des chaussures fermées", "Apportez lunettes de soleil et crème solaire", "Un foulard anti-poussière est recommandé", "L'âge minimum pour conduire est généralement 16 ans"],
          duration: "3-4 heures",
          difficulty: "Modéré",
          groupSize: "2-12 personnes"
        },
        includedItems: ["Location de quad", "Guide", "Casque", "Assurance", "Eau", "Snacks"],
        excludedItems: ["Service photo"],
      },
      es: {
        title: "Aventura en Quad por el Desierto",
        description: "Emocionante paseo en quad por senderos del desierto con guías experimentados y equipo de seguridad.",
        detailedDescription: {
          overview: "Prepárese para una aventura llena de adrenalina a través del desierto de Agafay y los palmerales que rodean Marrakech. Esta experiencia en quad le lleva a través de paisajes diversos, desde senderos rocosos hasta dunas de arena, ofreciendo una forma emocionante de explorar la región.",
          highlights: ["Quads potentes para todos los niveles", "Recorra el desierto de Agafay", "Atraviese palmerales y pueblos", "Guías profesionales y equipo de seguridad", "Pausa para té bereber tradicional", "Oportunidades fotográficas en lugares pintorescos"],
          sections: [
            { title: "El Paseo", content: "Después de un completo briefing de seguridad y sesión de entrenamiento, parta en quads modernos y potentes. Navegue por terrenos variados incluyendo desierto compacto, senderos de arena y palmerales tipo oasis. Nuestras rutas están diseñadas para emocionar mientras permanecen seguras." },
            { title: "Equipo y Seguridad", content: "Se proporciona todo el equipo de seguridad necesario incluyendo cascos, gafas y guantes. Nuestros quads se mantienen regularmente y son adecuados tanto para principiantes como para pilotos experimentados. Los guías llevan botiquines de primeros auxilios y equipos de comunicación." },
            { title: "Experiencia Bereber", content: "Deténgase en un pueblo bereber tradicional para un refrescante té de menta y aprenda sobre la vida en el desierto. Este interludio cultural ofrece un contraste perfecto con la experiencia de conducción llena de energía." }
          ],
          itinerary: [
            { time: "09:00 o 14:00", activity: "Recogida en el hotel" },
            { time: "+30 min", activity: "Llegada al campamento base" },
            { time: "+45 min", activity: "Briefing de seguridad y entrenamiento" },
            { time: "+1 hora", activity: "Comienza la aventura en quad" },
            { time: "+2 horas", activity: "Pausa para té en pueblo bereber" },
            { time: "+2.5 horas", activity: "Paseo de regreso" },
            { time: "+3 horas", activity: "Regreso a Marrakech" }
          ],
          tips: ["Use pantalones largos y zapatos cerrados", "Traiga gafas de sol y protector solar", "Se recomienda un pañuelo contra el polvo", "La edad mínima para conducir es típicamente 16 años"],
          duration: "3-4 horas",
          difficulty: "Moderado",
          groupSize: "2-12 personas"
        },
        includedItems: ["Alquiler de quad", "Guía", "Casco", "Seguro", "Agua", "Snacks"],
        excludedItems: ["Servicio de fotografía"],
      },
    },
    priceAdult: 95,
    priceChild: 60,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "activ-003",
    type: "activities",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Hammam access", "Massage", "Beauty treatments", "Tea & pastries", "Towels"],
    excludedItems: ["Extra product purchases"],
    translations: {
      en: {
        title: "Traditional Moroccan Spa Day",
        description: "Relax with traditional hammam treatment, argan oil massage, and beauty treatments at luxury spa.",
        detailedDescription: {
          overview: "Indulge in centuries-old Moroccan wellness rituals at a luxurious traditional spa. Experience the purifying hammam steam bath, exfoliating black soap scrub, and nourishing argan oil massage - the ultimate relaxation experience that has rejuvenated Moroccans for generations.",
          highlights: ["Authentic hammam steam bath", "Traditional black soap scrub", "Rhassoul clay body mask", "Argan oil massage", "Mint tea and Moroccan pastries", "Relaxation in beautiful surroundings"],
          sections: [
            { title: "The Hammam Ritual", content: "Begin in the steam room, where warm, humid air opens your pores and prepares your skin. The attendant then applies traditional black soap (savon noir) made from olives, massaging it into your skin before a vigorous exfoliation with a kessa glove that leaves your skin incredibly soft." },
            { title: "Argan Oil Treatment", content: "After the hammam, enjoy a full-body massage using pure argan oil - Morocco's 'liquid gold.' This precious oil, rich in vitamin E, deeply nourishes the skin while the skilled massage releases tension and promotes total relaxation." },
            { title: "The Setting", content: "Our partner spa is housed in a beautifully restored riad, featuring traditional zellige tiles, carved plaster, and tranquil fountains. The atmosphere transports you to another era while providing modern comfort and hygiene standards." }
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
          tips: ["Remove all jewelry before treatment", "Arrive 15 minutes early to relax", "Communicate pressure preferences", "Drink plenty of water afterwards"],
          duration: "3-4 hours",
          difficulty: "Easy (relaxation)",
          groupSize: "Individual or couples"
        },
        includedItems: ["Hammam access", "Massage", "Beauty treatments", "Tea & pastries", "Towels"],
        excludedItems: ["Extra product purchases"],
      },
      fr: {
        title: "Journée Spa Marocain Traditionnel",
        description: "Détendez-vous avec un hammam traditionnel, massage à l'huile d'argan et soins de beauté dans un spa de luxe.",
        detailedDescription: {
          overview: "Offrez-vous des rituels de bien-être marocains séculaires dans un spa traditionnel luxueux. Découvrez le bain de vapeur hammam purifiant, le gommage au savon noir exfoliant et le massage nourrissant à l'huile d'argan - l'expérience de relaxation ultime qui régénère les Marocains depuis des générations.",
          highlights: ["Bain de vapeur hammam authentique", "Gommage traditionnel au savon noir", "Masque corporel au rhassoul", "Massage à l'huile d'argan", "Thé à la menthe et pâtisseries marocaines", "Détente dans un cadre magnifique"],
          sections: [
            { title: "Le Rituel du Hammam", content: "Commencez dans la salle de vapeur, où l'air chaud et humide ouvre vos pores et prépare votre peau. L'accompagnateur applique ensuite le savon noir traditionnel (savon noir) à base d'olives, le massant sur votre peau avant une exfoliation vigoureuse avec un gant kessa qui laisse votre peau incroyablement douce." },
            { title: "Soin à l'Huile d'Argan", content: "Après le hammam, profitez d'un massage complet du corps à l'huile d'argan pure - l'or liquide du Maroc. Cette huile précieuse, riche en vitamine E, nourrit profondément la peau tandis que le massage habile libère les tensions et favorise une relaxation totale." },
            { title: "Le Cadre", content: "Notre spa partenaire est installé dans un riad magnifiquement restauré, avec des zelliges traditionnels, du plâtre sculpté et des fontaines tranquilles. L'atmosphère vous transporte dans une autre époque tout en offrant confort moderne et normes d'hygiène." }
          ],
          itinerary: [
            { time: "Flexible", activity: "Arrivée et thé de bienvenue" },
            { time: "+15 min", activity: "Changement et détente" },
            { time: "+30 min", activity: "Séance de vapeur hammam" },
            { time: "+1 heure", activity: "Savon noir et gommage kessa" },
            { time: "+1.5 heures", activity: "Masque au rhassoul" },
            { time: "+2 heures", activity: "Massage à l'huile d'argan" },
            { time: "+3 heures", activity: "Relaxation avec thé et pâtisseries" }
          ],
          tips: ["Retirez tous les bijoux avant le soin", "Arrivez 15 minutes à l'avance pour vous détendre", "Communiquez vos préférences de pression", "Buvez beaucoup d'eau après"],
          duration: "3-4 heures",
          difficulty: "Facile (détente)",
          groupSize: "Individuel ou couples"
        },
        includedItems: ["Accès hammam", "Massage", "Soins de beauté", "Thé et pâtisseries", "Serviettes"],
        excludedItems: ["Achats de produits supplémentaires"],
      },
      es: {
        title: "Día de Spa Marroquí Tradicional",
        description: "Relájese con tratamiento de hammam tradicional, masaje con aceite de argán y tratamientos de belleza en spa de lujo.",
        detailedDescription: {
          overview: "Disfrute de rituales de bienestar marroquíes centenarios en un lujoso spa tradicional. Experimente el purificante baño de vapor hammam, el exfoliante jabón negro y el nutritivo masaje con aceite de argán - la experiencia de relajación definitiva que ha rejuvenecido a los marroquíes durante generaciones.",
          highlights: ["Baño de vapor hammam auténtico", "Exfoliación tradicional con jabón negro", "Mascarilla corporal de arcilla rhassoul", "Masaje con aceite de argán", "Té de menta y pasteles marroquíes", "Relajación en un entorno hermoso"],
          sections: [
            { title: "El Ritual del Hammam", content: "Comience en la sala de vapor, donde el aire cálido y húmedo abre sus poros y prepara su piel. El asistente aplica el jabón negro tradicional hecho de aceitunas, masajeándolo en su piel antes de una vigorosa exfoliación con un guante kessa que deja su piel increíblemente suave." },
            { title: "Tratamiento con Aceite de Argán", content: "Después del hammam, disfrute de un masaje de cuerpo completo con aceite de argán puro - el 'oro líquido' de Marruecos. Este preciado aceite, rico en vitamina E, nutre profundamente la piel mientras el hábil masaje libera tensiones y promueve la relajación total." },
            { title: "El Entorno", content: "Nuestro spa asociado está ubicado en un riad bellamente restaurado, con azulejos zellige tradicionales, yeso tallado y fuentes tranquilas. La atmósfera lo transporta a otra era mientras ofrece comodidad moderna y estándares de higiene." }
          ],
          itinerary: [
            { time: "Flexible", activity: "Llegada y té de bienvenida" },
            { time: "+15 min", activity: "Cambio y relajación" },
            { time: "+30 min", activity: "Sesión de vapor hammam" },
            { time: "+1 hora", activity: "Jabón negro y exfoliación kessa" },
            { time: "+1.5 horas", activity: "Mascarilla de rhassoul" },
            { time: "+2 horas", activity: "Masaje con aceite de argán" },
            { time: "+3 horas", activity: "Relajación con té y pasteles" }
          ],
          tips: ["Retire todas las joyas antes del tratamiento", "Llegue 15 minutos antes para relajarse", "Comunique sus preferencias de presión", "Beba mucha agua después"],
          duration: "3-4 horas",
          difficulty: "Fácil (relajación)",
          groupSize: "Individual o parejas"
        },
        includedItems: ["Acceso al hammam", "Masaje", "Tratamientos de belleza", "Té y pasteles", "Toallas"],
        excludedItems: ["Compras de productos adicionales"],
      },
    },
    priceAdult: 105,
    priceChild: 65,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
]

// Packages offers
export const packagesOffers: Offer[] = [
  {
    id: "pkg-001",
    type: "packages",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/2448418/pexels-photo-2448418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["3 nights accommodation", "Daily breakfast", "4x guided tours", "Transport", "Airport transfers"],
    excludedItems: ["Flights", "Travel insurance", "Personal expenses"],
    translations: {
      en: {
        title: "Marrakesh Classic 4-Day Package",
        description: "Complete Marrakesh experience including medina tour, mountain excursion, and cultural highlights.",
        detailedDescription: {
          overview: "The perfect introduction to Marrakesh for first-time visitors. This comprehensive 4-day package covers all the essential experiences - from the historic medina to the Atlas Mountains - with carefully selected accommodations and expert guides throughout.",
          highlights: ["3 nights in a beautiful traditional riad", "Guided medina and souk tour", "Atlas Mountains day excursion", "Bahia Palace and Majorelle Gardens", "Traditional hammam experience", "Airport transfers included"],
          sections: [
            { title: "Day 1: Arrival & Medina Discovery", content: "Welcome to Marrakesh! After airport pickup, settle into your charming riad. In the afternoon, explore the vibrant medina with your guide, discovering the souks, historical monuments, and the famous Jemaa el-Fnaa square. Evening at leisure to enjoy dinner in the medina." },
            { title: "Day 2: Palaces, Gardens & Hammam", content: "Morning visits to Bahia Palace and the Ben Youssef Madrasa. Lunch in the medina. Afternoon at the stunning Majorelle Gardens. End the day with a traditional hammam experience, the perfect way to relax after exploring." },
            { title: "Day 3: Atlas Mountains Excursion", content: "Full-day excursion to the High Atlas Mountains. Drive through spectacular scenery to visit traditional Berber villages. Enjoy a home-cooked lunch with mountain views and meet local families. Return to Marrakesh in the evening." },
            { title: "Day 4: Departure", content: "Enjoy breakfast at your riad and some free time for last-minute shopping in the souks. Transfer to the airport for your departure, taking with you memories of an unforgettable Marrakesh experience." }
          ],
          itinerary: [],
          tips: ["Best time to visit: March-May or September-November", "Pack comfortable walking shoes", "Bring layers for mountain excursion", "Cash useful for souk shopping"],
          duration: "4 days / 3 nights",
          difficulty: "Easy",
          groupSize: "2-12 people (Private available)"
        },
        includedItems: ["3 nights accommodation", "Daily breakfast", "4x guided tours", "Transport", "Airport transfers"],
        excludedItems: ["Flights", "Travel insurance", "Personal expenses"],
      },
      fr: {
        title: "Forfait Classique Marrakech 4 Jours",
        description: "Expérience complète de Marrakech incluant visite de la médina, excursion en montagne et sites culturels.",
        detailedDescription: {
          overview: "L'introduction parfaite à Marrakech pour les premiers visiteurs. Ce forfait complet de 4 jours couvre toutes les expériences essentielles - de la médina historique aux montagnes de l'Atlas - avec des hébergements soigneusement sélectionnés et des guides experts.",
          highlights: ["3 nuits dans un beau riad traditionnel", "Visite guidée de la médina et des souks", "Excursion d'une journée dans l'Atlas", "Palais de la Bahia et Jardins Majorelle", "Expérience hammam traditionnelle", "Transferts aéroport inclus"],
          sections: [
            { title: "Jour 1 : Arrivée et Découverte de la Médina", content: "Bienvenue à Marrakech ! Après la prise en charge à l'aéroport, installez-vous dans votre charmant riad. L'après-midi, explorez la médina animée avec votre guide, découvrant les souks, les monuments historiques et la célèbre place Jemaa el-Fnaa. Soirée libre pour dîner dans la médina." },
            { title: "Jour 2 : Palais, Jardins et Hammam", content: "Visites matinales du Palais de la Bahia et de la Médersa Ben Youssef. Déjeuner dans la médina. Après-midi aux superbes Jardins Majorelle. Terminez la journée par une expérience hammam traditionnelle, la façon parfaite de se détendre après l'exploration." },
            { title: "Jour 3 : Excursion dans l'Atlas", content: "Excursion d'une journée complète dans le Haut Atlas. Traversez des paysages spectaculaires pour visiter des villages berbères traditionnels. Savourez un déjeuner fait maison avec vue sur les montagnes et rencontrez des familles locales. Retour à Marrakech en soirée." },
            { title: "Jour 4 : Départ", content: "Petit-déjeuner à votre riad et temps libre pour les derniers achats dans les souks. Transfert à l'aéroport pour votre départ, emportant avec vous les souvenirs d'une expérience inoubliable à Marrakech." }
          ],
          itinerary: [],
          tips: ["Meilleure période : mars-mai ou septembre-novembre", "Emportez des chaussures de marche confortables", "Prévoyez des couches pour l'excursion en montagne", "L'argent liquide est utile pour les achats dans les souks"],
          duration: "4 jours / 3 nuits",
          difficulty: "Facile",
          groupSize: "2-12 personnes (Privé disponible)"
        },
        includedItems: ["3 nuits d'hébergement", "Petit-déjeuner quotidien", "4 visites guidées", "Transport", "Transferts aéroport"],
        excludedItems: ["Vols", "Assurance voyage", "Dépenses personnelles"],
      },
      es: {
        title: "Paquete Clásico Marrakech 4 Días",
        description: "Experiencia completa de Marrakech incluyendo tour por la medina, excursión a la montaña y puntos culturales destacados.",
        detailedDescription: {
          overview: "La introducción perfecta a Marrakech para visitantes primerizos. Este paquete completo de 4 días cubre todas las experiencias esenciales - desde la histórica medina hasta las montañas del Atlas - con alojamientos cuidadosamente seleccionados y guías expertos.",
          highlights: ["3 noches en un hermoso riad tradicional", "Tour guiado por la medina y zocos", "Excursión de un día al Atlas", "Palacio de la Bahía y Jardines Majorelle", "Experiencia de hammam tradicional", "Traslados al aeropuerto incluidos"],
          sections: [
            { title: "Día 1: Llegada y Descubrimiento de la Medina", content: "¡Bienvenido a Marrakech! Después de la recogida en el aeropuerto, acomódese en su encantador riad. Por la tarde, explore la vibrante medina con su guía, descubriendo los zocos, monumentos históricos y la famosa plaza Jemaa el-Fnaa. Noche libre para disfrutar de la cena en la medina." },
            { title: "Día 2: Palacios, Jardines y Hammam", content: "Visitas matutinas al Palacio de la Bahía y la Madrasa Ben Youssef. Almuerzo en la medina. Tarde en los impresionantes Jardines Majorelle. Termine el día con una experiencia de hammam tradicional, la manera perfecta de relajarse después de explorar." },
            { title: "Día 3: Excursión a las Montañas del Atlas", content: "Excursión de día completo al Alto Atlas. Atraviese paisajes espectaculares para visitar pueblos bereberes tradicionales. Disfrute de un almuerzo casero con vistas a la montaña y conozca familias locales. Regreso a Marrakech por la noche." },
            { title: "Día 4: Salida", content: "Disfrute del desayuno en su riad y tiempo libre para las últimas compras en los zocos. Traslado al aeropuerto para su partida, llevándose consigo recuerdos de una experiencia inolvidable en Marrakech." }
          ],
          itinerary: [],
          tips: ["Mejor época para visitar: marzo-mayo o septiembre-noviembre", "Lleve zapatos cómodos para caminar", "Traiga capas para la excursión a la montaña", "El efectivo es útil para comprar en los zocos"],
          duration: "4 días / 3 noches",
          difficulty: "Fácil",
          groupSize: "2-12 personas (Privado disponible)"
        },
        includedItems: ["3 noches de alojamiento", "Desayuno diario", "4 tours guiados", "Transporte", "Traslados al aeropuerto"],
        excludedItems: ["Vuelos", "Seguro de viaje", "Gastos personales"],
      },
    },
    priceAdult: 550,
    priceChild: 350,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "pkg-002",
    type: "packages",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/14267607/pexels-photo-14267607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "/cultural-sites.jpg",
    ],
    includedItems: ["9 nights accommodation", "Daily meals", "All entrance fees", "Professional guides", "Transport"],
    excludedItems: ["International flights", "Tips"],
    translations: {
      en: {
        title: "Ultimate Morocco 10-Day Journey",
        description: "Complete tour of Morocco including Marrakesh, Sahara, coastal towns, and mountain villages.",
        detailedDescription: {
          overview: "The definitive Moroccan adventure covering the country's most iconic destinations. From the imperial cities to the Sahara Desert, from coastal gems to mountain villages, this 10-day journey reveals Morocco in all its diversity and wonder.",
          highlights: ["9 nights in carefully selected accommodations", "Marrakesh, Fes, and Chefchaouen", "Sahara Desert camp under the stars", "Ait Benhaddou UNESCO site", "Coastal Essaouira", "Atlas Mountains crossing", "All meals and transportation included"],
          sections: [
            { title: "Days 1-2: Marrakesh", content: "Arrive in Marrakesh and immerse yourself in the Red City. Explore the medina, visit palaces and gardens, and experience the magic of Jemaa el-Fnaa. Stay in a beautiful riad in the heart of the old city." },
            { title: "Days 3-4: Atlas & Sahara", content: "Cross the spectacular High Atlas via Tizi n'Tichka pass. Visit Ait Benhaddou, then continue to the Sahara. Camel trek into the dunes for an unforgettable night in a desert camp under countless stars." },
            { title: "Days 5-6: Fes", content: "Journey to the imperial city of Fes, home to the world's oldest university. Explore the UNESCO-listed medina, visit ancient tanneries, and discover the intellectual heart of Morocco." },
            { title: "Days 7-8: Chefchaouen & Coast", content: "Travel to the magical blue city of Chefchaouen, nestled in the Rif Mountains. Wander photogenic streets before heading to Essaouira, Morocco's artistic coastal gem with its Atlantic beaches." },
            { title: "Days 9-10: Return to Marrakesh", content: "Return to Marrakesh with free time for shopping and relaxation. Enjoy a farewell dinner before your departure, taking with you memories of an incredible Moroccan odyssey." }
          ],
          itinerary: [],
          tips: ["Pack for varied climates - coast to desert", "Comfortable shoes essential", "Desert nights can be very cold", "Flexible itinerary based on conditions"],
          duration: "10 days / 9 nights",
          difficulty: "Moderate",
          groupSize: "4-16 people"
        },
        includedItems: ["9 nights accommodation", "Daily meals", "All entrance fees", "Professional guides", "Transport"],
        excludedItems: ["International flights", "Tips"],
      },
      fr: {
        title: "Voyage Ultime au Maroc 10 Jours",
        description: "Tour complet du Maroc incluant Marrakech, le Sahara, les villes côtières et les villages de montagne.",
        detailedDescription: {
          overview: "L'aventure marocaine définitive couvrant les destinations les plus emblématiques du pays. Des villes impériales au désert du Sahara, des joyaux côtiers aux villages de montagne, ce voyage de 10 jours révèle le Maroc dans toute sa diversité et sa splendeur.",
          highlights: ["9 nuits dans des hébergements soigneusement sélectionnés", "Marrakech, Fès et Chefchaouen", "Camp dans le désert du Sahara sous les étoiles", "Site UNESCO Aït Benhaddou", "Essaouira côtière", "Traversée des montagnes de l'Atlas", "Tous les repas et transport inclus"],
          sections: [
            { title: "Jours 1-2 : Marrakech", content: "Arrivée à Marrakech et immersion dans la Ville Rouge. Explorez la médina, visitez palais et jardins, et découvrez la magie de Jemaa el-Fnaa. Séjournez dans un beau riad au cœur de la vieille ville." },
            { title: "Jours 3-4 : Atlas et Sahara", content: "Traversez le spectaculaire Haut Atlas via le col du Tizi n'Tichka. Visitez Aït Benhaddou, puis continuez vers le Sahara. Trek à dos de chameau dans les dunes pour une nuit inoubliable dans un camp du désert sous d'innombrables étoiles." },
            { title: "Jours 5-6 : Fès", content: "Voyage vers la ville impériale de Fès, abritant la plus ancienne université du monde. Explorez la médina classée UNESCO, visitez les anciennes tanneries et découvrez le cœur intellectuel du Maroc." },
            { title: "Jours 7-8 : Chefchaouen et Côte", content: "Voyagez vers la ville bleue magique de Chefchaouen, nichée dans les montagnes du Rif. Flânez dans les rues photogéniques avant de vous rendre à Essaouira, le joyau artistique côtier du Maroc avec ses plages atlantiques." },
            { title: "Jours 9-10 : Retour à Marrakech", content: "Retour à Marrakech avec du temps libre pour le shopping et la détente. Profitez d'un dîner d'adieu avant votre départ, emportant avec vous les souvenirs d'une odyssée marocaine incroyable." }
          ],
          itinerary: [],
          tips: ["Prévoyez pour des climats variés - de la côte au désert", "Chaussures confortables essentielles", "Les nuits du désert peuvent être très froides", "Itinéraire flexible selon les conditions"],
          duration: "10 jours / 9 nuits",
          difficulty: "Modéré",
          groupSize: "4-16 personnes"
        },
        includedItems: ["9 nuits d'hébergement", "Repas quotidiens", "Tous les droits d'entrée", "Guides professionnels", "Transport"],
        excludedItems: ["Vols internationaux", "Pourboires"],
      },
      es: {
        title: "Viaje Definitivo a Marruecos 10 Días",
        description: "Tour completo de Marruecos incluyendo Marrakech, Sáhara, pueblos costeros y aldeas de montaña.",
        detailedDescription: {
          overview: "La aventura definitiva en Marruecos cubriendo los destinos más icónicos del país. Desde las ciudades imperiales hasta el desierto del Sáhara, desde joyas costeras hasta aldeas de montaña, este viaje de 10 días revela Marruecos en toda su diversidad y maravilla.",
          highlights: ["9 noches en alojamientos cuidadosamente seleccionados", "Marrakech, Fez y Chefchaouen", "Campamento en el desierto del Sáhara bajo las estrellas", "Sitio UNESCO Ait Benhaddou", "Essaouira costera", "Cruce de las montañas del Atlas", "Todas las comidas y transporte incluidos"],
          sections: [
            { title: "Días 1-2: Marrakech", content: "Llegue a Marrakech y sumérjase en la Ciudad Roja. Explore la medina, visite palacios y jardines, y experimente la magia de Jemaa el-Fnaa. Alójese en un hermoso riad en el corazón de la ciudad antigua." },
            { title: "Días 3-4: Atlas y Sáhara", content: "Cruce el espectacular Alto Atlas a través del paso Tizi n'Tichka. Visite Ait Benhaddou, luego continúe hacia el Sáhara. Paseo en camello hacia las dunas para una noche inolvidable en un campamento del desierto bajo innumerables estrellas." },
            { title: "Días 5-6: Fez", content: "Viaje a la ciudad imperial de Fez, hogar de la universidad más antigua del mundo. Explore la medina declarada Patrimonio de la UNESCO, visite las antiguas curtidurías y descubra el corazón intelectual de Marruecos." },
            { title: "Días 7-8: Chefchaouen y Costa", content: "Viaje a la mágica ciudad azul de Chefchaouen, enclavada en las montañas del Rif. Pasee por calles fotogénicas antes de dirigirse a Essaouira, la joya artística costera de Marruecos con sus playas atlánticas." },
            { title: "Días 9-10: Regreso a Marrakech", content: "Regreso a Marrakech con tiempo libre para compras y relajación. Disfrute de una cena de despedida antes de su partida, llevándose consigo recuerdos de una increíble odisea marroquí." }
          ],
          itinerary: [],
          tips: ["Empaque para climas variados - de la costa al desierto", "Zapatos cómodos esenciales", "Las noches del desierto pueden ser muy frías", "Itinerario flexible según condiciones"],
          duration: "10 días / 9 noches",
          difficulty: "Moderado",
          groupSize: "4-16 personas"
        },
        includedItems: ["9 noches de alojamiento", "Comidas diarias", "Todas las entradas", "Guías profesionales", "Transporte"],
        excludedItems: ["Vuelos internacionales", "Propinas"],
      },
    },
    priceAdult: 1200,
    priceChild: 800,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
  {
    id: "pkg-003",
    type: "packages",
    departCity: "Marrakech",
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
    mainImage: "https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["5 nights 5-star riad", "All meals", "Spa treatments", "Private guide", "Airport transport"],
    excludedItems: ["Shopping"],
    translations: {
      en: {
        title: "Luxury Marrakesh Retreat 5 Days",
        description: "Premium 5-star experience in Marrakesh with luxury riad, spa, and exclusive tours.",
        detailedDescription: {
          overview: "Experience Marrakesh in ultimate luxury with this premium 5-day retreat. Stay in an exquisite 5-star riad, enjoy exclusive private tours, indulge in world-class spa treatments, and dine at the finest restaurants - all with impeccable personalized service.",
          highlights: ["5 nights in a prestigious 5-star riad", "Private guided tours throughout", "Daily luxury spa treatments", "Fine dining experiences", "Hot air balloon at sunrise", "Exclusive access experiences", "Personal concierge service"],
          sections: [
            { title: "Day 1: VIP Arrival", content: "Private airport transfer in luxury vehicle. Welcome to your stunning suite in one of Marrakesh's most exclusive riads. Evening champagne reception followed by dinner at a Michelin-recommended restaurant." },
            { title: "Day 2: Private Cultural Immersion", content: "Private guided tour of Marrakesh's treasures with exclusive access to sites. Lunch at a celebrity chef's restaurant. Afternoon at leisure with spa treatment. Evening cooking class with a master chef." },
            { title: "Day 3: Sky & Earth", content: "Sunrise hot air balloon experience with champagne breakfast. Rest and spa time. Afternoon private shopping experience with a personal style guide. Sunset dinner on a private rooftop terrace." },
            { title: "Day 4: Atlas Luxury", content: "Luxury 4x4 excursion to the Atlas Mountains. Private lunch at the renowned Kasbah Tamadot (Richard Branson's retreat). Afternoon relaxation or optional activities. Evening hammam ritual and gala dinner." },
            { title: "Day 5: Departure in Style", content: "Leisurely breakfast and final spa treatment. Personal shopping assistance for last-minute gifts. Luxury transfer to airport with VIP departure assistance." }
          ],
          itinerary: [],
          tips: ["All experiences can be customized", "Dietary requirements catered to", "Butler service available 24/7", "Upgrades and additions available"],
          duration: "5 days / 4 nights",
          difficulty: "Easy (pampered experience)",
          groupSize: "Private (1-4 people)"
        },
        includedItems: ["5 nights 5-star riad", "All meals", "Spa treatments", "Private guide", "Airport transport"],
        excludedItems: ["Shopping"],
      },
      fr: {
        title: "Retraite de Luxe à Marrakech 5 Jours",
        description: "Expérience premium 5 étoiles à Marrakech avec riad de luxe, spa et visites exclusives.",
        detailedDescription: {
          overview: "Vivez Marrakech dans le luxe ultime avec cette retraite premium de 5 jours. Séjournez dans un riad 5 étoiles exquis, profitez de visites privées exclusives, offrez-vous des soins spa de classe mondiale et dînez dans les meilleurs restaurants - le tout avec un service personnalisé impeccable.",
          highlights: ["5 nuits dans un prestigieux riad 5 étoiles", "Visites guidées privées tout au long du séjour", "Soins spa de luxe quotidiens", "Expériences gastronomiques", "Vol en montgolfière au lever du soleil", "Expériences avec accès exclusif", "Service de conciergerie personnel"],
          sections: [
            { title: "Jour 1 : Arrivée VIP", content: "Transfert privé depuis l'aéroport en véhicule de luxe. Bienvenue dans votre superbe suite dans l'un des riads les plus exclusifs de Marrakech. Réception champagne en soirée suivie d'un dîner dans un restaurant étoilé Michelin." },
            { title: "Jour 2 : Immersion Culturelle Privée", content: "Visite guidée privée des trésors de Marrakech avec accès exclusif aux sites. Déjeuner dans un restaurant de chef célèbre. Après-midi de détente avec soin spa. Cours de cuisine en soirée avec un chef étoilé." },
            { title: "Jour 3 : Ciel et Terre", content: "Vol en montgolfière au lever du soleil avec petit-déjeuner au champagne. Repos et temps spa. Shopping privé l'après-midi avec un conseiller en style personnel. Dîner au coucher du soleil sur une terrasse privée sur le toit." },
            { title: "Jour 4 : Atlas en Luxe", content: "Excursion en 4x4 de luxe dans les montagnes de l'Atlas. Déjeuner privé à la célèbre Kasbah Tamadot (retraite de Richard Branson). Détente l'après-midi ou activités optionnelles. Rituel hammam en soirée et dîner de gala." },
            { title: "Jour 5 : Départ en Style", content: "Petit-déjeuner tranquille et dernier soin spa. Assistance shopping personnalisée pour les cadeaux de dernière minute. Transfert de luxe à l'aéroport avec assistance VIP au départ." }
          ],
          itinerary: [],
          tips: ["Toutes les expériences peuvent être personnalisées", "Exigences alimentaires prises en compte", "Service de majordome disponible 24h/24", "Surclassements et ajouts disponibles"],
          duration: "5 jours / 4 nuits",
          difficulty: "Facile (expérience de luxe)",
          groupSize: "Privé (1-4 personnes)"
        },
        includedItems: ["5 nuits riad 5 étoiles", "Tous les repas", "Soins spa", "Guide privé", "Transport aéroport"],
        excludedItems: ["Shopping"],
      },
      es: {
        title: "Retiro de Lujo en Marrakech 5 Días",
        description: "Experiencia premium 5 estrellas en Marrakech con riad de lujo, spa y tours exclusivos.",
        detailedDescription: {
          overview: "Experimente Marrakech en el máximo lujo con este retiro premium de 5 días. Alójese en un exquisito riad 5 estrellas, disfrute de tours privados exclusivos, deléitese con tratamientos de spa de clase mundial y cene en los mejores restaurantes - todo con un servicio personalizado impecable.",
          highlights: ["5 noches en un prestigioso riad 5 estrellas", "Tours guiados privados durante toda la estancia", "Tratamientos de spa de lujo diarios", "Experiencias gastronómicas finas", "Globo aerostático al amanecer", "Experiencias con acceso exclusivo", "Servicio de conserjería personal"],
          sections: [
            { title: "Día 1: Llegada VIP", content: "Traslado privado desde el aeropuerto en vehículo de lujo. Bienvenido a su impresionante suite en uno de los riads más exclusivos de Marrakech. Recepción con champán por la noche seguida de cena en un restaurante con estrella Michelin." },
            { title: "Día 2: Inmersión Cultural Privada", content: "Tour guiado privado por los tesoros de Marrakech con acceso exclusivo a los sitios. Almuerzo en un restaurante de chef famoso. Tarde libre con tratamiento de spa. Clase de cocina por la noche con un chef maestro." },
            { title: "Día 3: Cielo y Tierra", content: "Experiencia en globo aerostático al amanecer con desayuno con champán. Descanso y tiempo de spa. Experiencia de compras privada por la tarde con un asesor de estilo personal. Cena al atardecer en una terraza privada en la azotea." },
            { title: "Día 4: Atlas de Lujo", content: "Excursión en 4x4 de lujo a las montañas del Atlas. Almuerzo privado en el renombrado Kasbah Tamadot (retiro de Richard Branson). Relajación por la tarde o actividades opcionales. Ritual de hammam por la noche y cena de gala." },
            { title: "Día 5: Salida con Estilo", content: "Desayuno tranquilo y último tratamiento de spa. Asistencia personal para compras de última hora. Traslado de lujo al aeropuerto con asistencia VIP de salida." }
          ],
          itinerary: [],
          tips: ["Todas las experiencias pueden personalizarse", "Requisitos dietéticos atendidos", "Servicio de mayordomo disponible 24/7", "Mejoras y adiciones disponibles"],
          duration: "5 días / 4 noches",
          difficulty: "Fácil (experiencia de lujo)",
          groupSize: "Privado (1-4 personas)"
        },
        includedItems: ["5 noches riad 5 estrellas", "Todas las comidas", "Tratamientos de spa", "Guía privado", "Transporte aeropuerto"],
        excludedItems: ["Compras"],
      },
    },
    priceAdult: 1850,
    priceChild: 1200,
    availabilityDates: { startDate: "2025-01-01", endDate: "2025-12-31" },
  },
]

// Transfer offers
export const transfersOffers: Offer[] = [
  {
    id: "transfer-001",
    type: "transfers",
    departCity: "Marrakech",
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
    translations: {
      en: {
        title: "Airport to Marrakesh City Transfer",
        description: "Comfortable private transfer from Marrakesh Menara Airport to your hotel or riad in the city center.",
        detailedDescription: {
          overview: "Start your Moroccan adventure stress-free with our premium airport transfer service. A professional driver will greet you at arrivals and transport you directly to your accommodation in a comfortable, air-conditioned vehicle.",
          highlights: ["Meet & greet at airport arrivals", "Private air-conditioned vehicle", "Professional English-speaking driver", "Complimentary bottled water", "24/7 availability", "Flight monitoring for delays"],
          sections: [
            { title: "How It Works", content: "Upon booking, you'll receive confirmation with your driver's contact details. Your driver will track your flight and adjust pickup time accordingly. They'll meet you at arrivals holding a sign with your name and assist with luggage." },
            { title: "Medina Access", content: "For accommodations in the medina, we'll drop you at the nearest accessible point. For riads deep within the medina, we can arrange porter assistance to help with your luggage." }
          ],
          itinerary: [],
          tips: ["Provide your flight number for flight tracking", "Have your accommodation address ready", "Book in advance during peak season", "Request child seats in advance if needed"],
          duration: "20-40 minutes",
          difficulty: "Easy",
          groupSize: "1-7 passengers"
        },
        includedItems: ["Private vehicle", "Professional driver", "Meet & greet", "Bottled water", "Luggage assistance", "WiFi in vehicle"],
        excludedItems: ["Porter service in medina", "Tips"],
      },
      fr: {
        title: "Transfert Aéroport vers Marrakech Ville",
        description: "Transfert privé confortable de l'aéroport de Marrakech Menara à votre hôtel ou riad au centre-ville.",
        detailedDescription: {
          overview: "Commencez votre aventure marocaine sans stress avec notre service de transfert aéroport premium. Un chauffeur professionnel vous accueillera aux arrivées et vous transportera directement vers votre hébergement dans un véhicule confortable et climatisé.",
          highlights: ["Accueil aux arrivées de l'aéroport", "Véhicule privé climatisé", "Chauffeur professionnel anglophone", "Eau en bouteille offerte", "Disponibilité 24h/24 7j/7", "Suivi des vols pour les retards"],
          sections: [
            { title: "Comment ça Marche", content: "Après votre réservation, vous recevrez une confirmation avec les coordonnées de votre chauffeur. Votre chauffeur suivra votre vol et ajustera l'heure de prise en charge en conséquence. Il vous accueillera aux arrivées avec une pancarte à votre nom et vous aidera avec vos bagages." },
            { title: "Accès à la Médina", content: "Pour les hébergements dans la médina, nous vous déposerons au point accessible le plus proche. Pour les riads au cœur de la médina, nous pouvons organiser l'aide d'un porteur pour vos bagages." }
          ],
          itinerary: [],
          tips: ["Fournissez votre numéro de vol pour le suivi", "Ayez l'adresse de votre hébergement prête", "Réservez à l'avance pendant la haute saison", "Demandez des sièges enfants à l'avance si nécessaire"],
          duration: "20-40 minutes",
          difficulty: "Facile",
          groupSize: "1-7 passagers"
        },
        includedItems: ["Véhicule privé", "Chauffeur professionnel", "Accueil", "Eau en bouteille", "Aide aux bagages", "WiFi dans le véhicule"],
        excludedItems: ["Service de porteur en médina", "Pourboires"],
      },
      es: {
        title: "Traslado del Aeropuerto a Marrakech Ciudad",
        description: "Cómodo traslado privado desde el Aeropuerto Menara de Marrakech hasta su hotel o riad en el centro de la ciudad.",
        detailedDescription: {
          overview: "Comience su aventura marroquí sin estrés con nuestro servicio de traslado de aeropuerto premium. Un conductor profesional lo recibirá en llegadas y lo transportará directamente a su alojamiento en un vehículo cómodo con aire acondicionado.",
          highlights: ["Recibimiento en llegadas del aeropuerto", "Vehículo privado con aire acondicionado", "Conductor profesional de habla inglesa", "Agua embotellada de cortesía", "Disponibilidad 24/7", "Monitoreo de vuelos para retrasos"],
          sections: [
            { title: "Cómo Funciona", content: "Al reservar, recibirá confirmación con los datos de contacto de su conductor. Su conductor rastreará su vuelo y ajustará la hora de recogida en consecuencia. Lo recibirán en llegadas con un cartel con su nombre y ayudarán con el equipaje." },
            { title: "Acceso a la Medina", content: "Para alojamientos en la medina, lo dejaremos en el punto accesible más cercano. Para riads en el interior de la medina, podemos organizar asistencia de portero para ayudar con su equipaje." }
          ],
          itinerary: [],
          tips: ["Proporcione su número de vuelo para seguimiento", "Tenga la dirección de su alojamiento lista", "Reserve con anticipación durante temporada alta", "Solicite asientos para niños con anticipación si es necesario"],
          duration: "20-40 minutos",
          difficulty: "Fácil",
          groupSize: "1-7 pasajeros"
        },
        includedItems: ["Vehículo privado", "Conductor profesional", "Recibimiento", "Agua embotellada", "Asistencia con equipaje", "WiFi en vehículo"],
        excludedItems: ["Servicio de portero en medina", "Propinas"],
      },
    },
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
    departCity: "Marrakech",
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
    translations: {
      en: {
        title: "Marrakesh to Essaouira Transfer",
        description: "Scenic private transfer from Marrakesh to the coastal town of Essaouira with optional stops along the way.",
        detailedDescription: {
          overview: "Travel in comfort from Marrakesh to the charming coastal town of Essaouira. Enjoy the scenic journey through argan tree forests and dramatic landscapes, with optional stops at argan oil cooperatives and goat trees.",
          highlights: ["Door-to-door private transfer", "Scenic coastal route", "Optional argan oil cooperative stop", "See famous goats in argan trees", "Comfortable air-conditioned vehicle", "Flexible departure times"],
          sections: [
            { title: "The Journey", content: "The 2.5-3 hour drive takes you through changing landscapes, from the red earth of Marrakesh to the windswept Atlantic coast. The route passes through argan forests unique to Morocco, home to tree-climbing goats." },
            { title: "Argan Oil Stop", content: "Visit a women's cooperative where argan oil is produced using traditional methods. Learn about the extraction process and sample the oil. Purchase authentic products directly supporting local women." },
            { title: "About Essaouira", content: "Arrive at this UNESCO-listed coastal town known for its blue and white medina, fresh seafood, art galleries, and excellent windsurfing conditions. A perfect contrast to bustling Marrakesh." }
          ],
          itinerary: [],
          tips: ["Morning departures offer best lighting for photos", "Bring cash for argan oil purchases", "Essaouira can be windy - bring a jacket", "Book round-trip for better rates"],
          duration: "2.5-3 hours",
          difficulty: "Easy",
          groupSize: "1-7 passengers"
        },
        includedItems: ["Private vehicle", "Professional driver", "Hotel pickup", "Bottled water", "Argan cooperative stop"],
        excludedItems: ["Meals", "Argan oil purchases", "Tips"],
      },
      fr: {
        title: "Transfert Marrakech à Essaouira",
        description: "Transfert privé panoramique de Marrakech à la ville côtière d'Essaouira avec arrêts optionnels en chemin.",
        detailedDescription: {
          overview: "Voyagez confortablement de Marrakech à la charmante ville côtière d'Essaouira. Profitez du trajet pittoresque à travers les forêts d'arganiers et les paysages spectaculaires, avec des arrêts optionnels dans les coopératives d'huile d'argan et près des chèvres dans les arbres.",
          highlights: ["Transfert privé porte à porte", "Route côtière panoramique", "Arrêt optionnel à la coopérative d'argan", "Voir les célèbres chèvres dans les arganiers", "Véhicule climatisé confortable", "Horaires de départ flexibles"],
          sections: [
            { title: "Le Voyage", content: "Le trajet de 2h30-3h vous emmène à travers des paysages changeants, de la terre rouge de Marrakech à la côte atlantique balayée par le vent. La route traverse les forêts d'arganiers uniques au Maroc, abritant les chèvres grimpeuses." },
            { title: "Arrêt Huile d'Argan", content: "Visitez une coopérative de femmes où l'huile d'argan est produite selon des méthodes traditionnelles. Apprenez le processus d'extraction et goûtez l'huile. Achetez des produits authentiques soutenant directement les femmes locales." },
            { title: "À Propos d'Essaouira", content: "Arrivez dans cette ville côtière classée UNESCO, connue pour sa médina bleue et blanche, ses fruits de mer frais, ses galeries d'art et ses excellentes conditions de planche à voile. Un contraste parfait avec la Marrakech animée." }
          ],
          itinerary: [],
          tips: ["Les départs matinaux offrent le meilleur éclairage pour les photos", "Apportez de l'argent liquide pour les achats d'huile d'argan", "Essaouira peut être venteux - apportez une veste", "Réservez l'aller-retour pour de meilleurs tarifs"],
          duration: "2h30-3 heures",
          difficulty: "Facile",
          groupSize: "1-7 passagers"
        },
        includedItems: ["Véhicule privé", "Chauffeur professionnel", "Prise en charge à l'hôtel", "Eau en bouteille", "Arrêt coopérative d'argan"],
        excludedItems: ["Repas", "Achats d'huile d'argan", "Pourboires"],
      },
      es: {
        title: "Traslado Marrakech a Essaouira",
        description: "Traslado privado panorámico de Marrakech a la ciudad costera de Essaouira con paradas opcionales en el camino.",
        detailedDescription: {
          overview: "Viaje cómodamente de Marrakech a la encantadora ciudad costera de Essaouira. Disfrute del viaje pintoresco a través de bosques de argán y paisajes dramáticos, con paradas opcionales en cooperativas de aceite de argán y árboles con cabras.",
          highlights: ["Traslado privado puerta a puerta", "Ruta costera panorámica", "Parada opcional en cooperativa de argán", "Ver las famosas cabras en los árboles de argán", "Vehículo cómodo con aire acondicionado", "Horarios de salida flexibles"],
          sections: [
            { title: "El Viaje", content: "El trayecto de 2.5-3 horas le lleva a través de paisajes cambiantes, desde la tierra roja de Marrakech hasta la costa atlántica azotada por el viento. La ruta atraviesa bosques de argán únicos de Marruecos, hogar de las cabras trepadoras." },
            { title: "Parada del Aceite de Argán", content: "Visite una cooperativa de mujeres donde se produce aceite de argán usando métodos tradicionales. Aprenda sobre el proceso de extracción y pruebe el aceite. Compre productos auténticos apoyando directamente a las mujeres locales." },
            { title: "Sobre Essaouira", content: "Llegue a esta ciudad costera declarada Patrimonio de la UNESCO, conocida por su medina azul y blanca, mariscos frescos, galerías de arte y excelentes condiciones para windsurf. Un contraste perfecto con la bulliciosa Marrakech." }
          ],
          itinerary: [],
          tips: ["Las salidas matutinas ofrecen la mejor luz para fotos", "Traiga efectivo para compras de aceite de argán", "Essaouira puede ser ventoso - traiga una chaqueta", "Reserve ida y vuelta para mejores tarifas"],
          duration: "2.5-3 horas",
          difficulty: "Fácil",
          groupSize: "1-7 pasajeros"
        },
        includedItems: ["Vehículo privado", "Conductor profesional", "Recogida en hotel", "Agua embotellada", "Parada en cooperativa de argán"],
        excludedItems: ["Comidas", "Compras de aceite de argán", "Propinas"],
      },
    },
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
    departCity: "Marrakech",
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
    translations: {
      en: {
        title: "Marrakesh to Ouarzazate Transfer",
        description: "Scenic transfer through the High Atlas Mountains to Ouarzazate, the gateway to the Sahara Desert.",
        detailedDescription: {
          overview: "Cross the spectacular High Atlas Mountains on this scenic transfer to Ouarzazate, known as the 'Hollywood of Morocco.' Pass through the famous Tizi n'Tichka mountain pass and optionally stop at the UNESCO World Heritage site of Ait Benhaddou.",
          highlights: ["Cross the High Atlas via Tizi n'Tichka pass", "Optional stop at Ait Benhaddou kasbah", "Stunning mountain panoramas", "Visit Berber villages along the way", "Professional mountain-experienced driver", "Photo stops at scenic viewpoints"],
          sections: [
            { title: "Mountain Crossing", content: "The Tizi n'Tichka pass reaches 2,260 meters, offering breathtaking views of the Atlas Mountains. Your experienced driver knows the best viewpoints for photos of the dramatic landscape." },
            { title: "Ait Benhaddou", content: "This UNESCO World Heritage site is a stunning example of traditional earthen architecture. Featured in films like Gladiator and Game of Thrones, the kasbah is worth exploring if time permits." },
            { title: "Ouarzazate", content: "Known as the gateway to the desert, Ouarzazate is home to Atlas Studios and the Taourirt Kasbah. It's the perfect starting point for desert adventures or continuing to the Draa Valley." }
          ],
          itinerary: [],
          tips: ["Book early departure to allow time for stops", "Bring warm clothing - mountains are cool", "Some winding roads - take motion sickness prevention if needed", "Combine with desert tour for best experience"],
          duration: "4-5 hours",
          difficulty: "Easy",
          groupSize: "1-7 passengers"
        },
        includedItems: ["Private 4x4 vehicle", "Experienced mountain driver", "Hotel pickup", "Bottled water", "Photo stops"],
        excludedItems: ["Ait Benhaddou entrance fee", "Meals", "Tips"],
      },
      fr: {
        title: "Transfert Marrakech à Ouarzazate",
        description: "Transfert panoramique à travers les montagnes du Haut Atlas vers Ouarzazate, la porte du désert du Sahara.",
        detailedDescription: {
          overview: "Traversez les spectaculaires montagnes du Haut Atlas lors de ce transfert panoramique vers Ouarzazate, connue comme le « Hollywood du Maroc ». Passez par le célèbre col du Tizi n'Tichka et arrêtez-vous optionnellement au site du patrimoine mondial UNESCO d'Aït Benhaddou.",
          highlights: ["Traversée du Haut Atlas via le col du Tizi n'Tichka", "Arrêt optionnel à la kasbah d'Aït Benhaddou", "Panoramas de montagne époustouflants", "Visite de villages berbères en chemin", "Chauffeur professionnel expérimenté en montagne", "Arrêts photo aux points de vue panoramiques"],
          sections: [
            { title: "Traversée des Montagnes", content: "Le col du Tizi n'Tichka atteint 2 260 mètres, offrant des vues à couper le souffle sur les montagnes de l'Atlas. Votre chauffeur expérimenté connaît les meilleurs points de vue pour photographier le paysage spectaculaire." },
            { title: "Aït Benhaddou", content: "Ce site du patrimoine mondial UNESCO est un exemple magnifique d'architecture traditionnelle en terre. Présenté dans des films comme Gladiator et Game of Thrones, la kasbah vaut la peine d'être explorée si le temps le permet." },
            { title: "Ouarzazate", content: "Connue comme la porte du désert, Ouarzazate abrite Atlas Studios et la Kasbah de Taourirt. C'est le point de départ parfait pour les aventures dans le désert ou pour continuer vers la vallée du Drâa." }
          ],
          itinerary: [],
          tips: ["Réservez un départ matinal pour avoir le temps de faire des arrêts", "Apportez des vêtements chauds - les montagnes sont fraîches", "Routes sinueuses - prenez un anti-mal des transports si nécessaire", "Combinez avec un tour du désert pour la meilleure expérience"],
          duration: "4-5 heures",
          difficulty: "Facile",
          groupSize: "1-7 passagers"
        },
        includedItems: ["Véhicule 4x4 privé", "Chauffeur expérimenté en montagne", "Prise en charge à l'hôtel", "Eau en bouteille", "Arrêts photo"],
        excludedItems: ["Frais d'entrée Aït Benhaddou", "Repas", "Pourboires"],
      },
      es: {
        title: "Traslado Marrakech a Ouarzazate",
        description: "Traslado panorámico a través de las montañas del Alto Atlas hacia Ouarzazate, la puerta al desierto del Sáhara.",
        detailedDescription: {
          overview: "Cruce las espectaculares montañas del Alto Atlas en este traslado panorámico a Ouarzazate, conocida como el 'Hollywood de Marruecos'. Pase por el famoso paso de montaña Tizi n'Tichka y opcionalmente deténgase en el sitio Patrimonio de la Humanidad de la UNESCO de Ait Benhaddou.",
          highlights: ["Cruce del Alto Atlas vía paso Tizi n'Tichka", "Parada opcional en kasbah Ait Benhaddou", "Impresionantes panoramas de montaña", "Visite pueblos bereberes en el camino", "Conductor profesional con experiencia en montaña", "Paradas fotográficas en miradores panorámicos"],
          sections: [
            { title: "Cruce de Montaña", content: "El paso Tizi n'Tichka alcanza los 2.260 metros, ofreciendo vistas impresionantes de las montañas del Atlas. Su conductor experimentado conoce los mejores miradores para fotografiar el dramático paisaje." },
            { title: "Ait Benhaddou", content: "Este sitio Patrimonio de la Humanidad de la UNESCO es un impresionante ejemplo de arquitectura tradicional de barro. Presentado en películas como Gladiador y Juego de Tronos, la kasbah merece ser explorada si el tiempo lo permite." },
            { title: "Ouarzazate", content: "Conocida como la puerta al desierto, Ouarzazate alberga Atlas Studios y la Kasbah de Taourirt. Es el punto de partida perfecto para aventuras en el desierto o continuar hacia el Valle del Draa." }
          ],
          itinerary: [],
          tips: ["Reserve salida temprana para tener tiempo para paradas", "Traiga ropa de abrigo - las montañas son frescas", "Carreteras con curvas - tome medicamento para el mareo si es necesario", "Combine con tour del desierto para la mejor experiencia"],
          duration: "4-5 horas",
          difficulty: "Fácil",
          groupSize: "1-7 pasajeros"
        },
        includedItems: ["Vehículo 4x4 privado", "Conductor experimentado en montaña", "Recogida en hotel", "Agua embotellada", "Paradas fotográficas"],
        excludedItems: ["Entrada a Ait Benhaddou", "Comidas", "Propinas"],
      },
    },
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
]

// Best Offers (mix from other types)
export const bestOffers: Offer[] = [
  // Pick up to 3 offers from each category to highlight
  ...toursOffers.slice(0, 3),
  ...excursionsOffers.slice(0, 3),
  ...activitiesOffers.slice(0, 3),
  ...packagesOffers.slice(0, 3),
  ...transfersOffers.slice(0, 3),
]

export const allOffers = {
  tours: toursOffers,
  excursions: excursionsOffers,
  activities: activitiesOffers,
  packages: packagesOffers,
  transfers: transfersOffers,
  "best-offers": bestOffers,
}

// Blog posts
export interface BlogPost {
  id: string
  type: "blog"
  title: string
  description: string
  content: string
  mainImage: string
  thumbnailImages: string[]
  author: string
  publishDate: string
  translations?: {
    en?: {
      title: string
      description: string
      content: string
    }
    fr?: {
      title: string
      description: string
      content: string
    }
    es?: {
      title: string
      description: string
      content: string
    }
  }
}

export const blogPosts: BlogPost[] = [
  {
    id: "blog-001",
    type: "blog",
    title: "Top 10 Hidden Gems in Marrakesh's Medina",
    description: "Discover secret spots and hidden treasures in the heart of Marrakesh that most tourists miss. From hidden rooftop terraces to artisan workshops tucked away in narrow alleys.",
    content: "Marrakesh's medina is a UNESCO World Heritage site filled with centuries of history, culture, and hidden treasures waiting to be discovered. While the famous Jemaa el-Fnaa square draws millions of visitors, the real magic lies in the lesser-known corners of this ancient city.\n\nStart your journey at the Bahia Palace gardens, where peaceful courtyards offer a respite from the bustling streets. Continue to the Mellah, the historic Jewish quarter, where you'll find beautifully ornate synagogues and the moving Miâara Jewish Cemetery.\n\nVenture into the souks beyond the main tourist paths to discover master craftsmen creating traditional Moroccan goods. Look for the tiny doorways that lead to hidden riads, some of which have been transformed into stunning boutique hotels and restaurants.\n\nDon't miss the Mouassine fountain, a 16th-century masterpiece, or the secret garden of Le Jardin Secret, recently restored to its former glory. For the best views, seek out one of the many rooftop cafés where you can watch the sunset over the Atlas Mountains while sipping mint tea.",
    mainImage: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thumbnailImages: [
      "https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    author: "Ahmed Benali",
    publishDate: "2025-12-01",
    translations: {
      en: {
        title: "Top 10 Hidden Gems in Marrakesh's Medina",
        description: "Discover secret spots and hidden treasures in the heart of Marrakesh that most tourists miss. From hidden rooftop terraces to artisan workshops tucked away in narrow alleys.",
        content: "Marrakesh's medina is a UNESCO World Heritage site filled with centuries of history, culture, and hidden treasures waiting to be discovered. While the famous Jemaa el-Fnaa square draws millions of visitors, the real magic lies in the lesser-known corners of this ancient city.\n\nStart your journey at the Bahia Palace gardens, where peaceful courtyards offer a respite from the bustling streets. Continue to the Mellah, the historic Jewish quarter, where you'll find beautifully ornate synagogues and the moving Miâara Jewish Cemetery.\n\nVenture into the souks beyond the main tourist paths to discover master craftsmen creating traditional Moroccan goods. Look for the tiny doorways that lead to hidden riads, some of which have been transformed into stunning boutique hotels and restaurants.\n\nDon't miss the Mouassine fountain, a 16th-century masterpiece, or the secret garden of Le Jardin Secret, recently restored to its former glory. For the best views, seek out one of the many rooftop cafés where you can watch the sunset over the Atlas Mountains while sipping mint tea.",
      },
      fr: {
        title: "Top 10 des Trésors Cachés de la Médina de Marrakech",
        description: "Découvrez des endroits secrets et des trésors cachés au cœur de Marrakech que la plupart des touristes manquent. Des terrasses cachées aux ateliers d'artisans dans des ruelles étroites.",
        content: "La médina de Marrakech est un site du patrimoine mondial de l'UNESCO rempli de siècles d'histoire, de culture et de trésors cachés qui attendent d'être découverts. Alors que la célèbre place Jemaa el-Fnaa attire des millions de visiteurs, la vraie magie se trouve dans les coins moins connus de cette ville ancienne.\n\nCommencez votre voyage dans les jardins du Palais Bahia, où des cours paisibles offrent un répit des rues animées. Continuez vers le Mellah, le quartier juif historique, où vous trouverez des synagogues magnifiquement ornées et l'émouvant cimetière juif Miâara.\n\nAventurez-vous dans les souks au-delà des sentiers touristiques pour découvrir des maîtres artisans créant des produits marocains traditionnels. Cherchez les petites portes qui mènent à des riads cachés, dont certains ont été transformés en superbes hôtels-boutiques et restaurants.\n\nNe manquez pas la fontaine Mouassine, un chef-d'œuvre du 16ème siècle, ou le jardin secret du Jardin Secret, récemment restauré dans sa gloire d'antan. Pour les meilleures vues, cherchez l'un des nombreux cafés sur les toits où vous pouvez regarder le coucher du soleil sur les montagnes de l'Atlas en sirotant un thé à la menthe.",
      },
      es: {
        title: "Los 10 Tesoros Ocultos de la Medina de Marrakech",
        description: "Descubre lugares secretos y tesoros ocultos en el corazón de Marrakech que la mayoría de los turistas pasan por alto. Desde terrazas ocultas hasta talleres de artesanos en callejones estrechos.",
        content: "La medina de Marrakech es un sitio del Patrimonio Mundial de la UNESCO lleno de siglos de historia, cultura y tesoros ocultos esperando ser descubiertos. Mientras que la famosa plaza Jemaa el-Fnaa atrae a millones de visitantes, la verdadera magia se encuentra en los rincones menos conocidos de esta antigua ciudad.\n\nComienza tu viaje en los jardines del Palacio Bahía, donde patios tranquilos ofrecen un respiro de las calles bulliciosas. Continúa hacia el Mellah, el histórico barrio judío, donde encontrarás sinagogas bellamente ornamentadas y el conmovedor Cementerio Judío Miâara.\n\nAventúrate en los zocos más allá de las rutas turísticas principales para descubrir maestros artesanos creando productos marroquíes tradicionales. Busca las pequeñas puertas que conducen a riads ocultos, algunos de los cuales se han transformado en impresionantes hoteles boutique y restaurantes.\n\nNo te pierdas la fuente Mouassine, una obra maestra del siglo XVI, o el jardín secreto de Le Jardin Secret, recientemente restaurado a su antigua gloria. Para las mejores vistas, busca uno de los muchos cafés en las azoteas donde puedes ver la puesta de sol sobre las montañas del Atlas mientras bebes té de menta.",
      },
    },
  },
  {
    id: "blog-002",
    type: "blog",
    title: "A Complete Guide to Moroccan Cuisine",
    description: "From tagines to pastilla, explore the rich flavors of Moroccan cooking. Learn about traditional spices, cooking techniques, and the best dishes to try during your visit.",
    content: "Moroccan cuisine is a vibrant tapestry of flavors, aromas, and textures that reflects centuries of cultural exchange along ancient trade routes. From the aromatic tagines slow-cooked in earthenware pots to the sweet and savory layers of pastilla, every dish tells a story.\n\nThe foundation of Moroccan cooking lies in its spice blends, particularly ras el hanout, which can contain over 30 different spices. Cumin, coriander, saffron, and cinnamon play starring roles, creating the distinctive flavor profiles that make Moroccan food unforgettable.\n\nTagine, named after the conical clay pot it's cooked in, is the heart of Moroccan cuisine. Whether prepared with chicken and preserved lemons, lamb with prunes and almonds, or vegetables and chickpeas, this slow-cooking method creates incredibly tender and flavorful dishes.\n\nCouscous holds a special place in Moroccan culture, traditionally served on Fridays after prayers. The tiny semolina granules are steamed multiple times until light and fluffy, then topped with a rich vegetable and meat stew.\n\nFor the adventurous eater, don't miss the street food scene. Try msemmen (layered flatbread), harira (hearty soup), and of course, the ubiquitous Moroccan mint tea, poured from height to create a perfect foam.",
    mainImage: "https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thumbnailImages: [
      "https://images.pexels.com/photos/5409020/pexels-photo-5409020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5409023/pexels-photo-5409023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    author: "Fatima Zahra",
    publishDate: "2025-11-25",
    translations: {
      en: {
        title: "A Complete Guide to Moroccan Cuisine",
        description: "From tagines to pastilla, explore the rich flavors of Moroccan cooking. Learn about traditional spices, cooking techniques, and the best dishes to try during your visit.",
        content: "Moroccan cuisine is a vibrant tapestry of flavors, aromas, and textures that reflects centuries of cultural exchange along ancient trade routes. From the aromatic tagines slow-cooked in earthenware pots to the sweet and savory layers of pastilla, every dish tells a story.\n\nThe foundation of Moroccan cooking lies in its spice blends, particularly ras el hanout, which can contain over 30 different spices. Cumin, coriander, saffron, and cinnamon play starring roles, creating the distinctive flavor profiles that make Moroccan food unforgettable.\n\nTagine, named after the conical clay pot it's cooked in, is the heart of Moroccan cuisine. Whether prepared with chicken and preserved lemons, lamb with prunes and almonds, or vegetables and chickpeas, this slow-cooking method creates incredibly tender and flavorful dishes.\n\nCouscous holds a special place in Moroccan culture, traditionally served on Fridays after prayers. The tiny semolina granules are steamed multiple times until light and fluffy, then topped with a rich vegetable and meat stew.\n\nFor the adventurous eater, don't miss the street food scene. Try msemmen (layered flatbread), harira (hearty soup), and of course, the ubiquitous Moroccan mint tea, poured from height to create a perfect foam.",
      },
      fr: {
        title: "Guide Complet de la Cuisine Marocaine",
        description: "Des tajines à la pastilla, explorez les riches saveurs de la cuisine marocaine. Découvrez les épices traditionnelles, les techniques de cuisson et les meilleurs plats à essayer pendant votre visite.",
        content: "La cuisine marocaine est une tapisserie vibrante de saveurs, d'arômes et de textures qui reflète des siècles d'échanges culturels le long des anciennes routes commerciales. Des tajines aromatiques mijotés dans des pots en terre cuite aux couches sucrées et salées de la pastilla, chaque plat raconte une histoire.\n\nLe fondement de la cuisine marocaine repose sur ses mélanges d'épices, en particulier le ras el hanout, qui peut contenir plus de 30 épices différentes. Le cumin, la coriandre, le safran et la cannelle jouent des rôles principaux, créant les profils de saveurs distinctifs qui rendent la nourriture marocaine inoubliable.\n\nLe tajine, nommé d'après le pot en argile conique dans lequel il est cuit, est le cœur de la cuisine marocaine. Qu'il soit préparé avec du poulet et des citrons confits, de l'agneau aux pruneaux et amandes, ou des légumes et pois chiches, cette méthode de cuisson lente crée des plats incroyablement tendres et savoureux.\n\nLe couscous occupe une place spéciale dans la culture marocaine, traditionnellement servi le vendredi après les prières. Les minuscules grains de semoule sont cuits à la vapeur plusieurs fois jusqu'à être légers et aérés, puis garnis d'un riche ragoût de légumes et de viande.\n\nPour les mangeurs aventureux, ne manquez pas la scène de la cuisine de rue. Essayez le msemmen (pain plat feuilleté), la harira (soupe copieuse) et, bien sûr, l'omniprésent thé à la menthe marocain, versé de haut pour créer une mousse parfaite.",
      },
      es: {
        title: "Guía Completa de la Cocina Marroquí",
        description: "Desde tajines hasta pastilla, explora los ricos sabores de la cocina marroquí. Aprende sobre especias tradicionales, técnicas de cocina y los mejores platos para probar durante tu visita.",
        content: "La cocina marroquí es un tapiz vibrante de sabores, aromas y texturas que refleja siglos de intercambio cultural a lo largo de las antiguas rutas comerciales. Desde los aromáticos tajines cocinados a fuego lento en ollas de barro hasta las capas dulces y saladas de la pastilla, cada plato cuenta una historia.\n\nLa base de la cocina marroquí radica en sus mezclas de especias, particularmente el ras el hanout, que puede contener más de 30 especias diferentes. El comino, el cilantro, el azafrán y la canela juegan roles protagonistas, creando los perfiles de sabor distintivos que hacen que la comida marroquí sea inolvidable.\n\nEl tajine, que lleva el nombre de la olla de arcilla cónica en la que se cocina, es el corazón de la cocina marroquí. Ya sea preparado con pollo y limones en conserva, cordero con ciruelas y almendras, o verduras y garbanzos, este método de cocción lenta crea platos increíblemente tiernos y sabrosos.\n\nEl cuscús ocupa un lugar especial en la cultura marroquí, tradicionalmente servido los viernes después de las oraciones. Los diminutos granos de sémola se cuecen al vapor varias veces hasta quedar ligeros y esponjosos, luego se cubren con un rico estofado de verduras y carne.\n\nPara el comensal aventurero, no te pierdas la escena de la comida callejera. Prueba el msemmen (pan plano en capas), la harira (sopa abundante) y, por supuesto, el omnipresente té de menta marroquí, servido desde altura para crear una espuma perfecta.",
      },
    },
  },
  {
    id: "blog-003",
    type: "blog",
    title: "Desert Adventures: What to Expect on a Sahara Trip",
    description: "Planning a Sahara desert adventure? Here's everything you need to know about camel treks, desert camps, and experiencing the magic of the world's largest hot desert.",
    content: "The Sahara Desert is one of the most awe-inspiring landscapes on Earth, and experiencing it firsthand is a bucket-list adventure for many travelers. From the towering dunes of Erg Chebbi to the peaceful silence of the desert night, a Sahara trip offers unforgettable memories.\n\nMost Sahara adventures begin in Marrakesh, with a scenic drive through the Atlas Mountains and the Draa Valley. Along the way, you'll pass through ancient kasbahs, including the famous Ait Benhaddou, a UNESCO World Heritage site that has served as a backdrop for countless films.\n\nUpon reaching the desert's edge, you'll trade your vehicle for a camel and embark on the iconic trek into the dunes. The rhythmic swaying of the camel, the changing colors of the sand as the sun sets, and the gradual transformation of the landscape create a truly magical experience.\n\nDesert camps range from basic Berber tents to luxury glamping experiences. Regardless of the level of comfort, the highlight remains the same: the night sky. Far from light pollution, the Sahara offers some of the clearest stargazing on the planet.\n\nPrepare for extreme temperature variations – scorching days and surprisingly cold nights. Pack layers, sunscreen, and a sense of adventure. The Sahara will reward you with an experience unlike any other.",
    mainImage: "https://images.pexels.com/photos/3889927/pexels-photo-3889927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thumbnailImages: [
      "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4356144/pexels-photo-4356144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    author: "Omar Tazi",
    publishDate: "2025-11-18",
    translations: {
      en: {
        title: "Desert Adventures: What to Expect on a Sahara Trip",
        description: "Planning a Sahara desert adventure? Here's everything you need to know about camel treks, desert camps, and experiencing the magic of the world's largest hot desert.",
        content: "The Sahara Desert is one of the most awe-inspiring landscapes on Earth, and experiencing it firsthand is a bucket-list adventure for many travelers. From the towering dunes of Erg Chebbi to the peaceful silence of the desert night, a Sahara trip offers unforgettable memories.\n\nMost Sahara adventures begin in Marrakesh, with a scenic drive through the Atlas Mountains and the Draa Valley. Along the way, you'll pass through ancient kasbahs, including the famous Ait Benhaddou, a UNESCO World Heritage site that has served as a backdrop for countless films.\n\nUpon reaching the desert's edge, you'll trade your vehicle for a camel and embark on the iconic trek into the dunes. The rhythmic swaying of the camel, the changing colors of the sand as the sun sets, and the gradual transformation of the landscape create a truly magical experience.\n\nDesert camps range from basic Berber tents to luxury glamping experiences. Regardless of the level of comfort, the highlight remains the same: the night sky. Far from light pollution, the Sahara offers some of the clearest stargazing on the planet.\n\nPrepare for extreme temperature variations – scorching days and surprisingly cold nights. Pack layers, sunscreen, and a sense of adventure. The Sahara will reward you with an experience unlike any other.",
      },
      fr: {
        title: "Aventures dans le Désert : À Quoi S'Attendre lors d'un Voyage au Sahara",
        description: "Vous planifiez une aventure dans le désert du Sahara ? Voici tout ce que vous devez savoir sur les randonnées à dos de chameau, les camps du désert et la magie du plus grand désert chaud du monde.",
        content: "Le désert du Sahara est l'un des paysages les plus impressionnants de la Terre, et le vivre de première main est une aventure incontournable pour de nombreux voyageurs. Des dunes imposantes de l'Erg Chebbi au silence paisible de la nuit désertique, un voyage au Sahara offre des souvenirs inoubliables.\n\nLa plupart des aventures au Sahara commencent à Marrakech, avec une route panoramique à travers les montagnes de l'Atlas et la vallée du Draa. En chemin, vous passerez par d'anciennes kasbahs, dont la célèbre Aït Benhaddou, un site du patrimoine mondial de l'UNESCO qui a servi de décor à d'innombrables films.\n\nEn atteignant le bord du désert, vous échangerez votre véhicule contre un chameau et embarquerez pour le trek emblématique dans les dunes. Le balancement rythmique du chameau, les couleurs changeantes du sable au coucher du soleil et la transformation progressive du paysage créent une expérience vraiment magique.\n\nLes camps du désert vont des tentes berbères basiques aux expériences de glamping de luxe. Quel que soit le niveau de confort, le point culminant reste le même : le ciel nocturne. Loin de la pollution lumineuse, le Sahara offre l'une des observations d'étoiles les plus claires de la planète.\n\nPréparez-vous à des variations de température extrêmes – des journées brûlantes et des nuits étonnamment froides. Emportez des couches, de la crème solaire et un sens de l'aventure. Le Sahara vous récompensera d'une expérience unique.",
      },
      es: {
        title: "Aventuras en el Desierto: Qué Esperar en un Viaje al Sahara",
        description: "¿Planeas una aventura en el desierto del Sahara? Aquí está todo lo que necesitas saber sobre paseos en camello, campamentos del desierto y experimentar la magia del desierto caliente más grande del mundo.",
        content: "El desierto del Sahara es uno de los paisajes más impresionantes de la Tierra, y experimentarlo de primera mano es una aventura imperdible para muchos viajeros. Desde las imponentes dunas de Erg Chebbi hasta el silencio pacífico de la noche del desierto, un viaje al Sahara ofrece recuerdos inolvidables.\n\nLa mayoría de las aventuras en el Sahara comienzan en Marrakech, con un recorrido escénico a través de las montañas del Atlas y el Valle del Draa. En el camino, pasarás por antiguas kasbahs, incluyendo la famosa Ait Benhaddou, un sitio del Patrimonio Mundial de la UNESCO que ha servido como telón de fondo para innumerables películas.\n\nAl llegar al borde del desierto, cambiarás tu vehículo por un camello y emprenderás el icónico trek hacia las dunas. El balanceo rítmico del camello, los colores cambiantes de la arena mientras se pone el sol y la transformación gradual del paisaje crean una experiencia verdaderamente mágica.\n\nLos campamentos del desierto van desde tiendas bereberes básicas hasta experiencias de glamping de lujo. Independientemente del nivel de comodidad, lo más destacado sigue siendo el mismo: el cielo nocturno. Lejos de la contaminación lumínica, el Sahara ofrece una de las observaciones de estrellas más claras del planeta.\n\nPrepárate para variaciones extremas de temperatura – días abrasadores y noches sorprendentemente frías. Empaca capas, protector solar y un sentido de aventura. El Sahara te recompensará con una experiencia única.",
      },
    },
  },
]

// Helper function to get a blog post by ID
export function getBlogById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id)
}

// Helper function to get translated blog content
export function getTranslatedBlog(post: BlogPost, language: Language) {
  const translation = post.translations?.[language]
  
  if (!translation) {
    const englishTranslation = post.translations?.en
    if (englishTranslation && language !== "en") {
      return {
        ...post,
        title: englishTranslation.title,
        description: englishTranslation.description,
        content: englishTranslation.content,
      }
    }
    return post
  }
  
  return {
    ...post,
    title: translation.title,
    description: translation.description,
    content: translation.content,
  }
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

// Helper function to get translated offer content
export function getTranslatedOffer(offer: Offer, language: Language) {
  const translation = offer.translations?.[language]
  
  // If no translation exists for this language, fall back to English, then to default fields
  if (!translation) {
    const englishTranslation = offer.translations?.en
    if (englishTranslation && language !== "en") {
      return {
        ...offer,
        title: englishTranslation.title,
        description: englishTranslation.description,
        detailedDescription: englishTranslation.detailedDescription,
        includedItems: englishTranslation.includedItems,
        excludedItems: englishTranslation.excludedItems,
      }
    }
    // Fall back to default fields if no translations exist
    return offer
  }
  
  return {
    ...offer,
    title: translation.title,
    description: translation.description,
    detailedDescription: translation.detailedDescription,
    includedItems: translation.includedItems,
    excludedItems: translation.excludedItems,
  }
}
