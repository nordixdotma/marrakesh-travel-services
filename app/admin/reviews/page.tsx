"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Star, ThumbsUp, Flag, MoreHorizontal, Check, Reply, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const reviews = [
  {
    id: 1,
    customer: "John Smith",
    service: "Sahara Desert 3-Day Adventure",
    rating: 5,
    title: "Amazing experience!",
    content: "The tour was absolutely incredible. Our guide Mohamed was fantastic and very knowledgeable. The desert camping under the stars was unforgettable.",
    date: "Dec 10, 2024",
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
    date: "Dec 09, 2024",
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
    date: "Dec 08, 2024",
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
    date: "Dec 07, 2024",
    status: "flagged",
    helpful: 3,
  },
]

const stats = [
  { label: "Total Reviews", value: "1,234" },
  { label: "Avg Rating", value: "4.7", icon: "★" },
  { label: "Pending", value: "23" },
  { label: "Flagged", value: "5" },
]

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
          <p className="text-sm text-muted-foreground">Manage customer reviews and ratings</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/reviews/pending">
            <Button variant="outline" size="sm">Pending (23)</Button>
          </Link>
          <Link href="/admin/reviews/spam">
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30">
              <Flag className="h-4 w-4 mr-2" />
              Spam (5)
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.icon && <span className="text-amber-500">{stat.icon}</span>}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[130px] h-9">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="rating-high">Rating ↓</SelectItem>
            <SelectItem value="rating-low">Rating ↑</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">
                      {review.customer.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium">{review.customer}</span>
                      <Badge
                        variant="secondary"
                        className={
                          review.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                            : review.status === "pending"
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                            : "bg-red-50 text-red-700 hover:bg-red-50"
                        }
                      >
                        {review.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating ? "fill-current" : "fill-none opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <h4 className="font-medium mb-1.5">{review.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{review.content}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {review.helpful} helpful
                  </span>
                  {review.status === "flagged" && (
                    <span className="flex items-center gap-1 text-red-600">
                      <Flag className="h-3.5 w-3.5" />
                      Flagged for review
                    </span>
                  )}
                </div>
                <span>{review.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
