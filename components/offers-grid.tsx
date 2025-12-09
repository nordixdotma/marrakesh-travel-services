"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Heart, MapPin, ArrowRight } from "lucide-react"
import type { Offer } from "@/lib/offers-data"
import { getTranslatedOffer } from "@/lib/offers-data"
import { useAuth } from "@/components/login-modal"
import { useLanguage } from "@/components/language-provider"

interface OffersGridProps {
  offers: Offer[]
}

export default function OffersGrid({ offers }: OffersGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { isLoggedIn, openLoginModal } = useAuth()
  const { language } = useLanguage()

  // Get translated offers based on current language
  const translatedOffers = useMemo(() => {
    return offers.map(offer => getTranslatedOffer(offer, language))
  }, [offers, language])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(storedFavorites)))
      } catch {
        localStorage.removeItem("favorites")
      }
    }
  }, [])

  const toggleFavorite = (e: React.MouseEvent, offerId: string) => {
    e.preventDefault()
    e.stopPropagation()

    // Check if user is logged in
    if (!isLoggedIn) {
      openLoginModal("Please sign in to add items to your favorites")
      return
    }

    const newFavorites = new Set(favorites)
    if (newFavorites.has(offerId)) {
      newFavorites.delete(offerId)
    } else {
      newFavorites.add(offerId)
    }
    setFavorites(newFavorites)
    // Save to localStorage
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]))
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
      {translatedOffers.map((offer) => (
        <Link
          key={offer.id}
          href={`/offers/${offer.id}`}
          className="rounded-lg bg-background border border-border transition-all duration-300 hover:border-primary overflow-hidden hover:shadow-lg group block"
        >
          <div className="relative overflow-hidden h-36 sm:h-48 md:h-60">
            <img
              src={offer.mainImage || "/placeholder.svg"}
              alt={offer.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={(e) => toggleFavorite(e, offer.id)}
              className="absolute top-2 right-2 md:top-3 md:right-3 bg-background/80 hover:bg-background rounded-full p-1.5 md:p-2 transition-all duration-200 backdrop-blur-sm transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-200 ${
                  favorites.has(offer.id)
                    ? "scale-110 fill-red-500 text-red-500"
                    : "text-foreground"
                }`}
              />
            </button>
          </div>

          <div className="p-2 sm:p-3 md:p-4">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2 line-clamp-2">{offer.title}</h3>

            <p className="text-xs sm:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2 hidden sm:block">{offer.description}</p>

            {/* Show transfer route for transfers, availability dates for others */}
            {offer.type === "transfers" && offer.transferDetails ? (
              <div className="text-[10px] sm:text-xs text-muted-foreground mb-2 md:mb-3 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                <span className="truncate">{offer.transferDetails.from}</span>
                <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                <span className="truncate">{offer.transferDetails.to}</span>
              </div>
            ) : (
              <div className="text-[10px] sm:text-xs text-muted-foreground mb-2 md:mb-3 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-primary"></span>
                Available:{" "}
                {new Date(offer.availabilityDates.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(offer.availabilityDates.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}

            <div className="pt-2 md:pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">From</p>
                  <p className="text-sm md:text-base font-semibold text-primary">${offer.priceAdult}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-muted-foreground">{offer.type === "transfers" ? "per vehicle" : "per person"}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
