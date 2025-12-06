"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Star, Calendar, Download, Eye, DollarSign, Users } from "lucide-react"

export default function TopToursPage() {
  const topTours = [
    { 
      rank: 1,
      name: "3-Day Sahara Desert Adventure",
      category: "Desert Tours",
      bookings: 234,
      revenue: "468,000 MAD",
      avgRating: 4.9,
      reviews: 189,
      views: 12456,
      conversionRate: "3.2%",
      growth: "+18%",
      image: "/tours/sahara.jpg"
    },
    { 
      rank: 2,
      name: "Essaouira Day Trip",
      category: "Day Excursions",
      bookings: 189,
      revenue: "283,500 MAD",
      avgRating: 4.8,
      reviews: 156,
      views: 9876,
      conversionRate: "2.8%",
      growth: "+12%",
      image: "/tours/essaouira.jpg"
    },
    { 
      rank: 3,
      name: "Ourika Valley & Waterfalls",
      category: "Day Excursions",
      bookings: 156,
      revenue: "156,000 MAD",
      avgRating: 4.7,
      reviews: 134,
      views: 8543,
      conversionRate: "2.5%",
      growth: "+8%",
      image: "/tours/ourika.jpg"
    },
    { 
      rank: 4,
      name: "Ait Benhaddou & Ouarzazate",
      category: "Day Excursions",
      bookings: 134,
      revenue: "201,000 MAD",
      avgRating: 4.8,
      reviews: 112,
      views: 7654,
      conversionRate: "2.4%",
      growth: "+5%",
      image: "/tours/ait-benhaddou.jpg"
    },
    { 
      rank: 5,
      name: "Hot Air Balloon Ride",
      category: "Activities",
      bookings: 98,
      revenue: "196,000 MAD",
      avgRating: 4.9,
      reviews: 87,
      views: 6543,
      conversionRate: "2.1%",
      growth: "+22%",
      image: "/tours/balloon.jpg"
    },
    { 
      rank: 6,
      name: "Atlas Mountains Day Trek",
      category: "Day Excursions",
      bookings: 87,
      revenue: "130,500 MAD",
      avgRating: 4.6,
      reviews: 76,
      views: 5432,
      conversionRate: "2.2%",
      growth: "+3%",
      image: "/tours/atlas.jpg"
    },
    { 
      rank: 7,
      name: "Quad Biking in Palmeraie",
      category: "Activities",
      bookings: 76,
      revenue: "114,000 MAD",
      avgRating: 4.5,
      reviews: 65,
      views: 4321,
      conversionRate: "2.4%",
      growth: "+10%",
      image: "/tours/quad.jpg"
    },
    { 
      rank: 8,
      name: "Agafay Desert Sunset",
      category: "Activities",
      bookings: 65,
      revenue: "97,500 MAD",
      avgRating: 4.7,
      reviews: 54,
      views: 3210,
      conversionRate: "2.8%",
      growth: "+15%",
      image: "/tours/agafay.jpg"
    },
  ]

  const categoryStats = [
    { category: "Desert Tours", bookings: 345, revenue: "789,000 MAD", percentage: 35 },
    { category: "Day Excursions", bookings: 567, revenue: "680,000 MAD", percentage: 45 },
    { category: "Activities", bookings: 239, revenue: "407,500 MAD", percentage: 15 },
    { category: "Transfers", bookings: 83, revenue: "123,500 MAD", percentage: 5 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Top Tours & Experiences</h1>
          <p className="text-muted-foreground">Best performing tours and activities</p>
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 rounded-md border border-input bg-background">
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categoryStats.map((cat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">{cat.category}</p>
                <span className="text-xs text-muted-foreground">{cat.percentage}%</span>
              </div>
              <p className="text-2xl font-bold">{cat.bookings}</p>
              <p className="text-sm text-muted-foreground">{cat.revenue}</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden mt-3">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Tours Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Tour Rankings
          </CardTitle>
          <CardDescription>Ranked by total bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Rank</th>
                  <th className="text-left p-3 font-medium">Tour</th>
                  <th className="text-left p-3 font-medium">Category</th>
                  <th className="text-left p-3 font-medium">Bookings</th>
                  <th className="text-left p-3 font-medium">Revenue</th>
                  <th className="text-left p-3 font-medium">Rating</th>
                  <th className="text-left p-3 font-medium">Views</th>
                  <th className="text-left p-3 font-medium">Conv. Rate</th>
                  <th className="text-left p-3 font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topTours.map((tour) => (
                  <tr key={tour.rank} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        tour.rank === 1 ? "bg-amber-100 text-amber-700" :
                        tour.rank === 2 ? "bg-gray-100 text-gray-700" :
                        tour.rank === 3 ? "bg-orange-100 text-orange-700" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {tour.rank}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{tour.name}</p>
                          <p className="text-xs text-muted-foreground">{tour.reviews} reviews</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm px-2 py-1 bg-muted rounded-full">
                        {tour.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{tour.bookings}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{tour.revenue}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{tour.avgRating}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{tour.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{tour.conversionRate}</td>
                    <td className="p-3">
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        {tour.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Highest Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Hot Air Balloon Ride</p>
                <p className="text-2xl font-bold text-green-600">+22%</p>
                <p className="text-sm text-muted-foreground">Month over month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Highest Rated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">3-Day Sahara Desert Adventure</p>
                <p className="text-2xl font-bold text-amber-600">4.9 ★</p>
                <p className="text-sm text-muted-foreground">189 reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Best Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">3-Day Sahara Desert Adventure</p>
                <p className="text-2xl font-bold text-blue-600">3.2%</p>
                <p className="text-sm text-muted-foreground">Views to bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
