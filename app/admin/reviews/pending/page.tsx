"use client"

import { CheckCircle, XCircle, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pendingReviews = [
  {
    id: 1,
    customer: "Emma Wilson",
    service: "Marrakech City Tour",
    rating: 4,
    title: "Great city tour with minor issues",
    content: "Really enjoyed the medina walk and the food tasting. The only downside was the crowded souks. Would recommend going early morning.",
    date: "2024-12-09",
    bookingId: "BK045",
  },
  {
    id: 2,
    customer: "Robert Chen",
    service: "Essaouira Day Trip",
    rating: 5,
    title: "Perfect day trip!",
    content: "Beautiful coastal town, great seafood lunch, and our guide was super friendly. The 3 hour drive was comfortable in the minivan.",
    date: "2024-12-08",
    bookingId: "BK052",
  },
  {
    id: 3,
    customer: "Lisa Martinez",
    service: "Atlas Mountains Excursion",
    rating: 5,
    title: "Breathtaking views",
    content: "The mountain scenery was incredible. We visited a Berber village and had traditional mint tea. Highly recommend this experience!",
    date: "2024-12-07",
    bookingId: "BK061",
  },
]

export default function PendingReviewsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Pending Reviews</h1>
        <p className="text-muted-foreground">Approve or reject customer reviews</p>
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{pendingReviews.length} Reviews</div>
              <p className="text-sm text-muted-foreground">Awaiting moderation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews to Moderate</CardTitle>
          <CardDescription>Review content before publishing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <div
                key={review.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.customer}</span>
                      <Badge variant="outline">Booking: {review.bookingId}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.service}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h4 className="font-medium mb-2">{review.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{review.content}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Submitted: {review.date}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
