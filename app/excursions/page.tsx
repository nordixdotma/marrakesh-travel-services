"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import OffersGrid from "@/components/offers-grid"
import SearchFilter, { type Filters } from "@/components/search-filter"
import { toursOffers, excursionsOffers, activitiesOffers, packagesOffers, type Offer } from "@/lib/offers-data"

export default function ExcursionsPage() {
  const allOffers: Offer[] = [...toursOffers, ...excursionsOffers, ...activitiesOffers, ...packagesOffers]
  const pageType = "excursions"

  const [offers, setOffers] = useState<Offer[]>(() => excursionsOffers)

  const handleFilterChange = (filters: Filters) => {
    const filtered = allOffers.filter((o) => {
      const categoryToMatch = filters.category && filters.category !== "all" ? filters.category : pageType
      if (o.type !== categoryToMatch) return false

      if (filters.minPrice != null && o.priceAdult < filters.minPrice) return false
      if (filters.maxPrice != null && o.priceAdult > filters.maxPrice) return false

      if (filters.theme) {
        const hay = (o.title + " " + o.description + " " + o.includedItems.join(" ")).toLowerCase()
        if (!hay.includes(filters.theme.toLowerCase())) return false
      }

      if (filters.availableOn) {
        const d = new Date(filters.availableOn)
        const start = new Date(o.availabilityDates.startDate)
        const end = new Date(o.availabilityDates.endDate)
        if (d < start || d > end) return false
      }

      return true
    })

    setOffers(filtered)
  }

  return (
    <main className="w-full">
      <Header />
      <PageHero title="Excursions" backgroundImage="https://images.unsplash.com/photo-1609281362702-f46a060b2044?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      <section className="py-12 bg-background">
        <Container className="max-w-6xl px-4">
          <SearchFilter onChange={handleFilterChange} initial={{ category: pageType }} />

          <OffersGrid offers={offers} />
        </Container>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
