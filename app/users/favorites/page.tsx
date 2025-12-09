"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Trash2, MapPin, ExternalLink } from "lucide-react"
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

  const removeFavorite = (offerId: string) => {
    const newFavorites = favoriteIds.filter((id) => id !== offerId)
    setFavoriteIds(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

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
          {favoriteOffers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {favoriteOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex flex-col rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="relative h-40">
                    <img
                      src={offer.mainImage || "/placeholder.svg"}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFavorite(offer.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-destructive hover:text-white transition-colors backdrop-blur-sm"
                      aria-label={t.users.favorites.removeFromFavorites}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-foreground line-clamp-1">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 flex-1">
                      {offer.description}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">{t.common.from}</p>
                        <p className="font-semibold text-primary">${offer.priceAdult}</p>
                      </div>
                      <Link href={`/offers/${offer.id}`}>
                        <Button size="sm" variant="outline" className="gap-1">
                          {t.users.favorites.viewDetails}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{t.users.favorites.noFavorites}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.users.favorites.noFavoritesDescription}
              </p>
              <Link href="/tours">
                <Button>{t.users.favorites.exploreTours}</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
