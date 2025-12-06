"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, MoreHorizontal, Calendar, Download, Eye, Mail, XCircle } from "lucide-react"
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

const bookings = [
  {
    id: "BK001",
    customer: "John Smith",
    email: "john.smith@email.com",
    type: "Tour",
    service: "Sahara Desert 3-Day Adventure",
    date: "2024-12-15",
    time: "06:00",
    guests: 2,
    amount: "$900",
    status: "confirmed",
    payment: "paid",
  },
  {
    id: "BK002",
    customer: "Emma Wilson",
    email: "emma.wilson@email.com",
    type: "Excursion",
    service: "Ouzoud Waterfalls Day Trip",
    date: "2024-12-14",
    time: "08:00",
    guests: 4,
    amount: "$340",
    status: "pending",
    payment: "pending",
  },
  {
    id: "BK003",
    customer: "Michael Brown",
    email: "michael.b@email.com",
    type: "Transfer",
    service: "Airport → Hotel Transfer",
    date: "2024-12-14",
    time: "14:30",
    guests: 3,
    amount: "$45",
    status: "confirmed",
    payment: "paid",
  },
  {
    id: "BK004",
    customer: "Sarah Davis",
    email: "sarah.d@email.com",
    type: "Activity",
    service: "Hot Air Balloon Ride",
    date: "2024-12-16",
    time: "05:30",
    guests: 2,
    amount: "$360",
    status: "canceled",
    payment: "refunded",
  },
  {
    id: "BK005",
    customer: "James Johnson",
    email: "james.j@email.com",
    type: "Tour",
    service: "Marrakech City Tour",
    date: "2024-12-17",
    time: "09:00",
    guests: 5,
    amount: "$600",
    status: "confirmed",
    payment: "paid",
  },
]

const stats = [
  { label: "All", value: 1234, color: "text-foreground" },
  { label: "Confirmed", value: 987, color: "text-emerald-600" },
  { label: "Pending", value: 156, color: "text-amber-600" },
  { label: "Canceled", value: 91, color: "text-red-600" },
]

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-sm text-muted-foreground">Manage all reservations</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/bookings/refunds">
            <Button variant="outline" size="sm">Refunds</Button>
          </Link>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={() => setStatusFilter(stat.label.toLowerCase())}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              statusFilter === stat.label.toLowerCase()
                ? "bg-background shadow-sm"
                : "hover:bg-background/50"
            }`}
          >
            <span className={stat.color}>{stat.value}</span>
            <span className="ml-1.5 text-muted-foreground">{stat.label}</span>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, customer, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="tour">Tours</SelectItem>
            <SelectItem value="excursion">Excursions</SelectItem>
            <SelectItem value="transfer">Transfers</SelectItem>
            <SelectItem value="activity">Activities</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Bookings Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Booking</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Schedule</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium">{booking.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {booking.customer.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{booking.customer}</p>
                          <p className="text-xs text-muted-foreground">{booking.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm">{booking.service}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-xs px-1.5 py-0">{booking.type}</Badge>
                          <span className="text-xs text-muted-foreground">{booking.guests} guests</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{booking.date}</span>
                        <span className="text-muted-foreground">at {booking.time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">{booking.amount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="secondary"
                        className={
                          booking.status === "confirmed" 
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" 
                            : booking.status === "pending"
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                            : "bg-red-50 text-red-700 hover:bg-red-50"
                        }
                      >
                        {booking.status}
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
