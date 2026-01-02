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

function ToursDetailContent() {
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
        
        console.log('Backend offer:', backendOffer)
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
        const mainImage = mainImageObj?.url || backendOffer.main_image || '/placeholder.jpg'
        
        // Extract thumbnail images
        const thumbnailImages = backendOffer.images?.filter((img: any) => img.type === 'GALLERY').map((img: any) => img.url) || []
        
        console.log('Extracted mainImage:', mainImage)
        console.log('Extracted thumbnailImages:', thumbnailImages)
        
        // Helper function to parse sections and extract itinerary and tips
        const parseSections = (sections: any[]): { sections: any[], itinerary: any[], tips: string[] } => {
          if (!Array.isArray(sections)) return { sections: [], itinerary: [], tips: [] }
          
          const regularSections: any[] = []
          const itinerary: any[] = []
          const tips: string[] = []
          
          sections.forEach((section: any) => {
            if (section.type === 'itinerary') {
              itinerary.push({ time: section.time || '', activity: section.activity || '' })
            } else if (section.type === 'tips') {
              if (Array.isArray(section.items)) {
                tips.push(...section.items)
              } else if (typeof section === 'string') {
                tips.push(section)
              }
            } else {
              // Regular section
              regularSections.push({
                title: section.title || (section.type === 'section' ? section.title : ''),
                content: section.content || ''
              })
            }
          })
          
          return { sections: regularSections, itinerary, tips }
        }

        // Helper function to create translation object from backend data
        const createTranslation = (langOffer: any) => {
          const parsed = parseSections(langOffer?.sections || [])
          return {
            title: langOffer?.title || '',
            description: langOffer?.description || '',
            detailedDescription: {
              overview: langOffer?.overview || '',
              highlights: langOffer?.highlights || [],
              sections: parsed.sections,
              itinerary: parsed.itinerary,
              tips: parsed.tips,
              duration: langOffer?.tourDetails?.duration || '',
              difficulty: langOffer?.tourDetails?.difficulty || '',
              groupSize: langOffer?.tourDetails?.group_size || '',
            },
            includedItems: langOffer?.included_items || [],
            excludedItems: langOffer?.excluded_items || [],
          }
        }
        
        const transformedOffer: Offer = {
          id: backendOffer.id,
          type: 'tours',
          title: backendOffer.title || t.admin?.offers?.noFound?.replace('{type}', t.admin?.pages?.tours || 'Tour'),
          description: backendOffer.description || '',
          departCity: backendOffer.depart_city,
          priceAdult: priceAdult ? parseFloat(priceAdult) : 0,
          priceChild: priceChild ? parseFloat(priceChild) : 0,
          mainImage: mainImage,
          thumbnailImages: thumbnailImages,
          video: backendOffer.video || '',
          availabilityDates: {
            startDate: availabilityStart ? new Date(availabilityStart).toISOString().split('T')[0] : '',
            endDate: availabilityEnd ? new Date(availabilityEnd).toISOString().split('T')[0] : '',
          },
          detailedDescription: (() => {
            const parsed = parseSections(backendOffer.sections || [])
            return {
              overview: backendOffer.overview || '',
              highlights: backendOffer.highlights || [],
              sections: parsed.sections,
              itinerary: parsed.itinerary,
              tips: parsed.tips,
              duration: backendOffer.tourDetails?.duration || '',
              difficulty: backendOffer.tourDetails?.difficulty || '',
              groupSize: backendOffer.tourDetails?.group_size || '',
            }
          })(),
          includedItems: backendOffer.included_items || [],
          excludedItems: backendOffer.excluded_items || [],
          // Include translations for all languages
          translations: {
            en: createTranslation(allTranslations.en),
            fr: createTranslation(allTranslations.fr),
            es: createTranslation(allTranslations.es),
          },
        }
        
        console.log('Transformed offer:', transformedOffer)
        console.log('Main image:', mainImage)
        console.log('Thumbnail images:', thumbnailImages)
        
        setOffer(transformedOffer)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.pages?.tours || 'Tour') || 'Failed to load tour')
        console.error('Error fetching tour:', err)
        // Redirect back if tour not found
        setTimeout(() => {
          router.push("/admin/tours")
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
      router.push(`/admin/tours/${id}?mode=edit`)
    } else if (newMode === "view") {
      router.push(`/admin/tours/${id}?mode=view`)
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
          <p className="text-sm font-medium text-destructive mb-2">{t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.pages?.tours || 'Tour') || "Error loading tour"}</p>
          <p className="text-xs text-destructive/80">{error}</p>
          <p className="text-xs text-muted-foreground mt-4">{t.admin?.common?.loading || "Redirecting back..."}</p>
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
      offerType="tours"
      offer={offer}
      onModeChange={handleModeChange}
      backUrl="/admin/tours"
    />
  )
}

export default function ToursDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <ToursDetailContent />
    </Suspense>
  )
}
