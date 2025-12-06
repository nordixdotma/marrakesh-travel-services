"use client"

import { AlertTriangle, RefreshCw, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const issues = [
  {
    id: "ISS001",
    type: "Failed Payment",
    transactionId: "TXN007",
    customer: "Lisa Martinez",
    amount: "$45",
    date: "2024-12-08 22:00",
    error: "Card declined - Insufficient funds",
    status: "open",
    priority: "medium",
  },
  {
    id: "ISS002",
    type: "Chargeback",
    transactionId: "TXN045",
    customer: "Mark Thompson",
    amount: "$280",
    date: "2024-12-07 14:30",
    error: "Customer disputed charge - unauthorized transaction",
    status: "investigating",
    priority: "high",
  },
  {
    id: "ISS003",
    type: "Refund Failed",
    transactionId: "TXN032",
    customer: "Amy Chen",
    amount: "$120",
    date: "2024-12-06 10:15",
    error: "Refund could not be processed - original payment method expired",
    status: "open",
    priority: "high",
  },
]

const stats = [
  { label: "Open Issues", value: 3, color: "text-red-600" },
  { label: "Investigating", value: 1, color: "text-yellow-600" },
  { label: "Resolved Today", value: 5, color: "text-green-600" },
  { label: "Total Value at Risk", value: "$445", color: "text-primary" },
]

export default function PaymentIssuesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Payment Issues</h1>
        <p className="text-muted-foreground">Manage failed payments and disputes</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Issues List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Active Issues ({issues.length})
          </CardTitle>
          <CardDescription>Payment problems requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        issue.priority === "high"
                          ? "bg-red-100"
                          : issue.priority === "medium"
                          ? "bg-yellow-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-5 w-5 ${
                          issue.priority === "high"
                            ? "text-red-600"
                            : issue.priority === "medium"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">{issue.id}</span>
                        <Badge variant={issue.priority === "high" ? "destructive" : "secondary"}>
                          {issue.priority} priority
                        </Badge>
                        <Badge variant="outline">{issue.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Transaction: {issue.transactionId} • {issue.customer}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{issue.amount}</div>
                    <Badge
                      variant={issue.status === "open" ? "destructive" : "secondary"}
                    >
                      {issue.status}
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg mb-4">
                  <p className="text-sm">
                    <strong>Error:</strong> {issue.error}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Reported: {issue.date}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry Payment
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Customer
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Handling Payment Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Failed Payments</h4>
              <p className="text-sm text-muted-foreground">
                Contact the customer to update their payment method or retry with a different card.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Chargebacks</h4>
              <p className="text-sm text-muted-foreground">
                Gather evidence (booking confirmation, communication) and respond within the deadline.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
