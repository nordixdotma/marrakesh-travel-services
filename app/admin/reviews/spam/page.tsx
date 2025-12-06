"use client"

import { Flag, Trash2, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const spamReports = [
  {
    id: 1,
    review: {
      customer: "Unknown User",
      service: "Sahara Desert Tour",
      content: "Buy cheap pills online! Visit www.spam-site.com for great deals!",
      rating: 1,
    },
    reportedBy: "System (Auto-detected)",
    reason: "Spam content detected - promotional links",
    reportedAt: "2024-12-10 08:30",
  },
  {
    id: 2,
    review: {
      customer: "Fake Account",
      service: "Marrakech City Tour",
      content: "This is the worst company ever. They stole my money and the guides were horrible. DO NOT BOOK WITH THEM!!!",
      rating: 1,
    },
    reportedBy: "John Smith",
    reason: "Suspected fake review - no booking record found",
    reportedAt: "2024-12-09 14:20",
  },
  {
    id: 3,
    review: {
      customer: "Competitor Account",
      service: "Airport Transfer",
      content: "Terrible service. Use XYZ Transfers instead, they are much better and cheaper!",
      rating: 1,
    },
    reportedBy: "Admin",
    reason: "Competitor promotion",
    reportedAt: "2024-12-08 11:45",
  },
]

export default function SpamReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Spam Reports</h1>
        <p className="text-muted-foreground">Handle reported and suspicious reviews</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Flag className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{spamReports.length}</div>
              <p className="text-sm text-muted-foreground">Active Reports</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Auto-detected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Trash2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">45</div>
              <p className="text-sm text-muted-foreground">Removed This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spam Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-600" />
            Reported Reviews
          </CardTitle>
          <CardDescription>Review and take action on flagged content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spamReports.map((report) => (
              <div
                key={report.id}
                className="border border-red-200 bg-red-50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{report.review.customer}</span>
                      <Badge variant="destructive">Reported</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.review.service}</p>
                  </div>
                  <Badge variant="outline" className="text-red-600">
                    Rating: {report.review.rating}/5
                  </Badge>
                </div>

                <div className="bg-white border border-red-100 rounded p-3 mb-3">
                  <p className="text-sm italic">&quot;{report.review.content}&quot;</p>
                </div>

                <div className="bg-red-100 rounded p-3 mb-4">
                  <p className="text-sm">
                    <strong>Reason:</strong> {report.reason}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reported by: {report.reportedBy} on {report.reportedAt}
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Safe
                  </Button>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
