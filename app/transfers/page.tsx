"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import OffersGrid from "@/components/offers-grid"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/components/language-provider"
import { transfersOffers } from "@/lib/offers-data"

export default function TransfersPage() {
  const { t } = useLanguage()
  return (
    <main className="w-full">
      <Header />
      <PageHero
        title={t.pageHero.transfers}
        backgroundImage="https://images.unsplash.com/photo-1609281362702-f46a060b2044?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <section className="py-12 bg-gray-50">
        <Container className="max-w-6xl px-2 md:px-4">
          <OffersGrid offers={transfersOffers} />
        </Container>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
