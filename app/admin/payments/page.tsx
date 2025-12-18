"use client"

import { CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">Manage payments and transactions.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed rounded-sm bg-white">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No payments yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Payment transactions will appear here once you start processing orders.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
