"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Mail, Smartphone, Send, Users, Calendar, CheckCircle, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const stats = [
  { label: "Emails Today", value: "1,234", icon: Mail, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "SMS Today", value: "156", icon: Smartphone, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Push Sent", value: "892", icon: Bell, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Delivery Rate", value: "98.5%", icon: CheckCircle, color: "text-amber-600", bg: "bg-amber-50" },
]

const recentNotifications = [
  { id: 1, type: "email", subject: "Booking Confirmation", recipients: 156, sent: "10:30", status: "delivered" },
  { id: 2, type: "sms", subject: "Reminder: Tour Tomorrow", recipients: 23, sent: "09:00", status: "delivered" },
  { id: 3, type: "push", subject: "Special Offer!", recipients: 892, sent: "Yesterday", status: "delivered" },
  { id: 4, type: "email", subject: "Welcome Email", recipients: 45, sent: "Yesterday", status: "delivered" },
]

export default function NotificationsPage() {
  const [notificationType, setNotificationType] = useState("email")
  const [recipient, setRecipient] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">Send messages via email, SMS, or push</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/notifications/reminders">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Reminders
            </Button>
          </Link>
          <Link href="/admin/notifications/meeting-points">
            <Button variant="outline" size="sm">Meeting Points</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Compose Notification */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Send className="h-4 w-4" />
              Compose Notification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Notification Type */}
            <div className="space-y-2">
              <Label className="text-sm">Type</Label>
              <div className="flex gap-2">
                {[
                  { value: "email", label: "Email", icon: Mail },
                  { value: "sms", label: "SMS", icon: Smartphone },
                  { value: "push", label: "Push", icon: Bell },
                ].map((type) => (
                  <Button
                    key={type.value}
                    variant={notificationType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotificationType(type.value)}
                    className="flex-1"
                  >
                    <type.icon className="h-4 w-4 mr-1.5" />
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Recipients */}
            <div className="space-y-2">
              <Label className="text-sm">Recipients</Label>
              <div className="flex gap-2">
                {[
                  { value: "all", label: "All Users", icon: Users },
                  { value: "segment", label: "Segment" },
                  { value: "individual", label: "Individual" },
                ].map((r) => (
                  <Button
                    key={r.value}
                    variant={recipient === r.value ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setRecipient(r.value)}
                  >
                    {r.icon && <r.icon className="h-3.5 w-3.5 mr-1.5" />}
                    {r.label}
                  </Button>
                ))}
              </div>
            </div>

            {recipient === "individual" && (
              <div className="space-y-2">
                <Label htmlFor="recipientEmail" className="text-sm">Email/Phone</Label>
                <Input id="recipientEmail" placeholder="Enter email or phone" className="h-9" />
              </div>
            )}

            {recipient === "segment" && (
              <div className="space-y-2">
                <Label className="text-sm">Segment</Label>
                <Select>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Choose segment..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Users (30 days)</SelectItem>
                    <SelectItem value="active">Active Bookers</SelectItem>
                    <SelectItem value="inactive">Inactive (90+ days)</SelectItem>
                    <SelectItem value="vip">VIP Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm">Subject</Label>
              <Input id="subject" placeholder="Notification subject" className="h-9" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm">Message</Label>
              <Textarea id="message" placeholder="Write your message..." rows={4} />
            </div>

            {notificationType === "email" && (
              <div className="space-y-2">
                <Label className="text-sm">Template</Label>
                <Select>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="No template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No template</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button className="flex-1" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentNotifications.map((notif) => (
                <div key={notif.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      notif.type === "email" ? "bg-blue-50" :
                      notif.type === "sms" ? "bg-emerald-50" : "bg-violet-50"
                    }`}>
                      {notif.type === "email" ? (
                        <Mail className="h-4 w-4 text-blue-600" />
                      ) : notif.type === "sms" ? (
                        <Smartphone className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Bell className="h-4 w-4 text-violet-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{notif.subject}</p>
                      <p className="text-xs text-muted-foreground">{notif.recipients} recipients</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{notif.sent}</span>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                      {notif.status}
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
