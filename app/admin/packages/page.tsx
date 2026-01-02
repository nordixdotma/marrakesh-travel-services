"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Package, Plus, Search, Eye, Pencil, Trash2, MapPin, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { adminApi, ApiError } from "@/lib/api"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface PackageData {
  id: string
  title: string
  depart_city: string
  mainImage?: string
  main_image?: string
  priceAdult?: number
  price_adult?: number
  packageDetails?: {
    duration?: string
    includes?: string[]
  }
}

export default function AdminPackagesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [packageToDelete, setPackageToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getPackages('en')
        setPackages(response.packages || [])
      } catch (err: any) {
        console.error('Error fetching packages:', err)
        setError(err.message || t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.offers?.titles?.packages || 'packages') || 'Failed to load packages')
        toast.error(t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.offers?.titles?.packages || 'packages') || 'Failed to load packages', {
          description: err.message || 'Please try again later',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const filteredOffers = useMemo(() => {
    if (!searchQuery.trim()) return packages
    return packages.filter(
      (pkg) =>
        (pkg.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pkg.depart_city || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, packages])

  const handleCreate = () => {
    router.push("/admin/packages/new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/packages/${id}?mode=view`)
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/packages/${id}?mode=edit`)
  }

  const handleDeleteClick = (id: string) => {
    setPackageToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return

    try {
      setIsDeleting(true)
      await adminApi.deletePackage(packageToDelete)
      setPackages(packages.filter(pkg => pkg.id !== packageToDelete))
      toast.success(t.admin?.common?.deleteSuccess || 'Package deleted successfully')
      setDeleteDialogOpen(false)
      setPackageToDelete(null)
    } catch (err) {
      const apiError = err as ApiError
      toast.error('Failed to delete package', {
        description: apiError.message || 'Please try again later',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
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
            <Package className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">{t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.offers?.titles?.packages || 'packages') || "Error loading packages"}</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-sm">
            {t.admin?.common?.retry || "Retry"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t.admin?.offers?.titles?.packages || "Packages"}</h1>
          <p className="text-sm text-muted-foreground">
            {t.admin?.offers?.total?.replace('{count}', packages.length.toString()).replace('{type}', t.admin?.offers?.titles?.packages || 'packages') || `Manage your packages. ${packages.length} total packages.`}
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 rounded-sm">
          <Plus className="h-4 w-4" />
          {t.admin?.common?.create || "Create"} {t.admin?.offers?.titles?.package || "Package"}
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.admin?.offers?.search?.replace('{type}', t.admin?.offers?.titles?.packages || 'packages') || "Search packages..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-sm bg-white"
        />
      </div>

      {/* Packages List */}
      {filteredOffers.length > 0 ? (
        <div className="space-y-3">
          {filteredOffers.map((pkg) => {
            // Handle image URL - convert to full URL if needed
            let mainImage = pkg.mainImage || pkg.main_image || '/placeholder.jpg'
            if (mainImage && mainImage !== '/placeholder.jpg' && !mainImage.startsWith('http') && !mainImage.startsWith('/')) {
              const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
              const baseUrl = apiBaseUrl.replace('/api/v1', '')
              mainImage = `${baseUrl}/uploads/${mainImage}`
            } else if (mainImage && mainImage.startsWith('/') && !mainImage.startsWith('//') && !mainImage.startsWith('/uploads') && mainImage !== '/placeholder.jpg') {
              const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.marrakeshtravelservices.com/api/v1'
              const baseUrl = apiBaseUrl.replace('/api/v1', '')
              mainImage = `${baseUrl}${mainImage}`
            }
            const title = pkg.title || 'Untitled Package'
            
            return (
              <div
                key={pkg.id}
                className="flex items-center gap-4 p-3 bg-white border rounded-sm hover:bg-muted/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded-sm bg-muted">
                  {mainImage && mainImage !== '/placeholder.jpg' ? (
                    mainImage.includes('api.marrakeshtravelservices.com') || mainImage.startsWith('/uploads') ? (
                      <img
                        src={mainImage}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/placeholder.jpg'
                        }}
                      />
                    ) : (
                      <Image
                        src={mainImage}
                        alt={title}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/placeholder.jpg'
                        }}
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{title || (t.admin?.common?.untitled || 'Untitled')}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {pkg.depart_city || 'N/A'}
                    </div>
                    {pkg.priceAdult || pkg.price_adult ? (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{pkg.priceAdult || pkg.price_adult} €</span>/adult
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-sm"
                    onClick={() => handleView(pkg.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-sm"
                    onClick={() => handleEdit(pkg.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteClick(pkg.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.admin?.offers?.noFound?.replace('{type}', t.admin?.offers?.titles?.packages || 'packages') || "No packages found"}</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? (t.admin?.offers?.noResults?.replace('{type}', t.admin?.offers?.titles?.packages || 'packages') || "No packages match your search criteria. Try a different search term.")
                : (t.admin?.offers?.emptyState?.replace('{type}', t.admin?.offers?.titles?.packages || 'packages') || "Your packages will appear here once you start adding them to your catalog.")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-sm">
          <DialogHeader>
            <DialogTitle>{t.admin?.offers?.deleteTitle?.replace('{type}', t.admin?.pages?.packages || 'Package') || "Delete Package"}</DialogTitle>
            <DialogDescription>
              {t.admin?.offers?.deleteConfirm?.replace('{type}', t.admin?.pages?.packages || 'package') || "Are you sure you want to delete this package? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setPackageToDelete(null)
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
