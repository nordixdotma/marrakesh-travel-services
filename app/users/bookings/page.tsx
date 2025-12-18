"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

// Mock bookings data - in a real app this would come from an API
type BookingStatus = "upcoming" | "completed" | "cancelled"

interface Booking {
  id: string
  title: string
  type: string
  date: string
  time: string
  location: string
  status: BookingStatus
  image: string
  price: number
  details: {
    fullName: string
    email: string
    phone: string
    adults: number
    children: number
    infants: number
    message: string
    bookingDate: string
  }
}

const bookings: Booking[] = [
  {
    id: "bk-12345",
    title: "Desert Sunset Camel Ride",
    type: "activities", 
    date: "2024-06-15",
    time: "17:00",
    location: "Agafay Desert",
    status: "upcoming",
    image: "/images/camel-ride.jpg",
    price: 450,
    details: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      adults: 2,
      children: 1,
      infants: 0,
      message: "We prefer a gentle camel if possible.",
      bookingDate: "2024-05-20"
    }
  },
  {
    id: "bk-67890",
    title: "Marrakech City Tour",
    type: "tours",
    date: "2024-04-10",
    time: "09:00",
    location: "Medina, Marrakech",
    status: "completed",
    image: "/images/city-tour.jpg",
    price: 300,
    details: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      adults: 2,
      children: 0,
       infants: 0,
      message: "",
      bookingDate: "2024-04-01"
    }
  }
]

export default function BookingsPage() {
  const { t } = useLanguage()
  const upcomingBookings = bookings.filter((b) => b.status === "upcoming")
  const pastBookings = bookings.filter((b) => b.status === "completed" || b.status === "cancelled")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.users.bookings.pageTitle}</h1>
        <p className="text-muted-foreground">{t.users.bookings.pageDescription}</p>
      </div>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            {t.users.bookings.upcomingBookings}
          </CardTitle>
          <CardDescription>{t.users.bookings.upcomingDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Link 
                  href={`/users/bookings/${booking.id}`}
                  key={booking.id}
                  className="block group"
                >
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border group-hover:border-primary/50 transition-all bg-card hover:shadow-sm">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                      <img
                        src={booking.image}
                        alt={booking.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{booking.title}</p>
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
                      <p className="font-semibold text-primary">MAD {booking.price}</p>
                      <span className="inline-flex px-2 py-0.5 mt-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        {t.users.bookings.confirmed}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{t.users.bookings.noUpcoming}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.users.bookings.noUpcomingDescription}
              </p>
              <Link href="/tours">
                <Button>{t.users.bookings.browseTours}</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>{t.users.bookings.pastBookings}</CardTitle>
          <CardDescription>{t.users.bookings.pastDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <Link
                  href={`/users/bookings/${booking.id}`}
                  key={booking.id}
                  className="block group"
                >
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border opacity-75 hover:opacity-100 transition-all hover:border-primary/50 hover:shadow-sm">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
                      <img
                        src={booking.image}
                        alt={booking.title}
                        className="w-full h-full object-cover"
                         onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">{booking.title}</p>
                      <p className="text-sm text-muted-foreground">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">MAD {booking.price}</p>
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
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              {t.users.bookings.noPast}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
