"use client"

import { useState, useMemo, useEffect } from "react"
import {
  CreditCard,
  Search,
  Filter,
  Clock,
  Loader2,
  Eye,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { adminApi } from "@/lib/api"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

type PaymentStatus = "all" | "pending" | "completed" | "failed" | "refunded"

interface Payment {
  id: string
  bookingId: string
  amount: number
  currency: string
  method: string
  status: string
  transactionId: string
  createdAt: string
  bookingDate: string
  customerName: string
  customerEmail: string
  offerType: string
  offerTitle: string
}

export default function AdminPaymentsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<PaymentStatus>("all")
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true)
        setError(null)
        const status = statusFilter !== "all" ? statusFilter : undefined
        const response = await adminApi.getPayments(status)
        setPayments(response.payments || [])
      } catch (err: any) {
        console.error('Error fetching payments:', err)
        setError(err.message || t.admin?.payments?.errorLoading || 'Failed to load payments')
        toast.error(t.admin?.payments?.errorLoading || 'Failed to load payments', {
          description: err.message || 'Please try again later',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [statusFilter])

  const filteredPayments = useMemo(() => {
    return payments
      .filter((payment) => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          return (
            payment.customerName.toLowerCase().includes(query) ||
            payment.customerEmail.toLowerCase().includes(query) ||
            payment.transactionId.toLowerCase().includes(query) ||
            payment.offerTitle.toLowerCase().includes(query) ||
            payment.id.toLowerCase().includes(query)
          )
        }
        return true
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [searchQuery, payments])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "refunded":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      credit_card: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      debit_card: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      paypal: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      bank_transfer: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      cash: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    }
    return colors[method.toLowerCase()] || "bg-gray-100 text-gray-700"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/10 rounded-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <CreditCard className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">{t.admin?.payments?.errorLoading || "Error loading payments"}</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-sm">
            {t.admin?.dashboard?.retry || "Retry"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.admin?.payments?.title || "Payments"}</h1>
        <p className="text-sm text-muted-foreground">
          {t.admin?.payments?.description?.replace('{count}', String(payments.length)) || `Manage payments and transactions. ${payments.length} total payments.`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.admin?.payments?.searchPlaceholder || "Search payments..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-sm bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as PaymentStatus)}
          >
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder={t.admin?.common?.status || "Status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.admin?.payments?.statusAll || "All Status"}</SelectItem>
              <SelectItem value="pending">{t.admin?.payments?.statusPending || "Pending"}</SelectItem>
              <SelectItem value="completed">{t.admin?.payments?.statusCompleted || "Completed"}</SelectItem>
              <SelectItem value="failed">{t.admin?.payments?.statusFailed || "Failed"}</SelectItem>
              <SelectItem value="refunded">{t.admin?.payments?.statusRefunded || "Refunded"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Payments List */}
      {filteredPayments.length > 0 ? (
        <div className="space-y-3">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="hover:bg-muted/30 transition-colors rounded-sm bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left: Customer & Payment Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{payment.customerName}</h3>
                      <Badge variant="secondary" className={getMethodBadge(payment.method)}>
                        {payment.method.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{payment.offerTitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">{payment.customerEmail}</p>
                    {payment.transactionId && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {t.admin?.payments?.transactionId || "Transaction ID"}: {payment.transactionId}
                      </p>
                    )}
                  </div>

                  {/* Middle: Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(payment.bookingDate)}</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <span>{payment.amount} {payment.currency}</span>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(payment.status)}>
                      {payment.status.toLowerCase()}
                    </Badge>
                    <Link href={`/admin/bookings/${payment.bookingId}`}>
                      <Button variant="outline" size="sm" className="gap-1 rounded-sm">
                        <Eye className="h-3.5 w-3.5" />
                        {t.admin?.payments?.viewBooking || "View Booking"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.admin?.payments?.noPaymentsFound || "No payments found"}</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery || statusFilter !== "all"
                ? (t.admin?.payments?.noMatch || "No payments match your search criteria. Try different filters.")
                : (t.admin?.payments?.emptyState || "Payment transactions will appear here once you start processing orders.")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
