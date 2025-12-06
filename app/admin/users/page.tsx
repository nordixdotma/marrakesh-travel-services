"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MoreHorizontal, Mail, Calendar, Shield, UserCheck, Ban, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 234 567 8901",
    joinedAt: "Jan 15, 2024",
    bookings: 5,
    totalSpent: "$2,150",
    status: "verified",
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 987 654 3210",
    joinedAt: "Mar 22, 2024",
    bookings: 3,
    totalSpent: "$890",
    status: "verified",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@email.com",
    phone: "+44 789 123 4567",
    joinedAt: "Jun 10, 2024",
    bookings: 1,
    totalSpent: "$45",
    status: "pending",
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.d@email.com",
    phone: "+33 612 345 678",
    joinedAt: "Aug 05, 2024",
    bookings: 2,
    totalSpent: "$720",
    status: "verified",
  },
  {
    id: 5,
    name: "James Johnson",
    email: "james.j@email.com",
    phone: "+1 555 123 4567",
    joinedAt: "Sep 18, 2024",
    bookings: 4,
    totalSpent: "$1,580",
    status: "suspended",
  },
]

const stats = [
  { label: "Total Users", value: "8,456", color: "text-foreground" },
  { label: "Verified", value: "7,890", color: "text-emerald-600" },
  { label: "Pending", value: "456", color: "text-amber-600" },
  { label: "Suspended", value: "110", color: "text-red-600" },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">Manage customer accounts</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/users/verify">
            <Button variant="outline" size="sm">
              <UserCheck className="h-4 w-4 mr-2" />
              Verify Accounts
            </Button>
          </Link>
          <Link href="/admin/users/profiles">
            <Button variant="outline" size="sm">Profiles</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Bookings</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Spent</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {user.email}
                        </div>
                        <p className="text-xs text-muted-foreground">{user.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {user.joinedAt}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{user.bookings}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">{user.totalSpent}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="secondary"
                        className={
                          user.status === "verified"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                            : user.status === "pending"
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                            : "bg-red-50 text-red-700 hover:bg-red-50"
                        }
                      >
                        {user.status === "verified" && <Shield className="h-3 w-3 mr-1" />}
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="h-4 w-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
