"use client"

import { Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">Manage registered users and accounts.</p>
      </div>

      {/* Empty State */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No users yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Registered users will appear here once customers create accounts.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
