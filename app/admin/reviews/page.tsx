"use client"

import { useState, useMemo } from "react"
import {
  Star,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  User,
  Package,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { reviews } from "@/lib/admin-data"

type ReviewStatus = "all" | "pending" | "approved" | "rejected"

export default function AdminReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ReviewStatus>("all")

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((review) => {
        // Status filter
        if (statusFilter !== "all" && review.status !== statusFilter) return false

        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          return (
            review.userName.toLowerCase().includes(query) ||
            review.offerTitle.toLowerCase().includes(query) ||
            review.comment.toLowerCase().includes(query)
          )
        }
        return true
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [searchQuery, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "rejected":
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    )
  }

  const handleApprove = (id: string) => {
    alert(`Review ${id} approved! (Demo)`)
  }

  const handleReject = (id: string) => {
    if (confirm("Are you sure you want to reject this review?")) {
      alert(`Review ${id} rejected! (Demo)`)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      alert(`Review ${id} deleted! (Demo)`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
        <p className="text-sm text-muted-foreground">
          Manage customer reviews and ratings. {reviews.length} total reviews.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-sm bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as ReviewStatus)}
          >
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:bg-muted/30 transition-colors rounded-sm bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{review.userName}</h3>
                          <Badge variant="secondary" className={getStatusColor(review.status)}>
                            {review.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground">
                            ({review.rating}/5)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Offer Info */}
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Reviewed:</span>
                    <span className="font-medium">{review.offerTitle}</span>
                    <Badge variant="outline" className="capitalize text-xs">
                      {review.offerType}
                    </Badge>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-sm">
                    &quot;{review.comment}&quot;
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    {review.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="gap-1 rounded-sm"
                          onClick={() => handleApprove(review.id)}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive rounded-sm"
                          onClick={() => handleReject(review.id)}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto rounded-sm"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery || statusFilter !== "all"
                ? "No reviews match your search criteria. Try different filters."
                : "Customer reviews and ratings will appear here once they start leaving feedback."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
