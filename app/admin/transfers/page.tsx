"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Car, Plus, Search, Eye, Pencil, Trash2, MapPin, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { adminApi, ApiError } from "@/lib/api"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface Transfer {
  id: string
  title: string
  depart_city: string
  mainImage?: string
  main_image?: string
  transferDetails?: {
    from_location: string
    to_location: string
    duration?: string
    distance?: string
    vehicle_options?: any
  }
  priceAdult?: number
  price_adult?: number
}

export default function AdminTransfersPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transferToDelete, setTransferToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getTransfers('en')
        setTransfers(response.transfers || [])
      } catch (err: any) {
        console.error('Error fetching transfers:', err)
        setError(err.message || t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.offers?.titles?.transfers || 'transfers') || 'Failed to load transfers')
        toast.error(t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.offers?.titles?.transfers || 'transfers') || 'Failed to load transfers', {
          description: err.message || 'Please try again later',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTransfers()
  }, [])

  const filteredOffers = useMemo(() => {
    if (!searchQuery.trim()) return transfers
    return transfers.filter(
      (transfer) =>
        (transfer.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transfer.depart_city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transfer.transferDetails?.from_location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transfer.transferDetails?.to_location || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, transfers])

  const handleCreate = () => {
    router.push("/admin/transfers/new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/transfers/${id}?mode=view`)
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/transfers/${id}?mode=edit`)
  }

  const handleDeleteClick = (id: string) => {
    setTransferToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!transferToDelete) return

    try {
      setIsDeleting(true)
      await adminApi.deleteTransfer(transferToDelete)
      setTransfers(transfers.filter(transfer => transfer.id !== transferToDelete))
      toast.success(t.admin?.common?.deleteSuccess || 'Transfer deleted successfully')
      setDeleteDialogOpen(false)
      setTransferToDelete(null)
    } catch (err) {
      const apiError = err as ApiError
      toast.error('Failed to delete transfer', {
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
            <Car className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">{t.admin?.offers?.errorLoading?.replace('{type}', t.admin?.offers?.titles?.transfers || 'transfers') || "Error loading transfers"}</h3>
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
          <h1 className="text-2xl font-bold tracking-tight">{t.admin?.offers?.titles?.transfers || "Transfers"}</h1>
          <p className="text-sm text-muted-foreground">
            {t.admin?.offers?.total?.replace('{count}', transfers.length.toString()).replace('{type}', t.admin?.offers?.titles?.transfers || 'transfers') || `Manage your transfers. ${transfers.length} total transfers.`}
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 rounded-sm">
          <Plus className="h-4 w-4" />
          Create Transfer
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.admin?.offers?.search?.replace('{type}', t.admin?.offers?.titles?.transfers || 'transfers') || "Search transfers..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-sm bg-white"
        />
      </div>

      {/* Transfers List */}
      {filteredOffers.length > 0 ? (
        <div className="space-y-3">
          {filteredOffers.map((transfer) => {
            const mainImage = transfer.mainImage || transfer.main_image || '/placeholder.jpg'
            const title = transfer.title || 'Untitled Transfer'
            const fromLocation = transfer.transferDetails?.from_location || ''
            const toLocation = transfer.transferDetails?.to_location || ''
            const route = fromLocation && toLocation ? `${fromLocation} → ${toLocation}` : transfer.depart_city || ''
            
            return (
              <div
                key={transfer.id}
                className="flex items-center gap-4 p-3 bg-white border rounded-sm hover:bg-muted/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded-sm bg-muted">
                  {mainImage && mainImage !== '/placeholder.jpg' ? (
                    <Image
                      src={mainImage}
                      alt={title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.jpg'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{title || (t.admin?.common?.untitled || 'Untitled')}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {route || transfer.depart_city || 'N/A'}
                    </div>
                    {transfer.priceAdult || transfer.price_adult ? (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{transfer.priceAdult || transfer.price_adult} MAD</span>/adult
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
                    onClick={() => handleView(transfer.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-sm"
                    onClick={() => handleEdit(transfer.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteClick(transfer.id)}
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
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.admin?.offers?.noFound?.replace('{type}', t.admin?.offers?.titles?.transfers || 'transfers') || "No transfers found"}</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? (t.admin?.offers?.noResults?.replace('{type}', t.admin?.offers?.titles?.transfers || 'transfers') || "No transfers match your search criteria. Try a different search term.")
                : (t.admin?.offers?.emptyState?.replace('{type}', t.admin?.offers?.titles?.transfers || 'transfers') || "Your transfers will appear here once you start adding them to your catalog.")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-sm">
          <DialogHeader>
            <DialogTitle>{t.admin?.offers?.deleteTitle?.replace('{type}', t.admin?.pages?.transfers || 'Transfer') || "Delete Transfer"}</DialogTitle>
            <DialogDescription>
              {t.admin?.offers?.deleteConfirm?.replace('{type}', t.admin?.pages?.transfers || 'transfer') || "Are you sure you want to delete this transfer? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setTransferToDelete(null)
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
