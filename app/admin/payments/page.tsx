"use client"

import Link from "next/link"
import { CreditCard, DollarSign, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight, MoreHorizontal, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,678",
    change: 18.3,
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Transactions",
    value: "1,234",
    change: 12.5,
    icon: CreditCard,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Avg. Order",
    value: "$156",
    change: 5.2,
    icon: TrendingUp,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Failed",
    value: "23",
    change: -8,
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
]

const recentTransactions = [
  { id: "TXN001", customer: "John Smith", amount: "$450", method: "CMI", status: "completed", date: "Dec 11" },
  { id: "TXN002", customer: "Emma Wilson", amount: "$340", method: "PayPal", status: "pending", date: "Dec 11" },
  { id: "TXN003", customer: "Michael Brown", amount: "$45", method: "CMI", status: "completed", date: "Dec 10" },
  { id: "TXN004", customer: "Sarah Davis", amount: "$360", method: "PayPal", status: "refunded", date: "Dec 10" },
  { id: "TXN005", customer: "James Johnson", amount: "$600", method: "CMI", status: "completed", date: "Dec 09" },
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
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-sm text-muted-foreground">Monitor transactions and revenue</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/payments/history">
            <Button variant="outline" size="sm">View History</Button>
          </Link>
          <Link href="/admin/payments/issues">
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30">
              3 Issues
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.change > 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                    )}
                    <span className={stat.change > 0 ? "text-emerald-600" : "text-red-600"}>
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-muted-foreground">this month</span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Methods */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{method.name}</p>
                      <p className="text-xs text-muted-foreground">{method.transactions} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{method.revenue}</p>
                    <p className="text-xs text-muted-foreground">{method.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            
            <div className="flex gap-2 pt-3">
              <Link href="/admin/payments/cmi" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  CMI Settings
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Button>
              </Link>
              <Link href="/admin/payments/paypal" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  PayPal Settings
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
            <Link href="/admin/payments/history">
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{txn.id}</span>
                      <Badge variant="outline" className="text-xs px-1.5 py-0">{txn.method}</Badge>
                    </div>
                    <p className="text-sm font-medium mt-0.5">{txn.customer}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{txn.amount}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        txn.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                          : txn.status === "pending"
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                      }
                    >
                      {txn.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
