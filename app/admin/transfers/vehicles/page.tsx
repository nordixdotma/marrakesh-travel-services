"use client"

import { Plus, Edit, Trash2, Car, Users, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const vehicles = [
  {
    id: 1,
    name: "Standard Sedan",
    brand: "Toyota Corolla or similar",
    capacity: 3,
    luggage: 2,
    features: ["Air Conditioning", "GPS", "USB Charger"],
    status: "available",
    count: 5,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&h=150&fit=crop",
  },
  {
    id: 2,
    name: "Luxury Sedan",
    brand: "Mercedes E-Class or similar",
    capacity: 3,
    luggage: 3,
    features: ["Leather Seats", "Air Conditioning", "WiFi", "Water Bottles"],
    status: "available",
    count: 3,
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=200&h=150&fit=crop",
  },
  {
    id: 3,
    name: "SUV",
    brand: "Toyota Land Cruiser or similar",
    capacity: 6,
    luggage: 4,
    features: ["4x4", "Air Conditioning", "GPS", "First Aid Kit"],
    status: "available",
    count: 4,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&h=150&fit=crop",
  },
  {
    id: 4,
    name: "Minivan",
    brand: "Mercedes Vito or similar",
    capacity: 7,
    luggage: 7,
    features: ["Air Conditioning", "Spacious", "USB Chargers", "Comfortable Seats"],
    status: "available",
    count: 3,
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=200&h=150&fit=crop",
  },
  {
    id: 5,
    name: "Luxury Van",
    brand: "Mercedes V-Class",
    capacity: 6,
    luggage: 6,
    features: ["Leather Seats", "WiFi", "Entertainment System", "Mini Bar"],
    status: "maintenance",
    count: 2,
    image: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=200&h=150&fit=crop",
  },
  {
    id: 6,
    name: "4x4 Desert Vehicle",
    brand: "Toyota Land Cruiser 4x4",
    capacity: 4,
    luggage: 3,
    features: ["Desert Ready", "Air Conditioning", "First Aid Kit", "Cooler Box"],
    status: "available",
    count: 6,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&h=150&fit=crop",
  },
]

export default function VehiclesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Types</h1>
          <p className="text-muted-foreground">Manage your transfer vehicle fleet</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle Type
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-sm text-muted-foreground">Vehicle Types</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{vehicles.reduce((sum, v) => sum + v.count, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Vehicles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{vehicles.filter((v) => v.status === "available").length}</div>
            <p className="text-sm text-muted-foreground">Available Types</p>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden">
            <div className="relative h-40">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className="absolute top-2 right-2"
                variant={vehicle.status === "available" ? "default" : "secondary"}
              >
                {vehicle.status}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{vehicle.name}</CardTitle>
              <CardDescription>{vehicle.brand}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{vehicle.capacity} passengers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{vehicle.luggage} bags</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {vehicle.features.slice(0, 3).map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {vehicle.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{vehicle.features.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {vehicle.count} vehicles in fleet
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
