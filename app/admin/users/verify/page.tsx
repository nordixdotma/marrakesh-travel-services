"use client"

import { CheckCircle, XCircle, User, Mail, Phone, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pendingVerifications = [
  {
    id: 1,
    name: "Michael Brown",
    email: "michael.b@email.com",
    phone: "+44 789 123 4567",
    requestedAt: "2024-12-10 14:30",
    type: "Email Verification",
    documents: [],
  },
  {
    id: 2,
    name: "Anna Lee",
    email: "anna.lee@email.com",
    phone: "+82 10 1234 5678",
    requestedAt: "2024-12-10 11:15",
    type: "Phone Verification",
    documents: [],
  },
  {
    id: 3,
    name: "David Park",
    email: "david.park@email.com",
    phone: "+1 310 555 1234",
    requestedAt: "2024-12-09 16:45",
    type: "ID Verification",
    documents: ["passport.pdf", "selfie.jpg"],
  },
]

export default function VerifyAccountsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Verify Accounts</h1>
        <p className="text-muted-foreground">Review and verify user account requests</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{pendingVerifications.length}</div>
              <p className="text-sm text-muted-foreground">Pending Verification</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">156</div>
              <p className="text-sm text-muted-foreground">Verified Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Rejected Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Verifications */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Verifications</CardTitle>
          <CardDescription>Review and approve user verifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingVerifications.map((user) => (
              <div
                key={user.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge variant="outline">{user.type}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Requested: {user.requestedAt}
                        </div>
                      </div>
                      {user.documents.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {user.documents.map((doc) => (
                            <Badge key={doc} variant="secondary" className="cursor-pointer">
                              📄 {doc}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
