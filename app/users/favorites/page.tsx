"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Loader2 } from "lucide-react"
import OffersGrid from "@/components/offers-grid"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { userApi, type ApiError } from "@/lib/api"
import { useAuth } from "@/components/login-modal"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { type Offer } from "@/lib/offers-data"

export default function FavoritesPage() {
  const { t, language } = useLanguage()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [favoriteOffers, setFavoriteOffers] = useState<Offer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
      return
    }

    const fetchFavorites = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Check if token exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) {
          setError('Please log in to view your favorites')
          toast.error('Authentication required', {
            description: 'Please log in to view your favorites',
          })
          setIsLoading(false)
          return
        }
        
        const response = await userApi.getFavorites(language)
        
        // Transform backend data to match frontend Offer format
        const transformedOffers: Offer[] = (response.favorites || []).map((fav: any) => {
          // Handle image URL
          let mainImage = fav.mainImage || '/placeholder.svg'
          if (mainImage && !mainImage.startsWith('http') && !mainImage.startsWith('/')) {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
            const baseUrl = apiBaseUrl.replace('/api/v1', '')
            mainImage = `${baseUrl}/uploads/${mainImage}`
          } else if (mainImage && mainImage.startsWith('/') && !mainImage.startsWith('//')) {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
            const baseUrl = apiBaseUrl.replace('/api/v1', '')
            mainImage = `${baseUrl}${mainImage}`
          }

          // Get main image from images array if available
          const mainImageObj = fav.images?.find((img: any) => img.type === 'MAIN')
          if (mainImageObj) {
            mainImage = mainImageObj.url
          }

          const thumbnailImages = (fav.images?.filter((img: any) => img.type === 'GALLERY').map((img: any) => img.url) || []).filter(Boolean)

          return {
            id: fav.id,
            type: fav.type as any,
            departCity: fav.departCity || 'Marrakech',
            title: fav.title || 'Untitled Offer',
            description: fav.description || '',
            detailedDescription: {
              overview: fav.overview || '',
              highlights: fav.highlights || [],
              sections: [],
              itinerary: [],
              tips: [],
            },
            mainImage: mainImage,
            thumbnailImages: thumbnailImages,
            video: fav.video || '',
            includedItems: fav.includedItems || [],
            excludedItems: fav.excludedItems || [],
            priceAdult: fav.priceAdult ? parseFloat(fav.priceAdult) : 0,
            priceChild: fav.priceChild ? parseFloat(fav.priceChild) : 0,
            availabilityDates: {
              startDate: fav.availabilityStart ? new Date(fav.availabilityStart).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              endDate: fav.availabilityEnd ? new Date(fav.availabilityEnd).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            },
          }
        })
        
        setFavoriteOffers(transformedOffers)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Failed to load favorites')
        console.error('Error fetching favorites:', err)
        toast.error('Failed to load favorites', {
          description: apiError.message || 'Please try again later',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [isLoggedIn, language, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.users.favorites.pageTitle}</h1>
          <p className="text-muted-foreground">{t.users.favorites.pageDescription}</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
            <div className="-mx-4 md:mx-0">
              <OffersGrid offers={favoriteOffers} />
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{t.users.favorites.noFavorites}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.users.favorites.noFavoritesDescription}
              </p>
              <Link href="/tours">
                <Button>{t.users.favorites.browseOffers}</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
