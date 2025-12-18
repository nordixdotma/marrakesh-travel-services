"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Activity, Plus, Search, Eye, Pencil, Trash2, MapPin, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { activitiesOffers } from "@/lib/offers-data"

export default function AdminActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOffers = useMemo(() => {
    if (!searchQuery.trim()) return activitiesOffers
    return activitiesOffers.filter(
      (offer) =>
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.departCity.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleCreate = () => {
    alert("Create Activity functionality coming soon!")
  }

  const handleView = (id: string) => {
    alert(`View details for activity: ${id}`)
  }

  const handleEdit = (id: string) => {
    alert(`Edit activity: ${id}`)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      alert(`Delete activity: ${id}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activities</h1>
          <p className="text-sm text-muted-foreground">
            Manage your activities. {activitiesOffers.length} total activities.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Activity
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Offers Grid */}
      {filteredOffers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOffers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden group">
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={offer.mainImage}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold line-clamp-2">{offer.title}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {offer.departCity}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <DollarSign className="h-3.5 w-3.5" />
                    {offer.priceAdult}
                    <span className="text-muted-foreground font-normal">/adult</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {offer.description}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => handleView(offer.id)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => handleEdit(offer.id)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(offer.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No activities found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? "No activities match your search criteria. Try a different search term."
                : "Your activities will appear here once you start adding them to your catalog."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
