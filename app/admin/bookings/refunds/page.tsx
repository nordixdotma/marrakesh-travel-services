"use client"

import { Search, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const refunds = [
  {
    id: "RF001",
    bookingId: "BK004",
    customer: "Sarah Davis",
    service: "Hot Air Balloon Ride",
    amount: "$360",
    requestedAt: "2024-12-10 11:20",
    status: "completed",
    processedAt: "2024-12-10 14:30",
    method: "Credit Card",
    reason: "Weather conditions - activity canceled",
  },
  {
    id: "RF002",
    bookingId: "BK008",
    customer: "Tom Wilson",
    service: "Sahara Desert Tour",
    amount: "$450",
    requestedAt: "2024-12-09 08:30",
    status: "completed",
    processedAt: "2024-12-09 16:45",
    method: "PayPal",
    reason: "Customer request - change of plans",
  },
  {
    id: "RF003",
    bookingId: "BK009",
    customer: "Anna Lee",
    service: "Airport Transfer",
    amount: "$35",
    requestedAt: "2024-12-11 22:00",
    status: "pending",
    processedAt: null,
    method: "Credit Card",
    reason: "Flight canceled",
  },
  {
    id: "RF004",
    bookingId: "BK010",
    customer: "David Park",
    service: "City Tour",
    amount: "$120",
    requestedAt: "2024-12-11 10:00",
    status: "processing",
    processedAt: null,
    method: "CMI",
    reason: "Medical emergency",
  },
]

export default function RefundsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manage Refunds</h1>
        <p className="text-muted-foreground">Process and track booking refunds</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <p className="text-sm text-muted-foreground">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">86</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">$4,250</div>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search refunds..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Refunds List */}
      <Card>
        <CardHeader>
          <CardTitle>All Refunds</CardTitle>
          <CardDescription>Manage refund requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {refunds.map((refund) => (
              <div
                key={refund.id}
                className="flex items-start justify-between p-4 border border-border rounded-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">{refund.id}</span>
                    <Badge variant="outline">Booking: {refund.bookingId}</Badge>
                    <Badge
                      variant={
                        refund.status === "completed"
                          ? "default"
                          : refund.status === "processing"
                          ? "secondary"
                          : "outline"
                      }
                      className={refund.status === "completed" ? "bg-green-600" : ""}
                    >
                      {refund.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {refund.status === "processing" && <Clock className="h-3 w-3 mr-1" />}
                      {refund.status === "pending" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="font-medium">{refund.service}</p>
                  <p className="text-sm text-muted-foreground">
                    Customer: {refund.customer} | Method: {refund.method}
                  </p>
                  <div className="bg-muted p-2 rounded text-sm">
                    <strong>Reason:</strong> {refund.reason}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Requested: {refund.requestedAt}
                    {refund.processedAt && ` | Processed: ${refund.processedAt}`}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-xl font-bold">{refund.amount}</div>
                  {refund.status === "pending" && (
                    <div className="space-y-1">
                      <Button size="sm" className="w-full">Process Refund</Button>
                      <Button size="sm" variant="outline" className="w-full">Reject</Button>
                    </div>
                  )}
                  {refund.status === "processing" && (
                    <Button size="sm" variant="outline">View Details</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
