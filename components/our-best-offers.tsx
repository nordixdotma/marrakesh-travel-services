"use client"

import OffersGrid from "./offers-grid"
import { bestOffers } from "@/lib/offers-data"
import { useLanguage } from "@/components/language-provider"

export default function OurBestOffers() {
  const { t } = useLanguage()

  // Helper to get readable subtitle for a given type
  const getSubtitle = (type: string) => {
    const badge = (t && t.bestOffers && t.bestOffers.badge) || {
      tours: "Best Tour",
      excursions: "Best Excursion",
      activities: "Best Activity",
      packages: "Best Package",
      transfers: "Best Transfer",
      default: "Best Offer",
    }

    const map: Record<string, string> = {
      tours: badge.tours,
      excursions: badge.excursions,
      activities: badge.activities,
      packages: badge.packages,
      transfers: badge.transfers,
    }

    return map[type] ?? badge.default
  }

  // Group offers by type so we can render a subtitle then the grid underneath
  const groups = Array.from(
    (bestOffers || []).reduce((acc, offer) => {
      const arr = acc.get(offer.type) || []
      arr.push(offer)
      acc.set(offer.type, arr)
      return acc
    }, new Map())
  )

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

        <div className="flex flex-col gap-8">
          {groups.map(([type, offersForType]) => (
            <div key={type} className="w-full">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-2">
                    <span className="text-sm md:text-base font-semibold">{getSubtitle(type)}</span>
                  </div>
                  {t.bestOffers && t.bestOffers[`desc_${type}`] && (
                    <p className="text-muted-foreground mx-auto hidden md:block">{t.bestOffers[`desc_${type}`]}</p>
                  )}
                </div>

              <OffersGrid offers={offersForType} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}