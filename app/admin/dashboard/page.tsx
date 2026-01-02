"use client"

import { useState, useEffect, useMemo } from "react"
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
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { adminApi, type ApiError } from "@/lib/api"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface DashboardStats {
  totalBookings: number
  totalOffers: number
  totalUsers: number
  totalReviews: number
  totalRevenue: number
  pendingBookings: number
  pendingReviews: number
}

interface MonthlyStat {
  month: string
  bookings: number
  revenue: number
}

interface Booking {
  id: string
  customerName: string
  customerEmail?: string
  offerTitle: string
  totalPrice: number
  status: string
  createdAt: string
}

interface User {
  id: string
  name: string
  email?: string
  phone?: string
  createdAt: string
  bookingsCount: number
}

export default function AdminDashboardPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalOffers: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    pendingReviews: 0,
  })
  const [bookings, setBookings] = useState<Booking[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStat[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all data in parallel
        const [dashboardResponse, bookingsResponse, usersResponse, reviewsResponse] = await Promise.all([
          adminApi.getDashboard(),
          adminApi.getBookings(undefined, 100, 0),
          adminApi.getUsers(100, 0),
          adminApi.getReviews(undefined, 100, 0),
        ])

        // Transform dashboard stats
        const dashboardStats = dashboardResponse.stats
        const totalOffers = parseInt(String(dashboardStats.total_offers || '0'), 10)

        // Transform bookings
        const transformedBookings: Booking[] = (bookingsResponse.bookings || []).map((booking: any) => ({
          id: booking.id,
          customerName: booking.customer_name || booking.customerName || 'Unknown',
          customerEmail: booking.customer_email || booking.customerEmail,
          offerTitle: booking.offer_title || booking.offerTitle || booking.title || 'Untitled Offer',
          totalPrice: parseFloat(booking.total_price || booking.totalPrice || 0),
          status: (booking.status || 'pending').toLowerCase(),
          createdAt: booking.created_at || booking.createdAt || new Date().toISOString(),
        }))

        // Transform users
        const transformedUsers: User[] = (usersResponse.users || []).map((user: any) => ({
          id: user.id,
          name: user.name || 'Unknown',
          email: user.email,
          phone: user.phone,
          createdAt: user.created_at || user.createdAt || new Date().toISOString(),
          bookingsCount: user.bookings_count || user.bookingsCount || 0,
        }))

        // Calculate pending bookings and reviews
        const pendingBookings = transformedBookings.filter(b => b.status === 'pending').length
        const pendingReviews = (reviewsResponse.reviews || []).filter((r: any) => 
          (r.status || '').toLowerCase() === 'pending'
        ).length

        // Calculate monthly stats (last 6 months)
        const now = new Date()
        const months: MonthlyStat[] = []
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthName = date.toLocaleDateString('en-US', { month: 'short' })
          const monthBookings = transformedBookings.filter(booking => {
            const bookingDate = new Date(booking.createdAt)
            return bookingDate.getMonth() === date.getMonth() && 
                   bookingDate.getFullYear() === date.getFullYear() &&
                   booking.status === 'confirmed'
          })
          months.push({
            month: monthName,
            bookings: monthBookings.length,
            revenue: monthBookings.reduce((sum, b) => sum + b.totalPrice, 0),
          })
        }

        setStats({
          totalBookings: parseInt(String(dashboardStats.total_bookings || '0'), 10),
          totalOffers: totalOffers || parseInt(String(dashboardStats.total_offers || '0'), 10),
          totalUsers: parseInt(String(dashboardStats.total_users || '0'), 10),
          totalReviews: (reviewsResponse.reviews || []).length,
          totalRevenue: parseFloat(String(dashboardStats.total_revenue || '0')),
          pendingBookings,
          pendingReviews,
        })
        setBookings(transformedBookings)
        setUsers(transformedUsers)
        setMonthlyStats(months)
      } catch (err) {
        const apiError = err as ApiError
        console.error('Error fetching dashboard data:', err)
        setError(apiError.message || t.admin?.dashboard?.errorLoading || 'Failed to load dashboard data')
        toast.error(t.admin?.dashboard?.errorLoading || 'Failed to load dashboard', {
          description: apiError.message || 'Please try again later',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const latestBookings = useMemo(
    () =>
      [...bookings]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [bookings]
  )

  const latestUsers = useMemo(
    () =>
      [...users]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [users]
  )

  const maxBookings = Math.max(...monthlyStats.map((s) => s.bookings), 1)

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/10 rounded-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <CalendarCheck className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">{t.admin?.dashboard?.errorLoading || "Error loading dashboard"}</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-sm">
            {t.admin?.dashboard?.retry || "Retry"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.admin?.dashboard?.title || "Dashboard"}</h1>
        <p className="text-sm text-muted-foreground">
          {t.admin?.dashboard?.welcome || "Welcome back! Here's an overview of your business."}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-sm bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t.admin?.dashboard?.totalBookings || "Total Bookings"}</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-amber-600">{stats.pendingBookings} {t.admin?.dashboard?.pending || "pending"}</span>
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
                <p className="text-sm font-medium text-muted-foreground">{t.admin?.dashboard?.totalOffers || "Total Offers"}</p>
                <p className="text-2xl font-bold">{stats.totalOffers}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.admin?.dashboard?.acrossAllCategories || "Across all categories"}</p>
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
                <p className="text-sm font-medium text-muted-foreground">{t.admin?.dashboard?.totalUsers || "Total Users"}</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.admin?.dashboard?.registeredAccounts || "Registered accounts"}</p>
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
                <p className="text-sm font-medium text-muted-foreground">{t.admin?.dashboard?.totalReviews || "Total Reviews"}</p>
                <p className="text-2xl font-bold">{stats.totalReviews}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-amber-600">{stats.pendingReviews} {t.admin?.dashboard?.pending || "pending"}</span>
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
              <CardTitle className="text-base font-semibold">{t.admin?.dashboard?.bookingTrends || "Booking Trends"}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                {t.admin?.dashboard?.last6Months || "Last 6 months"}
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
            <CardTitle className="text-base font-semibold">{t.admin?.dashboard?.revenueOverview || "Revenue Overview"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-sm bg-emerald-500/10 flex items-center justify-center">
                  <Banknote className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t.admin?.dashboard?.totalRevenue || "Total Revenue"}</p>
                  <p className="text-xs text-muted-foreground">{t.admin?.dashboard?.allTime || "All time"}</p>
                </div>
              </div>
              <p className="text-lg font-bold">{stats.totalRevenue.toLocaleString()} €</p>
            </div>
            <div className="space-y-3">
              {monthlyStats.slice(-3).reverse().map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.month} {new Date().getFullYear()}</span>
                  <span className="text-sm font-medium">{stat.revenue.toLocaleString()} €</span>
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
              <CardTitle className="text-base font-semibold">{t.admin?.dashboard?.latestBookings || "Latest Bookings"}</CardTitle>
              <Link href="/admin/bookings">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  {t.admin?.dashboard?.viewAll || "View all"}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestBookings.length > 0 ? (
                latestBookings.map((booking) => (
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
                        <p className="text-sm font-medium">{booking.totalPrice} €</p>
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
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">{t.admin?.dashboard?.noBookingsYet || "No bookings yet"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* New Users */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">{t.admin?.dashboard?.newUsers || "New Users"}</CardTitle>
              <Link href="/admin/users">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  {t.admin?.dashboard?.viewAll || "View all"}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestUsers.length > 0 ? (
                latestUsers.map((user) => (
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
                          {user.email || user.phone || 'No contact info'}
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
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">{t.admin?.dashboard?.noUsersYet || "No users yet"}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
