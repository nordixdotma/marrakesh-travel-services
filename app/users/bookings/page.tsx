"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock bookings data - in a real app this would come from an API
const bookings: {
  id: string
  title: string
  type: string
  date: string
  time: string
  location: string
  status: "upcoming" | "completed" | "cancelled"
  image: string
  price: number
}[] = []

export default function BookingsPage() {
  const upcomingBookings = bookings.filter((b) => b.status === "upcoming")
  const pastBookings = bookings.filter((b) => b.status === "completed" || b.status === "cancelled")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your travel bookings</p>
      </div>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Upcoming Bookings
          </CardTitle>
          <CardDescription>Your scheduled tours and activities</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{booking.title}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {booking.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {booking.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">${booking.price}</p>
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      Confirmed
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No upcoming bookings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start exploring our tours and activities to plan your next adventure!
              </p>
              <Link href="/tours">
                <Button>Browse Tours</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>Your past tours and activities</CardDescription>
        </CardHeader>
        <CardContent>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border opacity-75"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 grayscale">
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{booking.title}</p>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${booking.price}</p>
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        booking.status === "completed"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.status === "completed" ? "Completed" : "Cancelled"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              No booking history yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
