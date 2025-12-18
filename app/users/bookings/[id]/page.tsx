"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"

// Mock bookings data - duplicated from users/bookings/page.tsx for demo purposes
// Mock bookings data - duplicated from users/bookings/page.tsx for demo purposes
// In a real app, this would be fetched from an API
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

interface BookingDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { t } = useLanguage()
  const resolvedParams = use(params)
  const booking = bookings.find((b) => b.id === resolvedParams.id)

  if (!booking) {
    notFound()
  }

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 gap-1 pl-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t.users?.bookingDetails?.status?.upcoming || "Upcoming"}
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="gap-1 pl-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t.users?.bookingDetails?.status?.completed || "Completed"}
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive" className="gap-1 pl-1.5">
            <XCircle className="w-3.5 h-3.5" />
            {t.users?.bookingDetails?.status?.cancelled || "Cancelled"}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <div>
        <Link 
          href="/users/bookings" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t.users?.bookingDetails?.backToBookings || "Back to Bookings"}
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              {t.users?.bookingDetails?.pageTitle || "Booking Details"}
              <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                #{booking.id}
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {t.users?.bookingDetails?.bookedOn || "Booked on"} {new Date(booking.details.bookingDate).toLocaleDateString()}
            </p>
          </div>
          <div>{getStatusBadge(booking.status)}</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Info - Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Service Details Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{t.users?.bookingDetails?.serviceInfo || "Service Information"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <img 
                    src={booking.image} 
                    alt={booking.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold text-lg">{booking.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reservation Details Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{t.users?.bookingDetails?.reservationDetails || "Reservation Details"}</CardTitle>
              <CardDescription>
                {t.users?.bookingDetails?.reservationDesc || "Information provided during booking"}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent className="space-y-6">
              {/* Contact Info */}
              <div>
                <h4 className="font-medium text-sm text-foreground mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  {t.users?.bookingDetails?.contactInfo || "Contact Information"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs block">{t.users?.bookings?.reservationForm?.fullName || "Full Name"}</span>
                    <span className="font-medium">{booking.details.fullName}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs block">{t.users?.bookings?.reservationForm?.email || "Email Address"}</span>
                    <span className="font-medium">{booking.details.email}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs block">{t.users?.bookings?.reservationForm?.phone || "Phone Number"}</span>
                    <span className="font-medium">{booking.details.phone}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Group Info */}
              <div>
                <h4 className="font-medium text-sm text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  {t.users?.bookingDetails?.groupSummary || "Group Summary"}
                </h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-muted/50 px-3 py-2 rounded-md border border-border">
                    <span className="text-muted-foreground text-xs block">{t.offerDetails?.reservationForm?.adults || "Adults"}</span>
                    <span className="font-medium block text-center">{booking.details.adults}</span>
                  </div>
                  {booking.details.children > 0 && (
                    <div className="bg-muted/50 px-3 py-2 rounded-md border border-border">
                      <span className="text-muted-foreground text-xs block">{t.offerDetails?.reservationForm?.children || "Children"}</span>
                      <span className="font-medium block text-center">{booking.details.children}</span>
                    </div>
                  )}
                  {booking.details.infants > 0 && (
                    <div className="bg-muted/50 px-3 py-2 rounded-md border border-border">
                      <span className="text-muted-foreground text-xs block">{t.infant?.label || "Infants"}</span>
                      <span className="font-medium block text-center">{booking.details.infants}</span>
                    </div>
                  )}
                </div>
              </div>

              {booking.details.message && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      {t.users?.bookingDetails?.specialRequests || "Special Requests / Message"}
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md border border-border/50 italic">
                      "{booking.details.message}"
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary - Right Column */}
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="bg-muted/20 pb-4">
              <CardTitle className="text-base">{t.users?.bookingDetails?.paymentSummary || "Payment Summary"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.users?.bookingDetails?.pricePerPerson || "Price per person"}</span>
                  <span>MAD {booking.price / booking.details.adults}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.users?.bookingDetails?.totalPeople || "Total People"}</span>
                  <span>{booking.details.adults + booking.details.children}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>{t.users?.bookingDetails?.total || "Total"}</span>
                  <span className="text-primary">MAD {booking.price}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 text-blue-500 shrink-0" />
                  <p>
                    {t.users?.bookingDetails?.paymentNote || "Payment is usually handled on location or as per the specific offer terms. Please check your email for payment instructions."}
                  </p>
                </div>
              </div>

              <Button className="w-full mt-6" variant="outline">
                {t.users?.bookingDetails?.downloadVoucher || "Download Voucher"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
