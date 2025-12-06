"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const tours = [
  {
    id: 1,
    name: "Sahara Desert 3-Day Adventure",
    category: "Desert",
    price: 450,
    duration: "3 days",
    status: "active",
    bookings: 156,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Marrakech City Tour",
    category: "City",
    price: 120,
    duration: "1 day",
    status: "active",
    bookings: 234,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1597212720158-7c81f1f9be6f?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Atlas Mountains Trek",
    category: "Mountain",
    price: 280,
    duration: "2 days",
    status: "active",
    bookings: 189,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Essaouira Day Trip",
    category: "Beach",
    price: 180,
    duration: "1 day",
    status: "draft",
    bookings: 145,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Fes Cultural Experience",
    category: "Cultural",
    price: 350,
    duration: "2 days",
    status: "active",
    bookings: 98,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1548820979-2c5c3d98cf4e?w=400&h=300&fit=crop",
  },
]

const stats = [
  { label: "Total Tours", value: "24" },
  { label: "Active", value: "18" },
  { label: "This Month", value: "567" },
  { label: "Revenue", value: "$45.2K" },
]

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tours</h1>
          <p className="text-sm text-muted-foreground">Manage multi-day tours and packages</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/tours/schedules">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedules
            </Button>
          </Link>
          <Link href="/admin/tours/prices">
            <Button variant="outline" size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </Button>
          </Link>
          <Link href="/admin/tours/add">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Tour
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="desert">Desert</SelectItem>
            <SelectItem value="city">City</SelectItem>
            <SelectItem value="mountain">Mountain</SelectItem>
            <SelectItem value="beach">Beach</SelectItem>
            <SelectItem value="cultural">Cultural</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tours Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTours.map((tour) => (
          <Card key={tour.id} className="border-0 shadow-sm overflow-hidden group">
            <div className="relative h-40">
              <img
                src={tour.image}
                alt={tour.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <Badge 
                className={`absolute top-3 right-3 ${
                  tour.status === "active" 
                    ? "bg-emerald-500 hover:bg-emerald-500" 
                    : "bg-gray-500 hover:bg-gray-500"
                }`}
              >
                {tour.status}
              </Badge>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-semibold text-white truncate">{tour.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                    {tour.category}
                  </Badge>
                  <span className="text-white/80 text-xs">{tour.duration}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">${tour.price}</p>
                  <p className="text-xs text-muted-foreground">{tour.bookings} bookings</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                    <span className="text-sm">★</span>
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
