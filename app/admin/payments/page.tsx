"use client"

import Link from "next/link"
import { CreditCard, DollarSign, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const paymentStats = [
  {
    title: "Total Revenue",
    value: "$45,678",
    change: "+18.3%",
    changeType: "positive",
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Transactions",
    value: "1,234",
    change: "+12.5%",
    changeType: "positive",
    icon: CreditCard,
    description: "This month",
  },
  {
    title: "Average Order",
    value: "$156",
    change: "+5.2%",
    changeType: "positive",
    icon: TrendingUp,
    description: "Per booking",
  },
  {
    title: "Failed Payments",
    value: "23",
    change: "-8%",
    changeType: "positive",
    icon: AlertCircle,
    description: "This month",
  },
]

const recentTransactions = [
  { id: "TXN001", customer: "John Smith", amount: "$450", method: "CMI", status: "completed", date: "2024-12-11" },
  { id: "TXN002", customer: "Emma Wilson", amount: "$340", method: "PayPal", status: "pending", date: "2024-12-11" },
  { id: "TXN003", customer: "Michael Brown", amount: "$45", method: "CMI", status: "completed", date: "2024-12-10" },
  { id: "TXN004", customer: "Sarah Davis", amount: "$360", method: "PayPal", status: "refunded", date: "2024-12-10" },
  { id: "TXN005", customer: "James Johnson", amount: "$600", method: "CMI", status: "completed", date: "2024-12-09" },
]

const paymentMethods = [
  { name: "CMI", transactions: 756, revenue: "$28,450", percentage: 62 },
  { name: "PayPal", transactions: 423, revenue: "$15,890", percentage: 35 },
  { name: "Bank Transfer", transactions: 55, revenue: "$1,338", percentage: 3 },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payments Overview</h1>
          <p className="text-muted-foreground">Monitor all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/payments/history">
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">View History</Badge>
          </Link>
          <Link href="/admin/payments/issues">
            <Badge variant="destructive" className="cursor-pointer">3 Issues</Badge>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {paymentStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                )}
                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Revenue by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.transactions} transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{method.revenue}</p>
                      <p className="text-sm text-muted-foreground">{method.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <Link href="/admin/payments/cmi" className="flex-1">
                <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                  <CardContent className="pt-4 pb-4 text-center">
                    <p className="font-medium">CMI Settings</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/admin/payments/paypal" className="flex-1">
                <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                  <CardContent className="pt-4 pb-4 text-center">
                    <p className="font-medium">PayPal Settings</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{txn.id}</span>
                      <Badge variant="outline">{txn.method}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{txn.customer}</p>
                    <p className="text-xs text-muted-foreground">{txn.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{txn.amount}</p>
                    <Badge
                      variant={
                        txn.status === "completed"
                          ? "default"
                          : txn.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                      className={txn.status === "completed" ? "bg-green-600" : ""}
                    >
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
