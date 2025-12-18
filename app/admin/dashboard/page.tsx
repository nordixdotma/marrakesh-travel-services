"use client"

import { useMemo } from "react"
import Link from "next/link"
import {
  CalendarCheck,
  Package,
  Users,
  Star,
  TrendingUp,
  ArrowRight,
  Banknote,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  bookings,
  users,
  reviews,
  getMonthlyBookingStats,
  getStatsSummary,
} from "@/lib/admin-data"
import {
  toursOffers,
  excursionsOffers,
  activitiesOffers,
  transfersOffers,
  packagesOffers,
} from "@/lib/offers-data"

export default function AdminDashboardPage() {
  const stats = useMemo(() => getStatsSummary(), [])
  const monthlyStats = useMemo(() => getMonthlyBookingStats(), [])
  
  const totalOffers =
    toursOffers.length +
    excursionsOffers.length +
    activitiesOffers.length +
    transfersOffers.length +
    packagesOffers.length

  const latestBookings = useMemo(
    () =>
      [...bookings]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    []
  )

  const latestUsers = useMemo(
    () =>
      [...users]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    []
  )

  const maxBookings = Math.max(...monthlyStats.map((s) => s.bookings), 1)

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
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-sm bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-amber-600">{stats.pendingBookings} pending</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center">
                <CalendarCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Offers</p>
                <p className="text-2xl font-bold">{totalOffers}</p>
                <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
              </div>
              <div className="h-12 w-12 rounded-sm bg-emerald-500/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
              </div>
              <div className="h-12 w-12 rounded-sm bg-blue-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">{stats.totalReviews}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-amber-600">{stats.pendingReviews} pending</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-sm bg-amber-500/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Revenue */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Monthly Bookings Chart */}
        <Card className="lg:col-span-2 rounded-sm bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Booking Trends</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Last 6 months
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2 pt-4">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs font-medium text-muted-foreground mb-1">
                      {stat.bookings}
                    </span>
                    <div
                      className="w-full bg-primary/80 rounded-t-sm transition-all hover:bg-primary"
                      style={{
                        height: `${Math.max((stat.bookings / maxBookings) * 140, 8)}px`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Summary */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-sm bg-emerald-500/10 flex items-center justify-center">
                  <Banknote className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Revenue</p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
              </div>
              <p className="text-lg font-bold">{stats.totalRevenue.toLocaleString()} MAD</p>
            </div>
            <div className="space-y-3">
              {monthlyStats.slice(-3).reverse().map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.month} 2025</span>
                  <span className="text-sm font-medium">{stat.revenue.toLocaleString()} MAD</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Bookings and Users */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Latest Bookings */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Latest Bookings</CardTitle>
              <Link href="/admin/bookings">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View all
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-sm hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{booking.customerName}</p>
                    <p className="text-xs text-muted-foreground truncate">{booking.offerTitle}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">{booking.totalPrice} MAD</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
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
          </CardContent>
        </Card>

        {/* New Users */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">New Users</CardTitle>
              <Link href="/admin/users">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View all
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-sm hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email || user.phone}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.bookingsCount} booking{user.bookingsCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
