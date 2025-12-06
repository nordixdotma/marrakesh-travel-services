"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const activities = [
  {
    id: 1,
    name: "Hot Air Balloon Ride",
    category: "Adventure",
    price: "$180",
    duration: "3 hours",
    status: "active",
    bookings: 89,
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Quad Biking in Desert",
    category: "Adventure",
    price: "$95",
    duration: "2 hours",
    status: "active",
    bookings: 156,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Traditional Cooking Class",
    category: "Cultural",
    price: "$75",
    duration: "4 hours",
    status: "active",
    bookings: 234,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Hammam Spa Experience",
    category: "Wellness",
    price: "$65",
    duration: "2 hours",
    status: "active",
    bookings: 312,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Camel Ride at Sunset",
    category: "Adventure",
    price: "$45",
    duration: "1.5 hours",
    status: "inactive",
    bookings: 189,
    image: "https://images.unsplash.com/photo-1452022582947-b521d8779ab6?w=100&h=100&fit=crop",
  },
  {
    id: 6,
    name: "Photography Tour",
    category: "Cultural",
    price: "$120",
    duration: "4 hours",
    status: "active",
    bookings: 67,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=100&h=100&fit=crop",
  },
]

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Activities Management</h1>
          <p className="text-muted-foreground">Manage all activities and experiences</p>
        </div>
        <Link href="/admin/activities/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Activity
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activities.length}</div>
            <p className="text-sm text-muted-foreground">Total Activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activities.filter((a) => a.status === "active").length}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activities.reduce((sum, a) => sum + a.bookings, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Categories</p>
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
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activities Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden">
            <div className="relative h-40">
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  activity.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {activity.status}
              </span>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground">{activity.category}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
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
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{activity.price}</span>
                <span className="text-muted-foreground">{activity.duration}</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {activity.bookings} bookings
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
