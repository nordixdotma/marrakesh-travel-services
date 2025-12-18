"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Map, Plus, Search, Eye, Pencil, Trash2, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toursOffers } from "@/lib/offers-data"

export default function AdminToursPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOffers = useMemo(() => {
    if (!searchQuery.trim()) return toursOffers
    return toursOffers.filter(
      (offer) =>
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.departCity.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleCreate = () => {
    router.push("/admin/tours/new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/tours/${id}?mode=view`)
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/tours/${id}?mode=edit`)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this tour?")) {
      // In a real app, this would delete from a backend
      alert(`Deleted tour: ${id}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tours</h1>
          <p className="text-sm text-muted-foreground">
            Manage your tours. {toursOffers.length} total tours.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 rounded-sm">
          <Plus className="h-4 w-4" />
          Create Tour
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-sm bg-white"
        />
      </div>

      {/* Offers List */}
      {filteredOffers.length > 0 ? (
        <div className="space-y-3">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="flex items-center gap-4 p-3 bg-white border rounded-sm hover:bg-muted/50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={offer.mainImage}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{offer.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {offer.departCity}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{offer.priceAdult} MAD</span>/adult
                  </div>
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
      ) : (
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Map className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tours found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? "No tours match your search criteria. Try a different search term."
                : "Your tours will appear here once you start adding them to your catalog."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
