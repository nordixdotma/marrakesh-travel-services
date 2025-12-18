"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  CalendarCheck,
  Search,
  Eye,
  Filter,
  Clock,
  Users,
  DollarSign,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { bookings } from "@/lib/admin-data"

type BookingStatus = "all" | "pending" | "confirmed" | "completed" | "cancelled"

export default function AdminBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<BookingStatus>("all")

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) => {
        // Status filter
        if (statusFilter !== "all" && booking.status !== statusFilter) return false

        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          return (
            booking.customerName.toLowerCase().includes(query) ||
            booking.customerEmail.toLowerCase().includes(query) ||
            booking.offerTitle.toLowerCase().includes(query) ||
            booking.id.toLowerCase().includes(query)
          )
        }
        return true
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [searchQuery, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
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

  const getOfferTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      tours: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      excursions: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      activities: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
      transfers: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      packages: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    }
    return colors[type] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-sm text-muted-foreground">
          Manage customer bookings and reservations. {bookings.length} total bookings.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as BookingStatus)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-3">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:bg-muted/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left: Customer & Offer Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{booking.customerName}</h3>
                      <Badge variant="secondary" className={getOfferTypeBadge(booking.offerType)}>
                        {booking.offerType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{booking.offerTitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">{booking.customerEmail}</p>
                  </div>

                  {/* Middle: Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CalendarCheck className="h-4 w-4" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {booking.adults}A{booking.children > 0 && `, ${booking.children}C`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <DollarSign className="h-4 w-4" />
                      <span>{booking.totalPrice}</span>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {formatDate(booking.createdAt)}
                      </p>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <Link href={`/admin/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <CalendarCheck className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery || statusFilter !== "all"
                ? "No bookings match your search criteria. Try different filters."
                : "Customer bookings will appear here once you start receiving reservations."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
