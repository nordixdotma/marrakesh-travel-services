import type { Language } from "./translations"

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
    mainImage: "https://images.pexels.com/photos/14267612/pexels-photo-14267612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Guided tour", "Local insights", "Transport", "Water"],
    excludedItems: ["Meals", "Museum fees"],
    translations: {
      en: {
        title: "Old Casbah & Jewish Quarter Tour",
        description: "Discover the rich cultural heritage of Marrakesh through this comprehensive tour of historical quarters and architectural gems.",
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
        includedItems: ["Guided tour", "Local insights", "Transport", "Water"],
        excludedItems: ["Meals", "Museum fees"],
      },
      fr: {
        title: "Visite de l'Ancienne Casbah et du Quartier Juif",
        description: "Découvrez le riche patrimoine culturel de Marrakech à travers cette visite complète des quartiers historiques et des joyaux architecturaux.",
        detailedDescription: {
          overview: "Découvrez l'histoire multiculturelle de Marrakech avec cette fascinante visite à travers l'ancienne Casbah et le Mellah historique (Quartier Juif). Explorez des siècles de coexistence entre différentes communautés et découvrez des trésors architecturaux souvent manqués par les visiteurs.",
          highlights: [
            "Explorez l'ancien quartier de la Casbah",
            "Visitez le quartier juif historique (Mellah)",
            "Découvrez la Synagogue Lazama",
            "Visitez les Tombeaux Saadiens",
            "Apprenez l'histoire multiculturelle de Marrakech"
          ],
          sections: [
            {
              title: "La Casbah",
              content: "Promenez-vous dans l'ancien quartier fortifié qui abritait autrefois le palais royal et les bâtiments administratifs. Admirez les murs massifs, les portes décoratives et les célèbres ruines du Palais El Badi, autrefois considéré comme l'un des plus beaux palais du monde."
            },
            {
              title: "Le Mellah",
              content: "Entrez dans le quartier juif historique, fondé en 1558. Visitez la Synagogue Lazama, l'une des plus anciennes du Maroc, et explorez l'architecture unique avec ses balcons et fenêtres plus grandes que les maisons marocaines typiques. Découvrez la riche histoire des Juifs marocains."
            },
            {
              title: "Trésors Cachés",
              content: "Découvrez les Tombeaux Saadiens, redécouverts en 1917, contenant les restes de 60 membres de la dynastie saadienne. Les carrelages complexes et le cèdre sculpté sont parmi les plus beaux exemples d'art islamique au Maroc."
            }
          ],
          itinerary: [
            { time: "09:00", activity: "Rencontre à Jemaa el-Fnaa" },
            { time: "09:30", activity: "Exploration du quartier de la Casbah" },
            { time: "10:30", activity: "Visite des Tombeaux Saadiens" },
            { time: "11:30", activity: "Marche vers le Mellah" },
            { time: "12:00", activity: "Visite du quartier juif et de la synagogue" },
            { time: "13:00", activity: "Rafraîchissements locaux et conclusion" }
          ],
          tips: [
            "Les visites de la synagogue nécessitent une tenue modeste",
            "Apportez un petit don pour la synagogue",
            "La photographie peut être restreinte dans certaines zones",
            "Demandez à votre guide les options de nourriture casher"
          ],
          duration: "4 heures",
          difficulty: "Facile",
          groupSize: "2-12 personnes"
        },
        includedItems: ["Visite guidée", "Informations locales", "Transport", "Eau"],
        excludedItems: ["Repas", "Frais de musée"],
      },
      es: {
        title: "Tour de la Antigua Kasbah y el Barrio Judío",
        description: "Descubra el rico patrimonio cultural de Marrakech a través de este completo tour por los barrios históricos y las joyas arquitectónicas.",
        detailedDescription: {
          overview: "Descubra la historia multicultural de Marrakech con este fascinante tour por la antigua Kasbah y el histórico Mellah (Barrio Judío). Explore siglos de coexistencia entre diferentes comunidades y descubra tesoros arquitectónicos que la mayoría de los visitantes pasan por alto.",
          highlights: [
            "Explore el antiguo distrito de la Kasbah",
            "Visite el histórico Barrio Judío (Mellah)",
            "Vea la Sinagoga Lazama",
            "Descubra las Tumbas Saadíes",
            "Aprenda sobre el patrimonio multicultural de Marrakech"
          ],
          sections: [
            {
              title: "La Kasbah",
              content: "Camine por el antiguo distrito fortificado que una vez albergó el palacio real y los edificios administrativos. Maravíllese con las enormes murallas, las puertas decorativas y las famosas ruinas del Palacio El Badi, una vez considerado uno de los palacios más hermosos del mundo."
            },
            {
              title: "El Mellah",
              content: "Entre en el histórico Barrio Judío, establecido en 1558. Visite la Sinagoga Lazama, una de las más antiguas de Marruecos, y explore la arquitectura única con balcones y ventanas más grandes que las casas marroquíes típicas. Conozca la rica historia de los judíos marroquíes."
            },
            {
              title: "Tesoros Ocultos",
              content: "Descubra las Tumbas Saadíes, redescubiertas en 1917, que contienen los restos de 60 miembros de la dinastía saadí. Los intrincados azulejos y el cedro tallado están entre los mejores ejemplos del arte islámico en Marruecos."
            }
          ],
          itinerary: [
            { time: "09:00", activity: "Encuentro en Jemaa el-Fnaa" },
            { time: "09:30", activity: "Exploración del distrito de la Kasbah" },
            { time: "10:30", activity: "Visita a las Tumbas Saadíes" },
            { time: "11:30", activity: "Caminata hacia el Mellah" },
            { time: "12:00", activity: "Visita al Barrio Judío y la sinagoga" },
            { time: "13:00", activity: "Refrescos locales y conclusión" }
          ],
          tips: [
            "Las visitas a la sinagoga requieren vestimenta modesta",
            "Traiga una pequeña donación para la sinagoga",
            "La fotografía puede estar restringida en algunas áreas",
            "Pregunte a su guía sobre opciones de comida kosher"
          ],
          duration: "4 horas",
          difficulty: "Fácil",
          groupSize: "2-12 personas"
        },
        includedItems: ["Tour guiado", "Información local", "Transporte", "Agua"],
        excludedItems: ["Comidas", "Tarifas de museo"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/13811605/pexels-photo-13811605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Guided walk", "Traditional snacks", "Photography tips", "Local stories"],
    excludedItems: ["Vendor purchases", "Meals"],
    translations: {
      en: {
        title: "Sunset at Jemaa el-Fnaa Square",
        description: "Experience the vibrant energy of Jemaa el-Fnaa square as the sun sets. Street performers, local food vendors, and magical atmosphere.",
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
        includedItems: ["Guided walk", "Traditional snacks", "Photography tips", "Local stories"],
        excludedItems: ["Vendor purchases", "Meals"],
      },
      fr: {
        title: "Coucher de Soleil sur la Place Jemaa el-Fnaa",
        description: "Vivez l'énergie vibrante de la place Jemaa el-Fnaa au coucher du soleil. Artistes de rue, vendeurs de nourriture locale et atmosphère magique.",
        detailedDescription: {
          overview: "Assistez à la légendaire transformation de la place Jemaa el-Fnaa, de marché de jour en spectacle du soir. Première proclamation de l'UNESCO comme Chef-d'œuvre du patrimoine oral et immatériel de l'humanité, cette expérience capture l'essence de la culture vivante de Marrakech.",
          highlights: [
            "Admirez le célèbre coucher de soleil depuis une terrasse sur le toit",
            "Découvrez les artistes de rue et les conteurs",
            "Dégustez la cuisine de rue authentique en toute sécurité",
            "Apprenez l'histoire du patrimoine UNESCO de la place",
            "Capturez de superbes photos à l'heure dorée"
          ],
          sections: [
            {
              title: "La Magie du Coucher de Soleil",
              content: "Alors que le soleil descend, la place subit une transformation remarquable. Les charmeurs de serpents, les artistes au henné et les musiciens cèdent la place aux stands de nourriture, aux conteurs et aux musiciens Gnawa. L'énergie est électrique et unique au monde."
            },
            {
              title: "Expérience de la Cuisine de Rue",
              content: "Votre guide vous fera naviguer en toute sécurité à travers les stands de nourriture, recommandant les meilleures options et les plus sûres. Goûtez aux viandes grillées, au jus d'orange frais, à la soupe d'escargots et aux sucreries traditionnelles tout en découvrant les histoires derrière chaque plat."
            },
            {
              title: "Divertissement du Soir",
              content: "Rencontrez les artistes uniques de la place : musiciens berbères, acrobates, guérisseurs traditionnels et les célèbres spectacles de Halqa (cercle). Votre guide expliquera la signification culturelle de chaque tradition."
            }
          ],
          itinerary: [
            { time: "17:00", activity: "Rencontre au café désigné" },
            { time: "17:30", activity: "Vue du coucher de soleil depuis le toit" },
            { time: "18:30", activity: "Descente dans la place" },
            { time: "19:00", activity: "Tour de dégustation de cuisine de rue" },
            { time: "20:00", activity: "Spectacles du soir et Halqa" },
            { time: "21:00", activity: "Fin de la visite" }
          ],
          tips: [
            "Gardez vos objets de valeur en sécurité dans la foule",
            "Venez avec de l'appétit pour la cuisine de rue",
            "Demandez avant de photographier les artistes (pourboires attendus)",
            "Portez des chaussures confortables"
          ],
          duration: "4 heures",
          difficulty: "Facile",
          groupSize: "2-10 personnes"
        },
        includedItems: ["Visite guidée à pied", "Collations traditionnelles", "Conseils photo", "Histoires locales"],
        excludedItems: ["Achats auprès des vendeurs", "Repas"],
      },
      es: {
        title: "Atardecer en la Plaza Jemaa el-Fnaa",
        description: "Experimente la vibrante energía de la plaza Jemaa el-Fnaa mientras el sol se pone. Artistas callejeros, vendedores de comida local y atmósfera mágica.",
        detailedDescription: {
          overview: "Sea testigo de la legendaria transformación de la plaza Jemaa el-Fnaa de mercado diurno a espectáculo nocturno. Como la primera proclamación de la UNESCO como Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad, esta experiencia captura la esencia de la cultura viva de Marrakech.",
          highlights: [
            "Contemple el famoso atardecer desde una terraza en la azotea",
            "Experimente artistas callejeros y cuentacuentos",
            "Pruebe comida callejera auténtica de forma segura",
            "Aprenda sobre el patrimonio UNESCO de la plaza",
            "Capture impresionantes fotos de la hora dorada"
          ],
          sections: [
            {
              title: "La Magia del Atardecer",
              content: "A medida que el sol desciende, la plaza experimenta una notable transformación. Los encantadores de serpientes, artistas de henna y músicos dan paso a puestos de comida, cuentacuentos y músicos Gnawa. La energía es eléctrica y única en el mundo."
            },
            {
              title: "Experiencia de Comida Callejera",
              content: "Su guía le navegará de forma segura a través de los puestos de comida, recomendando las mejores y más seguras opciones. Pruebe carnes a la parrilla, jugo de naranja fresco, sopa de caracoles y dulces tradicionales mientras aprende las historias detrás de cada plato."
            },
            {
              title: "Entretenimiento Nocturno",
              content: "Encuentre a los artistas únicos de la plaza: músicos bereberes, acróbatas, curanderos tradicionales y los famosos espectáculos de Halqa (círculo). Su guía explicará el significado cultural de cada tradición."
            }
          ],
          itinerary: [
            { time: "17:00", activity: "Encuentro en el café designado" },
            { time: "17:30", activity: "Vista del atardecer desde la azotea" },
            { time: "18:30", activity: "Descenso a la plaza" },
            { time: "19:00", activity: "Tour de degustación de comida callejera" },
            { time: "20:00", activity: "Artistas nocturnos y Halqa" },
            { time: "21:00", activity: "Fin del tour" }
          ],
          tips: [
            "Mantenga sus objetos de valor seguros entre la multitud",
            "Traiga apetito para la comida callejera",
            "Pregunte antes de fotografiar a los artistas (se esperan propinas)",
            "Use zapatos cómodos"
          ],
          duration: "4 horas",
          difficulty: "Fácil",
          groupSize: "2-10 personas"
        },
        includedItems: ["Paseo guiado", "Aperitivos tradicionales", "Consejos de fotografía", "Historias locales"],
        excludedItems: ["Compras a vendedores", "Comidas"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/2448418/pexels-photo-2448418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Professional photographer guide", "Tips & techniques", "Digital copies of photos", "Transport"],
    excludedItems: ["Meals", "Equipment rental"],
    translations: {
      en: {
        title: "Photography Tour of Marrakesh",
        description: "Professional photography tour capturing the best angles and hidden gems of Marrakesh. Perfect for all photography levels.",
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
        includedItems: ["Professional photographer guide", "Tips & techniques", "Digital copies of photos", "Transport"],
        excludedItems: ["Meals", "Equipment rental"],
      },
      fr: {
        title: "Tour Photographique de Marrakech",
        description: "Tour photographique professionnel capturant les meilleurs angles et les trésors cachés de Marrakech. Parfait pour tous les niveaux de photographie.",
        detailedDescription: {
          overview: "Rejoignez notre guide photographe professionnel pour une expérience photographique immersive à travers les lieux les plus photogéniques de Marrakech. Que vous soyez débutant ou photographe avancé, vous repartirez avec des images époustouflantes et des compétences améliorées.",
          highlights: [
            "Guidé par un photographe de voyage professionnel",
            "Accès à des lieux secrets et photogéniques",
            "Conseils personnalisés selon votre niveau",
            "Meilleures conditions d'éclairage garanties",
            "Copies numériques des photos du guide incluses"
          ],
          sections: [
            {
              title: "Formation Photographique",
              content: "Apprenez les techniques de composition, comment capturer le mouvement dans les marchés animés, la photographie de portrait avec des sujets locaux et la photographie d'architecture dans la médina. L'enseignement est adapté à votre équipement et niveau d'expérience."
            },
            {
              title: "Lieux Secrets",
              content: "Visitez des riads cachés, des terrasses sur les toits et des coins moins connus de la médina que la plupart des touristes ne voient jamais. Ces lieux offrent des décors uniques et des conditions d'éclairage pour des photographies exceptionnelles."
            },
            {
              title: "Conseils de Post-Traitement",
              content: "Recevez des conseils sur l'édition de vos photos de Marrakech pour faire ressortir les couleurs vibrantes et l'atmosphère unique de la ville. Session en ligne optionnelle après le tour disponible pour les techniques d'édition avancées."
            }
          ],
          itinerary: [
            { time: "06:00", activity: "Session de lumière matinale" },
            { time: "08:00", activity: "Pause petit-déjeuner" },
            { time: "09:00", activity: "Photographie de rue dans la médina" },
            { time: "11:00", activity: "Session de détails architecturaux" },
            { time: "12:30", activity: "Photographie de portraits avec les locaux" },
            { time: "14:00", activity: "Session de révision et fin du tour" }
          ],
          tips: [
            "Apportez des batteries chargées et des cartes mémoire supplémentaires",
            "Tout appareil photo fonctionne - du smartphone au professionnel",
            "Portez des couleurs neutres pour vous fondre dans la masse",
            "Apportez un trépied léger si vous en avez un"
          ],
          duration: "8 heures",
          difficulty: "Modéré (beaucoup de marche)",
          groupSize: "2-6 personnes (petit groupe pour attention personnalisée)"
        },
        includedItems: ["Guide photographe professionnel", "Conseils et techniques", "Copies numériques des photos", "Transport"],
        excludedItems: ["Repas", "Location d'équipement"],
      },
      es: {
        title: "Tour Fotográfico de Marrakech",
        description: "Tour fotográfico profesional capturando los mejores ángulos y gemas ocultas de Marrakech. Perfecto para todos los niveles de fotografía.",
        detailedDescription: {
          overview: "Únase a nuestro guía fotógrafo profesional para una experiencia fotográfica inmersiva a través de los lugares más fotogénicos de Marrakech. Ya sea principiante o fotógrafo avanzado, se irá con imágenes impresionantes y habilidades mejoradas.",
          highlights: [
            "Guiado por un fotógrafo de viajes profesional",
            "Acceso a ubicaciones secretas y fotogénicas",
            "Consejos personalizados para su nivel",
            "Mejores condiciones de iluminación garantizadas",
            "Copias digitales de las fotos del guía incluidas"
          ],
          sections: [
            {
              title: "Instrucción Fotográfica",
              content: "Aprenda técnicas de composición, cómo capturar el movimiento en mercados concurridos, fotografía de retratos con sujetos locales y fotografía arquitectónica en la medina. La instrucción se adapta a su equipo y nivel de experiencia."
            },
            {
              title: "Ubicaciones Secretas",
              content: "Visite riads ocultos, terrazas en azoteas y rincones menos conocidos de la medina que la mayoría de los turistas nunca ven. Estas ubicaciones ofrecen fondos únicos y condiciones de iluminación para fotografías excepcionales."
            },
            {
              title: "Consejos de Post-Procesamiento",
              content: "Reciba orientación sobre la edición de sus fotos de Marrakech para resaltar los colores vibrantes y la atmósfera única de la ciudad. Sesión online opcional después del tour disponible para técnicas de edición avanzadas."
            }
          ],
          itinerary: [
            { time: "06:00", activity: "Sesión de luz matutina temprana" },
            { time: "08:00", activity: "Pausa para desayuno" },
            { time: "09:00", activity: "Fotografía callejera en la medina" },
            { time: "11:00", activity: "Sesión de detalles arquitectónicos" },
            { time: "12:30", activity: "Fotografía de retratos con locales" },
            { time: "14:00", activity: "Sesión de revisión y fin del tour" }
          ],
          tips: [
            "Traiga baterías completamente cargadas y tarjetas de memoria extra",
            "Cualquier cámara funciona - desde smartphone hasta profesional",
            "Use colores neutros para pasar desapercibido",
            "Traiga un trípode ligero si tiene uno"
          ],
          duration: "8 horas",
          difficulty: "Moderado (mucho caminar)",
          groupSize: "2-6 personas (grupo pequeño para atención personalizada)"
        },
        includedItems: ["Guía fotógrafo profesional", "Consejos y técnicas", "Copias digitales de fotos", "Transporte"],
        excludedItems: ["Comidas", "Alquiler de equipo"],
      },
    },
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
    mainImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Transport", "Guide", "Beach access", "Seafood lunch", "Town tour"],
    excludedItems: ["Personal shopping", "Water sports"],
    translations: {
      en: {
        title: "Essaouira Coastal Getaway",
        description: "Beach day in the charming coastal town of Essaouira with fresh seafood, windsurf beaches, and artistic vibes.",
        detailedDescription: {
          overview: "Trade the heat of Marrakesh for the refreshing Atlantic breezes of Essaouira, Morocco's most charming coastal town. This laid-back port city offers beautiful beaches, fresh seafood, historic ramparts, and a thriving arts scene all within a relaxed, bohemian atmosphere.",
          highlights: ["Explore the UNESCO-listed medina", "Walk along the historic ramparts", "Fresh seafood lunch at the port", "Beach time on Atlantic shores", "Visit artisan workshops", "See the argan oil cooperatives"],
          sections: [
            { title: "The Medina", content: "Unlike Marrakesh's maze-like medina, Essaouira's was designed by a French architect in the 18th century with wide, straight streets. Explore art galleries, antique shops, and the famous thuya wood carvers whose intricate work is found nowhere else." },
            { title: "The Port & Seafood", content: "Watch fishing boats unload their daily catch at the bustling port. Choose your own fish at the outdoor grills and have it cooked to order. The sardines, prawns, and lobster are unbeatable in freshness and flavor." },
            { title: "Beach & Water Sports", content: "Essaouira's wide, sandy beach stretches for miles. The consistent Atlantic winds make it a world-renowned destination for windsurfing and kitesurfing. For those who prefer calm, simply relax on the sand or take a leisurely stroll." }
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
          tips: ["Bring a jacket - sea breezes can be cool", "Essaouira is windier than Marrakesh", "Best day for fish market is morning", "Cash recommended for small purchases"],
          duration: "Full day (11-12 hours)",
          difficulty: "Easy",
          groupSize: "2-15 people"
        },
        includedItems: ["Transport", "Guide", "Beach access", "Seafood lunch", "Town tour"],
        excludedItems: ["Personal shopping", "Water sports"],
      },
      fr: {
        title: "Escapade Côtière à Essaouira",
        description: "Journée plage dans la charmante ville côtière d'Essaouira avec fruits de mer frais, plages de windsurf et ambiance artistique.",
        detailedDescription: {
          overview: "Échangez la chaleur de Marrakech contre les brises rafraîchissantes de l'Atlantique à Essaouira, la ville côtière la plus charmante du Maroc. Cette ville portuaire décontractée offre de belles plages, des fruits de mer frais, des remparts historiques et une scène artistique florissante dans une atmosphère bohème et détendue.",
          highlights: ["Explorez la médina classée UNESCO", "Promenez-vous le long des remparts historiques", "Déjeuner de fruits de mer au port", "Temps à la plage sur les rives atlantiques", "Visitez les ateliers d'artisans", "Découvrez les coopératives d'huile d'argan"],
          sections: [
            { title: "La Médina", content: "Contrairement à la médina labyrinthique de Marrakech, celle d'Essaouira a été conçue par un architecte français au XVIIIe siècle avec des rues larges et droites. Explorez les galeries d'art, les antiquaires et les célèbres sculpteurs de thuya dont le travail complexe est unique au monde." },
            { title: "Le Port et Fruits de Mer", content: "Regardez les bateaux de pêche décharger leurs prises quotidiennes au port animé. Choisissez votre propre poisson aux grills en plein air et faites-le cuire à la demande. Les sardines, crevettes et homards sont d'une fraîcheur et d'une saveur inégalées." },
            { title: "Plage et Sports Nautiques", content: "La large plage de sable d'Essaouira s'étend sur des kilomètres. Les vents atlantiques constants en font une destination de renommée mondiale pour le windsurf et le kitesurf. Pour ceux qui préfèrent le calme, détendez-vous simplement sur le sable ou faites une promenade tranquille." }
          ],
          itinerary: [
            { time: "08:00", activity: "Départ de Marrakech" },
            { time: "09:30", activity: "Arrêt à la coopérative d'argan" },
            { time: "10:30", activity: "Arrivée à Essaouira" },
            { time: "11:00", activity: "Visite guidée de la médina et des remparts" },
            { time: "12:30", activity: "Déjeuner de fruits de mer au port" },
            { time: "14:00", activity: "Temps libre - plage ou shopping" },
            { time: "17:00", activity: "Départ pour Marrakech" },
            { time: "19:30", activity: "Arrivée à Marrakech" }
          ],
          tips: ["Apportez une veste - les brises marines peuvent être fraîches", "Essaouira est plus ventée que Marrakech", "Le meilleur moment pour le marché aux poissons est le matin", "Argent liquide recommandé pour les petits achats"],
          duration: "Journée complète (11-12 heures)",
          difficulty: "Facile",
          groupSize: "2-15 personnes"
        },
        includedItems: ["Transport", "Guide", "Accès plage", "Déjeuner fruits de mer", "Visite de la ville"],
        excludedItems: ["Shopping personnel", "Sports nautiques"],
      },
      es: {
        title: "Escapada Costera a Essaouira",
        description: "Día de playa en la encantadora ciudad costera de Essaouira con mariscos frescos, playas de windsurf y ambiente artístico.",
        detailedDescription: {
          overview: "Cambie el calor de Marrakech por las refrescantes brisas atlánticas de Essaouira, la ciudad costera más encantadora de Marruecos. Esta relajada ciudad portuaria ofrece hermosas playas, mariscos frescos, murallas históricas y una próspera escena artística en un ambiente bohemio y relajado.",
          highlights: ["Explore la medina declarada Patrimonio UNESCO", "Pasee por las murallas históricas", "Almuerzo de mariscos en el puerto", "Tiempo de playa en las costas atlánticas", "Visite talleres de artesanos", "Vea las cooperativas de aceite de argán"],
          sections: [
            { title: "La Medina", content: "A diferencia de la medina laberíntica de Marrakech, la de Essaouira fue diseñada por un arquitecto francés en el siglo XVIII con calles anchas y rectas. Explore galerías de arte, tiendas de antigüedades y los famosos talladores de madera de tuya cuyo intrincado trabajo no se encuentra en ningún otro lugar." },
            { title: "El Puerto y Mariscos", content: "Observe los barcos pesqueros descargar sus capturas diarias en el bullicioso puerto. Elija su propio pescado en las parrillas al aire libre y cocínelo a su gusto. Las sardinas, gambas y langostas tienen una frescura y sabor insuperables." },
            { title: "Playa y Deportes Acuáticos", content: "La amplia playa de arena de Essaouira se extiende por kilómetros. Los constantes vientos atlánticos la convierten en un destino de renombre mundial para windsurf y kitesurf. Para quienes prefieren la calma, simplemente relájese en la arena o dé un paseo tranquilo." }
          ],
          itinerary: [
            { time: "08:00", activity: "Salida de Marrakech" },
            { time: "09:30", activity: "Parada en cooperativa de argán" },
            { time: "10:30", activity: "Llegada a Essaouira" },
            { time: "11:00", activity: "Tour guiado de medina y murallas" },
            { time: "12:30", activity: "Almuerzo de mariscos en el puerto" },
            { time: "14:00", activity: "Tiempo libre - playa o compras" },
            { time: "17:00", activity: "Salida hacia Marrakech" },
            { time: "19:30", activity: "Llegada a Marrakech" }
          ],
          tips: ["Traiga una chaqueta - las brisas marinas pueden ser frescas", "Essaouira es más ventosa que Marrakech", "El mejor momento para el mercado de pescado es por la mañana", "Se recomienda efectivo para pequeñas compras"],
          duration: "Día completo (11-12 horas)",
          difficulty: "Fácil",
          groupSize: "2-15 personas"
        },
        includedItems: ["Transporte", "Guía", "Acceso a playa", "Almuerzo de mariscos", "Tour de la ciudad"],
        excludedItems: ["Compras personales", "Deportes acuáticos"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/14267607/pexels-photo-14267607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Transport", "Expert guide", "Lunch", "Kasbah access", "Photo stops"],
    excludedItems: ["Souvenir shopping"],
    translations: {
      en: {
        title: "Ait Benhaddou & Kasbah Route",
        description: "UNESCO World Heritage site adventure visiting ancient kasbahs and traditional Berber architecture.",
        detailedDescription: {
          overview: "Journey to Morocco's most spectacular fortified village, Ait Benhaddou, a UNESCO World Heritage site that has served as backdrop for countless Hollywood productions. This day trip along the legendary Kasbah Route reveals centuries of Moroccan history and architectural grandeur.",
          highlights: ["Explore the UNESCO site of Ait Benhaddou", "Cross the Tizi n'Tichka mountain pass", "Visit Ouarzazate - Hollywood of Africa", "See the Atlas Film Studios", "Traditional lunch in a kasbah", "Learn about earthen architecture"],
          sections: [
            { title: "Ait Benhaddou", content: "This stunning ksar (fortified village) is a masterpiece of southern Moroccan earthen architecture. Still inhabited by a few families, it has appeared in Game of Thrones, Gladiator, and Lawrence of Arabia. Explore its narrow alleys and climb to the granary at the top for panoramic views." },
            { title: "The Mountain Pass", content: "The drive over the Tizi n'Tichka (2,260m) is spectacular, with hairpin bends offering ever-changing views of the Atlas Mountains. Stop at viewpoints and meet local mineral sellers along the way." },
            { title: "Ouarzazate", content: "Known as the 'Hollywood of Africa,' this desert city is home to major film studios. Optional visit to Atlas Film Studios where sets from Kingdom of Heaven and other blockbusters still stand." }
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
          tips: ["This is a long day trip - be prepared", "Wear comfortable walking shoes", "Bring sun protection", "Mountain weather can be cooler"],
          duration: "Full day (12-13 hours)",
          difficulty: "Easy to Moderate",
          groupSize: "2-15 people"
        },
        includedItems: ["Transport", "Expert guide", "Lunch", "Kasbah access", "Photo stops"],
        excludedItems: ["Souvenir shopping"],
      },
      fr: {
        title: "Aït Benhaddou et Route des Kasbahs",
        description: "Aventure au site du patrimoine mondial de l'UNESCO en visitant d'anciennes kasbahs et l'architecture berbère traditionnelle.",
        detailedDescription: {
          overview: "Voyagez vers le village fortifié le plus spectaculaire du Maroc, Aït Benhaddou, site du patrimoine mondial de l'UNESCO qui a servi de décor à d'innombrables productions hollywoodiennes. Cette excursion d'une journée le long de la légendaire Route des Kasbahs révèle des siècles d'histoire marocaine et de grandeur architecturale.",
          highlights: ["Explorez le site UNESCO d'Aït Benhaddou", "Traversez le col du Tizi n'Tichka", "Visitez Ouarzazate - Hollywood de l'Afrique", "Voyez les studios de cinéma Atlas", "Déjeuner traditionnel dans une kasbah", "Découvrez l'architecture en terre"],
          sections: [
            { title: "Aït Benhaddou", content: "Ce magnifique ksar (village fortifié) est un chef-d'œuvre de l'architecture en terre du sud marocain. Encore habité par quelques familles, il est apparu dans Game of Thrones, Gladiator et Lawrence d'Arabie. Explorez ses ruelles étroites et grimpez jusqu'au grenier au sommet pour des vues panoramiques." },
            { title: "Le Col de Montagne", content: "La traversée du Tizi n'Tichka (2 260 m) est spectaculaire, avec des virages en épingle offrant des vues changeantes sur les montagnes de l'Atlas. Arrêtez-vous aux points de vue et rencontrez les vendeurs de minéraux locaux en chemin." },
            { title: "Ouarzazate", content: "Connue comme le 'Hollywood de l'Afrique', cette ville désertique abrite de grands studios de cinéma. Visite optionnelle des studios Atlas où les décors de Kingdom of Heaven et d'autres blockbusters sont encore debout." }
          ],
          itinerary: [
            { time: "07:00", activity: "Départ de Marrakech" },
            { time: "09:30", activity: "Arrêt au sommet du Tizi n'Tichka" },
            { time: "11:00", activity: "Arrivée à Aït Benhaddou" },
            { time: "11:30", activity: "Exploration guidée du ksar" },
            { time: "13:00", activity: "Déjeuner dans une kasbah traditionnelle" },
            { time: "14:30", activity: "Visite de Ouarzazate (studios optionnels)" },
            { time: "16:00", activity: "Début du retour" },
            { time: "19:30", activity: "Arrivée à Marrakech" }
          ],
          tips: ["C'est une longue excursion - soyez préparé", "Portez des chaussures de marche confortables", "Apportez une protection solaire", "Le temps en montagne peut être plus frais"],
          duration: "Journée complète (12-13 heures)",
          difficulty: "Facile à Modéré",
          groupSize: "2-15 personnes"
        },
        includedItems: ["Transport", "Guide expert", "Déjeuner", "Accès kasbah", "Arrêts photo"],
        excludedItems: ["Shopping de souvenirs"],
      },
      es: {
        title: "Ait Benhaddou y Ruta de las Kasbahs",
        description: "Aventura al sitio Patrimonio de la Humanidad de la UNESCO visitando antiguas kasbahs y arquitectura bereber tradicional.",
        detailedDescription: {
          overview: "Viaje a la aldea fortificada más espectacular de Marruecos, Ait Benhaddou, sitio Patrimonio de la Humanidad de la UNESCO que ha servido como telón de fondo para innumerables producciones de Hollywood. Esta excursión de un día por la legendaria Ruta de las Kasbahs revela siglos de historia marroquí y grandeza arquitectónica.",
          highlights: ["Explore el sitio UNESCO de Ait Benhaddou", "Cruce el paso de montaña Tizi n'Tichka", "Visite Ouarzazate - Hollywood de África", "Vea los Estudios Atlas", "Almuerzo tradicional en una kasbah", "Aprenda sobre arquitectura de tierra"],
          sections: [
            { title: "Ait Benhaddou", content: "Este impresionante ksar (aldea fortificada) es una obra maestra de la arquitectura de tierra del sur de Marruecos. Todavía habitado por algunas familias, ha aparecido en Juego de Tronos, Gladiator y Lawrence de Arabia. Explore sus estrechos callejones y suba al granero en la cima para vistas panorámicas." },
            { title: "El Paso de Montaña", content: "La travesía del Tizi n'Tichka (2.260 m) es espectacular, con curvas cerradas que ofrecen vistas cambiantes de las montañas del Atlas. Deténgase en miradores y conozca a los vendedores locales de minerales en el camino." },
            { title: "Ouarzazate", content: "Conocida como el 'Hollywood de África', esta ciudad del desierto alberga importantes estudios de cine. Visita opcional a los Estudios Atlas donde los decorados de El Reino de los Cielos y otras superproducciones aún permanecen." }
          ],
          itinerary: [
            { time: "07:00", activity: "Salida de Marrakech" },
            { time: "09:30", activity: "Parada en la cima del Tizi n'Tichka" },
            { time: "11:00", activity: "Llegada a Ait Benhaddou" },
            { time: "11:30", activity: "Exploración guiada del ksar" },
            { time: "13:00", activity: "Almuerzo en una kasbah tradicional" },
            { time: "14:30", activity: "Visita a Ouarzazate (estudios opcionales)" },
            { time: "16:00", activity: "Inicio del regreso" },
            { time: "19:30", activity: "Llegada a Marrakech" }
          ],
          tips: ["Esta es una excursión larga - esté preparado", "Use zapatos cómodos para caminar", "Traiga protección solar", "El clima de montaña puede ser más fresco"],
          duration: "Día completo (12-13 horas)",
          difficulty: "Fácil a Moderado",
          groupSize: "2-15 personas"
        },
        includedItems: ["Transporte", "Guía experto", "Almuerzo", "Acceso kasbah", "Paradas para fotos"],
        excludedItems: ["Compras de recuerdos"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/3889827/pexels-photo-3889827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Market tour", "Cooking class", "Dinner", "Drinks", "Transport"],
    excludedItems: ["Additional beverages", "Souvenir shopping"],
    translations: {
      en: {
        title: "Full-Day Food & Culture Tour",
        description: "Culinary journey through Marrakesh markets, cooking class, and dinner at a local family home.",
        detailedDescription: {
          overview: "Immerse yourself in the rich culinary traditions of Morocco with this comprehensive food and culture experience. From market shopping to hands-on cooking, you'll discover the secrets of Moroccan cuisine while connecting with local families and traditions.",
          highlights: ["Guided market tour with a local chef", "Learn to select authentic ingredients", "Hands-on Moroccan cooking class", "Prepare multiple traditional dishes", "Dinner with a local family", "Take home recipe booklet"],
          sections: [
            { title: "Market Experience", content: "Begin in the bustling souks with our expert chef guide. Learn to identify quality spices, select the freshest vegetables, and navigate the meat and olive markets like a local. Discover ingredients unique to Moroccan cuisine and their traditional uses." },
            { title: "Cooking Class", content: "In a traditional riad kitchen, learn to prepare iconic Moroccan dishes: tagine, couscous, pastilla, and Moroccan salads. Master the art of spice blending and traditional cooking techniques passed down through generations." },
            { title: "Family Dinner", content: "The day culminates with dinner at a local family home. Share the meal you've prepared with your hosts, learning about Moroccan dining traditions, hospitality customs, and daily life. This intimate experience creates lasting connections." }
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
          tips: ["Inform us of dietary restrictions in advance", "Wear comfortable clothes for cooking", "Bring an appetite!", "Vegetarian options available"],
          duration: "Full day (12 hours)",
          difficulty: "Easy",
          groupSize: "2-8 people"
        },
        includedItems: ["Market tour", "Cooking class", "Dinner", "Drinks", "Transport"],
        excludedItems: ["Additional beverages", "Souvenir shopping"],
      },
      fr: {
        title: "Tour Gastronomique et Culturel d'une Journée",
        description: "Voyage culinaire à travers les marchés de Marrakech, cours de cuisine et dîner chez une famille locale.",
        detailedDescription: {
          overview: "Immergez-vous dans les riches traditions culinaires du Maroc avec cette expérience gastronomique et culturelle complète. Du shopping au marché à la cuisine pratique, vous découvrirez les secrets de la cuisine marocaine tout en tissant des liens avec les familles et traditions locales.",
          highlights: ["Visite guidée du marché avec un chef local", "Apprenez à sélectionner des ingrédients authentiques", "Cours de cuisine marocaine pratique", "Préparez plusieurs plats traditionnels", "Dîner avec une famille locale", "Livret de recettes à emporter"],
          sections: [
            { title: "Expérience du Marché", content: "Commencez dans les souks animés avec notre guide chef expert. Apprenez à identifier les épices de qualité, sélectionner les légumes les plus frais et naviguer dans les marchés de viande et d'olives comme un local. Découvrez les ingrédients uniques à la cuisine marocaine et leurs utilisations traditionnelles." },
            { title: "Cours de Cuisine", content: "Dans une cuisine de riad traditionnel, apprenez à préparer des plats marocains emblématiques : tajine, couscous, pastilla et salades marocaines. Maîtrisez l'art du mélange d'épices et les techniques de cuisson traditionnelles transmises de génération en génération." },
            { title: "Dîner en Famille", content: "La journée se termine par un dîner chez une famille locale. Partagez le repas que vous avez préparé avec vos hôtes, en découvrant les traditions culinaires marocaines, les coutumes d'hospitalité et la vie quotidienne. Cette expérience intime crée des liens durables." }
          ],
          itinerary: [
            { time: "09:00", activity: "Rendez-vous au riad désigné" },
            { time: "09:30", activity: "Visite du marché et achats" },
            { time: "11:30", activity: "Retour au lieu de cuisine" },
            { time: "12:00", activity: "Début du cours de cuisine" },
            { time: "14:00", activity: "Pause déjeuner (dégustez vos créations)" },
            { time: "15:00", activity: "Suite de la cuisine - préparation du dîner" },
            { time: "17:00", activity: "Temps libre / repos" },
            { time: "19:00", activity: "Dîner chez la famille" },
            { time: "21:30", activity: "Fin du tour" }
          ],
          tips: ["Informez-nous des restrictions alimentaires à l'avance", "Portez des vêtements confortables pour cuisiner", "Venez avec de l'appétit !", "Options végétariennes disponibles"],
          duration: "Journée complète (12 heures)",
          difficulty: "Facile",
          groupSize: "2-8 personnes"
        },
        includedItems: ["Visite du marché", "Cours de cuisine", "Dîner", "Boissons", "Transport"],
        excludedItems: ["Boissons supplémentaires", "Shopping de souvenirs"],
      },
      es: {
        title: "Tour Gastronómico y Cultural de Día Completo",
        description: "Viaje culinario por los mercados de Marrakech, clase de cocina y cena en casa de una familia local.",
        detailedDescription: {
          overview: "Sumérjase en las ricas tradiciones culinarias de Marruecos con esta experiencia gastronómica y cultural completa. Desde las compras en el mercado hasta la cocina práctica, descubrirá los secretos de la cocina marroquí mientras conecta con las familias y tradiciones locales.",
          highlights: ["Tour guiado del mercado con un chef local", "Aprenda a seleccionar ingredientes auténticos", "Clase práctica de cocina marroquí", "Prepare varios platos tradicionales", "Cena con una familia local", "Llévese un libro de recetas"],
          sections: [
            { title: "Experiencia del Mercado", content: "Comience en los bulliciosos zocos con nuestro chef guía experto. Aprenda a identificar especias de calidad, seleccionar las verduras más frescas y navegar por los mercados de carne y aceitunas como un local. Descubra ingredientes únicos de la cocina marroquí y sus usos tradicionales." },
            { title: "Clase de Cocina", content: "En una cocina de riad tradicional, aprenda a preparar platos marroquíes icónicos: tajín, cuscús, pastela y ensaladas marroquíes. Domine el arte de mezclar especias y las técnicas de cocina tradicionales transmitidas de generación en generación." },
            { title: "Cena Familiar", content: "El día culmina con una cena en casa de una familia local. Comparta la comida que ha preparado con sus anfitriones, aprendiendo sobre las tradiciones gastronómicas marroquíes, las costumbres de hospitalidad y la vida cotidiana. Esta experiencia íntima crea conexiones duraderas." }
          ],
          itinerary: [
            { time: "09:00", activity: "Encuentro en el riad designado" },
            { time: "09:30", activity: "Tour del mercado y compras" },
            { time: "11:30", activity: "Regreso al lugar de cocina" },
            { time: "12:00", activity: "Comienza la clase de cocina" },
            { time: "14:00", activity: "Pausa almuerzo (pruebe sus creaciones)" },
            { time: "15:00", activity: "Continuar cocinando - preparación cena" },
            { time: "17:00", activity: "Tiempo libre / descanso" },
            { time: "19:00", activity: "Cena en casa de la familia" },
            { time: "21:30", activity: "Fin del tour" }
          ],
          tips: ["Infórmenos de restricciones dietéticas con anticipación", "Use ropa cómoda para cocinar", "¡Traiga apetito!", "Opciones vegetarianas disponibles"],
          duration: "Día completo (12 horas)",
          difficulty: "Fácil",
          groupSize: "2-8 personas"
        },
        includedItems: ["Tour del mercado", "Clase de cocina", "Cena", "Bebidas", "Transporte"],
        excludedItems: ["Bebidas adicionales", "Compras de recuerdos"],
      },
    },
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
    mainImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Surfboard rental", "Wetsuit", "Professional instructor", "Transport", "Lunch"],
    excludedItems: ["Souvenir shopping"],
    translations: {
      en: {
        title: "Surfing Lesson at Tamraght Beach",
        description: "Professional surfing lessons at famous Tamraght Beach with equipment and instruction for all levels.",
        detailedDescription: {
          overview: "Catch your first wave or improve your skills at Morocco's legendary surf coast. Just two hours from Marrakesh, Tamraght offers perfect conditions for learners with consistent waves, sandy beaches, and expert instructors who'll have you standing up in no time.",
          highlights: ["Professional ISA-certified instructors", "Quality surfboards and wetsuits provided", "Small group instruction", "Video analysis available", "Beachside lunch included", "Scenic coastal drive"],
          sections: [
            { title: "The Lesson", content: "Begin with a beach warm-up and safety briefing. Learn the fundamentals on the sand before hitting the waves. Our patient instructors specialize in getting beginners standing on their first session, while more advanced surfers receive tips to improve technique." },
            { title: "The Location", content: "Tamraght is nestled between Taghazout and Agadir on Morocco's famous surf coast. The beach offers consistent, gentle waves perfect for learning, with a backdrop of traditional fishing villages and dramatic cliffs." },
            { title: "Surf Culture", content: "Experience the laid-back surf culture of coastal Morocco. Enjoy fresh seafood at a beachside café, mingle with local and international surfers, and soak up the unique atmosphere that makes this coast special." }
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
          tips: ["No prior experience needed", "Bring swimwear, towel, and sunscreen", "Surfing uses muscles you didn't know you had!", "Best conditions are morning sessions"],
          duration: "Full day (11 hours)",
          difficulty: "Moderate (physical activity)",
          groupSize: "4-8 people per instructor"
        },
        includedItems: ["Surfboard rental", "Wetsuit", "Professional instructor", "Transport", "Lunch"],
        excludedItems: ["Souvenir shopping"],
      },
      fr: {
        title: "Cours de Surf à la Plage de Tamraght",
        description: "Cours de surf professionnels sur la célèbre plage de Tamraght avec équipement et instruction pour tous les niveaux.",
        detailedDescription: {
          overview: "Attrapez votre première vague ou améliorez vos compétences sur la côte légendaire du surf au Maroc. À seulement deux heures de Marrakech, Tamraght offre des conditions parfaites pour les apprenants avec des vagues régulières, des plages de sable et des instructeurs experts qui vous feront tenir debout en un rien de temps.",
          highlights: ["Instructeurs certifiés ISA professionnels", "Planches de surf et combinaisons de qualité fournies", "Instruction en petit groupe", "Analyse vidéo disponible", "Déjeuner en bord de plage inclus", "Route côtière pittoresque"],
          sections: [
            { title: "Le Cours", content: "Commencez par un échauffement sur la plage et un briefing sécurité. Apprenez les fondamentaux sur le sable avant de vous lancer dans les vagues. Nos instructeurs patients sont spécialisés pour faire tenir les débutants debout dès leur première séance, tandis que les surfeurs plus avancés reçoivent des conseils pour améliorer leur technique." },
            { title: "L'Emplacement", content: "Tamraght est nichée entre Taghazout et Agadir sur la célèbre côte de surf du Maroc. La plage offre des vagues régulières et douces parfaites pour l'apprentissage, avec en toile de fond des villages de pêcheurs traditionnels et des falaises spectaculaires." },
            { title: "Culture Surf", content: "Vivez la culture surf décontractée du littoral marocain. Dégustez des fruits de mer frais dans un café de plage, mêlez-vous aux surfeurs locaux et internationaux et imprégnez-vous de l'atmosphère unique qui rend cette côte si spéciale." }
          ],
          itinerary: [
            { time: "07:00", activity: "Prise en charge à Marrakech" },
            { time: "09:30", activity: "Arrivée à la plage de Tamraght" },
            { time: "10:00", activity: "Équipement et échauffement" },
            { time: "10:30", activity: "Instruction sur la plage" },
            { time: "11:00", activity: "Cours dans l'eau" },
            { time: "13:00", activity: "Déjeuner au café de plage" },
            { time: "14:00", activity: "Temps libre pour surfer ou se détendre" },
            { time: "15:30", activity: "Départ pour Marrakech" },
            { time: "18:00", activity: "Arrivée à Marrakech" }
          ],
          tips: ["Aucune expérience préalable nécessaire", "Apportez maillot de bain, serviette et crème solaire", "Le surf utilise des muscles que vous ne connaissiez pas!", "Les meilleures conditions sont les sessions du matin"],
          duration: "Journée complète (11 heures)",
          difficulty: "Modéré (activité physique)",
          groupSize: "4-8 personnes par instructeur"
        },
        includedItems: ["Location de planche de surf", "Combinaison", "Instructeur professionnel", "Transport", "Déjeuner"],
        excludedItems: ["Shopping de souvenirs"],
      },
      es: {
        title: "Clase de Surf en Playa Tamraght",
        description: "Clases de surf profesionales en la famosa Playa Tamraght con equipo e instrucción para todos los niveles.",
        detailedDescription: {
          overview: "Atrape su primera ola o mejore sus habilidades en la legendaria costa de surf de Marruecos. A solo dos horas de Marrakech, Tamraght ofrece condiciones perfectas para principiantes con olas consistentes, playas de arena e instructores expertos que lo tendrán de pie en poco tiempo.",
          highlights: ["Instructores profesionales certificados ISA", "Tablas de surf y trajes de neopreno de calidad proporcionados", "Instrucción en grupos pequeños", "Análisis de video disponible", "Almuerzo en la playa incluido", "Ruta costera pintoresca"],
          sections: [
            { title: "La Clase", content: "Comience con un calentamiento en la playa y briefing de seguridad. Aprenda los fundamentos en la arena antes de lanzarse a las olas. Nuestros instructores pacientes se especializan en hacer que los principiantes se pongan de pie en su primera sesión, mientras que los surfistas más avanzados reciben consejos para mejorar su técnica." },
            { title: "La Ubicación", content: "Tamraght está ubicada entre Taghazout y Agadir en la famosa costa de surf de Marruecos. La playa ofrece olas consistentes y suaves perfectas para aprender, con el telón de fondo de pueblos pesqueros tradicionales y acantilados dramáticos." },
            { title: "Cultura del Surf", content: "Experimente la relajada cultura del surf de la costa marroquí. Disfrute de mariscos frescos en un café de playa, mézclese con surfistas locales e internacionales y empápese de la atmósfera única que hace especial esta costa." }
          ],
          itinerary: [
            { time: "07:00", activity: "Recogida en Marrakech" },
            { time: "09:30", activity: "Llegada a Playa Tamraght" },
            { time: "10:00", activity: "Ajuste de equipo y calentamiento" },
            { time: "10:30", activity: "Instrucción en la playa" },
            { time: "11:00", activity: "Clase en el agua" },
            { time: "13:00", activity: "Almuerzo en café de playa" },
            { time: "14:00", activity: "Tiempo libre para surfear o relajarse" },
            { time: "15:30", activity: "Salida hacia Marrakech" },
            { time: "18:00", activity: "Llegada a Marrakech" }
          ],
          tips: ["No se necesita experiencia previa", "Traiga traje de baño, toalla y protector solar", "¡El surf usa músculos que no sabía que tenía!", "Las mejores condiciones son las sesiones de la mañana"],
          duration: "Día completo (11 horas)",
          difficulty: "Moderado (actividad física)",
          groupSize: "4-8 personas por instructor"
        },
        includedItems: ["Alquiler de tabla de surf", "Traje de neopreno", "Instructor profesional", "Transporte", "Almuerzo"],
        excludedItems: ["Compras de recuerdos"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/10457963/pexels-photo-10457963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Horse rental", "Guide", "Safety helmet", "Snacks", "Water"],
    excludedItems: ["Professional photos"],
    translations: {
      en: {
        title: "Horseback Riding in Palm Groves",
        description: "Scenic horseback riding through lush palm groves and traditional gardens with traditional tack.",
        detailedDescription: {
          overview: "Experience the romance of Marrakesh on horseback as you ride through the famous Palmeraie, a 13,000-hectare palm grove oasis on the outskirts of the city. Our well-trained horses and experienced guides create an unforgettable journey through this unique landscape.",
          highlights: ["Well-trained Arabian and Barb horses", "Ride through the historic Palmeraie", "Suitable for all experience levels", "Traditional Moroccan tack and attire available", "Sunset rides available", "Views of Atlas Mountains"],
          sections: [
            { title: "The Horses", content: "Our stable features beautiful Arabian and Barb horses, the traditional breeds of Morocco. Each horse is carefully selected for its temperament and matched to your experience level. All horses receive excellent care and training." },
            { title: "The Palmeraie", content: "Legend says the palm grove grew from date pits discarded by soldiers of the Almoravid dynasty. Today, it's a peaceful haven of over 100,000 palm trees, traditional gardens, and luxury villas - best experienced on horseback." },
            { title: "The Experience", content: "After a brief introduction and safety briefing, set off on sandy trails weaving through the palms. Stop at a traditional Berber tent for mint tea, and enjoy the tranquility away from the bustling medina." }
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
          tips: ["Wear long pants and closed-toe shoes", "Beginners welcome - no experience needed", "Book sunset ride for magical light", "Helmets provided for all riders"],
          duration: "3 hours",
          difficulty: "Easy to Moderate",
          groupSize: "2-8 people"
        },
        includedItems: ["Horse rental", "Guide", "Safety helmet", "Snacks", "Water"],
        excludedItems: ["Professional photos"],
      },
      fr: {
        title: "Balade à Cheval dans les Palmeraies",
        description: "Balade à cheval pittoresque à travers les palmeraies luxuriantes et jardins traditionnels avec harnachement traditionnel.",
        detailedDescription: {
          overview: "Vivez le romantisme de Marrakech à cheval en traversant la célèbre Palmeraie, une oasis de 13 000 hectares de palmiers aux abords de la ville. Nos chevaux bien dressés et guides expérimentés créent un voyage inoubliable à travers ce paysage unique.",
          highlights: ["Chevaux arabes et barbes bien dressés", "Promenade à travers la Palmeraie historique", "Adapté à tous les niveaux d'expérience", "Harnachement et tenue marocaine traditionnelle disponibles", "Balades au coucher de soleil disponibles", "Vues sur les montagnes de l'Atlas"],
          sections: [
            { title: "Les Chevaux", content: "Notre écurie propose de magnifiques chevaux arabes et barbes, les races traditionnelles du Maroc. Chaque cheval est soigneusement sélectionné pour son tempérament et adapté à votre niveau d'expérience. Tous les chevaux reçoivent d'excellents soins et entraînement." },
            { title: "La Palmeraie", content: "La légende raconte que la palmeraie a poussé à partir de noyaux de dattes jetés par les soldats de la dynastie almoravide. Aujourd'hui, c'est un havre de paix de plus de 100 000 palmiers, jardins traditionnels et villas de luxe - à découvrir idéalement à cheval." },
            { title: "L'Expérience", content: "Après une brève introduction et un briefing sécurité, partez sur des sentiers de sable serpentant à travers les palmiers. Arrêtez-vous dans une tente berbère traditionnelle pour un thé à la menthe et profitez de la tranquillité loin de la médina animée." }
          ],
          itinerary: [
            { time: "09:00 ou 15:00", activity: "Prise en charge à l'hôtel" },
            { time: "+30 min", activity: "Arrivée aux écuries" },
            { time: "+45 min", activity: "Rencontre avec votre cheval et briefing sécurité" },
            { time: "+1 heure", activity: "Début de la balade dans les palmeraies" },
            { time: "+1.5 heures", activity: "Pause thé sous la tente berbère" },
            { time: "+2 heures", activity: "Poursuite de la balade" },
            { time: "+2.5 heures", activity: "Retour aux écuries" },
            { time: "+3 heures", activity: "Retour à l'hôtel" }
          ],
          tips: ["Portez un pantalon long et des chaussures fermées", "Débutants bienvenus - aucune expérience nécessaire", "Réservez la balade au coucher du soleil pour une lumière magique", "Casques fournis pour tous les cavaliers"],
          duration: "3 heures",
          difficulty: "Facile à Modéré",
          groupSize: "2-8 personnes"
        },
        includedItems: ["Location de cheval", "Guide", "Casque de sécurité", "Snacks", "Eau"],
        excludedItems: ["Photos professionnelles"],
      },
      es: {
        title: "Paseo a Caballo en los Palmerales",
        description: "Paseo escénico a caballo por exuberantes palmerales y jardines tradicionales con equipamiento tradicional.",
        detailedDescription: {
          overview: "Experimente el romance de Marrakech a caballo mientras recorre la famosa Palmeraie, un oasis de 13.000 hectáreas de palmeras en las afueras de la ciudad. Nuestros caballos bien entrenados y guías experimentados crean un viaje inolvidable a través de este paisaje único.",
          highlights: ["Caballos árabes y bereberes bien entrenados", "Recorrido por la histórica Palmeraie", "Apto para todos los niveles de experiencia", "Equipamiento y atuendo marroquí tradicional disponible", "Paseos al atardecer disponibles", "Vistas de las montañas del Atlas"],
          sections: [
            { title: "Los Caballos", content: "Nuestro establo cuenta con hermosos caballos árabes y bereberes, las razas tradicionales de Marruecos. Cada caballo es cuidadosamente seleccionado por su temperamento y adaptado a su nivel de experiencia. Todos los caballos reciben excelente cuidado y entrenamiento." },
            { title: "La Palmeraie", content: "La leyenda dice que el palmeral creció de huesos de dátiles desechados por soldados de la dinastía almorávide. Hoy, es un refugio tranquilo de más de 100.000 palmeras, jardines tradicionales y villas de lujo - mejor experimentado a caballo." },
            { title: "La Experiencia", content: "Después de una breve introducción y briefing de seguridad, parta por senderos de arena serpenteando entre las palmeras. Deténgase en una tienda bereber tradicional para tomar té de menta y disfrute de la tranquilidad lejos de la bulliciosa medina." }
          ],
          itinerary: [
            { time: "09:00 o 15:00", activity: "Recogida en el hotel" },
            { time: "+30 min", activity: "Llegada a los establos" },
            { time: "+45 min", activity: "Conocer su caballo y briefing de seguridad" },
            { time: "+1 hora", activity: "Inicio del paseo por los palmerales" },
            { time: "+1.5 horas", activity: "Pausa para té en tienda bereber" },
            { time: "+2 horas", activity: "Continuar el paseo" },
            { time: "+2.5 horas", activity: "Regreso a los establos" },
            { time: "+3 horas", activity: "Regreso al hotel" }
          ],
          tips: ["Use pantalones largos y zapatos cerrados", "Principiantes bienvenidos - no se necesita experiencia", "Reserve el paseo al atardecer para luz mágica", "Cascos proporcionados para todos los jinetes"],
          duration: "3 horas",
          difficulty: "Fácil a Moderado",
          groupSize: "2-8 personas"
        },
        includedItems: ["Alquiler de caballo", "Guía", "Casco de seguridad", "Snacks", "Agua"],
        excludedItems: ["Fotos profesionales"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/31371135/pexels-photo-31371135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    includedItems: ["Workshop access", "Materials", "Instruction", "Tea", "Your creation to take"],
    excludedItems: ["Shipping of artwork"],
    translations: {
      en: {
        title: "Pottery Workshop & Painting Class",
        description: "Learn traditional Moroccan pottery and painting techniques from master artisans in their studio.",
        detailedDescription: {
          overview: "Discover the ancient art of Moroccan pottery in a hands-on workshop led by master artisans. Learn techniques passed down through generations, from shaping clay on the wheel to painting intricate geometric patterns that define Moroccan decorative arts.",
          highlights: ["Learn from master Moroccan potters", "Hands-on wheel throwing experience", "Traditional pattern painting techniques", "Create your own piece to keep", "Visit artisan workshops", "Tea and pastries included"],
          sections: [
            { title: "The Craft", content: "Moroccan pottery traditions date back centuries, with each region developing distinctive styles. Learn about the different techniques, from the rustic Berber pottery of the mountains to the sophisticated painted ceramics of Fes and Safi." },
            { title: "The Workshop", content: "Work alongside skilled artisans who will guide your hands on the potter's wheel. Experience the satisfaction of creating a vessel from raw clay. Then learn the art of traditional painting using natural pigments and geometric patterns." },
            { title: "Take Home", content: "Your creation will be fired in a traditional kiln and can be collected later or shipped to your home. You'll also receive a certificate of completion and recipe card for the traditional mint tea you'll enjoy during the workshop." }
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
          tips: ["Wear clothes you don't mind getting clay on", "Pieces need time to fire - pickup or shipping arranged", "Great activity for families with kids", "No prior experience needed"],
          duration: "3-4 hours",
          difficulty: "Easy",
          groupSize: "2-10 people"
        },
        includedItems: ["Workshop access", "Materials", "Instruction", "Tea", "Your creation to take"],
        excludedItems: ["Shipping of artwork"],
      },
      fr: {
        title: "Atelier de Poterie et Cours de Peinture",
        description: "Apprenez les techniques traditionnelles de poterie et de peinture marocaines auprès de maîtres artisans dans leur atelier.",
        detailedDescription: {
          overview: "Découvrez l'art ancestral de la poterie marocaine dans un atelier pratique dirigé par des maîtres artisans. Apprenez des techniques transmises de génération en génération, du façonnage de l'argile sur le tour à la peinture de motifs géométriques complexes qui définissent les arts décoratifs marocains.",
          highlights: ["Apprenez auprès de maîtres potiers marocains", "Expérience pratique de tournage", "Techniques de peinture de motifs traditionnels", "Créez votre propre pièce à emporter", "Visitez les ateliers d'artisans", "Thé et pâtisseries inclus"],
          sections: [
            { title: "L'Artisanat", content: "Les traditions de poterie marocaine remontent à des siècles, chaque région développant des styles distinctifs. Découvrez les différentes techniques, de la poterie berbère rustique des montagnes aux céramiques peintes sophistiquées de Fès et Safi." },
            { title: "L'Atelier", content: "Travaillez aux côtés d'artisans qualifiés qui guideront vos mains sur le tour de potier. Vivez la satisfaction de créer un récipient à partir d'argile brute. Apprenez ensuite l'art de la peinture traditionnelle utilisant des pigments naturels et des motifs géométriques." },
            { title: "À Emporter", content: "Votre création sera cuite dans un four traditionnel et pourra être récupérée plus tard ou expédiée chez vous. Vous recevrez également un certificat de réalisation et une fiche recette pour le thé à la menthe traditionnel que vous dégusterez pendant l'atelier." }
          ],
          itinerary: [
            { time: "Flexible", activity: "Accueil et introduction à la poterie marocaine" },
            { time: "+30 min", activity: "Démonstration par le maître potier" },
            { time: "+1 heure", activity: "Pratique du tournage" },
            { time: "+1.5 heures", activity: "Pause thé" },
            { time: "+2 heures", activity: "Cours de techniques de peinture" },
            { time: "+2.5 heures", activity: "Décoration de votre création" },
            { time: "+3 heures", activity: "Conclusion et visite de l'atelier" }
          ],
          tips: ["Portez des vêtements que vous n'avez pas peur de tacher d'argile", "Les pièces ont besoin de temps pour cuire - retrait ou expédition organisés", "Excellente activité pour les familles avec enfants", "Aucune expérience préalable nécessaire"],
          duration: "3-4 heures",
          difficulty: "Facile",
          groupSize: "2-10 personnes"
        },
        includedItems: ["Accès à l'atelier", "Matériaux", "Instruction", "Thé", "Votre création à emporter"],
        excludedItems: ["Expédition des œuvres"],
      },
      es: {
        title: "Taller de Cerámica y Clase de Pintura",
        description: "Aprenda técnicas tradicionales de cerámica y pintura marroquí de maestros artesanos en su estudio.",
        detailedDescription: {
          overview: "Descubra el antiguo arte de la cerámica marroquí en un taller práctico dirigido por maestros artesanos. Aprenda técnicas transmitidas a través de generaciones, desde dar forma a la arcilla en el torno hasta pintar intrincados patrones geométricos que definen las artes decorativas marroquíes.",
          highlights: ["Aprenda de maestros ceramistas marroquíes", "Experiencia práctica de torneado", "Técnicas de pintura de patrones tradicionales", "Cree su propia pieza para llevarse", "Visite talleres de artesanos", "Té y pasteles incluidos"],
          sections: [
            { title: "El Oficio", content: "Las tradiciones de cerámica marroquí se remontan a siglos, con cada región desarrollando estilos distintivos. Conozca las diferentes técnicas, desde la cerámica bereber rústica de las montañas hasta las sofisticadas cerámicas pintadas de Fez y Safi." },
            { title: "El Taller", content: "Trabaje junto a artesanos calificados que guiarán sus manos en el torno de alfarero. Experimente la satisfacción de crear una vasija a partir de arcilla cruda. Luego aprenda el arte de la pintura tradicional usando pigmentos naturales y patrones geométricos." },
            { title: "Para Llevar", content: "Su creación será cocida en un horno tradicional y puede ser recogida más tarde o enviada a su casa. También recibirá un certificado de finalización y una tarjeta de receta para el tradicional té de menta que disfrutará durante el taller." }
          ],
          itinerary: [
            { time: "Flexible", activity: "Bienvenida e introducción a la cerámica marroquí" },
            { time: "+30 min", activity: "Demostración del maestro ceramista" },
            { time: "+1 hora", activity: "Práctica de torneado" },
            { time: "+1.5 horas", activity: "Pausa para té" },
            { time: "+2 horas", activity: "Clase de técnicas de pintura" },
            { time: "+2.5 horas", activity: "Decorar su creación" },
            { time: "+3 horas", activity: "Conclusión y recorrido del taller" }
          ],
          tips: ["Use ropa que no le importe manchar de arcilla", "Las piezas necesitan tiempo para cocer - recogida o envío organizado", "Excelente actividad para familias con niños", "No se necesita experiencia previa"],
          duration: "3-4 horas",
          difficulty: "Fácil",
          groupSize: "2-10 personas"
        },
        includedItems: ["Acceso al taller", "Materiales", "Instrucción", "Té", "Su creación para llevar"],
        excludedItems: ["Envío de obras de arte"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/35110927/pexels-photo-35110927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    includedItems: ["6 nights accommodation", "Meals", "All activities", "Equipment", "Guides", "Transport"],
    excludedItems: ["Travel insurance"],
    translations: {
      en: {
        title: "Adventure & Culture 7-Day Package",
        description: "Mix of adventure activities and cultural experiences with trekking, Sahara, and coastal visits.",
        detailedDescription: {
          overview: "For travelers who want to combine physical adventure with cultural discovery, this action-packed 7-day package delivers the best of both worlds. Trek mountains, ride camels, surf waves, and immerse yourself in Morocco's rich heritage.",
          highlights: ["6 nights varied accommodation", "Atlas Mountains trekking", "Sahara camel trek and camping", "Surfing on the Atlantic coast", "Quad biking adventure", "Cultural tours and cooking class", "All activities and equipment included"],
          sections: [
            { title: "Days 1-2: Mountains", content: "Arrive and transfer to Imlil in the High Atlas. Spend a full day trekking through Berber villages with stunning mountain views. Stay in a traditional mountain gite and experience authentic village hospitality." },
            { title: "Days 3-4: Desert", content: "Journey across the dramatic landscape to the Sahara. Quad bike through desert terrain. At sunset, mount camels for the trek into the dunes. Camp under the stars with traditional music and food." },
            { title: "Days 5-6: Coast", content: "Travel to the Atlantic coast for a complete change of pace. Learn to surf (or improve your skills) at world-famous breaks. Explore the charming port town and enjoy fresh seafood. Optional windsurfing or kitesurfing." },
            { title: "Day 7: Marrakesh & Departure", content: "Return to Marrakesh for a morning cooking class and souk tour. Create traditional dishes you've enjoyed throughout the trip. Transfer to airport for departure." }
          ],
          itinerary: [],
          tips: ["Good fitness level recommended", "Pack for all activities (list provided)", "All equipment provided", "Activities can be modified for ability"],
          duration: "7 days / 6 nights",
          difficulty: "Moderate to Challenging",
          groupSize: "4-12 people"
        },
        includedItems: ["6 nights accommodation", "Meals", "All activities", "Equipment", "Guides", "Transport"],
        excludedItems: ["Travel insurance"],
      },
      fr: {
        title: "Forfait Aventure et Culture 7 Jours",
        description: "Mélange d'activités d'aventure et d'expériences culturelles avec trekking, Sahara et visites côtières.",
        detailedDescription: {
          overview: "Pour les voyageurs qui veulent combiner aventure physique et découverte culturelle, ce forfait de 7 jours riche en action offre le meilleur des deux mondes. Randonnée en montagne, balade à dos de chameau, surf sur les vagues et immersion dans le riche patrimoine du Maroc.",
          highlights: ["6 nuits d'hébergement varié", "Trekking dans les montagnes de l'Atlas", "Trek à dos de chameau et camping au Sahara", "Surf sur la côte atlantique", "Aventure en quad", "Visites culturelles et cours de cuisine", "Toutes les activités et équipement inclus"],
          sections: [
            { title: "Jours 1-2 : Montagnes", content: "Arrivée et transfert à Imlil dans le Haut Atlas. Passez une journée complète de randonnée à travers les villages berbères avec des vues spectaculaires sur les montagnes. Séjournez dans un gîte de montagne traditionnel et découvrez l'hospitalité authentique du village." },
            { title: "Jours 3-4 : Désert", content: "Traversez le paysage dramatique vers le Sahara. Quad à travers le terrain désertique. Au coucher du soleil, montez sur des chameaux pour le trek dans les dunes. Campez sous les étoiles avec musique et nourriture traditionnelles." },
            { title: "Jours 5-6 : Côte", content: "Voyagez vers la côte atlantique pour un changement de rythme complet. Apprenez à surfer (ou améliorez vos compétences) sur des spots mondialement connus. Explorez la charmante ville portuaire et dégustez des fruits de mer frais. Planche à voile ou kitesurf en option." },
            { title: "Jour 7 : Marrakech et Départ", content: "Retour à Marrakech pour un cours de cuisine matinal et une visite des souks. Créez des plats traditionnels que vous avez appréciés tout au long du voyage. Transfert à l'aéroport pour le départ." }
          ],
          itinerary: [],
          tips: ["Bonne condition physique recommandée", "Préparez vos bagages pour toutes les activités (liste fournie)", "Tout l'équipement est fourni", "Les activités peuvent être modifiées selon les capacités"],
          duration: "7 jours / 6 nuits",
          difficulty: "Modéré à Difficile",
          groupSize: "4-12 personnes"
        },
        includedItems: ["6 nuits d'hébergement", "Repas", "Toutes les activités", "Équipement", "Guides", "Transport"],
        excludedItems: ["Assurance voyage"],
      },
      es: {
        title: "Paquete de Aventura y Cultura 7 Días",
        description: "Mezcla de actividades de aventura y experiencias culturales con senderismo, Sáhara y visitas costeras.",
        detailedDescription: {
          overview: "Para viajeros que quieren combinar aventura física con descubrimiento cultural, este paquete de 7 días lleno de acción ofrece lo mejor de ambos mundos. Trekking por montañas, paseos en camello, surf sobre las olas e inmersión en el rico patrimonio de Marruecos.",
          highlights: ["6 noches de alojamiento variado", "Trekking en las montañas del Atlas", "Trek en camello y camping en el Sáhara", "Surf en la costa atlántica", "Aventura en quad", "Tours culturales y clase de cocina", "Todas las actividades y equipo incluidos"],
          sections: [
            { title: "Días 1-2: Montañas", content: "Llegada y traslado a Imlil en el Alto Atlas. Pase un día completo de senderismo por pueblos bereberes con impresionantes vistas a la montaña. Alójese en un gîte de montaña tradicional y experimente la auténtica hospitalidad del pueblo." },
            { title: "Días 3-4: Desierto", content: "Viaje a través del dramático paisaje hacia el Sáhara. Quad por el terreno desértico. Al atardecer, monte en camellos para el trek hacia las dunas. Acampe bajo las estrellas con música y comida tradicionales." },
            { title: "Días 5-6: Costa", content: "Viaje a la costa atlántica para un cambio de ritmo completo. Aprenda a surfear (o mejore sus habilidades) en spots mundialmente famosos. Explore el encantador pueblo portuario y disfrute de mariscos frescos. Windsurf o kitesurf opcional." },
            { title: "Día 7: Marrakech y Salida", content: "Regreso a Marrakech para una clase de cocina matutina y tour por los zocos. Cree platos tradicionales que ha disfrutado durante todo el viaje. Traslado al aeropuerto para la salida." }
          ],
          itinerary: [],
          tips: ["Buen nivel de condición física recomendado", "Empaque para todas las actividades (lista proporcionada)", "Todo el equipo proporcionado", "Las actividades pueden modificarse según la capacidad"],
          duration: "7 días / 6 noches",
          difficulty: "Moderado a Desafiante",
          groupSize: "4-12 personas"
        },
        includedItems: ["6 noches de alojamiento", "Comidas", "Todas las actividades", "Equipo", "Guías", "Transporte"],
        excludedItems: ["Seguro de viaje"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/5472512/pexels-photo-5472512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    includedItems: ["5 nights accommodation", "All meals", "Family tours", "Kids activities", "Transport"],
    excludedItems: ["Entertainment purchases"],
    translations: {
      en: {
        title: "Family Marrakesh Fun 6-Day Package",
        description: "Family-friendly package with activities suitable for children and relaxation time.",
        detailedDescription: {
          overview: "Designed specifically for families, this 6-day package balances kid-friendly adventures with enough downtime to keep everyone happy. Age-appropriate activities, family-style accommodations, and flexible scheduling ensure a stress-free Moroccan adventure.",
          highlights: ["5 nights in family-friendly riad with pool", "Child-friendly medina tour", "Camel riding in the Palmeraie", "Pottery and craft workshops", "Splash time at resort pool", "Cooking class for the whole family", "Magical evening entertainment"],
          sections: [
            { title: "Day 1: Welcome to Morocco!", content: "Arrive and settle into your family riad with pool. Kids can splash while parents relax. Evening orientation walk through the medina with child-friendly introduction to Moroccan culture. Dinner at a family-friendly restaurant." },
            { title: "Day 2: Discover & Create", content: "Morning visit to Majorelle Gardens (kids love the fish!). Afternoon pottery workshop where the whole family creates Moroccan crafts. Evening at leisure with swimming and games." },
            { title: "Day 3: Animal Adventures", content: "Morning camel ride through the palm groves - a highlight for kids of all ages! Picnic lunch. Afternoon at a family-friendly resort with pool, games, and activities. Evening cooking class making kid-approved Moroccan dishes." },
            { title: "Day 4: Mountain Day", content: "Easy day trip to the Atlas foothills. Short walks suitable for children, mule rides available. Traditional lunch in a Berber home. Kids can play with local children. Return for pool time." },
            { title: "Day 5: Treasure Hunt", content: "Interactive treasure hunt through the medina designed for families. Discover hidden gems while solving clues. Afternoon free for shopping or pool. Evening traditional dinner with entertainment." },
            { title: "Day 6: Farewell", content: "Final morning activities based on interests. Last chance shopping for souvenirs. Transfer to airport with wonderful family memories." }
          ],
          itinerary: [],
          tips: ["Activities adapted for children's ages", "Child-friendly food options available", "Baby/toddler equipment available", "Nap time built into schedule"],
          duration: "6 days / 5 nights",
          difficulty: "Easy (family-paced)",
          groupSize: "Private family booking"
        },
        includedItems: ["5 nights accommodation", "All meals", "Family tours", "Kids activities", "Transport"],
        excludedItems: ["Entertainment purchases"],
      },
      fr: {
        title: "Forfait Famille Fun Marrakech 6 Jours",
        description: "Forfait familial avec activités adaptées aux enfants et temps de détente.",
        detailedDescription: {
          overview: "Conçu spécialement pour les familles, ce forfait de 6 jours équilibre les aventures adaptées aux enfants avec suffisamment de temps de repos pour satisfaire tout le monde. Des activités adaptées à l'âge, des hébergements familiaux et un planning flexible garantissent une aventure marocaine sans stress.",
          highlights: ["5 nuits dans un riad familial avec piscine", "Visite de la médina adaptée aux enfants", "Balade à dos de chameau dans la Palmeraie", "Ateliers de poterie et d'artisanat", "Baignade à la piscine du resort", "Cours de cuisine pour toute la famille", "Divertissement magique en soirée"],
          sections: [
            { title: "Jour 1 : Bienvenue au Maroc !", content: "Arrivée et installation dans votre riad familial avec piscine. Les enfants peuvent barboter pendant que les parents se détendent. Promenade d'orientation en soirée à travers la médina avec introduction à la culture marocaine adaptée aux enfants. Dîner dans un restaurant familial." },
            { title: "Jour 2 : Découverte et Création", content: "Visite matinale des Jardins Majorelle (les enfants adorent les poissons !). Atelier de poterie l'après-midi où toute la famille crée des objets artisanaux marocains. Soirée libre avec baignade et jeux." },
            { title: "Jour 3 : Aventures Animales", content: "Balade à dos de chameau le matin à travers les palmeraies - un moment fort pour les enfants de tous âges ! Pique-nique déjeuner. Après-midi dans un resort familial avec piscine, jeux et activités. Cours de cuisine en soirée préparant des plats marocains approuvés par les enfants." },
            { title: "Jour 4 : Journée Montagne", content: "Excursion facile d'une journée dans les contreforts de l'Atlas. Courtes promenades adaptées aux enfants, balades à dos de mule disponibles. Déjeuner traditionnel dans une maison berbère. Les enfants peuvent jouer avec les enfants locaux. Retour pour la piscine." },
            { title: "Jour 5 : Chasse au Trésor", content: "Chasse au trésor interactive à travers la médina conçue pour les familles. Découvrez des joyaux cachés en résolvant des énigmes. Après-midi libre pour le shopping ou la piscine. Dîner traditionnel en soirée avec divertissement." },
            { title: "Jour 6 : Au Revoir", content: "Activités matinales finales selon les intérêts. Dernière chance pour acheter des souvenirs. Transfert à l'aéroport avec de merveilleux souvenirs de famille." }
          ],
          itinerary: [],
          tips: ["Activités adaptées à l'âge des enfants", "Options alimentaires adaptées aux enfants disponibles", "Équipement pour bébé/tout-petit disponible", "Temps de sieste intégré au programme"],
          duration: "6 jours / 5 nuits",
          difficulty: "Facile (rythme familial)",
          groupSize: "Réservation familiale privée"
        },
        includedItems: ["5 nuits d'hébergement", "Tous les repas", "Visites familiales", "Activités enfants", "Transport"],
        excludedItems: ["Achats de divertissement"],
      },
      es: {
        title: "Paquete Familiar Diversión en Marrakech 6 Días",
        description: "Paquete familiar con actividades adecuadas para niños y tiempo de relajación.",
        detailedDescription: {
          overview: "Diseñado específicamente para familias, este paquete de 6 días equilibra aventuras aptas para niños con suficiente tiempo de descanso para mantener a todos felices. Actividades apropiadas para cada edad, alojamientos familiares y horarios flexibles garantizan una aventura marroquí sin estrés.",
          highlights: ["5 noches en riad familiar con piscina", "Tour por la medina apto para niños", "Paseo en camello en la Palmeraie", "Talleres de cerámica y manualidades", "Tiempo en la piscina del resort", "Clase de cocina para toda la familia", "Entretenimiento mágico nocturno"],
          sections: [
            { title: "Día 1: ¡Bienvenidos a Marruecos!", content: "Llegada e instalación en su riad familiar con piscina. Los niños pueden chapotear mientras los padres se relajan. Paseo de orientación por la noche a través de la medina con introducción a la cultura marroquí apta para niños. Cena en un restaurante familiar." },
            { title: "Día 2: Descubrir y Crear", content: "Visita matutina a los Jardines Majorelle (¡a los niños les encantan los peces!). Taller de cerámica por la tarde donde toda la familia crea artesanías marroquíes. Noche libre con natación y juegos." },
            { title: "Día 3: Aventuras con Animales", content: "Paseo en camello por la mañana a través de los palmerales - ¡un momento destacado para niños de todas las edades! Almuerzo picnic. Tarde en un resort familiar con piscina, juegos y actividades. Clase de cocina por la noche preparando platos marroquíes aprobados por niños." },
            { title: "Día 4: Día de Montaña", content: "Excursión fácil de un día a las estribaciones del Atlas. Paseos cortos adecuados para niños, paseos en mula disponibles. Almuerzo tradicional en una casa bereber. Los niños pueden jugar con los niños locales. Regreso para tiempo de piscina." },
            { title: "Día 5: Búsqueda del Tesoro", content: "Búsqueda del tesoro interactiva a través de la medina diseñada para familias. Descubra joyas ocultas mientras resuelve pistas. Tarde libre para compras o piscina. Cena tradicional nocturna con entretenimiento." },
            { title: "Día 6: Despedida", content: "Actividades matutinas finales según intereses. Última oportunidad para comprar recuerdos. Traslado al aeropuerto con maravillosos recuerdos familiares." }
          ],
          itinerary: [],
          tips: ["Actividades adaptadas a las edades de los niños", "Opciones de comida para niños disponibles", "Equipo para bebé/niño pequeño disponible", "Tiempo de siesta incluido en el horario"],
          duration: "6 días / 5 noches",
          difficulty: "Fácil (ritmo familiar)",
          groupSize: "Reserva familiar privada"
        },
        includedItems: ["5 noches de alojamiento", "Todas las comidas", "Tours familiares", "Actividades para niños", "Transporte"],
        excludedItems: ["Compras de entretenimiento"],
      },
    },
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
    mainImage: "https://images.pexels.com/photos/30374221/pexels-photo-30374221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    video: "/video.mp4",
    thumbnailImages: [
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1666866587937-c933156b2168?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    includedItems: ["5 nights luxury riad", "Romantic dinners", "Couples spa", "Private guide", "Wine", "Flowers"],
    excludedItems: ["Engagement photos"],
    translations: {
      en: {
        title: "Honeymoon Romance 5-Day Escape",
        description: "Romantic getaway with luxury accommodation, couples spa, sunset dinners, and private tours.",
        detailedDescription: {
          overview: "Celebrate your love in one of the world's most romantic destinations. This carefully curated honeymoon package combines luxury, intimacy, and unforgettable experiences designed for couples. Every detail is arranged to create the perfect romantic escape.",
          highlights: ["5 nights in romantic luxury riad suite", "Private tours throughout", "Couples hammam and massage", "Rooftop sunset dinners", "Rose petal turndown service", "Champagne and flowers", "Hot air balloon sunrise"],
          sections: [
            { title: "Day 1: Romance Begins", content: "VIP airport welcome with rose petals and champagne in your luxury transfer. Arrive at your exquisite riad suite decorated with flowers. Welcome couples massage. Private candlelit dinner on the rooftop terrace under the stars." },
            { title: "Day 2: Magical Sunrise", content: "Pre-dawn departure for a hot air balloon ride, floating over the landscape as the sun rises. Return for champagne breakfast. Afternoon at leisure for romance. Evening horse-drawn carriage ride and dinner at a palace restaurant." },
            { title: "Day 3: Sensory Journey", content: "Private guided tour of Marrakesh's most beautiful spaces - secret gardens, palatial riads, hidden courtyards. Lunch at a romantic garden restaurant. Afternoon traditional couples hammam ritual. Sunset drinks and dinner." },
            { title: "Day 4: Desert Romance", content: "Private excursion to the Agafay Desert. Enjoy a luxury picnic with champagne amidst stunning scenery. Optional camel ride at sunset. Return to Marrakesh for a special farewell dinner with traditional music." },
            { title: "Day 5: Sweet Departure", content: "Leisurely breakfast in bed. Last-minute shopping for keepsakes. Private transfer to airport, taking with you the memories of a perfect honeymoon." }
          ],
          itinerary: [],
          tips: ["All experiences completely private", "Dietary preferences accommodated", "Special requests welcomed", "Anniversary couples equally welcome"],
          duration: "5 days / 4 nights",
          difficulty: "Easy (romantic pacing)",
          groupSize: "Couples only"
        },
        includedItems: ["5 nights luxury riad", "Romantic dinners", "Couples spa", "Private guide", "Wine", "Flowers"],
        excludedItems: ["Engagement photos"],
      },
      fr: {
        title: "Escapade Romantique Lune de Miel 5 Jours",
        description: "Escapade romantique avec hébergement de luxe, spa en couple, dîners au coucher du soleil et visites privées.",
        detailedDescription: {
          overview: "Célébrez votre amour dans l'une des destinations les plus romantiques du monde. Ce forfait lune de miel soigneusement conçu combine luxe, intimité et expériences inoubliables pensées pour les couples. Chaque détail est arrangé pour créer l'escapade romantique parfaite.",
          highlights: ["5 nuits dans une suite de riad de luxe romantique", "Visites privées tout au long du séjour", "Hammam et massage en couple", "Dîners au coucher du soleil sur le toit", "Service de préparation du lit avec pétales de rose", "Champagne et fleurs", "Vol en montgolfière au lever du soleil"],
          sections: [
            { title: "Jour 1 : La Romance Commence", content: "Accueil VIP à l'aéroport avec pétales de rose et champagne dans votre transfert de luxe. Arrivée dans votre suite de riad exquise décorée de fleurs. Massage de bienvenue en couple. Dîner privé aux chandelles sur la terrasse sur le toit sous les étoiles." },
            { title: "Jour 2 : Lever de Soleil Magique", content: "Départ avant l'aube pour un vol en montgolfière, flottant au-dessus du paysage au lever du soleil. Retour pour petit-déjeuner au champagne. Après-midi de détente romantique. Promenade en calèche en soirée et dîner dans un restaurant de palais." },
            { title: "Jour 3 : Voyage Sensoriel", content: "Visite guidée privée des espaces les plus beaux de Marrakech - jardins secrets, riads palatials, cours cachées. Déjeuner dans un restaurant de jardin romantique. Rituel hammam traditionnel en couple l'après-midi. Apéritifs au coucher du soleil et dîner." },
            { title: "Jour 4 : Romance dans le Désert", content: "Excursion privée dans le désert d'Agafay. Profitez d'un pique-nique de luxe avec champagne au milieu d'un paysage magnifique. Balade à dos de chameau optionnelle au coucher du soleil. Retour à Marrakech pour un dîner d'adieu spécial avec musique traditionnelle." },
            { title: "Jour 5 : Départ en Douceur", content: "Petit-déjeuner tranquille au lit. Shopping de dernière minute pour des souvenirs. Transfert privé à l'aéroport, emportant avec vous les souvenirs d'une lune de miel parfaite." }
          ],
          itinerary: [],
          tips: ["Toutes les expériences sont totalement privées", "Préférences alimentaires prises en compte", "Demandes spéciales bienvenues", "Couples d'anniversaire également bienvenus"],
          duration: "5 jours / 4 nuits",
          difficulty: "Facile (rythme romantique)",
          groupSize: "Couples uniquement"
        },
        includedItems: ["5 nuits riad de luxe", "Dîners romantiques", "Spa en couple", "Guide privé", "Vin", "Fleurs"],
        excludedItems: ["Photos de fiançailles"],
      },
      es: {
        title: "Escapada Romántica de Luna de Miel 5 Días",
        description: "Escapada romántica con alojamiento de lujo, spa para parejas, cenas al atardecer y tours privados.",
        detailedDescription: {
          overview: "Celebre su amor en uno de los destinos más románticos del mundo. Este paquete de luna de miel cuidadosamente seleccionado combina lujo, intimidad y experiencias inolvidables diseñadas para parejas. Cada detalle está organizado para crear la escapada romántica perfecta.",
          highlights: ["5 noches en suite de riad de lujo romántico", "Tours privados durante toda la estancia", "Hammam y masaje para parejas", "Cenas al atardecer en la azotea", "Servicio de preparación de cama con pétalos de rosa", "Champán y flores", "Globo aerostático al amanecer"],
          sections: [
            { title: "Día 1: Comienza el Romance", content: "Bienvenida VIP en el aeropuerto con pétalos de rosa y champán en su traslado de lujo. Llegada a su exquisita suite de riad decorada con flores. Masaje de bienvenida para parejas. Cena privada a la luz de las velas en la terraza de la azotea bajo las estrellas." },
            { title: "Día 2: Amanecer Mágico", content: "Salida antes del amanecer para un paseo en globo aerostático, flotando sobre el paisaje mientras sale el sol. Regreso para desayuno con champán. Tarde libre para el romance. Paseo en carruaje por la noche y cena en un restaurante de palacio." },
            { title: "Día 3: Viaje Sensorial", content: "Tour guiado privado por los espacios más hermosos de Marrakech - jardines secretos, riads palaciegos, patios ocultos. Almuerzo en un restaurante de jardín romántico. Ritual de hammam tradicional para parejas por la tarde. Bebidas al atardecer y cena." },
            { title: "Día 4: Romance en el Desierto", content: "Excursión privada al desierto de Agafay. Disfrute de un picnic de lujo con champán en medio de un paisaje impresionante. Paseo en camello opcional al atardecer. Regreso a Marrakech para una cena de despedida especial con música tradicional." },
            { title: "Día 5: Dulce Despedida", content: "Desayuno tranquilo en la cama. Compras de última hora para recuerdos. Traslado privado al aeropuerto, llevándose consigo los recuerdos de una luna de miel perfecta." }
          ],
          itinerary: [],
          tips: ["Todas las experiencias completamente privadas", "Preferencias dietéticas atendidas", "Solicitudes especiales bienvenidas", "Parejas de aniversario igualmente bienvenidas"],
          duration: "5 días / 4 noches",
          difficulty: "Fácil (ritmo romántico)",
          groupSize: "Solo parejas"
        },
        includedItems: ["5 noches riad de lujo", "Cenas románticas", "Spa para parejas", "Guía privado", "Vino", "Flores"],
        excludedItems: ["Fotos de compromiso"],
      },
    },
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
    translations: {
      en: {
        title: "Luxury VIP Airport Transfer",
        description: "Premium airport transfer service with luxury vehicle, VIP meet & greet, and extra amenities for discerning travelers.",
        detailedDescription: {
          overview: "Experience the ultimate in comfort and style with our luxury VIP airport transfer. Travel in a premium Mercedes or BMW with professional chauffeur, enjoy VIP meet and greet service, and arrive at your destination in elegance.",
          highlights: ["Luxury Mercedes or BMW vehicle", "Professional uniformed chauffeur", "VIP meet and greet in arrivals", "Champagne and refreshments", "Premium WiFi and charging ports", "Leather interiors and privacy glass"],
          sections: [
            { title: "VIP Experience", content: "Your chauffeur will meet you inside the arrivals hall with a personalized welcome sign. They'll assist with luggage and escort you to your waiting luxury vehicle, where champagne and refreshments await." },
            { title: "Additional Services", content: "We can arrange expedited customs assistance, porter services, and coordination with your hotel for seamless arrival. Perfect for business travelers or special occasions." }
          ],
          itinerary: [],
          tips: ["Book 48 hours in advance for vehicle preferences", "Request specific champagne or beverage preferences", "Ideal for honeymoons and special celebrations", "Business travelers: laptop desk available on request"],
          duration: "20-40 minutes",
          difficulty: "Easy",
          groupSize: "1-4 passengers"
        },
        includedItems: ["Luxury vehicle", "Professional chauffeur", "VIP meet & greet", "Champagne", "Premium WiFi", "Phone chargers"],
        excludedItems: ["Customs expedite fees", "Additional stops"],
      },
      fr: {
        title: "Transfert VIP Aéroport de Luxe",
        description: "Service de transfert aéroport premium avec véhicule de luxe, accueil VIP et équipements supplémentaires pour les voyageurs exigeants.",
        detailedDescription: {
          overview: "Vivez le summum du confort et du style avec notre transfert VIP de luxe depuis l'aéroport. Voyagez dans une Mercedes ou BMW premium avec chauffeur professionnel, profitez d'un service d'accueil VIP et arrivez à destination avec élégance.",
          highlights: ["Véhicule de luxe Mercedes ou BMW", "Chauffeur professionnel en uniforme", "Accueil VIP aux arrivées", "Champagne et rafraîchissements", "WiFi premium et ports de chargement", "Intérieurs cuir et vitres teintées"],
          sections: [
            { title: "Expérience VIP", content: "Votre chauffeur vous accueillera dans le hall des arrivées avec une pancarte de bienvenue personnalisée. Il vous aidera avec vos bagages et vous escortera jusqu'à votre véhicule de luxe où champagne et rafraîchissements vous attendent." },
            { title: "Services Supplémentaires", content: "Nous pouvons organiser une assistance douanière accélérée, des services de porteur et une coordination avec votre hôtel pour une arrivée sans encombre. Parfait pour les voyageurs d'affaires ou les occasions spéciales." }
          ],
          itinerary: [],
          tips: ["Réservez 48 heures à l'avance pour les préférences de véhicule", "Demandez des préférences spécifiques de champagne ou boissons", "Idéal pour les lunes de miel et célébrations spéciales", "Voyageurs d'affaires : bureau pour ordinateur portable disponible sur demande"],
          duration: "20-40 minutes",
          difficulty: "Facile",
          groupSize: "1-4 passagers"
        },
        includedItems: ["Véhicule de luxe", "Chauffeur professionnel", "Accueil VIP", "Champagne", "WiFi premium", "Chargeurs de téléphone"],
        excludedItems: ["Frais d'accélération douanière", "Arrêts supplémentaires"],
      },
      es: {
        title: "Traslado VIP de Lujo al Aeropuerto",
        description: "Servicio de traslado de aeropuerto premium con vehículo de lujo, recibimiento VIP y comodidades adicionales para viajeros exigentes.",
        detailedDescription: {
          overview: "Experimente lo último en comodidad y estilo con nuestro traslado VIP de lujo desde el aeropuerto. Viaje en un Mercedes o BMW premium con chofer profesional, disfrute del servicio de recibimiento VIP y llegue a su destino con elegancia.",
          highlights: ["Vehículo de lujo Mercedes o BMW", "Chofer profesional uniformado", "Recibimiento VIP en llegadas", "Champán y refrigerios", "WiFi premium y puertos de carga", "Interiores de cuero y vidrios polarizados"],
          sections: [
            { title: "Experiencia VIP", content: "Su chofer lo recibirá dentro del hall de llegadas con un cartel de bienvenida personalizado. Le ayudará con el equipaje y lo escoltará hasta su vehículo de lujo esperando, donde champán y refrigerios le aguardan." },
            { title: "Servicios Adicionales", content: "Podemos organizar asistencia aduanera acelerada, servicios de portero y coordinación con su hotel para una llegada sin problemas. Perfecto para viajeros de negocios u ocasiones especiales." }
          ],
          itinerary: [],
          tips: ["Reserve 48 horas antes para preferencias de vehículo", "Solicite preferencias específicas de champán o bebidas", "Ideal para lunas de miel y celebraciones especiales", "Viajeros de negocios: escritorio para laptop disponible bajo solicitud"],
          duration: "20-40 minutos",
          difficulty: "Fácil",
          groupSize: "1-4 pasajeros"
        },
        includedItems: ["Vehículo de lujo", "Chofer profesional", "Recibimiento VIP", "Champán", "WiFi premium", "Cargadores de teléfono"],
        excludedItems: ["Tarifas de aduanas aceleradas", "Paradas adicionales"],
      },
    },
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
    translations: {
      en: {
        title: "Marrakesh to Fes Transfer",
        description: "Full-day scenic transfer from Marrakesh to Fes through the Middle Atlas Mountains with multiple stops.",
        detailedDescription: {
          overview: "Journey from the red city of Marrakesh to the ancient imperial city of Fes on this full-day scenic transfer. Cross the Middle Atlas Mountains, visit historic towns, and experience the changing landscapes of Morocco.",
          highlights: ["Cross the scenic Middle Atlas Mountains", "Visit the Roman ruins of Volubilis", "Stop at the holy city of Moulay Idriss", "See the blue town of Ifrane", "Cedar forests and Barbary macaques", "Comfortable full-day journey"],
          sections: [
            { title: "The Route", content: "This 8-9 hour journey takes you through some of Morocco's most diverse landscapes. From the palm groves of Marrakesh, through the cedar forests of the Middle Atlas, past volcanic lakes, and into the historic heart of Fes." },
            { title: "Ifrane & Cedar Forests", content: "Stop in Ifrane, known as 'Little Switzerland' for its alpine architecture and clean streets. Visit the nearby cedar forests where wild Barbary macaque monkeys roam free." },
            { title: "Historical Stops", content: "Optional stops include Volubilis, Morocco's best-preserved Roman ruins, and the holy town of Moulay Idriss, the final resting place of Morocco's founder. Both offer fascinating glimpses into Morocco's rich history." }
          ],
          itinerary: [],
          tips: ["Depart early morning for a relaxed journey", "Bring snacks and water for the drive", "Allow extra time for optional site visits", "Consider overnight stop in Fes to explore"],
          duration: "8-9 hours",
          difficulty: "Easy",
          groupSize: "1-7 passengers"
        },
        includedItems: ["Private vehicle", "Professional driver", "Hotel pickup & dropoff", "Bottled water", "Photo stops", "WiFi"],
        excludedItems: ["Entrance fees", "Meals", "Tips", "Guide at historical sites"],
      },
      fr: {
        title: "Transfert Marrakech à Fès",
        description: "Transfert panoramique d'une journée complète de Marrakech à Fès à travers les montagnes du Moyen Atlas avec plusieurs arrêts.",
        detailedDescription: {
          overview: "Voyagez de la ville rouge de Marrakech à l'ancienne ville impériale de Fès lors de ce transfert panoramique d'une journée. Traversez les montagnes du Moyen Atlas, visitez des villes historiques et découvrez les paysages changeants du Maroc.",
          highlights: ["Traversez les montagnes pittoresques du Moyen Atlas", "Visitez les ruines romaines de Volubilis", "Arrêt à la ville sainte de Moulay Idriss", "Découvrez la ville bleue d'Ifrane", "Forêts de cèdres et macaques de Barbarie", "Voyage confortable d'une journée complète"],
          sections: [
            { title: "L'Itinéraire", content: "Ce voyage de 8-9 heures vous emmène à travers certains des paysages les plus diversifiés du Maroc. Des palmeraies de Marrakech, à travers les forêts de cèdres du Moyen Atlas, passant par des lacs volcaniques, jusqu'au cœur historique de Fès." },
            { title: "Ifrane et Forêts de Cèdres", content: "Arrêtez-vous à Ifrane, connue comme la « Petite Suisse » pour son architecture alpine et ses rues propres. Visitez les forêts de cèdres voisines où les singes macaques de Barbarie sauvages se promènent librement." },
            { title: "Arrêts Historiques", content: "Les arrêts optionnels comprennent Volubilis, les ruines romaines les mieux conservées du Maroc, et la ville sainte de Moulay Idriss, dernière demeure du fondateur du Maroc. Les deux offrent des aperçus fascinants de la riche histoire du Maroc." }
          ],
          itinerary: [],
          tips: ["Partez tôt le matin pour un voyage détendu", "Apportez des snacks et de l'eau pour le trajet", "Prévoyez du temps supplémentaire pour les visites optionnelles", "Envisagez une nuit à Fès pour explorer"],
          duration: "8-9 heures",
          difficulty: "Facile",
          groupSize: "1-7 passagers"
        },
        includedItems: ["Véhicule privé", "Chauffeur professionnel", "Prise en charge et dépose à l'hôtel", "Eau en bouteille", "Arrêts photo", "WiFi"],
        excludedItems: ["Frais d'entrée", "Repas", "Pourboires", "Guide sur les sites historiques"],
      },
      es: {
        title: "Traslado Marrakech a Fez",
        description: "Traslado panorámico de día completo desde Marrakech a Fez a través de las montañas del Medio Atlas con múltiples paradas.",
        detailedDescription: {
          overview: "Viaje desde la ciudad roja de Marrakech hasta la antigua ciudad imperial de Fez en este traslado panorámico de día completo. Cruce las montañas del Medio Atlas, visite pueblos históricos y experimente los cambiantes paisajes de Marruecos.",
          highlights: ["Cruce las pintorescas montañas del Medio Atlas", "Visite las ruinas romanas de Volubilis", "Parada en la ciudad santa de Moulay Idriss", "Vea la ciudad azul de Ifrane", "Bosques de cedros y macacos de Berbería", "Viaje cómodo de día completo"],
          sections: [
            { title: "La Ruta", content: "Este viaje de 8-9 horas lo lleva a través de algunos de los paisajes más diversos de Marruecos. Desde los palmerales de Marrakech, a través de los bosques de cedros del Medio Atlas, pasando por lagos volcánicos, hasta el corazón histórico de Fez." },
            { title: "Ifrane y Bosques de Cedros", content: "Deténgase en Ifrane, conocida como la 'Pequeña Suiza' por su arquitectura alpina y calles limpias. Visite los cercanos bosques de cedros donde los monos macacos de Berbería salvajes deambulan libremente." },
            { title: "Paradas Históricas", content: "Las paradas opcionales incluyen Volubilis, las ruinas romanas mejor conservadas de Marruecos, y la ciudad santa de Moulay Idriss, lugar de descanso final del fundador de Marruecos. Ambos ofrecen fascinantes vistazos a la rica historia de Marruecos." }
          ],
          itinerary: [],
          tips: ["Salga temprano por la mañana para un viaje relajado", "Traiga snacks y agua para el trayecto", "Permita tiempo extra para visitas opcionales a sitios", "Considere una noche en Fez para explorar"],
          duration: "8-9 horas",
          difficulty: "Fácil",
          groupSize: "1-7 pasajeros"
        },
        includedItems: ["Vehículo privado", "Conductor profesional", "Recogida y entrega en hotel", "Agua embotellada", "Paradas fotográficas", "WiFi"],
        excludedItems: ["Entradas", "Comidas", "Propinas", "Guía en sitios históricos"],
      },
    },
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
    translations: {
      en: {
        title: "Casablanca Airport to Marrakesh",
        description: "Private transfer from Casablanca Mohammed V Airport to Marrakesh with optional city tour stop.",
        detailedDescription: {
          overview: "For travelers arriving at Casablanca's Mohammed V International Airport, we offer comfortable private transfers directly to Marrakesh. The 3-hour journey can include an optional stop to explore Casablanca's highlights.",
          highlights: ["Direct airport pickup at Casablanca", "Comfortable 3-hour journey to Marrakesh", "Optional Casablanca city tour", "Visit Hassan II Mosque (optional)", "Highway driving with scenic views", "Flexible scheduling"],
          sections: [
            { title: "Airport Pickup", content: "Your driver will meet you at Casablanca Mohammed V Airport arrivals with a personalized sign. After collecting your luggage, you'll be escorted to your private vehicle for the journey south to Marrakesh." },
            { title: "Optional Casablanca Stop", content: "Add a 2-3 hour stop in Casablanca to visit the magnificent Hassan II Mosque, one of the world's largest mosques and the only one in Morocco open to non-Muslims. Also see the Art Deco architecture and Corniche waterfront." },
            { title: "The Journey", content: "The modern highway takes you through agricultural plains and past small towns. Rest stops are available along the way. Arrive in Marrakesh refreshed and ready to explore." }
          ],
          itinerary: [],
          tips: ["Hassan II Mosque visits require modest dress", "Mosque tours run on set schedules - plan accordingly", "Book late afternoon departure for evening arrival", "Combine with return transfer for best rates"],
          duration: "3-5 hours",
          difficulty: "Easy",
          groupSize: "1-7 passengers"
        },
        includedItems: ["Private vehicle", "Professional driver", "Airport meet & greet", "Bottled water", "WiFi", "Highway tolls"],
        excludedItems: ["Mosque entrance fee", "Casablanca guide", "Meals", "Tips"],
      },
      fr: {
        title: "Aéroport de Casablanca à Marrakech",
        description: "Transfert privé de l'aéroport Mohammed V de Casablanca à Marrakech avec arrêt optionnel pour visite de la ville.",
        detailedDescription: {
          overview: "Pour les voyageurs arrivant à l'aéroport international Mohammed V de Casablanca, nous proposons des transferts privés confortables directement vers Marrakech. Le trajet de 3 heures peut inclure un arrêt optionnel pour explorer les points forts de Casablanca.",
          highlights: ["Prise en charge directe à l'aéroport de Casablanca", "Trajet confortable de 3 heures vers Marrakech", "Visite de ville de Casablanca optionnelle", "Visite de la Mosquée Hassan II (optionnel)", "Route sur autoroute avec vues panoramiques", "Horaires flexibles"],
          sections: [
            { title: "Prise en Charge à l'Aéroport", content: "Votre chauffeur vous accueillera aux arrivées de l'aéroport Mohammed V de Casablanca avec une pancarte personnalisée. Après avoir récupéré vos bagages, vous serez escorté vers votre véhicule privé pour le voyage vers le sud jusqu'à Marrakech." },
            { title: "Arrêt Optionnel à Casablanca", content: "Ajoutez un arrêt de 2-3 heures à Casablanca pour visiter la magnifique Mosquée Hassan II, l'une des plus grandes mosquées du monde et la seule au Maroc ouverte aux non-musulmans. Découvrez également l'architecture Art Déco et le front de mer de la Corniche." },
            { title: "Le Voyage", content: "L'autoroute moderne vous emmène à travers les plaines agricoles et devant de petites villes. Des aires de repos sont disponibles en chemin. Arrivez à Marrakech reposé et prêt à explorer." }
          ],
          itinerary: [],
          tips: ["Les visites de la Mosquée Hassan II nécessitent une tenue modeste", "Les visites de la mosquée ont des horaires fixes - planifiez en conséquence", "Réservez un départ en fin d'après-midi pour une arrivée en soirée", "Combinez avec le transfert retour pour de meilleurs tarifs"],
          duration: "3-5 heures",
          difficulty: "Facile",
          groupSize: "1-7 passagers"
        },
        includedItems: ["Véhicule privé", "Chauffeur professionnel", "Accueil à l'aéroport", "Eau en bouteille", "WiFi", "Péages d'autoroute"],
        excludedItems: ["Frais d'entrée mosquée", "Guide Casablanca", "Repas", "Pourboires"],
      },
      es: {
        title: "Aeropuerto de Casablanca a Marrakech",
        description: "Traslado privado desde el Aeropuerto Mohammed V de Casablanca a Marrakech con parada opcional para tour de la ciudad.",
        detailedDescription: {
          overview: "Para viajeros que llegan al Aeropuerto Internacional Mohammed V de Casablanca, ofrecemos cómodos traslados privados directamente a Marrakech. El viaje de 3 horas puede incluir una parada opcional para explorar los puntos destacados de Casablanca.",
          highlights: ["Recogida directa en el aeropuerto de Casablanca", "Viaje cómodo de 3 horas a Marrakech", "Tour opcional por la ciudad de Casablanca", "Visita a la Mezquita Hassan II (opcional)", "Conducción por autopista con vistas panorámicas", "Horarios flexibles"],
          sections: [
            { title: "Recogida en el Aeropuerto", content: "Su conductor lo recibirá en las llegadas del Aeropuerto Mohammed V de Casablanca con un cartel personalizado. Después de recoger su equipaje, será escoltado a su vehículo privado para el viaje hacia el sur a Marrakech." },
            { title: "Parada Opcional en Casablanca", content: "Añada una parada de 2-3 horas en Casablanca para visitar la magnífica Mezquita Hassan II, una de las mezquitas más grandes del mundo y la única en Marruecos abierta a no musulmanes. También vea la arquitectura Art Deco y el paseo marítimo de la Corniche." },
            { title: "El Viaje", content: "La moderna autopista lo lleva a través de llanuras agrícolas y pueblos pequeños. Hay áreas de descanso disponibles en el camino. Llegue a Marrakech descansado y listo para explorar." }
          ],
          itinerary: [],
          tips: ["Las visitas a la Mezquita Hassan II requieren vestimenta modesta", "Los tours de la mezquita tienen horarios fijos - planifique en consecuencia", "Reserve salida a última hora de la tarde para llegada nocturna", "Combine con traslado de regreso para mejores tarifas"],
          duration: "3-5 horas",
          difficulty: "Fácil",
          groupSize: "1-7 pasajeros"
        },
        includedItems: ["Vehículo privado", "Conductor profesional", "Recibimiento en aeropuerto", "Agua embotellada", "WiFi", "Peajes de autopista"],
        excludedItems: ["Entrada a la mezquita", "Guía de Casablanca", "Comidas", "Propinas"],
      },
    },
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
