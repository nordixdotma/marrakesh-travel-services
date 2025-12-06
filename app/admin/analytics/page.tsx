"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Calendar, Download, ArrowUp, ArrowDown } from "lucide-react"

export default function AnalyticsPage() {
  const stats = [
    { 
      label: "Total Revenue", 
      value: "245,680 MAD", 
      change: "+12.5%", 
      trend: "up",
      period: "vs last month"
    },
    { 
      label: "Total Bookings", 
      value: "1,234", 
      change: "+8.3%", 
      trend: "up",
      period: "vs last month"
    },
    { 
      label: "New Customers", 
      value: "456", 
      change: "+15.2%", 
      trend: "up",
      period: "vs last month"
    },
    { 
      label: "Avg. Order Value", 
      value: "1,890 MAD", 
      change: "-2.1%", 
      trend: "down",
      period: "vs last month"
    },
  ]

  const monthlyRevenue = [
    { month: "Jan", revenue: 180000, bookings: 98 },
    { month: "Feb", revenue: 165000, bookings: 87 },
    { month: "Mar", revenue: 220000, bookings: 112 },
    { month: "Apr", revenue: 245000, bookings: 134 },
    { month: "May", revenue: 310000, bookings: 156 },
    { month: "Jun", revenue: 380000, bookings: 189 },
    { month: "Jul", revenue: 420000, bookings: 215 },
    { month: "Aug", revenue: 450000, bookings: 234 },
    { month: "Sep", revenue: 380000, bookings: 198 },
    { month: "Oct", revenue: 320000, bookings: 167 },
    { month: "Nov", revenue: 280000, bookings: 145 },
    { month: "Dec", revenue: 245680, bookings: 123 },
  ]

  const topProducts = [
    { name: "3-Day Desert Tour", bookings: 234, revenue: "468,000 MAD", growth: "+18%" },
    { name: "Essaouira Day Trip", bookings: 189, revenue: "283,500 MAD", growth: "+12%" },
    { name: "Ourika Valley", bookings: 156, revenue: "156,000 MAD", growth: "+8%" },
    { name: "Ait Benhaddou", bookings: 134, revenue: "201,000 MAD", growth: "+5%" },
    { name: "Hot Air Balloon", bookings: 98, revenue: "196,000 MAD", growth: "+22%" },
  ]

  const customerSources = [
    { source: "Google Search", percentage: 35, bookings: 432 },
    { source: "TripAdvisor", percentage: 25, bookings: 308 },
    { source: "Direct", percentage: 20, bookings: 247 },
    { source: "Social Media", percentage: 12, bookings: 148 },
    { source: "Referrals", percentage: 8, bookings: 99 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales & Analytics</h1>
          <p className="text-muted-foreground">Track your business performance</p>
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 rounded-md border border-input bg-background">
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">{stat.period}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.trend === "up" ? "bg-green-100" : "bg-red-100"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className={`h-5 w-5 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`} />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue Overview
            </CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyRevenue.map((item, index) => {
                const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))
                const height = (item.revenue / maxRevenue) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${item.month}: ${item.revenue.toLocaleString()} MAD`}
                    />
                    <span className="text-xs text-muted-foreground">{item.month}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span className="text-sm">Revenue (MAD)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Traffic Sources
            </CardTitle>
            <CardDescription>Where customers find you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSources.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-sm text-muted-foreground">{source.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{source.bookings} bookings</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Top Selling Tours
            </CardTitle>
            <CardDescription>Best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                    <p className="text-sm text-green-600">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue by Category
            </CardTitle>
            <CardDescription>Distribution across services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                  <span className="text-lg font-bold">45%</span>
                </div>
                <div>
                  <p className="font-medium">Desert Tours</p>
                  <p className="text-sm text-muted-foreground">1,120,000 MAD</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                  <span className="text-lg font-bold">25%</span>
                </div>
                <div>
                  <p className="font-medium">Day Excursions</p>
                  <p className="text-sm text-muted-foreground">620,000 MAD</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                  <span className="text-lg font-bold">18%</span>
                </div>
                <div>
                  <p className="font-medium">Activities</p>
                  <p className="text-sm text-muted-foreground">450,000 MAD</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-amber-500 flex items-center justify-center">
                  <span className="text-lg font-bold">12%</span>
                </div>
                <div>
                  <p className="font-medium">Transfers</p>
                  <p className="text-sm text-muted-foreground">300,000 MAD</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
