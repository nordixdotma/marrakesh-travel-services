"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, DollarSign, Users, Target } from "lucide-react"

export default function PerformancePage() {
  const monthlyData = [
    { month: "January", revenue: 180000, bookings: 98, customers: 78, target: 200000 },
    { month: "February", revenue: 165000, bookings: 87, customers: 72, target: 200000 },
    { month: "March", revenue: 220000, bookings: 112, customers: 95, target: 200000 },
    { month: "April", revenue: 245000, bookings: 134, customers: 112, target: 250000 },
    { month: "May", revenue: 310000, bookings: 156, customers: 134, target: 300000 },
    { month: "June", revenue: 380000, bookings: 189, customers: 156, target: 350000 },
    { month: "July", revenue: 420000, bookings: 215, customers: 178, target: 400000 },
    { month: "August", revenue: 450000, bookings: 234, customers: 198, target: 450000 },
    { month: "September", revenue: 380000, bookings: 198, customers: 167, target: 400000 },
    { month: "October", revenue: 320000, bookings: 167, customers: 145, target: 350000 },
    { month: "November", revenue: 280000, bookings: 145, customers: 123, target: 300000 },
    { month: "December", revenue: 245680, bookings: 123, customers: 105, target: 280000 },
  ]

  const yearlyComparison = [
    { metric: "Total Revenue", current: "3,595,680 MAD", previous: "2,890,000 MAD", change: "+24.4%" },
    { metric: "Total Bookings", current: "1,858", previous: "1,456", change: "+27.6%" },
    { metric: "New Customers", current: "1,563", previous: "1,234", change: "+26.7%" },
    { metric: "Avg. Booking Value", current: "1,935 MAD", previous: "1,985 MAD", change: "-2.5%" },
    { metric: "Customer Retention", current: "42%", previous: "38%", change: "+10.5%" },
    { metric: "Refund Rate", current: "2.3%", previous: "3.1%", change: "-25.8%" },
  ]

  const kpis = [
    { name: "Revenue Target", current: 3595680, target: 4000000, unit: "MAD" },
    { name: "Bookings Target", current: 1858, target: 2000, unit: "" },
    { name: "Customer Satisfaction", current: 4.7, target: 4.8, unit: "/5" },
    { name: "Response Time", current: 2.5, target: 2, unit: "min" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Monthly Performance</h1>
          <p className="text-muted-foreground">Track monthly metrics and KPIs</p>
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 rounded-md border border-input bg-background">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const percentage = (kpi.current / kpi.target) * 100
          const isOnTrack = percentage >= 90
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">{kpi.name}</p>
                  <Target className={`h-4 w-4 ${isOnTrack ? "text-green-500" : "text-amber-500"}`} />
                </div>
                <p className="text-2xl font-bold">
                  {typeof kpi.current === "number" && kpi.current > 1000 
                    ? kpi.current.toLocaleString() 
                    : kpi.current}{kpi.unit}
                </p>
                <p className="text-sm text-muted-foreground">
                  Target: {typeof kpi.target === "number" && kpi.target > 1000 
                    ? kpi.target.toLocaleString() 
                    : kpi.target}{kpi.unit}
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>{percentage.toFixed(1)}%</span>
                    <span className={isOnTrack ? "text-green-600" : "text-amber-600"}>
                      {isOnTrack ? "On Track" : "Behind"}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isOnTrack ? "bg-green-500" : "bg-amber-500"}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Monthly Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Breakdown - 2024
          </CardTitle>
          <CardDescription>Detailed monthly performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Month</th>
                  <th className="text-left p-3 font-medium">Revenue</th>
                  <th className="text-left p-3 font-medium">Target</th>
                  <th className="text-left p-3 font-medium">Achievement</th>
                  <th className="text-left p-3 font-medium">Bookings</th>
                  <th className="text-left p-3 font-medium">New Customers</th>
                  <th className="text-left p-3 font-medium">Avg. Value</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((month, index) => {
                  const achievement = (month.revenue / month.target) * 100
                  const avgValue = Math.round(month.revenue / month.bookings)
                  return (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{month.month}</td>
                      <td className="p-3">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {month.revenue.toLocaleString()} MAD
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {month.target.toLocaleString()} MAD
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                achievement >= 100 ? "bg-green-500" :
                                achievement >= 90 ? "bg-blue-500" :
                                achievement >= 75 ? "bg-amber-500" : "bg-red-500"
                              }`}
                              style={{ width: `${Math.min(achievement, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm">{achievement.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {month.bookings}
                        </span>
                      </td>
                      <td className="p-3">{month.customers}</td>
                      <td className="p-3">{avgValue.toLocaleString()} MAD</td>
                      <td className="p-3">
                        {achievement >= 100 ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            Exceeded
                          </span>
                        ) : achievement >= 90 ? (
                          <span className="flex items-center gap-1 text-blue-600">
                            <TrendingUp className="h-4 w-4" />
                            On Track
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-600">
                            <TrendingDown className="h-4 w-4" />
                            Below
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-muted/50 font-bold">
                  <td className="p-3">Total / Average</td>
                  <td className="p-3">3,595,680 MAD</td>
                  <td className="p-3">3,480,000 MAD</td>
                  <td className="p-3">103.3%</td>
                  <td className="p-3">1,858</td>
                  <td className="p-3">1,563</td>
                  <td className="p-3">1,935 MAD</td>
                  <td className="p-3 text-green-600">Exceeded</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Year over Year Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Year-over-Year Comparison
          </CardTitle>
          <CardDescription>2024 vs 2023 performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {yearlyComparison.map((item, index) => {
              const isPositive = item.change.startsWith("+")
              const isNegativeGood = item.metric === "Refund Rate"
              const isGood = isNegativeGood ? !isPositive : isPositive
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">{item.metric}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold">{item.current}</p>
                      <p className="text-sm text-muted-foreground">vs {item.previous}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-lg font-medium ${
                      isGood ? "text-green-600" : "text-red-600"
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="h-5 w-5" />
                      ) : (
                        <TrendingDown className="h-5 w-5" />
                      )}
                      {item.change}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
