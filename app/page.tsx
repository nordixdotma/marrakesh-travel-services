"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import EmptySectionA from "@/components/empty-section-a"
import EmptySectionB from "@/components/empty-section-b"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"

export default function HomePage() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <EmptySectionA />
      <EmptySectionB />
      <Testimonials />
      <Footer />
      <FloatingContact />
    </main>
  )
}
