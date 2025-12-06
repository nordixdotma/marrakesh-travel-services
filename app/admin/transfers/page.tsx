"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Car, MapPin, DollarSign, Clock } from "lucide-react"
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

const transfers = [
  {
    id: 1,
    route: "Marrakech Airport → City Center",
    vehicleType: "Standard Sedan",
    price: 35,
    duration: "20 min",
    status: "active",
    bookings: 456,
  },
  {
    id: 2,
    route: "Marrakech → Essaouira",
    vehicleType: "SUV",
    price: 120,
    duration: "2.5 hours",
    status: "active",
    bookings: 234,
  },
  {
    id: 3,
    route: "Marrakech Airport → Hotel (Any)",
    vehicleType: "Minivan",
    price: 45,
    duration: "30 min",
    status: "active",
    bookings: 567,
  },
  {
    id: 4,
    route: "Marrakech → Fes",
    vehicleType: "Luxury Sedan",
    price: 350,
    duration: "5 hours",
    status: "active",
    bookings: 89,
  },
  {
    id: 5,
    route: "Marrakech → Ouarzazate",
    vehicleType: "4x4",
    price: 180,
    duration: "4 hours",
    status: "draft",
    bookings: 123,
  },
]

const quickLinks = [
  { title: "Vehicles", description: "Manage fleet", href: "/admin/transfers/vehicles", icon: Car, color: "bg-blue-50 text-blue-600" },
  { title: "Pricing", description: "Set prices", href: "/admin/transfers/prices", icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
  { title: "Pickup Points", description: "Locations", href: "/admin/transfers/pickup-points", icon: MapPin, color: "bg-violet-50 text-violet-600" },
]

export default function TransfersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransfers = transfers.filter((transfer) =>
    transfer.route.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalBookings = transfers.reduce((sum, t) => sum + t.bookings, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transfers</h1>
          <p className="text-sm text-muted-foreground">Manage transfer routes and services</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Transfer
        </Button>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.title} href={link.href}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${link.color}`}>
                  <link.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{link.title}</p>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{transfers.length}</p>
            <p className="text-sm text-muted-foreground">Total Routes</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{transfers.filter(t => t.status === "active").length}</p>
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
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Vehicle Types</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px] h-9">
            <SelectValue placeholder="Vehicle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vehicles</SelectItem>
            <SelectItem value="sedan">Sedan</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="minivan">Minivan</SelectItem>
            <SelectItem value="4x4">4x4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transfers Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Route</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Vehicle</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Bookings</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Car className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{transfer.route}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">{transfer.vehicleType}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {transfer.duration}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">${transfer.price}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{transfer.bookings}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="secondary"
                        className={
                          transfer.status === "active" 
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {transfer.status}
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
