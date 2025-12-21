"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Compass, Plus, Search, Eye, Pencil, Trash2, MapPin, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { offersApi, ApiError } from "@/lib/api"

interface Excursion {
  id: string
  type: string
  depart_city: string
  main_image?: string
  title?: string
  priceAdult?: number
  priceChild?: number
  excursionDetails?: {
    duration?: string
    difficulty?: string
  }
}

export default function AdminExcursionsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [excursions, setExcursions] = useState<Excursion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExcursions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await offersApi.getOffers('EXCURSIONS', 'en')
        
        // Transform backend data to match frontend format
        const transformedExcursions = response.offers.map((offer: any) => ({
          id: offer.id,
          type: offer.type,
          depart_city: offer.depart_city,
          main_image: offer.main_image || '/placeholder.jpg',
          title: offer.title || 'Untitled Excursion',
          priceAdult: offer.price_adult ? parseFloat(offer.price_adult) : undefined,
          priceChild: offer.price_child ? parseFloat(offer.price_child) : undefined,
          excursionDetails: offer.excursionDetails,
        }))
        
        setExcursions(transformedExcursions)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Failed to load excursions')
        console.error('Error fetching excursions:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExcursions()
  }, [])

  const filteredOffers = useMemo(() => {
    if (!searchQuery.trim()) return excursions
    return excursions.filter(
      (offer) =>
        (offer.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        offer.depart_city.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, excursions])

  const handleCreate = () => {
    router.push("/admin/excursions/new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/excursions/${id}?mode=view`)
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/excursions/${id}?mode=edit`)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this excursion?")) {
      try {
        // TODO: Implement delete API endpoint
        // await offersApi.deleteOffer(id)
        setExcursions(excursions.filter(excursion => excursion.id !== id))
        alert(`Excursion deleted successfully`)
      } catch (err) {
        const apiError = err as ApiError
        alert(apiError.message || 'Failed to delete excursion')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Excursions</h1>
          <p className="text-sm text-muted-foreground">
            Manage your excursions. {isLoading ? 'Loading...' : `${excursions.length} total excursions.`}
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 rounded-sm">
          <Plus className="h-4 w-4" />
          Create Excursion
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search excursions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-sm bg-white"
        />
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/10 rounded-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">Error loading excursions</p>
              <p className="text-xs text-destructive/80">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">Loading excursions...</p>
          </CardContent>
        </Card>
      )}

      {/* Offers List */}
      {!isLoading && !error && filteredOffers.length > 0 && (
        <div className="space-y-3">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="flex items-center gap-4 p-3 bg-white border rounded-sm hover:bg-muted/50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded-sm">
                {offer.main_image && offer.main_image.includes('api.marrakeshtravelservices.com') ? (
                  <img
                    src={offer.main_image}
                    alt={offer.title || 'Excursion'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder.jpg'
                    }}
                  />
                ) : (
                  <Image
                    src={offer.main_image || '/placeholder.jpg'}
                    alt={offer.title || 'Excursion'}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder.jpg'
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{offer.title || 'Untitled Excursion'}</h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {offer.depart_city}
                  </div>
                  {offer.priceAdult !== undefined && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{offer.priceAdult} MAD</span>/adult
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-sm"
                  onClick={() => handleView(offer.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-sm"
                  onClick={() => handleEdit(offer.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(offer.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredOffers.length === 0 && (
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Compass className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No excursions found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? "No excursions match your search criteria. Try a different search term."
                : "Your excursions will appear here once you start adding them to your catalog."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
