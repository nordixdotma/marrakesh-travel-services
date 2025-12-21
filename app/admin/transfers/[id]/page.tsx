"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import { OfferForm } from "@/components/admin/offer-form"
import { offersApi, ApiError } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import type { Offer } from "@/lib/offers-data"

function TransfersDetailContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === "new"
  
  const modeParam = searchParams.get("mode")
  const [mode, setMode] = useState<"view" | "edit" | "add">(
    isNew ? "add" : (modeParam === "edit" ? "edit" : "view")
  )
  const [offer, setOffer] = useState<Offer | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(!isNew)
  const [error, setError] = useState<string | null>(null)

  // Fetch offer from backend if not new
  useEffect(() => {
    if (isNew) {
      setIsLoading(false)
      return
    }

    const fetchOffer = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await offersApi.getOfferById(id, 'en')
        
        // Transform backend data to match frontend Offer format
        const backendOffer = response.offer
        
        // Extract pricing data (transfers don't have priced_offers, they have vehicle_options)
        const vehicleOptions = backendOffer.vehicle_options || backendOffer.transferDetails?.vehicle_options
        
        // Extract main image from images array or use main_image field
        const mainImageObj = backendOffer.images?.find((img: any) => img.type === 'MAIN')
        const mainImage = mainImageObj?.url || backendOffer.main_image || '/placeholder.jpg'
        
        // Extract thumbnail images
        const thumbnailImages = backendOffer.images?.filter((img: any) => img.type === 'GALLERY').map((img: any) => img.url) || []
        
        const transformedOffer: Offer = {
          id: backendOffer.id,
          type: 'transfers',
          title: backendOffer.title || 'Untitled Transfer',
          description: backendOffer.description || '',
          departCity: backendOffer.depart_city,
          priceAdult: 0, // Transfers use vehicle options pricing
          priceChild: 0,
          mainImage: mainImage,
          thumbnailImages: thumbnailImages,
          video: backendOffer.video || '',
          availabilityDates: {
            startDate: '',
            endDate: '',
          },
          detailedDescription: {
            overview: backendOffer.overview || '',
            highlights: backendOffer.highlights || [],
            sections: backendOffer.sections || [],
            itinerary: [],
            tips: [],
            duration: backendOffer.transferDetails?.duration || backendOffer.duration || '',
          },
          transferDetails: {
            from: backendOffer.transferDetails?.from_location || backendOffer.from_location || '',
            to: backendOffer.transferDetails?.to_location || backendOffer.to_location || '',
            duration: backendOffer.transferDetails?.duration || backendOffer.duration || '',
            distance: backendOffer.transferDetails?.distance || backendOffer.distance || '',
            vehicleOptions: vehicleOptions ? (Array.isArray(vehicleOptions) ? vehicleOptions : JSON.parse(vehicleOptions)) : [],
          },
          includedItems: backendOffer.included_items || [],
          excludedItems: backendOffer.excluded_items || [],
        }
        
        setOffer(transformedOffer)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Failed to load transfer')
        console.error('Error fetching transfer:', err)
        // Redirect back if transfer not found
        setTimeout(() => {
          router.push("/admin/transfers")
        }, 2000)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOffer()
  }, [id, isNew, router])

  // Update mode when URL changes
  useEffect(() => {
    if (!isNew) {
      setMode(modeParam === "edit" ? "edit" : "view")
    }
  }, [modeParam, isNew])

  const handleModeChange = (newMode: "view" | "edit" | "add") => {
    setMode(newMode)
    if (newMode === "edit") {
      router.push(`/admin/transfers/${id}?mode=edit`)
    } else if (newMode === "view") {
      router.push(`/admin/transfers/${id}?mode=view`)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/10 rounded-sm m-6">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <p className="text-sm font-medium text-destructive mb-2">Error loading transfer</p>
          <p className="text-xs text-destructive/80">{error}</p>
          <p className="text-xs text-muted-foreground mt-4">Redirecting back...</p>
        </CardContent>
      </Card>
    )
  }

  if (!isNew && !offer) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <OfferForm
      mode={mode}
      offerType="transfers"
      offer={offer}
      onModeChange={handleModeChange}
      backUrl="/admin/transfers"
    />
  )
}

export default function TransfersDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <TransfersDetailContent />
    </Suspense>
  )
}
