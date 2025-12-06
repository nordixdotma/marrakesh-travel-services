"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Eye, MoreHorizontal, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

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
    paymentStatus: "paid",
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
    paymentStatus: "pending",
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
    paymentStatus: "paid",
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
    paymentStatus: "refunded",
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
    paymentStatus: "paid",
  },
]

const stats = [
  { label: "Total Bookings", value: "1,234", change: "+12%" },
  { label: "Confirmed", value: "987", change: "+8%" },
  { label: "Pending", value: "156", change: "-5%" },
  { label: "Canceled", value: "91", change: "-2%" },
]

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage all reservations and bookings</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/bookings/pending">
            <Button variant="outline">Pending ({stats[2].value})</Button>
          </Link>
          <Link href="/admin/bookings/refunds">
            <Button variant="outline">Refunds</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, customer, or service..."
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

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Booking ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium">{booking.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{booking.customer}</p>
                          <p className="text-xs text-muted-foreground">{booking.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <Badge variant="outline" className="mb-1">{booking.type}</Badge>
                        <p className="text-sm">{booking.service}</p>
                        <p className="text-xs text-muted-foreground">{booking.guests} guests</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {booking.time}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-sm">{booking.amount}</td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`block w-fit ${
                            booking.paymentStatus === "paid"
                              ? "text-green-600"
                              : booking.paymentStatus === "refunded"
                              ? "text-blue-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </td>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
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
        </CardContent>
      </Card>
    </div>
  )
}
