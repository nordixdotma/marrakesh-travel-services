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

const tours = [
  {
    id: 1,
    name: "Sahara Desert 3-Day Adventure",
    category: "Desert Tours",
    price: "$450",
    duration: "3 days",
    status: "active",
    bookings: 156,
    image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Marrakech City Tour",
    category: "City Tours",
    price: "$120",
    duration: "1 day",
    status: "active",
    bookings: 234,
    image: "https://images.unsplash.com/photo-1597212720158-7c81f1f9be6f?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Atlas Mountains Trek",
    category: "Mountain Tours",
    price: "$280",
    duration: "2 days",
    status: "active",
    bookings: 189,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Essaouira Day Trip",
    category: "Beach Tours",
    price: "$180",
    duration: "1 day",
    status: "inactive",
    bookings: 145,
    image: "https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Fes Cultural Experience",
    category: "Cultural Tours",
    price: "$350",
    duration: "2 days",
    status: "active",
    bookings: 98,
    image: "https://images.unsplash.com/photo-1548820979-2c5c3d98cf4e?w=100&h=100&fit=crop",
  },
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
          <h1 className="text-3xl font-bold">Tours Management</h1>
          <p className="text-muted-foreground">Manage all tours and travel packages</p>
        </div>
        <Link href="/admin/tours/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Tour
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours..."
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

      {/* Tours Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tours ({filteredTours.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tour</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bookings</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTours.map((tour) => (
                  <tr key={tour.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-sm">{tour.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{tour.category}</td>
                    <td className="py-3 px-4 text-sm font-medium">{tour.price}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{tour.duration}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          tour.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{tour.bookings}</td>
                    <td className="py-3 px-4 text-right">
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
