"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import { OfferForm } from "@/components/admin/offer-form"
import { offersApi, ApiError } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import type { Offer } from "@/lib/offers-data"
import { useLanguage } from "@/components/language-provider"

function PackagesDetailContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
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
        // Fetch offer with all languages for proper translation support
        const response = await offersApi.getOfferByIdWithAllLanguages(id)
        
        // Transform backend data to match frontend Offer format
        const backendOffer = response.offer
        const allTranslations = response.translations
        
        console.log('Backend package:', backendOffer)
        console.log('All translations:', allTranslations)
        console.log('Backend images:', backendOffer.images)
        console.log('Backend main_image:', backendOffer.main_image)
        console.log('Backend pricing:', backendOffer.pricing)
        
        // Extract pricing data
        const priceAdult = backendOffer.pricing?.price_adult || backendOffer.price_adult
        const priceChild = backendOffer.pricing?.price_child || backendOffer.price_child
        const availabilityStart = backendOffer.pricing?.availability_start || backendOffer.availability_start
        const availabilityEnd = backendOffer.pricing?.availability_end || backendOffer.availability_end
        
        // Extract main image from images array or use main_image field
        const mainImageObj = backendOffer.images?.find((img: any) => img.type === 'MAIN')
        let mainImage = mainImageObj?.url || backendOffer.main_image || '/placeholder.jpg'
        
        // Handle image URL - convert to full URL if needed
        if (mainImage && !mainImage.startsWith('http') && !mainImage.startsWith('/')) {
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
          const baseUrl = apiBaseUrl.replace('/api/v1', '')
          mainImage = `${baseUrl}/uploads/${mainImage}`
        } else if (mainImage && mainImage.startsWith('/') && !mainImage.startsWith('//')) {
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
          const baseUrl = apiBaseUrl.replace('/api/v1', '')
          mainImage = `${baseUrl}${mainImage}`
        }
        
        // Extract thumbnail images
        const thumbnailImages = (backendOffer.images?.filter((img: any) => img.type === 'GALLERY').map((img: any) => {
          let url = img.url
          if (url && !url.startsWith('http') && !url.startsWith('/')) {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
            const baseUrl = apiBaseUrl.replace('/api/v1', '')
            url = `${baseUrl}/uploads/${url}`
          } else if (url && url.startsWith('/') && !url.startsWith('//')) {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
            const baseUrl = apiBaseUrl.replace('/api/v1', '')
            url = `${baseUrl}${url}`
          }
          return url
        }) || []).filter(Boolean)
        
        console.log('Extracted mainImage:', mainImage)
        console.log('Extracted thumbnailImages:', thumbnailImages)
        
        // Helper function to create translation object from backend data
        const createTranslation = (langOffer: any) => ({
          title: langOffer?.title || '',
          description: langOffer?.description || '',
          detailedDescription: {
            overview: langOffer?.overview || '',
            highlights: langOffer?.highlights || [],
            sections: langOffer?.sections || [],
            itinerary: [],
            tips: [],
            duration: langOffer?.packageDetails?.duration || '',
            difficulty: '',
            groupSize: '',
          },
          includedItems: langOffer?.included_items || langOffer?.packageDetails?.includes || [],
          excludedItems: langOffer?.excluded_items || [],
        })
        
        const transformedOffer: Offer = {
          id: backendOffer.id,
          type: 'packages',
          title: backendOffer.title || t.admin?.offers?.noFound?.replace('{type}', t.admin?.pages?.packages || 'Package'),
          description: backendOffer.description || '',
          departCity: backendOffer.depart_city || 'Marrakech',
          priceAdult: priceAdult ? parseFloat(priceAdult) : 0,
          priceChild: priceChild ? parseFloat(priceChild) : 0,
          mainImage: mainImage,
          thumbnailImages: thumbnailImages,
          video: backendOffer.video || '',
          availabilityDates: {
            startDate: availabilityStart ? new Date(availabilityStart).toISOString().split('T')[0] : '',
            endDate: availabilityEnd ? new Date(availabilityEnd).toISOString().split('T')[0] : '',
          },
          detailedDescription: {
            overview: backendOffer.overview || '',
            highlights: backendOffer.highlights || [],
            sections: backendOffer.sections || [],
            itinerary: [],
            tips: [],
            duration: backendOffer.packageDetails?.duration || '',
            difficulty: '',
            groupSize: '',
          },
          includedItems: backendOffer.included_items || backendOffer.packageDetails?.includes || [],
          excludedItems: backendOffer.excluded_items || [],
          // Include translations for all languages
          translations: {
            en: createTranslation(allTranslations.en),
            fr: createTranslation(allTranslations.fr),
            es: createTranslation(allTranslations.es),
          },
        }
        
        console.log('Transformed package:', transformedOffer)
        console.log('Main image:', mainImage)
        console.log('Thumbnail images:', thumbnailImages)
        
        setOffer(transformedOffer)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.pages?.packages || 'Package') || 'Failed to load package')
        console.error('Error fetching package:', err)
        // Redirect back if package not found
        setTimeout(() => {
          router.push("/admin/packages")
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
      router.push(`/admin/packages/${id}?mode=edit`)
    } else if (newMode === "view") {
      router.push(`/admin/packages/${id}?mode=view`)
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
      <Card className="border-destructive/50 bg-destructive/10 rounded-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <Loader2 className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">{t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.pages?.packages || 'Package') || "Error loading package"}</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <button
            onClick={() => router.push("/admin/packages")}
            className="text-sm text-primary hover:underline"
          >
            {t.admin?.offerForm?.backToList?.replace('{type}', t.admin?.pages?.packages || 'Packages') || "Back to Packages"}
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <OfferForm
      mode={mode}
      offerType="packages"
      offer={offer}
      onModeChange={handleModeChange}
      backUrl="/admin/packages"
    />
  )
}

export default function PackagesDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <PackagesDetailContent />
    </Suspense>
  )
}
