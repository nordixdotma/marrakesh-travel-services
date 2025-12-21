"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Package, Plus, Search, Eye, Pencil, Trash2, MapPin, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { adminApi } from "@/lib/api"
import { toast } from "sonner"

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
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getPackages('en')
        setPackages(response.packages || [])
      } catch (err: any) {
        console.error('Error fetching packages:', err)
        setError(err.message || 'Failed to load packages')
        toast.error('Failed to load packages', {
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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      // TODO: Implement delete API call
      toast.info('Delete functionality coming soon')
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
          <h3 className="text-lg font-semibold mb-2 text-destructive">Error loading packages</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-sm">
            Retry
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
          <h1 className="text-2xl font-bold tracking-tight">Packages</h1>
          <p className="text-sm text-muted-foreground">
            Manage your packages. {packages.length} total packages.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 rounded-sm">
          <Plus className="h-4 w-4" />
          Create Package
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search packages..."
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
                  <h3 className="font-medium text-sm truncate">{title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {pkg.depart_city || 'N/A'}
                    </div>
                    {pkg.priceAdult || pkg.price_adult ? (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{pkg.priceAdult || pkg.price_adult} MAD</span>/adult
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
                    onClick={() => handleDelete(pkg.id)}
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
            <h3 className="text-lg font-semibold mb-2">No packages found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? "No packages match your search criteria. Try a different search term."
                : "Your packages will appear here once you start adding them to your catalog."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
