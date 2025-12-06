"use client"

import { Search, User, Edit, Calendar, MapPin, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const profiles = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 234 567 8901",
    country: "United States",
    joinedAt: "2024-01-15",
    lastActive: "2024-12-10",
    preferences: ["Desert Tours", "Adventure"],
    savedPaymentMethods: 2,
    completeness: 95,
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 987 654 3210",
    country: "United Kingdom",
    joinedAt: "2024-03-22",
    lastActive: "2024-12-11",
    preferences: ["Cultural Tours", "City Tours"],
    savedPaymentMethods: 1,
    completeness: 80,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@email.com",
    phone: "+44 789 123 4567",
    country: "France",
    joinedAt: "2024-06-10",
    lastActive: "2024-12-08",
    preferences: ["Beach", "Relaxation"],
    savedPaymentMethods: 0,
    completeness: 60,
  },
]

export default function UserProfilesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Profiles</h1>
        <p className="text-muted-foreground">View and manage user profile information</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search profiles..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Profiles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <Card key={profile.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{profile.name}</CardTitle>
                    <CardDescription>{profile.email}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {profile.country}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined {profile.joinedAt}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  {profile.savedPaymentMethods} saved payment methods
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Preferences</p>
                <div className="flex flex-wrap gap-1">
                  {profile.preferences.map((pref) => (
                    <Badge key={pref} variant="secondary" className="text-xs">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Profile Completeness</span>
                  <span className="font-medium">{profile.completeness}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${profile.completeness}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                Last active: {profile.lastActive}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
