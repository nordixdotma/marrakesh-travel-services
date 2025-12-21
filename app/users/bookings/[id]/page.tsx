"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
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
  AlertCircle,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"
import { bookingApi, offersApi, userApi, type ApiError } from "@/lib/api"
import { useAuth } from "@/components/login-modal"
import { toast } from "sonner"

interface BookingDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { t, language } = useLanguage()
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()
  const resolvedParams = use(params)
  const [booking, setBooking] = useState<any>(null)
  const [offer, setOffer] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
      return
    }

    const fetchBooking = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Check if token exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) {
          setError('Please log in to view booking details')
          toast.error('Authentication required', {
            description: 'Please log in to view booking details',
          })
          setIsLoading(false)
          setTimeout(() => {
            router.push('/users/bookings')
          }, 2000)
          return
        }
        
        // Fetch booking details
        const bookingResponse = await bookingApi.getBookingById(resolvedParams.id)
        const bookingData = bookingResponse.booking
        
        // Fetch offer details
        const offerResponse = await offersApi.getOfferById(bookingData.offer_id, language)
        const offerData = offerResponse.offer
        
        // Fetch user profile for contact info
        try {
          const profileResponse = await userApi.getProfile()
          setUserProfile(profileResponse.user)
        } catch (err) {
          console.warn('Could not fetch user profile:', err)
          // Use user from auth context as fallback
          setUserProfile(user)
        }
        
        setBooking(bookingData)
        setOffer(offerData)
      } catch (err) {
        const apiError = err as ApiError
        const errorMessage = apiError.message || 'Failed to load booking'
        setError(errorMessage)
        console.error('Error fetching booking:', err)
        
        // If it's an authentication error, redirect to bookings page
        if (errorMessage.includes('Authentication') || errorMessage.includes('User not found') || errorMessage.includes('Unauthorized')) {
          toast.error('Session expired', {
            description: 'Please log in again',
          })
          // Clear invalid token
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        } else {
          toast.error('Failed to load booking', {
            description: errorMessage,
          })
        }
        
        setTimeout(() => {
          router.push('/users/bookings')
        }, 2000)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooking()
  }, [resolvedParams.id, isLoggedIn, language, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !booking || !offer) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-destructive mb-4">{error || 'Booking not found'}</p>
          <Button onClick={() => router.push('/users/bookings')} variant="outline">
            Back to Bookings
          </Button>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase() || ''
    switch (statusLower) {
      case "confirmed":
      case "pending":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 gap-1 pl-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {statusLower === 'confirmed' ? (t.users?.bookingDetails?.status?.confirmed || "Confirmed") : (t.users?.bookingDetails?.status?.pending || "Pending")}
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get offer image
  const offerImage = offer.images?.find((img: any) => img.type === 'MAIN')?.url || offer.main_image || '/placeholder.svg'
  const offerTitle = offer.title || 'Untitled Offer'

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
                #{booking.id.substring(0, 8)}
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {t.users?.bookingDetails?.bookedOn || "Booked on"} {formatDate(booking.created_at)}
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
                  {offerImage && offerImage.includes('api.marrakeshtravelservices.com') ? (
                    <img 
                      src={offerImage} 
                      alt={offerTitle} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg"
                      }}
                    />
                  ) : (
                    <img 
                      src={offerImage || "/placeholder.svg"} 
                      alt={offerTitle} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg"
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold text-lg">{offerTitle}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{offer.depart_city || booking.depart_city || 'Marrakech'}</span>
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
                    <span className="font-medium">{userProfile?.name || user?.name || 'N/A'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs block">{t.users?.bookings?.reservationForm?.email || "Email Address"}</span>
                    <span className="font-medium">{userProfile?.email || user?.email || 'N/A'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs block">{t.users?.bookings?.reservationForm?.phone || "Phone Number"}</span>
                    <span className="font-medium">{userProfile?.phone || user?.phone || 'N/A'}</span>
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
                    <span className="font-medium block text-center">{booking.adults || 0}</span>
                  </div>
                  {(booking.children || 0) > 0 && (
                    <div className="bg-muted/50 px-3 py-2 rounded-md border border-border">
                      <span className="text-muted-foreground text-xs block">{t.offerDetails?.reservationForm?.children || "Children"}</span>
                      <span className="font-medium block text-center">{booking.children || 0}</span>
                    </div>
                  )}
                </div>
              </div>
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
                {booking.adults > 0 && offer.priceAdult && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{booking.adults} {t.offerDetails?.reservationForm?.adults || "Adults"} × MAD {offer.priceAdult}</span>
                    <span>MAD {booking.adults * parseFloat(offer.priceAdult)}</span>
                  </div>
                )}
                {(booking.children || 0) > 0 && offer.priceChild && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{booking.children} {t.offerDetails?.reservationForm?.children || "Children"} × MAD {offer.priceChild}</span>
                    <span>MAD {booking.children * parseFloat(offer.priceChild)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>{t.users?.bookingDetails?.total || "Total"}</span>
                  <span className="text-primary">MAD {parseFloat(booking.total_price) || 0}</span>
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
