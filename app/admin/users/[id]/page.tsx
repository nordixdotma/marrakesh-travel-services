"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  CalendarCheck,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { adminApi, type ApiError } from "@/lib/api"
import { toast } from "sonner"

interface UserData {
  id: string
  name: string
  email: string | null
  phone: string | null
  role: string
  isActive: boolean
  createdAt: string
  bookingsCount: number
}

interface Booking {
  id: string
  offerTitle: string
  offerType: string
  status: string
  totalPrice: number
  date: string
  createdAt: string
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const userId = params.id as string

  const [user, setUser] = useState<UserData | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getUserById(userId)
        setUser(response.user)
        setBookings(response.bookings || [])
      } catch (err) {
        const apiError = err as ApiError
        console.error('Error fetching user:', err)
        setError(apiError.message || 'Failed to load user')
        if (apiError.status === 404) {
          toast.error('User not found')
        } else {
          toast.error('Failed to load user', {
            description: apiError.message || 'Please try again later',
          })
        }
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  if (loading) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.push("/admin/users")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t.admin?.common?.back || "Back to Users"}
        </Button>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.push("/admin/users")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t.admin?.common?.back || "Back to Users"}
        </Button>
        <Card className="rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t.admin?.users?.notFound || "User not found"}</h3>
            <p className="text-sm text-muted-foreground">
              {error || t.admin?.users?.notFoundDesc || "The user you're looking for doesn't exist."}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/users")} className="gap-2 rounded-sm">
          <ArrowLeft className="h-4 w-4" />
          {t.admin?.common?.back || "Back"}
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t.admin?.users?.details || "User Details"}</h1>
          <p className="text-sm text-muted-foreground">{user.name}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Info Card */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t.admin?.users?.profileInfo || "Profile Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="h-20 w-20 rounded-sm bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
            </div>
            <Separator />
            <div className="space-y-3">
              {user.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.admin?.users?.joinedAt?.replace('{date}', formatDate(user.createdAt)) || `Joined ${formatDate(user.createdAt)}`}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.bookingsCount} total bookings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm">{user.isActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings History */}
        <Card className="lg:col-span-2 rounded-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              {t.admin?.users?.history || "Booking History"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-sm hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{booking.offerTitle}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(booking.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {booking.offerType}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-medium">{booking.totalPrice} €</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                          <Clock className="h-3 w-3" />
                          {formatDate(booking.createdAt)}
                        </p>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">{t.admin?.dashboard?.noBookingsYet || "No bookings yet"}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.admin?.users?.notFoundDesc || "This user hasn't made any bookings yet."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
