"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  CalendarCheck,
  Clock,
  Banknote,
  Mail,
  Phone,
  User,
  Users,
  Package,
  CheckCircle,
  XCircle,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { adminApi, ApiError } from "@/lib/api"
import { toast } from "sonner"

export default function BookingDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getBookingById(bookingId)
        setBooking(response.booking)
      } catch (err) {
        console.error('Error fetching booking:', err)
        if (err instanceof ApiError) {
          setError(err.message)
          toast.error('Failed to load booking', {
            description: err.message || 'Please try again later',
          })
        } else {
          setError('Failed to load booking')
          toast.error('Failed to load booking', {
            description: 'Please try again later',
          })
        }
      } finally {
        setLoading(false)
      }
    }

    if (bookingId) {
      fetchBooking()
    }
  }, [bookingId])

  if (!booking) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1 rounded-sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <CalendarCheck className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Booking not found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              The booking you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/admin/bookings" className="mt-4">
              <Button>Back to Bookings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleStatusChange = async (newStatus: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') => {
    try {
      setUpdatingStatus(true)
      await adminApi.updateBookingStatus(bookingId, newStatus)
      
      // Update local state
      setBooking((prev: any) => ({
        ...prev,
        status: newStatus.toLowerCase(),
      }))
      
      toast.success(`Booking status updated to ${newStatus.toLowerCase()}`)
    } catch (err) {
      console.error('Error updating booking status:', err)
      if (err instanceof ApiError) {
        toast.error('Failed to update booking status', {
          description: err.message || 'Please try again later',
        })
      } else {
        toast.error('Failed to update booking status', {
          description: 'Please try again later',
        })
      }
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleConfirm = () => {
    handleStatusChange('CONFIRMED')
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      handleStatusChange('CANCELLED')
    }
  }

  const handleContact = () => {
    if (booking?.customerEmail) {
      window.location.href = `mailto:${booking.customerEmail}`
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1 rounded-sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Booking Details</h1>
              <Badge variant="secondary" className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Select
            value={booking.status.toUpperCase()}
            onValueChange={(value) => handleStatusChange(value as 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED')}
            disabled={updatingStatus}
          >
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          {updatingStatus && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
          <Button variant="outline" onClick={handleContact} className="gap-1 rounded-sm">
            <MessageSquare className="h-4 w-4" />
            Contact
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Information */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{booking.customerName || 'N/A'}</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{booking.customerEmail || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{booking.customerPhone || 'N/A'}</p>
              </div>
            </div>
            {booking.affiliateCode && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Affiliate Referral</p>
                  <div className="space-y-1">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Code: {booking.affiliateCode}
                    </Badge>
                    {booking.affiliateName && (
                      <p className="text-sm font-medium">{booking.affiliateName}</p>
                    )}
                    {booking.affiliateEmail && (
                      <p className="text-xs text-muted-foreground">{booking.affiliateEmail}</p>
                    )}
                    {booking.affiliateId && (
                      <Link href={`/admin/affiliates/${booking.affiliateId}`}>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          View Affiliate Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CalendarCheck className="h-4 w-4" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Booking Date</p>
                <p className="text-sm font-medium">{formatDate(booking.date)}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Guests</p>
                <p className="text-sm font-medium">
                  {booking.adults || 0} Adult{(booking.adults || 0) !== 1 ? "s" : ""}
                  {(booking.children || 0) > 0 && `, ${booking.children} Child${booking.children !== 1 ? "ren" : ""}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-lg font-bold">{booking.totalPrice?.toFixed(2) || '0.00'} MAD</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="text-sm font-medium">{formatDateTime(booking.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offer Information */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Package className="h-4 w-4" />
              Offer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Offer Title</p>
              <p className="font-medium">{booking.offerTitle}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Offer Type</p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {booking.offerType}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Offer ID</p>
              <p className="text-sm font-medium font-mono">{booking.offerId}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
