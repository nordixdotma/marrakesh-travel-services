"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Activity, Plus, Search, Eye, Pencil, Trash2, MapPin, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { offersApi, adminApi, ApiError } from "@/lib/api"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface ActivityItem {
  id: string
  type: string
  depart_city: string
  main_image?: string
  title?: string
  priceAdult?: number
  priceChild?: number
  activityDetails?: {
    duration?: string
    group_size?: string
  }
}

export default function AdminActivitiesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await offersApi.getOffers('ACTIVITIES', 'en')
        
        // Transform backend data to match frontend format
        const transformedActivities = response.offers.map((offer: any) => {
          // Extract main image from images array or use main_image field
          const mainImageObj = offer.images?.find((img: any) => img.type === 'MAIN')
          const mainImage = mainImageObj?.url || offer.main_image || '/placeholder.jpg'
          
          return {
            id: offer.id,
            type: offer.type,
            depart_city: offer.depart_city,
            main_image: mainImage,
            title: offer.title || 'Untitled Activity',
            priceAdult: offer.price_adult ? parseFloat(offer.price_adult) : undefined,
            priceChild: offer.price_child ? parseFloat(offer.price_child) : undefined,
            activityDetails: offer.activityDetails,
          }
        })
        
        setActivities(transformedActivities)
      } catch (err) {
        const apiError = err as any
        setError(apiError.message || t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.offers?.titles?.activities || 'activities') || 'Failed to load activities')
        console.error('Error fetching activities:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const filteredOffers = useMemo(() => {
    if (!searchQuery.trim()) return activities
    return activities.filter(
      (offer) =>
        (offer.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        offer.depart_city.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, activities])

  const handleCreate = () => {
    router.push("/admin/activities/new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/activities/${id}?mode=view`)
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/activities/${id}?mode=edit`)
  }

  const handleDeleteClick = (id: string) => {
    setActivityToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!activityToDelete) return

    try {
      setIsDeleting(true)
      await adminApi.deleteActivity(activityToDelete)
      setActivities(activities.filter(activity => activity.id !== activityToDelete))
      toast.success(t.admin?.common?.deleteSuccess || 'Activity deleted successfully')
      setDeleteDialogOpen(false)
      setActivityToDelete(null)
    } catch (err) {
      const apiError = err as ApiError
      toast.error('Failed to delete activity', {
        description: apiError.message || 'Please try again later',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t.admin?.offers?.titles?.activities || "Activities"}</h1>
          <p className="text-sm text-muted-foreground">
            {t.admin?.offers?.total?.replace('{count}', activities.length.toString()).replace('{type}', t.admin?.offers?.titles?.activities || 'activities') || `Manage your activities. ${isLoading ? 'Loading...' : `${activities.length} total activities.`}`}
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 rounded-sm">
          <Plus className="h-4 w-4" />
          Create Activity
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.admin?.offers?.search?.replace('{type}', t.admin?.offers?.titles?.activities || 'activities') || "Search activities..."}
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
              <p className="text-sm font-medium text-destructive">{t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.offers?.titles?.activities || 'activities') || "Error loading activities"}</p>
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
            <p className="text-sm text-muted-foreground">{t.admin?.offers?.loading?.replace('{type}', t.admin?.offers?.titles?.activities || 'activities') || "Loading activities..."}</p>
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
                    alt={offer.title || 'Activity'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder.jpg'
                    }}
                  />
                ) : (
                  <Image
                    src={offer.main_image || '/placeholder.jpg'}
                    alt={offer.title || 'Activity'}
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
                <h3 className="font-medium text-sm truncate">{offer.title || (t.admin?.common?.untitled || 'Untitled')}</h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {offer.depart_city}
                  </div>
                  {offer.priceAdult !== undefined && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{offer.priceAdult} €</span>/adult
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
                  onClick={() => handleDeleteClick(offer.id)}
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
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.admin?.offers?.noFound?.replace('{type}', t.admin?.offers?.titles?.activities || 'activities') || "No activities found"}</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? (t.admin?.offers?.noResults?.replace('{type}', t.admin?.offers?.titles?.activities || 'activities') || "No activities match your search criteria. Try a different search term.")
                : (t.admin?.offers?.emptyState?.replace('{type}', t.admin?.offers?.titles?.activities || 'activities') || "Your activities will appear here once you start adding them to your catalog.")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-sm">
          <DialogHeader>
            <DialogTitle>{t.admin?.offers?.deleteTitle?.replace('{type}', t.admin?.pages?.activities || 'Activity') || "Delete Activity"}</DialogTitle>
            <DialogDescription>
              {t.admin?.offers?.deleteConfirm?.replace('{type}', t.admin?.pages?.activities || 'activity') || "Are you sure you want to delete this activity? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setActivityToDelete(null)
              }}
              disabled={isDeleting}
              className="rounded-sm"
            >
              {t.admin?.common?.cancel || "Cancel"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="rounded-sm"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t.admin?.common?.deleting || "Deleting..."}
                </>
              ) : (
                t.admin?.common?.delete || 'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
