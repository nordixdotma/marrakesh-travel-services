"use client"

import { Search, Calendar, User, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const confirmedBookings = [
  {
    id: "BK001",
    customer: "John Smith",
    service: "Sahara Desert 3-Day Adventure",
    type: "Tour",
    date: "2024-12-15",
    time: "06:00",
    guests: 2,
    amount: "$900",
    confirmedAt: "2024-12-08 10:30",
  },
  {
    id: "BK003",
    customer: "Michael Brown",
    service: "Airport → Hotel Transfer",
    type: "Transfer",
    date: "2024-12-14",
    time: "14:30",
    guests: 3,
    amount: "$45",
    confirmedAt: "2024-12-07 15:45",
  },
  {
    id: "BK005",
    customer: "James Johnson",
    service: "Marrakech City Tour",
    type: "Tour",
    date: "2024-12-17",
    time: "09:00",
    guests: 5,
    amount: "$600",
    confirmedAt: "2024-12-09 12:00",
  },
]

export default function ConfirmedBookingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Confirmed Bookings</h1>
        <p className="text-muted-foreground">All confirmed reservations</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">987</div>
              <p className="text-sm text-muted-foreground">Total Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">23</div>
              <p className="text-sm text-muted-foreground">Upcoming (7 days)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">$45K</span>
            </div>
            <div>
              <div className="text-2xl font-bold">Revenue</div>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search confirmed bookings..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmed Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Booking</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Confirmed</th>
                </tr>
              </thead>
              <tbody>
                {confirmedBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">{booking.id}</span>
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Confirmed
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{booking.customer}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <Badge variant="outline" className="mb-1">{booking.type}</Badge>
                        <p className="text-sm">{booking.service}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {booking.date} at {booking.time}
                    </td>
                    <td className="py-3 px-4 font-medium text-sm">{booking.amount}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{booking.confirmedAt}</td>
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
