"use client"

import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  CalendarCheck,
  MapPin,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { users, bookings } from "@/lib/admin-data"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const user = useMemo(() => users.find(u => u.id === userId), [userId])
  const userBookings = useMemo(
    () => bookings.filter(b => b.customerEmail === user?.email).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    [user]
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
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

  if (!user) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.push("/admin/users")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>
        <Card className="rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">User not found</h3>
            <p className="text-sm text-muted-foreground">The user you're looking for doesn't exist.</p>
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
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Details</h1>
          <p className="text-sm text-muted-foreground">{user.name}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Info Card */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
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
              <p className="text-sm text-muted-foreground">Customer</p>
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
                <span className="text-sm">Joined {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.bookingsCount} total bookings</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings History */}
        <Card className="lg:col-span-2 rounded-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Booking History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userBookings.length > 0 ? (
              <div className="space-y-3">
                {userBookings.map((booking) => (
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
                        <p className="font-medium">{booking.totalPrice} MAD</p>
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
                <h3 className="font-semibold mb-2">No bookings yet</h3>
                <p className="text-sm text-muted-foreground">
                  This user hasn't made any bookings yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
