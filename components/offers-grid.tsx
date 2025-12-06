"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { Offer } from "@/lib/offers-data"
import { useAuth } from "@/components/login-modal"

interface OffersGridProps {
  offers: Offer[]
}

export default function OffersGrid({ offers }: OffersGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { isLoggedIn, openLoginModal } = useAuth()

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer) => (
        <Link
          key={offer.id}
          href={`/offers/${offer.id}`}
          className="rounded-lg bg-background border border-border transition-all duration-300 hover:border-primary overflow-hidden hover:shadow-lg group block"
        >
          <div className="relative overflow-hidden h-56 md:h-60">
            <img
              src={offer.mainImage || "/placeholder.svg"}
              alt={offer.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={(e) => toggleFavorite(e, offer.id)}
              className="absolute top-3 right-3 bg-background/80 hover:bg-background rounded-full p-2 transition-all duration-200 backdrop-blur-sm transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Add to favorites"
            >
              <Heart
                size={20}
                className={`transform transition-transform duration-200 ${
                  favorites.has(offer.id)
                    ? "scale-110 fill-red-500 text-red-500"
                    : "text-foreground"
                }`}
              />
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{offer.title}</h3>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{offer.description}</p>

            <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
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

            <div className="pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="font-semibold text-primary">${offer.priceAdult}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
