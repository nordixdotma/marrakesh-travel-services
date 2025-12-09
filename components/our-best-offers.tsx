"use client"

import OffersGrid from "./offers-grid"
import { bestOffers } from "@/lib/offers-data"
import { useLanguage } from "@/components/language-provider"

export default function OurBestOffers() {
  const { t } = useLanguage()
  
  return (
    <section className="w-full py-20 px-2 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
            <span className="text-lg font-semibold">{t.bestOffers.sectionTitle}</span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.bestOffers.sectionDescription}
          </p>
        </div>

        <OffersGrid offers={bestOffers} />
      </div>
    </section>
  )
}
