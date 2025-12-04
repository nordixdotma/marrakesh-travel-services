import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://marrakesh-travel-services.com"),
  title: {
    default: "Marrakesh Travel Services - Premium Travel & Transportation",
    template: "%s | Marrakesh Travel Services",
  },
  description:
    "Experience authentic Moroccan travel with Marrakesh Travel Services. Professional airport transfers, city tours, excursions, activities, packages, and luxury transportation. Book your unforgettable journey today.",
  keywords: [
    "Morocco travel",
    "airport transfers",
    "Marrakesh tours",
    "car rental Morocco",
    "luxury transportation",
    "travel services",
    "excursions",
    "activities",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Marrakesh Travel Services - Premium Travel & Transportation",
    description:
      "Experience authentic Moroccan travel with Marrakesh Travel Services. Professional airport transfers, city tours, and luxury transportation.",
    url: "https://marrakesh-travel-services.com",
    siteName: "Marrakesh Travel Services",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Marrakesh Travel Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakesh Travel Services - Premium Travel & Transportation",
    description:
      "Experience authentic Moroccan travel with Marrakesh Travel Services. Professional airport transfers, city tours, and luxury transportation.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://marrakesh-travel-services.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/optima" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
