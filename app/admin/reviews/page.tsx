"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
        <p className="text-sm text-muted-foreground">Manage customer reviews and ratings.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Customer reviews and ratings will appear here once they start leaving feedback.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
