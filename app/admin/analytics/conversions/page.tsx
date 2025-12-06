"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Eye, MousePointer, ShoppingCart, CreditCard, Download, Filter } from "lucide-react"

export default function ConversionsPage() {
  const conversionFunnel = [
    { stage: "Website Visits", count: 45678, percentage: 100, dropoff: 0 },
    { stage: "Tour Pages Viewed", count: 23456, percentage: 51.4, dropoff: 48.6 },
    { stage: "Added to Cart", count: 4567, percentage: 10.0, dropoff: 80.5 },
    { stage: "Started Checkout", count: 2345, percentage: 5.1, dropoff: 48.6 },
    { stage: "Completed Booking", count: 1858, percentage: 4.1, dropoff: 20.8 },
  ]

  const conversionBySource = [
    { source: "Google Search", visits: 15987, conversions: 567, rate: "3.55%" },
    { source: "TripAdvisor", visits: 8765, conversions: 345, rate: "3.94%" },
    { source: "Direct", visits: 6543, conversions: 289, rate: "4.42%" },
    { source: "Facebook", visits: 5432, conversions: 178, rate: "3.28%" },
    { source: "Instagram", visits: 4321, conversions: 156, rate: "3.61%" },
    { source: "Google Ads", visits: 3456, conversions: 234, rate: "6.77%" },
    { source: "Email", visits: 1234, conversions: 89, rate: "7.21%" },
  ]

  const conversionByDevice = [
    { device: "Mobile", visits: 25678, conversions: 876, rate: "3.41%", percentage: 56 },
    { device: "Desktop", visits: 15432, conversions: 743, rate: "4.82%", percentage: 34 },
    { device: "Tablet", visits: 4568, conversions: 239, rate: "5.23%", percentage: 10 },
  ]

  const abandonmentReasons = [
    { reason: "High price", percentage: 35 },
    { reason: "Just browsing", percentage: 28 },
    { reason: "Complicated checkout", percentage: 15 },
    { reason: "No preferred payment", percentage: 12 },
    { reason: "Technical issues", percentage: 7 },
    { reason: "Other", percentage: 3 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Conversion Statistics</h1>
          <p className="text-muted-foreground">Analyze your conversion funnel and optimize performance</p>
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 rounded-md border border-input bg-background">
            <option value="30">Last 30 Days</option>
            <option value="60">Last 60 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">45,678</p>
                <p className="text-sm text-muted-foreground">Total Visits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">4,567</p>
                <p className="text-sm text-muted-foreground">Cart Additions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,858</p>
                <p className="text-sm text-muted-foreground">Completed Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.07%</p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Conversion Funnel
          </CardTitle>
          <CardDescription>Customer journey from visit to booking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4">
                  <div className="w-48 flex-shrink-0">
                    <p className="font-medium">{stage.stage}</p>
                    <p className="text-sm text-muted-foreground">{stage.count.toLocaleString()}</p>
                  </div>
                  <div className="flex-1">
                    <div className="h-10 bg-muted rounded-lg overflow-hidden relative">
                      <div 
                        className={`h-full rounded-lg transition-all ${
                          index === 0 ? "bg-blue-500" :
                          index === 1 ? "bg-indigo-500" :
                          index === 2 ? "bg-purple-500" :
                          index === 3 ? "bg-pink-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${stage.percentage}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                        {stage.percentage}%
                      </span>
                    </div>
                  </div>
                  {index < conversionFunnel.length - 1 && (
                    <div className="w-24 text-right">
                      <span className="text-sm text-red-500">-{stage.dropoff}%</span>
                    </div>
                  )}
                </div>
                {index < conversionFunnel.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion by Source */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5" />
              Conversion by Traffic Source
            </CardTitle>
            <CardDescription>Which channels convert best</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium text-sm">Source</th>
                    <th className="text-left p-2 font-medium text-sm">Visits</th>
                    <th className="text-left p-2 font-medium text-sm">Conversions</th>
                    <th className="text-left p-2 font-medium text-sm">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {conversionBySource.map((source, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 text-sm font-medium">{source.source}</td>
                      <td className="p-2 text-sm">{source.visits.toLocaleString()}</td>
                      <td className="p-2 text-sm">{source.conversions}</td>
                      <td className="p-2">
                        <span className={`text-sm font-medium ${
                          parseFloat(source.rate) >= 5 ? "text-green-600" :
                          parseFloat(source.rate) >= 3 ? "text-blue-600" :
                          "text-amber-600"
                        }`}>
                          {source.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Conversion by Device */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion by Device</CardTitle>
            <CardDescription>Performance across different devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {conversionByDevice.map((device, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{device.device}</p>
                      <p className="text-sm text-muted-foreground">
                        {device.visits.toLocaleString()} visits • {device.conversions} conversions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{device.rate}</p>
                      <p className="text-sm text-muted-foreground">{device.percentage}% of traffic</p>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        index === 0 ? "bg-blue-500" :
                        index === 1 ? "bg-green-500" :
                        "bg-purple-500"
                      }`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart Abandonment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Cart Abandonment Analysis</CardTitle>
          <CardDescription>Why customers don't complete their booking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                {abandonmentReasons.map((reason, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{reason.reason}</span>
                      <span className="text-sm text-muted-foreground">{reason.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-400 rounded-full"
                        style={{ width: `${reason.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium mb-2">Key Insights</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 59.3% of abandonments happen during checkout</li>
                  <li>• Mobile users have 2x higher abandonment rate</li>
                  <li>• Most abandonments occur between 8-10 PM</li>
                  <li>• Desert tours have lowest abandonment (15%)</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-800 mb-2">Recommendations</p>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Add payment plans for high-price tours</li>
                  <li>• Simplify mobile checkout flow</li>
                  <li>• Send abandonment recovery emails</li>
                  <li>• Display trust badges prominently</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
