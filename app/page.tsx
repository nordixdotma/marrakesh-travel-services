"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import AboutUs from "@/components/about-us"
import TravelThemes from "@/components/travel-themes"
import OurBestOffers from "@/components/our-best-offers"
import Testimonials from "@/components/testimonials"
import CustomizedQuote from "@/components/customized-quote"
import BlogsGrid from "@/components/blogs-grid"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"

export default function HomePage() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <AboutUs />
      <TravelThemes />
      <OurBestOffers />
      <Testimonials />
      <BlogsGrid />
      <CustomizedQuote />
      <Footer />
      <FloatingContact />
    </main>
  )
}
