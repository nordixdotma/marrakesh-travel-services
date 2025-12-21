"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Ticket,
  Search,
  Plus,
  Eye,
  Trash2,
  Calendar,
  Loader2,
  Percent,
  DollarSign,
  Package,
  Clock,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/api"
import { toast } from "sonner"

interface PromoCode {
  id: string
  code: string
  discountType: string
  discountValue: number
  minPurchase?: number
  maxDiscount?: number
  validFrom: string
  validTo: string
  usageLimit?: number
  usedCount: number
  isActive: boolean
  createdAt: string
  offers: Array<{
    id: string
    type: string
    title: string
  }>
}

export default function AdminPromoCodesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getPromoCodes()
        setPromoCodes(response.promoCodes || [])
      } catch (err: any) {
        console.error('Error fetching promo codes:', err)
        setError(err.message || 'Failed to load promo codes')
        toast.error('Failed to load promo codes', {
          description: err.message || 'Please try again later',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPromoCodes()
  }, [])

  const filteredPromoCodes = useMemo(() => {
    return promoCodes
      .filter((promo) => {
        if (!searchQuery.trim()) return true
        const query = searchQuery.toLowerCase()
        return (
          promo.code.toLowerCase().includes(query) ||
          promo.offers.some(offer => offer.title.toLowerCase().includes(query)) ||
          promo.id.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [searchQuery, promoCodes])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDiscountDisplay = (promo: PromoCode) => {
    if (promo.discountType === 'percentage') {
      return `${promo.discountValue}%${promo.maxDiscount ? ` (max ${promo.maxDiscount} MAD)` : ''}`
    } else {
      return `${promo.discountValue} MAD`
    }
  }

  const handleCreate = () => {
    router.push("/admin/promo-codes/new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/promo-codes/${id}`)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this promo code?")) {
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
            <Ticket className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">Error loading promo codes</h3>
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
          <h1 className="text-2xl font-bold tracking-tight">Promo Codes</h1>
          <p className="text-sm text-muted-foreground">
            Manage discount codes and promotions. {promoCodes.length} total promo codes.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 rounded-sm">
          <Plus className="h-4 w-4" />
          Create Promo Code
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search promo codes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-sm bg-white"
        />
      </div>

      {/* Promo Codes List */}
      {filteredPromoCodes.length > 0 ? (
        <div className="space-y-3">
          {filteredPromoCodes.map((promo) => (
            <Card key={promo.id} className="hover:bg-muted/30 transition-colors rounded-sm bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left: Promo Code Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold font-mono text-lg">{promo.code}</h3>
                      <Badge variant={promo.isActive ? "default" : "secondary"}>
                        {promo.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {promo.discountType === 'percentage' ? (
                        <Percent className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">{getDiscountDisplay(promo)}</span>
                      {promo.minPurchase && (
                        <span className="text-xs text-muted-foreground">
                          (min {promo.minPurchase} MAD)
                        </span>
                      )}
                    </div>
                    {promo.offers && promo.offers.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Package className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Linked to:</span>
                        {promo.offers.map((offer, idx) => (
                          <Badge key={offer.id} variant="outline" className="text-xs capitalize">
                            {offer.type}: {offer.title}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {promo.offers.length === 0 && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          Applies to all offers
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Middle: Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(promo.validFrom)} - {formatDate(promo.validTo)}</span>
                    </div>
                    {promo.usageLimit && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span>{promo.usedCount}/{promo.usageLimit} used</span>
                      </div>
                    )}
                    {!promo.usageLimit && promo.usedCount > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span>{promo.usedCount} used</span>
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {formatDate(promo.createdAt)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 rounded-sm"
                      onClick={() => handleView(promo.id)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-sm"
                      onClick={() => handleDelete(promo.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Ticket className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No promo codes found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? "No promo codes match your search criteria. Try a different search term."
                : "Your promotional codes and discounts will appear here once you create them."}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreate} className="mt-4 gap-2 rounded-sm">
                <Plus className="h-4 w-4" />
                Create Promo Code
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
