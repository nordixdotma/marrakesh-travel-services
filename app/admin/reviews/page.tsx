"use client"

import { useState, useMemo, useEffect } from "react"
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
  Loader2,
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
import { adminApi } from "@/lib/api"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

type ReviewStatus = "all" | "pending" | "approved" | "rejected"

interface Review {
  id: string
  userId: string
  offerId: string
  offerType: string
  offerTitle: string
  userName: string
  userEmail?: string
  rating: number
  comment: string
  status: string
  createdAt: string
}

export default function AdminReviewsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ReviewStatus>("all")
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        setError(null)
        const status = statusFilter !== "all" ? statusFilter : undefined
        const response = await adminApi.getReviews(status)
        setReviews(response.reviews || [])
      } catch (err: any) {
        console.error('Error fetching reviews:', err)
        setError(err.message || 'Failed to load reviews')
        toast.error('Failed to load reviews', {
          description: err.message || 'Please try again later',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [statusFilter])

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((review) => {
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
  }, [searchQuery, reviews])

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
    // TODO: Implement approve API call
    toast.info(t.admin?.common?.actions + ' coming soon')
  }

  const handleReject = (id: string) => {
    if (confirm(t.admin?.reviews?.rejectConfirm || "Are you sure you want to reject this review?")) {
      // TODO: Implement reject API call
      toast.info(t.admin?.common?.actions + ' coming soon')
    }
  }

  const handleDelete = (id: string) => {
    if (confirm(t.admin?.reviews?.deleteConfirm || "Are you sure you want to delete this review?")) {
      // TODO: Implement delete API call
      toast.info(t.admin?.common?.actions + ' coming soon')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/10 rounded-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">{t.admin?.reviews?.errorLoading || "Error loading reviews"}</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-sm">
            {t.admin?.dashboard?.retry || "Retry"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.admin?.reviews?.title || "Reviews"}</h1>
        <p className="text-sm text-muted-foreground">
          {t.admin?.reviews?.description?.replace('{count}', String(reviews.length)) || `Manage customer reviews and ratings. ${reviews.length} total reviews.`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.admin?.reviews?.searchPlaceholder || "Search reviews..."}
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
              <SelectValue placeholder={t.admin?.common?.status || "Status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.admin?.reviews?.statusAll || "All Status"}</SelectItem>
              <SelectItem value="pending">{t.admin?.reviews?.statusPending || "Pending"}</SelectItem>
              <SelectItem value="approved">{t.admin?.reviews?.statusApproved || "Approved"}</SelectItem>
              <SelectItem value="rejected">{t.admin?.reviews?.statusRejected || "Rejected"}</SelectItem>
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
                          <Badge variant="secondary" className={getStatusColor(review.status.toLowerCase())}>
                            {review.status.toLowerCase()}
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
                    <span className="text-muted-foreground">{t.admin?.reviews?.reviewed || "Reviewed"}:</span>
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
                    {review.status.toLowerCase() === "pending" && (
                      <>
                          <Button
                            size="sm"
                            className="gap-1 rounded-sm"
                            onClick={() => handleApprove(review.id)}
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            {t.admin?.reviews?.approve || "Approve"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive hover:text-destructive rounded-sm"
                            onClick={() => handleReject(review.id)}
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            {t.admin?.reviews?.reject || "Reject"}
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
                      {t.admin?.reviews?.delete || t.admin?.common?.delete || "Delete"}
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
            <h3 className="text-lg font-semibold mb-2">{t.admin?.reviews?.noReviewsFound || "No reviews found"}</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery || statusFilter !== "all"
                ? (t.admin?.reviews?.noMatch || "No reviews match your search criteria. Try different filters.")
                : (t.admin?.reviews?.emptyState || "Customer reviews and ratings will appear here once they start leaving feedback.")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
