"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import TravelThemes from "@/components/travel-themes"
import OurBestOffers from "@/components/our-best-offers"
import Testimonials from "@/components/testimonials"
import CustomizedQuote from "@/components/customized-quote"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"

export default function HomePage() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <TravelThemes />
      <OurBestOffers />
      <Testimonials />
      <CustomizedQuote />
      <Footer />
      <FloatingContact />
    </main>
  )
}
