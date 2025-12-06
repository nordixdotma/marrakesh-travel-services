"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Star, ThumbsUp, Flag, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const reviews = [
  {
    id: 1,
    customer: "John Smith",
    service: "Sahara Desert 3-Day Adventure",
    rating: 5,
    title: "Amazing experience!",
    content: "The tour was absolutely incredible. Our guide Mohamed was fantastic and very knowledgeable. The desert camping under the stars was unforgettable.",
    date: "2024-12-10",
    status: "approved",
    helpful: 12,
  },
  {
    id: 2,
    customer: "Emma Wilson",
    service: "Marrakech City Tour",
    rating: 4,
    title: "Great city tour with minor issues",
    content: "Really enjoyed the medina walk and the food tasting. The only downside was the crowded souks. Would recommend going early morning.",
    date: "2024-12-09",
    status: "pending",
    helpful: 5,
  },
  {
    id: 3,
    customer: "Michael Brown",
    service: "Airport Transfer",
    rating: 5,
    title: "Professional and punctual",
    content: "Driver was waiting at arrivals with a sign. Clean car and safe driving. Will use again!",
    date: "2024-12-08",
    status: "approved",
    helpful: 8,
  },
  {
    id: 4,
    customer: "Sarah Davis",
    service: "Hot Air Balloon Ride",
    rating: 2,
    title: "Canceled due to weather",
    content: "Unfortunately our ride was canceled due to weather. While I understand safety comes first, the refund process was slow.",
    date: "2024-12-07",
    status: "flagged",
    helpful: 3,
  },
]

const stats = [
  { label: "Total Reviews", value: "1,234" },
  { label: "Average Rating", value: "4.7" },
  { label: "Pending Approval", value: "23" },
  { label: "Flagged", value: "5" },
]

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReviews = reviews.filter(
    (review) =>
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
          <p className="text-muted-foreground">Manage customer reviews and feedback</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/reviews/pending">
            <Button variant="outline">Pending (23)</Button>
          </Link>
          <Link href="/admin/reviews/spam">
            <Button variant="outline" className="text-destructive">Spam Reports (5)</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.customer}</span>
                      <Badge
                        variant={
                          review.status === "approved"
                            ? "default"
                            : review.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className={review.status === "approved" ? "bg-green-600" : ""}
                      >
                        {review.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.service}</p>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem>Reply</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <h4 className="font-medium mb-2">{review.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{review.content}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {review.helpful} found helpful
                    </span>
                    {review.status === "flagged" && (
                      <span className="flex items-center gap-1 text-red-600">
                        <Flag className="h-3 w-3" />
                        Flagged for review
                      </span>
                    )}
                  </div>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
