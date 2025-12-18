"use client"

import { Map } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminToursPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tours</h1>
        <p className="text-sm text-muted-foreground">Manage your tours and packages.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Map className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No tours yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Your tours will appear here once you start adding them to your catalog.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
