"use client"

import {
  CalendarCheck,
  Users,
  DollarSign,
  TrendingUp,
  Map,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const stats = [
  {
    title: "Total Bookings",
    value: "1,234",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: CalendarCheck,
    description: "This month",
  },
  {
    title: "Active Users",
    value: "8,456",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: Users,
    description: "Registered users",
  },
  {
    title: "Revenue",
    value: "$45,678",
    change: "+18.3%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-0.4%",
    changeType: "negative" as const,
    icon: TrendingUp,
    description: "From last month",
  },
]

const recentBookings = [
  {
    id: "BK001",
    customer: "John Smith",
    tour: "Sahara Desert Adventure",
    date: "2024-12-15",
    status: "confirmed",
    amount: "$450",
  },
  {
    id: "BK002",
    customer: "Emma Wilson",
    tour: "Marrakech City Tour",
    date: "2024-12-14",
    status: "pending",
    amount: "$120",
  },
  {
    id: "BK003",
    customer: "Michael Brown",
    tour: "Atlas Mountains Trek",
    date: "2024-12-14",
    status: "confirmed",
    amount: "$280",
  },
  {
    id: "BK004",
    customer: "Sarah Davis",
    tour: "Airport Transfer",
    date: "2024-12-13",
    status: "canceled",
    amount: "$45",
  },
  {
    id: "BK005",
    customer: "James Johnson",
    tour: "Essaouira Day Trip",
    date: "2024-12-13",
    status: "confirmed",
    amount: "$180",
  },
]

const notifications = [
  {
    type: "alert",
    message: "3 bookings require immediate attention",
    time: "5 min ago",
  },
  {
    type: "success",
    message: "Payment received for booking #BK001",
    time: "1 hour ago",
  },
  {
    type: "info",
    message: "New user registration: Emma Wilson",
    time: "2 hours ago",
  },
  {
    type: "alert",
    message: "Review pending approval",
    time: "3 hours ago",
  },
]

const popularTours = [
  { name: "Sahara Desert 3-Day Tour", bookings: 156, revenue: "$70,200" },
  { name: "Marrakech City Tour", bookings: 234, revenue: "$28,080" },
  { name: "Atlas Mountains Day Trip", bookings: 189, revenue: "$52,920" },
  { name: "Essaouira Beach Trip", bookings: 145, revenue: "$26,100" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>{" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Map className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{booking.customer}</p>
                      <p className="text-xs text-muted-foreground">{booking.tour}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{booking.amount}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notification.type === "alert"
                        ? "bg-red-100"
                        : notification.type === "success"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {notification.type === "alert" ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : notification.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Tours */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Tours</CardTitle>
          <CardDescription>Top performing tours this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Tour Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Bookings
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {popularTours.map((tour, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <Map className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{tour.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{tour.bookings}</td>
                    <td className="py-3 px-4 text-sm font-medium">{tour.revenue}</td>
                    <td className="py-3 px-4">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
