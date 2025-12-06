"use client"

import { Search, CheckCircle, XCircle, Clock, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pendingBookings = [
  {
    id: "BK002",
    customer: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 234 567 8901",
    service: "Ouzoud Waterfalls Day Trip",
    type: "Excursion",
    date: "2024-12-14",
    time: "08:00",
    guests: 4,
    amount: "$340",
    createdAt: "2024-12-10 14:30",
    notes: "Requested vegetarian lunch option",
  },
  {
    id: "BK006",
    customer: "Robert Chen",
    email: "robert.chen@email.com",
    phone: "+1 987 654 3210",
    service: "Sahara Desert 3-Day Adventure",
    type: "Tour",
    date: "2024-12-20",
    time: "06:00",
    guests: 2,
    amount: "$900",
    createdAt: "2024-12-10 16:45",
    notes: "",
  },
  {
    id: "BK007",
    customer: "Lisa Martinez",
    email: "lisa.m@email.com",
    phone: "+34 612 345 678",
    service: "Airport Transfer",
    type: "Transfer",
    date: "2024-12-15",
    time: "11:30",
    guests: 3,
    amount: "$45",
    createdAt: "2024-12-11 09:15",
    notes: "Flight AA123 arriving at 11:00",
  },
]

export default function PendingBookingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Pending Bookings</h1>
        <p className="text-muted-foreground">Review and confirm pending reservations</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{pendingBookings.length}</div>
              <p className="text-sm text-muted-foreground">Awaiting Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Due Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">$1,285</span>
            </div>
            <div>
              <div className="text-2xl font-bold">Total Value</div>
              <p className="text-sm text-muted-foreground">Pending amount</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search pending bookings..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Pending Bookings List */}
      <div className="space-y-4">
        {pendingBookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono font-bold">{booking.id}</span>
                    <Badge variant="outline">{booking.type}</Badge>
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                  <CardTitle>{booking.service}</CardTitle>
                  <CardDescription>Created: {booking.createdAt}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{booking.amount}</div>
                  <p className="text-sm text-muted-foreground">{booking.guests} guests</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Customer Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Customer Details</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.customer}</p>
                      <p className="text-sm text-muted-foreground">{booking.email}</p>
                      <p className="text-sm text-muted-foreground">{booking.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Booking Details</h4>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  {booking.notes && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm"><strong>Notes:</strong> {booking.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border">
                <Button variant="outline" className="text-destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
