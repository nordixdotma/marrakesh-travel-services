"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Edit, Trash2, Eye, MoreHorizontal, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const transfers = [
  {
    id: 1,
    route: "Marrakech Airport → City Center",
    vehicleType: "Standard Sedan",
    price: "$35",
    duration: "20 min",
    status: "active",
    bookings: 456,
  },
  {
    id: 2,
    route: "Marrakech → Essaouira",
    vehicleType: "SUV",
    price: "$120",
    duration: "2.5 hours",
    status: "active",
    bookings: 234,
  },
  {
    id: 3,
    route: "Marrakech Airport → Hotel (Any)",
    vehicleType: "Minivan",
    price: "$45",
    duration: "30 min",
    status: "active",
    bookings: 567,
  },
  {
    id: 4,
    route: "Marrakech → Fes",
    vehicleType: "Luxury Sedan",
    price: "$350",
    duration: "5 hours",
    status: "active",
    bookings: 89,
  },
  {
    id: 5,
    route: "Marrakech → Ouarzazate",
    vehicleType: "4x4",
    price: "$180",
    duration: "4 hours",
    status: "inactive",
    bookings: 123,
  },
]

export default function TransfersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransfers = transfers.filter((transfer) =>
    transfer.route.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transfers Management</h1>
          <p className="text-muted-foreground">Manage all transfer routes and services</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Transfer
        </Button>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/transfers/vehicles">
          <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Vehicle Types</div>
                <p className="text-sm text-muted-foreground">Manage fleet</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/transfers/prices">
          <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">$</span>
              </div>
              <div>
                <div className="font-medium">Pricing</div>
                <p className="text-sm text-muted-foreground">Set prices</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/transfers/pickup-points">
          <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">📍</span>
              </div>
              <div>
                <div className="font-medium">Pickup Points</div>
                <p className="text-sm text-muted-foreground">Locations</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-600 font-bold">{transfers.reduce((sum, t) => sum + t.bookings, 0)}</span>
            </div>
            <div>
              <div className="font-medium">Total Bookings</div>
              <p className="text-sm text-muted-foreground">All time</p>
            </div>
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
                placeholder="Search transfers..."
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

      {/* Transfers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transfer Routes ({filteredTransfers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Route</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vehicle Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bookings</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Car className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{transfer.route}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{transfer.vehicleType}</td>
                    <td className="py-3 px-4 text-sm font-medium">{transfer.price}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{transfer.duration}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          transfer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {transfer.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{transfer.bookings}</td>
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
