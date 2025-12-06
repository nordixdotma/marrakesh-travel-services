import OffersGrid from "./offers-grid"
import { bestOffers } from "@/lib/offers-data"

export default function OurBestOffers() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
            <span className="text-lg font-semibold">Our Best Offers</span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover our handpicked selection of premium tours, excursions, activities, and packages
          </p>
        </div>

        <OffersGrid offers={bestOffers} />
      </div>
    </section>
  )
}
