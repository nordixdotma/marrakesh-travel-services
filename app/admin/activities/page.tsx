"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Clock, Tag } from "lucide-react"
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

const activities = [
  {
    id: 1,
    name: "Hot Air Balloon Ride",
    category: "Adventure",
    price: 180,
    duration: "3 hours",
    status: "active",
    bookings: 89,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Quad Biking in Desert",
    category: "Adventure",
    price: 95,
    duration: "2 hours",
    status: "active",
    bookings: 156,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Traditional Cooking Class",
    category: "Cultural",
    price: 75,
    duration: "4 hours",
    status: "active",
    bookings: 234,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Hammam Spa Experience",
    category: "Wellness",
    price: 65,
    duration: "2 hours",
    status: "active",
    bookings: 312,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Camel Ride at Sunset",
    category: "Adventure",
    price: 45,
    duration: "1.5 hours",
    status: "draft",
    bookings: 189,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1452022582947-b521d8779ab6?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Photography Tour",
    category: "Cultural",
    price: 120,
    duration: "4 hours",
    status: "active",
    bookings: 67,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
  },
]

const categories = ["Adventure", "Cultural", "Wellness"]

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || activity.category.toLowerCase() === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalBookings = activities.reduce((sum, a) => sum + a.bookings, 0)
  const activeCount = activities.filter((a) => a.status === "active").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activities</h1>
          <p className="text-sm text-muted-foreground">Manage experiences and activities</p>
        </div>
        <Link href="/admin/activities/add">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{activities.length}</p>
            <p className="text-sm text-muted-foreground">Total Activities</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{activeCount}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{totalBookings}</p>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{categories.length}</p>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Activities Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="border-0 shadow-sm overflow-hidden group">
            <div className="relative h-36">
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <Badge 
                className={`absolute top-3 right-3 ${
                  activity.status === "active" 
                    ? "bg-emerald-500 hover:bg-emerald-500" 
                    : "bg-gray-500 hover:bg-gray-500"
                }`}
              >
                {activity.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{activity.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <Tag className="h-2.5 w-2.5 mr-1" />
                      {activity.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.duration}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
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
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <span className="text-lg font-bold">${activity.price}</span>
                  <span className="text-xs text-muted-foreground ml-1">/ person</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 text-amber-600">
                    ★ {activity.rating}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{activity.bookings} booked</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
