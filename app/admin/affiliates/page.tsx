"use client"

import { Users2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminAffiliatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Affiliates</h1>
        <p className="text-sm text-muted-foreground">Manage affiliate partners and commissions.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No affiliates yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Your affiliate partners will appear here once they join your program.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
