"use client"

import { useState } from "react"
import { Search, Download, Filter, CreditCard, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const transactions = [
  { id: "TXN001", bookingId: "BK001", customer: "John Smith", amount: "$450", method: "CMI", card: "•••• 4242", status: "completed", date: "2024-12-11 14:30" },
  { id: "TXN002", bookingId: "BK002", customer: "Emma Wilson", amount: "$340", method: "PayPal", card: "PayPal", status: "completed", date: "2024-12-11 12:15" },
  { id: "TXN003", bookingId: "BK003", customer: "Michael Brown", amount: "$45", method: "CMI", card: "•••• 5555", status: "completed", date: "2024-12-10 16:45" },
  { id: "TXN004", bookingId: "BK004", customer: "Sarah Davis", amount: "$360", method: "PayPal", card: "PayPal", status: "refunded", date: "2024-12-10 11:20" },
  { id: "TXN005", bookingId: "BK005", customer: "James Johnson", amount: "$600", method: "CMI", card: "•••• 1234", status: "completed", date: "2024-12-09 09:00" },
  { id: "TXN006", bookingId: "BK006", customer: "Robert Chen", amount: "$900", method: "CMI", card: "•••• 9876", status: "pending", date: "2024-12-09 08:30" },
  { id: "TXN007", bookingId: "BK007", customer: "Lisa Martinez", amount: "$45", method: "PayPal", card: "PayPal", status: "failed", date: "2024-12-08 22:00" },
  { id: "TXN008", bookingId: "BK008", customer: "Tom Wilson", amount: "$450", method: "CMI", card: "•••• 3456", status: "completed", date: "2024-12-08 15:30" },
]

export default function PaymentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [methodFilter, setMethodFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = 
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMethod = methodFilter === "all" || txn.method.toLowerCase() === methodFilter
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter
    return matchesSearch && matchesMethod && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="text-muted-foreground">View all payment transactions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, customer, or booking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cmi">CMI</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Booking</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Method</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium">{txn.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-muted-foreground">{txn.bookingId}</span>
                    </td>
                    <td className="py-3 px-4 text-sm">{txn.customer}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{txn.method}</p>
                          <p className="text-xs text-muted-foreground">{txn.card}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-sm">{txn.amount}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          txn.status === "completed"
                            ? "default"
                            : txn.status === "pending"
                            ? "secondary"
                            : txn.status === "refunded"
                            ? "outline"
                            : "destructive"
                        }
                        className={txn.status === "completed" ? "bg-green-600" : ""}
                      >
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {txn.date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
