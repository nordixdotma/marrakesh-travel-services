"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pickupPoints = [
  {
    id: 1,
    name: "Marrakech Menara Airport",
    type: "Airport",
    address: "Route de Casablanca, Marrakech",
    coordinates: "31.6069, -8.0363",
    status: "active",
    bookings: 1234,
  },
  {
    id: 2,
    name: "Jemaa el-Fnaa Square",
    type: "Landmark",
    address: "Place Jemaa el-Fna, Medina, Marrakech",
    coordinates: "31.6260, -7.9890",
    status: "active",
    bookings: 567,
  },
  {
    id: 3,
    name: "Marrakech Train Station",
    type: "Station",
    address: "Avenue Hassan II, Guéliz, Marrakech",
    coordinates: "31.6372, -8.0112",
    status: "active",
    bookings: 345,
  },
  {
    id: 4,
    name: "La Mamounia Hotel",
    type: "Hotel",
    address: "Avenue Bab Jdid, Marrakech",
    coordinates: "31.6177, -7.9971",
    status: "active",
    bookings: 234,
  },
  {
    id: 5,
    name: "Royal Mansour",
    type: "Hotel",
    address: "Rue Abou Abbas El Sebti, Marrakech",
    coordinates: "31.6228, -7.9893",
    status: "active",
    bookings: 189,
  },
  {
    id: 6,
    name: "Marrakech Bus Station",
    type: "Station",
    address: "Bab Doukkala, Marrakech",
    coordinates: "31.6345, -7.9978",
    status: "inactive",
    bookings: 78,
  },
]

const types = ["All", "Airport", "Hotel", "Station", "Landmark"]

export default function PickupPointsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")

  const filteredPoints = pickupPoints.filter((point) => {
    const matchesSearch = point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All" || point.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pickup Points</h1>
          <p className="text-muted-foreground">Manage transfer pickup and drop-off locations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Pickup Point
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{pickupPoints.length}</div>
            <p className="text-sm text-muted-foreground">Total Locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{pickupPoints.filter((p) => p.type === "Airport").length}</div>
            <p className="text-sm text-muted-foreground">Airports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{pickupPoints.filter((p) => p.type === "Hotel").length}</div>
            <p className="text-sm text-muted-foreground">Hotels</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{pickupPoints.filter((p) => p.status === "active").length}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pickup Points Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPoints.map((point) => (
          <Card key={point.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{point.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">{point.type}</Badge>
                  </div>
                </div>
                <Badge variant={point.status === "active" ? "default" : "secondary"}>
                  {point.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">{point.address}</p>
                <p className="text-xs text-muted-foreground mt-1">📍 {point.coordinates}</p>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {point.bookings} pickups
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
