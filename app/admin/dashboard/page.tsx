"use client"

import {
  CalendarCheck,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const stats = [
  {
    title: "Total Bookings",
    value: "1,234",
    change: 12.5,
    icon: CalendarCheck,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Active Users",
    value: "8,456",
    change: 5.2,
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Revenue",
    value: "$45,678",
    change: 18.3,
    icon: DollarSign,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Conversion",
    value: "3.2%",
    change: -0.4,
    icon: TrendingUp,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
]

const recentBookings = [
  { id: "BK001", customer: "John Smith", tour: "Sahara Desert Adventure", status: "confirmed", amount: "$450" },
  { id: "BK002", customer: "Emma Wilson", tour: "Marrakech City Tour", status: "pending", amount: "$120" },
  { id: "BK003", customer: "Michael Brown", tour: "Atlas Mountains Trek", status: "confirmed", amount: "$280" },
  { id: "BK004", customer: "Sarah Davis", tour: "Airport Transfer", status: "canceled", amount: "$45" },
  { id: "BK005", customer: "James Johnson", tour: "Essaouira Day Trip", status: "confirmed", amount: "$180" },
]

const alerts = [
  { type: "warning", message: "3 bookings require attention", time: "5m ago" },
  { type: "success", message: "Payment received #BK001", time: "1h ago" },
  { type: "info", message: "New user: Emma Wilson", time: "2h ago" },
]

const topTours = [
  { name: "Sahara Desert 3-Day", bookings: 156, revenue: "$70.2K" },
  { name: "Marrakech City Tour", bookings: 234, revenue: "$28.0K" },
  { name: "Atlas Mountains Trip", bookings: 189, revenue: "$52.9K" },
  { name: "Essaouira Beach Trip", bookings: 145, revenue: "$26.1K" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back! Here&apos;s your overview.</p>
        </div>
        <Button size="sm">
          Download Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.change > 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                    )}
                    <span className={stat.change > 0 ? "text-emerald-600" : "text-red-600"}>
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {booking.customer.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{booking.customer}</p>
                      <p className="text-xs text-muted-foreground">{booking.tour}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{booking.amount}</span>
                    <Badge 
                      variant="secondary"
                      className={
                        booking.status === "confirmed" 
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" 
                          : booking.status === "pending"
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                          : "bg-red-50 text-red-700 hover:bg-red-50"
                      }
                    >
                      {booking.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Top Tours */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1 rounded-full ${
                    alert.type === "warning" ? "bg-amber-100" : 
                    alert.type === "success" ? "bg-emerald-100" : "bg-blue-100"
                  }`}>
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-3 w-3 text-amber-600" />
                    ) : alert.type === "success" ? (
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <Clock className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Tours */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Top Tours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topTours.map((tour, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm truncate max-w-[140px]">{tour.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{tour.revenue}</p>
                    <p className="text-xs text-muted-foreground">{tour.bookings} bookings</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
