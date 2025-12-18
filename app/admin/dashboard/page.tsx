"use client"

import { LayoutDashboard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome to the admin dashboard.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <LayoutDashboard className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No dashboard data yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Dashboard statistics and analytics will appear here once you start receiving bookings and data.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
