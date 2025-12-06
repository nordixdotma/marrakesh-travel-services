"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, MoreHorizontal, User, Mail, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 234 567 8901",
    joinedAt: "2024-01-15",
    bookings: 5,
    totalSpent: "$2,150",
    status: "verified",
    avatar: null,
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 987 654 3210",
    joinedAt: "2024-03-22",
    bookings: 3,
    totalSpent: "$890",
    status: "verified",
    avatar: null,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@email.com",
    phone: "+44 789 123 4567",
    joinedAt: "2024-06-10",
    bookings: 1,
    totalSpent: "$45",
    status: "pending",
    avatar: null,
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.d@email.com",
    phone: "+33 612 345 678",
    joinedAt: "2024-08-05",
    bookings: 2,
    totalSpent: "$720",
    status: "verified",
    avatar: null,
  },
  {
    id: 5,
    name: "James Johnson",
    email: "james.j@email.com",
    phone: "+1 555 123 4567",
    joinedAt: "2024-09-18",
    bookings: 4,
    totalSpent: "$1,580",
    status: "suspended",
    avatar: null,
  },
]

const stats = [
  { label: "Total Users", value: "8,456" },
  { label: "Verified", value: "7,890" },
  { label: "Pending", value: "456" },
  { label: "Suspended", value: "110" },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">Manage customer accounts</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/users/verify">
            <Button variant="outline">Verify Accounts</Button>
          </Link>
          <Link href="/admin/users/profiles">
            <Button variant="outline">Manage Profiles</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bookings</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Spent</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {user.email}
                        </div>
                        <p className="text-xs text-muted-foreground">{user.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {user.joinedAt}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{user.bookings}</td>
                    <td className="py-3 px-4 font-medium text-sm">{user.totalSpent}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          user.status === "verified"
                            ? "default"
                            : user.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className={user.status === "verified" ? "bg-green-600" : ""}
                      >
                        {user.status === "verified" && <Shield className="h-3 w-3 mr-1" />}
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Bookings</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
