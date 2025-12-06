"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, User, Clock, Filter, Download, Eye, Archive, Star } from "lucide-react"

export default function ChatHistoryPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "resolved" | "archived">("all")
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  const chatHistory = [
    { 
      id: 1, 
      customer: "John Smith",
      email: "john.smith@email.com",
      agent: "Sarah (Admin)",
      subject: "Tour date change request",
      date: "2024-01-15",
      duration: "12 min",
      messages: 8,
      rating: 5,
      status: "resolved"
    },
    { 
      id: 2, 
      customer: "Marie Dubois",
      email: "marie.d@email.com",
      agent: "Sarah (Admin)",
      subject: "Essaouira trip information",
      date: "2024-01-15",
      duration: "5 min",
      messages: 4,
      rating: 5,
      status: "resolved"
    },
    { 
      id: 3, 
      customer: "Ahmed Hassan",
      email: "a.hassan@email.com",
      agent: "Mohammed",
      subject: "Availability inquiry",
      date: "2024-01-14",
      duration: "8 min",
      messages: 6,
      rating: 4,
      status: "resolved"
    },
    { 
      id: 4, 
      customer: "Emma Wilson",
      email: "emma.w@email.com",
      agent: "Sarah (Admin)",
      subject: "Private tour booking",
      date: "2024-01-14",
      duration: "15 min",
      messages: 12,
      rating: 5,
      status: "resolved"
    },
    { 
      id: 5, 
      customer: "Carlos Garcia",
      email: "carlos.g@email.com",
      agent: "Mohammed",
      subject: "Refund request",
      date: "2024-01-13",
      duration: "20 min",
      messages: 15,
      rating: 3,
      status: "archived"
    },
    { 
      id: 6, 
      customer: "Lisa Chen",
      email: "lisa.c@email.com",
      agent: "Sarah (Admin)",
      subject: "Group booking inquiry",
      date: "2024-01-13",
      duration: "10 min",
      messages: 7,
      rating: 5,
      status: "resolved"
    },
  ]

  const filteredHistory = chatHistory.filter(chat => 
    statusFilter === "all" || chat.status === statusFilter
  )

  const stats = [
    { label: "Total Conversations", value: "1,234", subtext: "This month" },
    { label: "Avg. Response Time", value: "2.5 min", subtext: "Last 7 days" },
    { label: "Avg. Rating", value: "4.8", subtext: "Out of 5 stars" },
    { label: "Resolution Rate", value: "96%", subtext: "First contact" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat History</h1>
          <p className="text-muted-foreground">View and analyze past support conversations</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={statusFilter === "resolved" ? "default" : "outline"}
                onClick={() => setStatusFilter("resolved")}
                size="sm"
              >
                Resolved
              </Button>
              <Button 
                variant={statusFilter === "archived" ? "default" : "outline"}
                onClick={() => setStatusFilter("archived")}
                size="sm"
              >
                Archived
              </Button>
            </div>
            <div className="flex gap-2">
              <Input type="date" className="w-auto" />
              <Input type="date" className="w-auto" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversation History
          </CardTitle>
          <CardDescription>
            {filteredHistory.length} conversations found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Subject</th>
                  <th className="text-left p-3 font-medium">Agent</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Duration</th>
                  <th className="text-left p-3 font-medium">Rating</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((chat) => (
                  <tr key={chat.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{chat.customer}</p>
                          <p className="text-xs text-muted-foreground">{chat.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{chat.subject}</p>
                      <p className="text-xs text-muted-foreground">{chat.messages} messages</p>
                    </td>
                    <td className="p-3 text-sm">{chat.agent}</td>
                    <td className="p-3 text-sm">{chat.date}</td>
                    <td className="p-3">
                      <span className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {chat.duration}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${
                              i < chat.rating 
                                ? "fill-amber-400 text-amber-400" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        chat.status === "resolved" 
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {chat.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" title="View conversation">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Archive">
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing 1-6 of 1,234 conversations
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
