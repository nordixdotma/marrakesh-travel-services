"use client"

import { Search, XCircle, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const canceledBookings = [
  {
    id: "BK004",
    customer: "Sarah Davis",
    service: "Hot Air Balloon Ride",
    type: "Activity",
    date: "2024-12-16",
    amount: "$360",
    canceledAt: "2024-12-10 11:20",
    reason: "Weather conditions",
    refundStatus: "refunded",
  },
  {
    id: "BK008",
    customer: "Tom Wilson",
    service: "Sahara Desert Tour",
    type: "Tour",
    date: "2024-12-18",
    amount: "$450",
    canceledAt: "2024-12-09 08:30",
    reason: "Customer request - change of plans",
    refundStatus: "refunded",
  },
  {
    id: "BK009",
    customer: "Anna Lee",
    service: "Airport Transfer",
    type: "Transfer",
    date: "2024-12-12",
    amount: "$35",
    canceledAt: "2024-12-11 22:00",
    reason: "Flight canceled",
    refundStatus: "pending",
  },
]

export default function CanceledBookingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Canceled Bookings</h1>
        <p className="text-muted-foreground">View all canceled reservations</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">91</div>
              <p className="text-sm text-muted-foreground">Total Canceled</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-muted-foreground">Refund Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-600 font-bold text-lg">7.4%</span>
            </div>
            <div>
              <div className="text-2xl font-bold">Cancel Rate</div>
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
            <Input placeholder="Search canceled bookings..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Canceled Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Canceled Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {canceledBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-start justify-between p-4 border border-border rounded-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">{booking.id}</span>
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Canceled
                    </Badge>
                    <Badge variant="outline">{booking.type}</Badge>
                  </div>
                  <p className="font-medium">{booking.service}</p>
                  <p className="text-sm text-muted-foreground">
                    Customer: {booking.customer} | Original date: {booking.date}
                  </p>
                  <div className="bg-muted p-2 rounded text-sm">
                    <strong>Reason:</strong> {booking.reason}
                  </div>
                  <p className="text-xs text-muted-foreground">Canceled at: {booking.canceledAt}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{booking.amount}</div>
                  <Badge
                    variant={booking.refundStatus === "refunded" ? "default" : "secondary"}
                    className={booking.refundStatus === "refunded" ? "bg-green-600" : ""}
                  >
                    {booking.refundStatus === "refunded" ? "Refunded" : "Refund Pending"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
