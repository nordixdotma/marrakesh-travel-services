"use client"

import { CalendarCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-sm text-muted-foreground">Manage customer bookings and reservations.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <CalendarCheck className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Customer bookings will appear here once you start receiving reservations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
