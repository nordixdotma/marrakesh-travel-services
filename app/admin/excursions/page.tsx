"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Calendar, DollarSign, Clock } from "lucide-react"
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

const excursions = [
  {
    id: 1,
    name: "Ouzoud Waterfalls Day Trip",
    category: "Nature",
    price: 85,
    duration: "Full day",
    status: "active",
    bookings: 89,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Ourika Valley Excursion",
    category: "Nature",
    price: 65,
    duration: "Half day",
    status: "active",
    bookings: 156,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Agafay Desert Sunset",
    category: "Desert",
    price: 120,
    duration: "Half day",
    status: "active",
    bookings: 234,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Berber Villages Tour",
    category: "Cultural",
    price: 95,
    duration: "Full day",
    status: "draft",
    bookings: 67,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1548820979-2c5c3d98cf4e?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Imlil & Toubkal Day Hike",
    category: "Adventure",
    price: 110,
    duration: "Full day",
    status: "active",
    bookings: 123,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
  },
]

const stats = [
  { label: "Total Excursions", value: "18" },
  { label: "Active", value: "14" },
  { label: "This Month", value: "345" },
  { label: "Revenue", value: "$28.5K" },
]

export default function ExcursionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredExcursions = excursions.filter((excursion) =>
    excursion.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Excursions</h1>
          <p className="text-sm text-muted-foreground">Manage day trips and excursions</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/excursions/schedules">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedules
            </Button>
          </Link>
          <Link href="/admin/excursions/prices">
            <Button variant="outline" size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </Button>
          </Link>
          <Link href="/admin/excursions/add">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Excursion
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
            placeholder="Search excursions..."
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
            <SelectItem value="nature">Nature</SelectItem>
            <SelectItem value="desert">Desert</SelectItem>
            <SelectItem value="cultural">Cultural</SelectItem>
            <SelectItem value="adventure">Adventure</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px] h-9">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="half">Half day</SelectItem>
            <SelectItem value="full">Full day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Excursions Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Excursion</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Bookings</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredExcursions.map((excursion) => (
                  <tr key={excursion.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={excursion.image}
                          alt={excursion.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{excursion.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-amber-500 text-xs">★</span>
                            <span className="text-xs text-muted-foreground">{excursion.rating}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">{excursion.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {excursion.duration}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">${excursion.price}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{excursion.bookings}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="secondary"
                        className={
                          excursion.status === "active" 
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {excursion.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
