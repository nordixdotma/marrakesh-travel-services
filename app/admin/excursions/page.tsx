"use client"

import { Compass } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminExcursionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Excursions</h1>
        <p className="text-sm text-muted-foreground">Manage your day trips and excursions.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Compass className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No excursions yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Your excursions will appear here once you start adding them to your catalog.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
