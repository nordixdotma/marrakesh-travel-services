"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import OffersGrid from "@/components/offers-grid"
import SearchFilter, { type Filters } from "@/components/search-filter"
import { type Offer } from "@/lib/offers-data"
import { useLanguage } from "@/components/language-provider"
import { offersApi, type ApiError } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { useSiteSettings } from "@/hooks/use-site-settings"

import { useRouter, usePathname, useSearchParams } from "next/navigation"

function PackagesContent() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const cityParam = searchParams.get('city')
  const { settings } = useSiteSettings()


  const pageType = "packages"
  const [allOffers, setAllOffers] = useState<Offer[]>([])
  const [filters, setFilters] = useState<Filters>({
    category: pageType,
    departureCity: cityParam ?? "all"
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await offersApi.getOffers('PACKAGES', language)
        
        // Transform backend data to match frontend Offer format
        const transformedPackages: Offer[] = (response.offers || []).map((backendOffer: any) => {
          const priceAdult = backendOffer.price_adult ? parseFloat(backendOffer.price_adult) : 0
          const priceChild = backendOffer.price_child ? parseFloat(backendOffer.price_child) : 0
          const availabilityStart = backendOffer.availability_start 
            ? new Date(backendOffer.availability_start).toISOString().split('T')[0] 
            : new Date().toISOString().split('T')[0]
          const availabilityEnd = backendOffer.availability_end 
            ? new Date(backendOffer.availability_end).toISOString().split('T')[0] 
            : new Date().toISOString().split('T')[0]

          // Handle image URL - use main_image from backend or placeholder
          let mainImage = '/placeholder.svg'
          if (backendOffer.main_image) {
            // If it's already a full URL, use it as is
            if (backendOffer.main_image.startsWith('http://') || backendOffer.main_image.startsWith('https://')) {
              mainImage = backendOffer.main_image
            } else if (backendOffer.main_image.startsWith('/')) {
              // If it's a relative path, make it absolute to backend
              const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
              const baseUrl = apiBaseUrl.replace('/api/v1', '')
              mainImage = `${baseUrl}${backendOffer.main_image}`
            } else {
              // If it's just a filename, construct the full path
              const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
              const baseUrl = apiBaseUrl.replace('/api/v1', '')
              mainImage = `${baseUrl}/uploads/${backendOffer.main_image}`
            }
          }

          // Extract thumbnail images if available
          const thumbnailImages = (backendOffer.images || [])
            .filter((img: any) => img.type === 'GALLERY')
            .map((img: any) => {
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
            })
            .filter(Boolean)

          return {
            id: backendOffer.id,
            type: 'packages' as const,
            departCity: backendOffer.depart_city || 'Marrakech',
            title: backendOffer.title || 'Untitled Package',
            description: backendOffer.description || '',
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
            mainImage: mainImage,
            thumbnailImages: thumbnailImages,
            video: backendOffer.video || '',
            includedItems: backendOffer.included_items || backendOffer.packageDetails?.includes || [],
            excludedItems: backendOffer.excluded_items || [],
            priceAdult: priceAdult,
            priceChild: priceChild,
            availabilityDates: {
              startDate: availabilityStart,
              endDate: availabilityEnd,
            },
          }
        })

        setAllOffers(transformedPackages)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Failed to load packages')
        console.error('Error fetching packages:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPackages()
  }, [language])

  const offers = useMemo(() => {
    return allOffers.filter((o) => {
      const categoryToMatch = filters.category && filters.category !== "all" ? filters.category : pageType
      if (o.type !== categoryToMatch) return false

      if (filters.minPrice != null && o.priceAdult < filters.minPrice) return false
      if (filters.maxPrice != null && o.priceAdult > filters.maxPrice) return false

      if (filters.departureCity && filters.departureCity !== "all") {
        if (o.departCity !== filters.departureCity) return false
      }

      if (filters.theme) {
        const hay = (o.title + " " + o.description + " " + o.includedItems.join(" ")).toLowerCase()
        if (!hay.includes(filters.theme.toLowerCase())) return false
      }

      if (filters.availableOn) {
        const d = new Date(filters.availableOn)
        const start = new Date(o.availabilityDates.startDate)
        const end = new Date(o.availabilityDates.endDate)
        if (d < start || d > end) return false
      }

      return true
    })
  }, [allOffers, filters])

  useEffect(() => {
    if (cityParam && filters.departureCity !== cityParam) {
      setFilters(prev => ({ ...prev, departureCity: cityParam }))
    }
  }, [cityParam])

  const handleFilterChange = (newFilters: Filters) => {
    // Update URL with city parameter if changed
    const params = new URLSearchParams(searchParams.toString())
    if (newFilters.departureCity && newFilters.departureCity !== "all") {
      params.set('city', newFilters.departureCity)
    } else {
      params.delete('city')
    }
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.replace(newUrl, { scroll: false })

    setFilters(newFilters)
  }

  if (isLoading) {
    return (
      <main className="w-full">
        <Header />
        <PageHero 
          title={t.pageHero.packages} 
          backgroundImage={settings.hero_packages || "https://images.unsplash.com/photo-1705765280660-cf50ae71d87d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
        />
        <section className="py-6 md:py-12 bg-gray-50">
          <Container className="max-w-6xl px-2 md:px-4">
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </Container>
        </section>
        <Footer />
        <FloatingContact />
      </main>
    )
  }

  if (error) {
    return (
      <main className="w-full">
        <Header />
        <PageHero 
          title={t.pageHero.packages} 
          backgroundImage={settings.hero_packages || "https://images.unsplash.com/photo-1705765280660-cf50ae71d87d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
        />
        <section className="py-6 md:py-12 bg-gray-50">
          <Container className="max-w-6xl px-2 md:px-4">
            <div className="flex items-center justify-center h-64">
              <p className="text-destructive">{error}</p>
            </div>
          </Container>
        </section>
        <Footer />
        <FloatingContact />
      </main>
    )
  }

  return (
    <main className="w-full">
      <Header />
      <PageHero 
        title={t.pageHero.packages} 
        backgroundImage={settings.hero_packages || "https://images.unsplash.com/photo-1705765280660-cf50ae71d87d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
      />


      <section className="py-6 md:py-12 bg-gray-50">
        <Container className="max-w-6xl px-2 md:px-4">
          <SearchFilter 
            onChange={handleFilterChange} 
            initial={{ 
              category: pageType, 
              departureCity: cityParam ?? "all"
            }} 
          />

          <OffersGrid offers={offers} />
        </Container>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PackagesContent />
    </Suspense>
  )
}
