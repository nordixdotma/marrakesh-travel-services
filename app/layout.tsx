import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/login-modal"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://marrakesh-travel-services.com"),
  title: {
    default: "Marrakesh Travel Services | Premium Morocco Tours, Transfers & Excursions",
    template: "%s | Marrakesh Travel Services",
  },
  description:
    "Discover Morocco with Marrakesh Travel Services. Book premium airport transfers, guided city tours, desert excursions, and luxury transportation. Trusted by thousands of travelers for authentic Moroccan experiences since 2010.",
  keywords: [
    "Morocco travel agency",
    "Marrakesh airport transfers",
    "Marrakesh city tours",
    "Morocco desert excursions",
    "Sahara desert tours",
    "Morocco car rental",
    "luxury transportation Morocco",
    "Marrakech travel services",
    "Morocco holiday packages",
    "Fes tours",
    "Casablanca transfers",
    "Atlas Mountains excursions",
    "Moroccan adventure tours",
    "private driver Morocco",
    "Morocco day trips",
  ],
  authors: [{ name: "Marrakesh Travel Services", url: "https://marrakesh-travel-services.com" }],
  creator: "Marrakesh Travel Services",
  publisher: "Marrakesh Travel Services",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: "Travel",
  classification: "Travel Agency",
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Marrakesh Travel Services | Premium Morocco Tours & Transportation",
    description:
      "Discover authentic Morocco with our premium travel services. Expert-guided tours, reliable airport transfers, desert adventures, and luxury transportation across Morocco.",
    url: "https://marrakesh-travel-services.com",
    siteName: "Marrakesh Travel Services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marrakesh Travel Services - Explore Morocco",
        type: "image/jpeg",
      },
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Marrakesh Travel Services Logo",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Morocco",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakesh Travel Services | Premium Morocco Tours & Transportation",
    description:
      "Discover authentic Morocco with our premium travel services. Expert-guided tours, reliable airport transfers, and luxury transportation.",
    images: ["/og-image.jpg"],
    creator: "@marrakeshtravel",
    site: "@marrakeshtravel",
  },
  alternates: {
    canonical: "https://marrakesh-travel-services.com",
    languages: {
      "en-US": "https://marrakesh-travel-services.com",
      "fr-FR": "https://marrakesh-travel-services.com/fr",
      "es-ES": "https://marrakesh-travel-services.com/es",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  other: {
    "geo.region": "MA",
    "geo.placename": "Marrakesh",
    "geo.position": "31.6295;-7.9811",
    "ICBM": "31.6295, -7.9811",
  },
}

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://marrakesh-travel-services.com/#organization",
      name: "Marrakesh Travel Services",
      url: "https://marrakesh-travel-services.com",
      logo: {
        "@type": "ImageObject",
        url: "https://marrakesh-travel-services.com/logo.png",
        width: 512,
        height: 512,
      },
      image: "https://marrakesh-travel-services.com/og-image.jpg",
      description:
        "Premium travel agency in Morocco offering airport transfers, guided tours, desert excursions, and luxury transportation services.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Avenue Mohammed V",
        addressLocality: "Marrakesh",
        addressRegion: "Marrakesh-Safi",
        postalCode: "40000",
        addressCountry: "MA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.6295,
        longitude: -7.9811,
      },
      telephone: "+212-XXX-XXXXXX",
      email: "info@marrakesh-travel-services.com",
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "20:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/marrakeshtravel",
        "https://www.instagram.com/marrakeshtravel",
        "https://twitter.com/marrakeshtravel",
        "https://www.tripadvisor.com/marrakeshtravel",
      ],
      areaServed: {
        "@type": "Country",
        name: "Morocco",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Travel Services",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Airport Transfers",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Private Airport Transfer",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Guided Tours",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Marrakesh City Tour",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Desert Excursions",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Sahara Desert Experience",
                },
              },
            ],
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://marrakesh-travel-services.com/#website",
      url: "https://marrakesh-travel-services.com",
      name: "Marrakesh Travel Services",
      description: "Premium Morocco Travel & Transportation Services",
      publisher: {
        "@id": "https://marrakesh-travel-services.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://marrakesh-travel-services.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://marrakesh-travel-services.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://marrakesh-travel-services.com",
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.cdnfonts.com" />
        
        {/* Custom fonts */}
        <link href="https://fonts.cdnfonts.com/css/urwclassico" rel="stylesheet" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#c4a47c" />
        <meta name="msapplication-TileColor" content="#c4a47c" />
        
        {/* Additional SEO meta tags */}
        <meta name="application-name" content="Marrakesh Travel Services" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Marrakesh Travel" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
