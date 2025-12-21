"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, ArrowRight, Search } from "lucide-react"
import type { Offer } from "@/lib/offers-data"
import { getTranslatedOffer } from "@/lib/offers-data"
import { useAuth } from "@/components/login-modal"
import { useLanguage } from "@/components/language-provider"
import { userApi } from "@/lib/api"
import { toast } from "sonner"

interface OffersGridProps {
  offers: Offer[]
}

export default function OffersGrid({ offers }: OffersGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isToggling, setIsToggling] = useState<string | null>(null)
  const { isLoggedIn, openLoginModal } = useAuth()
  const { language, t } = useLanguage()

  // Get translated offers based on current language
  const translatedOffers = useMemo(() => {
    return offers.map(offer => getTranslatedOffer(offer, language))
  }, [offers, language])

  // Load favorites from backend API on mount and sync localStorage favorites
  useEffect(() => {
    const loadFavorites = async () => {
      if (!isLoggedIn) {
        // Fallback to localStorage if not logged in
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites) {
          try {
            setFavorites(new Set(JSON.parse(storedFavorites)))
          } catch {
            localStorage.removeItem("favorites")
          }
        }
        return
      }

      try {
        // Get favorites from backend
        const response = await userApi.getFavorites(language)
        const backendFavoriteIds = new Set((response.favorites || []).map((fav: any) => fav.id))
        setFavorites(backendFavoriteIds)
        
        // Sync localStorage favorites to backend (if any exist and we have offers)
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites && offers.length > 0) {
          try {
            const localFavoriteIds = JSON.parse(storedFavorites) as string[]
            // Find offers that are in localStorage but not in backend
            for (const offerId of localFavoriteIds) {
              if (!backendFavoriteIds.has(offerId)) {
                // Find the offer to get its type
                const offer = offers.find(o => o.id === offerId)
                if (offer) {
                  try {
                    await userApi.addFavorite(offerId, offer.type.toUpperCase())
                    console.log('✅ Synced favorite to backend:', offerId)
                    backendFavoriteIds.add(offerId)
                  } catch (syncError) {
                    console.warn('Failed to sync favorite:', offerId, syncError)
                  }
                }
              }
            }
            // Update state with synced favorites
            setFavorites(backendFavoriteIds)
            // Clear localStorage favorites after syncing
            localStorage.removeItem("favorites")
          } catch (e) {
            console.warn('Error syncing localStorage favorites:', e)
          }
        }
      } catch (error) {
        console.error('Error loading favorites:', error)
        // Fallback to localStorage on error
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites) {
          try {
            setFavorites(new Set(JSON.parse(storedFavorites)))
          } catch {
            localStorage.removeItem("favorites")
          }
        }
      }
    }

    loadFavorites()
  }, [isLoggedIn, language, offers])

  const toggleFavorite = async (e: React.MouseEvent, offerId: string, offerType: string) => {
    e.preventDefault()
    e.stopPropagation()

    // Check if user is logged in
    if (!isLoggedIn) {
      openLoginModal("Please sign in to add items to your favorites")
      return
    }

    const isFavorite = favorites.has(offerId)
    setIsToggling(offerId)

    try {
      if (isFavorite) {
        // Remove from favorites
        await userApi.removeFavorite(offerId)
        const newFavorites = new Set(favorites)
        newFavorites.delete(offerId)
        setFavorites(newFavorites)
        toast.success('Removed from favorites')
      } else {
        // Add to favorites
        await userApi.addFavorite(offerId, offerType.toUpperCase())
        const newFavorites = new Set(favorites)
        newFavorites.add(offerId)
        setFavorites(newFavorites)
        toast.success('Added to favorites')
      }
      
      // Dispatch event to notify profile page to refresh stats
      window.dispatchEvent(new Event('favorites-updated'))
    } catch (error: any) {
      console.error('Error toggling favorite:', error)
      toast.error(error.message || 'Failed to update favorite')
      // Revert UI change on error
      const newFavorites = new Set(favorites)
      if (isFavorite) {
        newFavorites.add(offerId)
      } else {
        newFavorites.delete(offerId)
      }
      setFavorites(newFavorites)
    } finally {
      setIsToggling(null)
    }
  }

  return (
    <div className="offers-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
      {translatedOffers.length === 0 ? (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{t.common?.noOffersFound || "No offers found"}</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            {t.common?.noOffersDescription || "We couldn't find any offers matching your criteria. Try adjusting your filters or search for something else."}
          </p>
        </div>
      ) : (
        translatedOffers.map((offer) => (
          <Link
            key={offer.id}
            href={`/offers/${offer.id}`}
            className="offer-card rounded-sm md:rounded-lg bg-background border border-border transition-all duration-300 hover:border-primary overflow-hidden hover:shadow-lg group flex flex-col relative h-full"
          >
            <div className="relative overflow-hidden h-52 md:h-56 lg:h-64">
              {offer.mainImage && offer.mainImage.includes('api.marrakeshtravelservices.com') ? (
                <img
                  src={offer.mainImage || "/placeholder.svg"}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder.svg'
                  }}
                />
              ) : (
                <Image
                  src={offer.mainImage || "/placeholder.svg"}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder.svg'
                  }}
                />
              )}
              <button
                onClick={(e) => toggleFavorite(e, offer.id, offer.type)}
                disabled={isToggling === offer.id}
                className="absolute top-2 right-2 md:top-3 md:right-3 bg-background/80 hover:bg-background rounded-full p-1.5 md:p-2 transition-all duration-200 backdrop-blur-sm transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={favorites.has(offer.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-200 ${
                    favorites.has(offer.id)
                      ? "scale-110 fill-red-500 text-red-500"
                      : "text-foreground"
                  } ${isToggling === offer.id ? "animate-pulse" : ""}`}
                />
              </button>
            </div>

            <div className="p-2 md:p-4 grow flex flex-col">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-2 md:mb-2 line-clamp-2">{offer.title}</h3>

              <p className="text-xs sm:text-sm text-muted-foreground mb-3 md:mb-2 line-clamp-2">{offer.description}</p>

              {/* Show transfer route for transfers, availability dates for others */}
              {offer.type === "transfers" && offer.transferDetails ? (
                <div className="text-[10px] sm:text-xs text-muted-foreground mb-2 md:mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary shrink-0" />
                  <span className="truncate">{offer.transferDetails.from}</span>
                  <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                  <span className="truncate">{offer.transferDetails.to}</span>
                </div>
              ) : (
                <div className="text-[10px] sm:text-xs text-muted-foreground mb-2 md:mb-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary"></span>
                  {(t?.offerDetails?.availability ?? "Available") + ":"} {" "}
                  {new Date(offer.availabilityDates.startDate).toLocaleDateString(language || "en", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(offer.availabilityDates.endDate).toLocaleDateString(language || "en", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>

            <div className="bg-primary p-2 sm:p-3 md:p-4 mt-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] sm:text-xs text-secondary opacity-90">{t?.common?.from ?? "From"}</p>
                  <p className="text-sm md:text-base font-semibold text-primary-foreground">MAD {offer.priceAdult}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary opacity-90">{offer.type === "transfers" ? (t?.offerDetails?.perVehicle ?? "per vehicle") : (t?.common?.perPerson ?? "per person")}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}