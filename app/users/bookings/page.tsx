"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { bookingApi, type ApiError } from "@/lib/api"
import { useAuth } from "@/components/login-modal"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { generateVoucherPDF } from "@/lib/voucher-utils"
import { offersApi, userApi } from "@/lib/api"

interface Booking {
  id: string
  offer_id: string
  offer_type: string
  date: string
  adults: number
  children: number
  total_price: number
  status: string
  created_at: string
  offerTitle?: string
  offerImage?: string
  depart_city?: string
}

export default function BookingsPage() {
  const { t, language } = useLanguage()
  const { isLoggedIn, user, login } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)

  const handleDownload = async (booking: Booking, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      setIsDownloading(booking.id)
      
      // Fetch full details needed for voucher
      const offerResponse = await offersApi.getOfferById(booking.offer_id, language)
      const userProfileResponse = await userApi.getProfile()
      
      await generateVoucherPDF({ 
        booking, 
        offer: offerResponse.offer, 
        userProfile: userProfileResponse.user, 
        t 
      })
      
      toast.success("Voucher downloaded successfully")
    } catch (err) {
      console.error("Error generating voucher:", err)
      toast.error("Failed to generate voucher")
    } finally {
      setIsDownloading(null)
    }
  }

  useEffect(() => {
    // Check for token and user in localStorage first
    const checkAuth = () => {
      if (typeof window === 'undefined') return false
      
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      // If we have token and user in localStorage but auth context doesn't have user, update it
      if (token && storedUser && !user) {
        try {
          const userData = JSON.parse(storedUser)
          login(userData) // Update auth context
          return true
        } catch (e) {
          console.error('Error parsing stored user:', e)
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          return false
        }
      }
      
      return !!(token && (user || storedUser))
    }

    const isAuthenticated = checkAuth()
    
    if (!isAuthenticated) {
      setError('Please log in to view your bookings')
      toast.error('Authentication required', {
        description: 'Please log in to view your bookings',
      })
      setIsLoading(false)
      // Don't redirect immediately, let user see the error
      return
    }

    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Get token from localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) {
          setError('Please log in to view your bookings')
          toast.error('Authentication required', {
            description: 'Please log in to view your bookings',
          })
          setIsLoading(false)
          return
        }
        
        console.log('✅ Token found, fetching bookings...')
        
        const response = await bookingApi.getBookings(undefined, language)
        
        // Transform backend data
        const transformedBookings: Booking[] = (response.bookings || []).map((booking: any) => ({
          id: booking.id,
          offer_id: booking.offer_id,
          offer_type: booking.offer_type || booking.type,
          date: booking.date,
          adults: booking.adults || 0,
          children: booking.children || 0,
          total_price: parseFloat(booking.total_price) || 0,
          status: booking.status?.toLowerCase() || 'pending',
          created_at: booking.created_at,
          offerTitle: booking.offerTitle || booking.title || 'Untitled Offer',
          offerImage: booking.offerImage || booking.main_image || '/placeholder.svg',
          depart_city: booking.depart_city || 'Marrakech',
        }))
        
        setBookings(transformedBookings)
      } catch (err) {
        const apiError = err as ApiError
        const errorMessage = apiError.message || 'Failed to load bookings'
        setError(errorMessage)
        console.error('Error fetching bookings:', err)
        
        // If it's an authentication error, redirect to home
        if (errorMessage.includes('Authentication') || errorMessage.includes('User not found') || errorMessage.includes('Unauthorized')) {
          toast.error('Session expired', {
            description: 'Please log in again',
          })
          // Clear invalid token
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        } else {
          toast.error('Failed to load bookings', {
            description: errorMessage,
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [isLoggedIn, language, router, user, login])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'confirmed') {
      return { label: t.users.bookings.confirmed, className: "bg-green-100 text-green-700" }
    } else if (statusLower === 'completed') {
      return { label: "Completed", className: "bg-gray-100 text-gray-600" }
    } else if (statusLower === 'cancelled') {
      return { label: "Cancelled", className: "bg-red-100 text-red-600" }
    } else {
      return { label: "Pending", className: "bg-yellow-100 text-yellow-700" }
    }
  }

  const isUpcoming = (booking: Booking) => {
    const bookingDate = new Date(booking.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return bookingDate >= today && booking.status !== 'cancelled' && booking.status !== 'completed'
  }

  const upcomingBookings = bookings.filter(isUpcoming)
  const pastBookings = bookings.filter((b) => !isUpcoming(b))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.users.bookings.pageTitle}</h1>
          <p className="text-muted-foreground">{t.users.bookings.pageDescription}</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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
                      {booking.offerImage && booking.offerImage.includes('api.marrakeshtravelservices.com') ? (
                        <img
                          src={booking.offerImage}
                          alt={booking.offerTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg"
                          }}
                        />
                      ) : (
                        <img
                          src={booking.offerImage || "/placeholder.svg"}
                          alt={booking.offerTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg"
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{booking.offerTitle}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {booking.depart_city}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <span>{booking.adults} {booking.adults === 1 ? 'Adult' : 'Adults'}</span>
                        {booking.children > 0 && (
                          <span>, {booking.children} {booking.children === 1 ? 'Child' : 'Children'}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2 px-2">
                      <div>
                        <p className="font-semibold text-primary">€ {booking.total_price}</p>
                        <span className={`inline-flex px-2 py-0.5 mt-1 text-xs font-medium rounded-full ${getStatusBadge(booking.status).className}`}>
                          {getStatusBadge(booking.status).label}
                        </span>
                      </div>
                      <div className="flex gap-1 flex-wrap justify-end">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 text-xs gap-1 hover:bg-primary/10 hover:text-primary"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            router.push(`/offers/${booking.offer_id}`)
                          }}
                        >
                          <ChevronRight className="h-3 w-3" />
                          {t.users.bookings.viewOffer}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 text-xs gap-1 hover:bg-primary/10 hover:text-primary"
                          onClick={(e) => handleDownload(booking, e)}
                          disabled={isDownloading === booking.id}
                        >
                          {isDownloading === booking.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          {t.users?.bookingDetails?.downloadVoucher || "Download"}
                        </Button>
                      </div>
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
                      {booking.offerImage && booking.offerImage.includes('api.marrakeshtravelservices.com') ? (
                        <img
                          src={booking.offerImage}
                          alt={booking.offerTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg"
                          }}
                        />
                      ) : (
                        <img
                          src={booking.offerImage || "/placeholder.svg"}
                          alt={booking.offerTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg"
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">{booking.offerTitle}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(booking.date)}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <div>
                        <p className="font-medium">€ {booking.total_price}</p>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(booking.status).className}`}>
                          {getStatusBadge(booking.status).label}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 text-xs gap-1 hover:bg-primary/10 hover:text-primary"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          router.push(`/offers/${booking.offer_id}`)
                        }}
                      >
                        <ChevronRight className="h-3 w-3" />
                        {t.users.bookings.viewOffer}
                      </Button>
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
