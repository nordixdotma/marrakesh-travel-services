"use client"

import { Ticket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminPromoCodesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Promo Codes</h1>
        <p className="text-sm text-muted-foreground">Manage discount codes and promotions.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed rounded-sm bg-white">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Ticket className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No promo codes yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Your promotional codes and discounts will appear here once you create them.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
