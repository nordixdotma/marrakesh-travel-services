"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"
import OffersGrid from "@/components/offers-grid"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { 
  toursOffers, 
  excursionsOffers, 
  activitiesOffers, 
  packagesOffers,
  type Offer 
} from "@/lib/offers-data"

// Combine all offers
const allOffersArray: Offer[] = [
  ...toursOffers,
  ...excursionsOffers,
  ...activitiesOffers,
  ...packagesOffers,
]

export default function FavoritesPage() {
  const { t } = useLanguage()
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavoriteIds(JSON.parse(storedFavorites))
      } catch {
        localStorage.removeItem("favorites")
      }
    }
  }, [])

  const favoriteOffers = allOffersArray.filter((offer) => favoriteIds.includes(offer.id))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.users.favorites.pageTitle}</h1>
        <p className="text-muted-foreground">{t.users.favorites.pageDescription}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            {t.users.favorites.savedItems}
          </CardTitle>
          <CardDescription>
            {favoriteOffers.length > 0
              ? t.users.favorites.savedCount.replace("{count}", favoriteOffers.length.toString()).replace("{items}", favoriteOffers.length === 1 ? "item" : "items")
              : t.users.favorites.savedItemsEmpty}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="-mx-4 md:mx-0">
             <OffersGrid offers={favoriteOffers} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
