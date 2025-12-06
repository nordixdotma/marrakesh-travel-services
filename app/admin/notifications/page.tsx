"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Mail, MessageSquare, Smartphone, Send, Users, Calendar, CheckCircle } from "lucide-react"

export default function NotificationsPage() {
  const [notificationType, setNotificationType] = useState<"email" | "sms" | "push">("email")
  const [recipient, setRecipient] = useState<"all" | "segment" | "individual">("all")

  const recentNotifications = [
    { id: 1, type: "email", subject: "Booking Confirmation", recipients: 156, sent: "2024-01-15 10:30", status: "delivered" },
    { id: 2, type: "sms", subject: "Reminder: Tour Tomorrow", recipients: 23, sent: "2024-01-15 09:00", status: "delivered" },
    { id: 3, type: "push", subject: "Special Offer!", recipients: 892, sent: "2024-01-14 14:00", status: "delivered" },
    { id: 4, type: "email", subject: "Welcome Email", recipients: 45, sent: "2024-01-14 11:20", status: "delivered" },
  ]

  const stats = [
    { label: "Emails Sent Today", value: "1,234", icon: Mail, color: "text-blue-500" },
    { label: "SMS Sent Today", value: "156", icon: Smartphone, color: "text-green-500" },
    { label: "Push Notifications", value: "892", icon: Bell, color: "text-purple-500" },
    { label: "Delivery Rate", value: "98.5%", icon: CheckCircle, color: "text-emerald-500" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Send notifications to customers via email, SMS, or push</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Compose Notification
            </CardTitle>
            <CardDescription>Create and send a new notification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Notification Type */}
            <div className="space-y-2">
              <Label>Notification Type</Label>
              <div className="flex gap-2">
                <Button 
                  variant={notificationType === "email" ? "default" : "outline"}
                  onClick={() => setNotificationType("email")}
                  className="flex-1"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button 
                  variant={notificationType === "sms" ? "default" : "outline"}
                  onClick={() => setNotificationType("sms")}
                  className="flex-1"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  SMS
                </Button>
                <Button 
                  variant={notificationType === "push" ? "default" : "outline"}
                  onClick={() => setNotificationType("push")}
                  className="flex-1"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Push
                </Button>
              </div>
            </div>

            {/* Recipients */}
            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="flex gap-2">
                <Button 
                  variant={recipient === "all" ? "default" : "outline"}
                  onClick={() => setRecipient("all")}
                  size="sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  All Users
                </Button>
                <Button 
                  variant={recipient === "segment" ? "default" : "outline"}
                  onClick={() => setRecipient("segment")}
                  size="sm"
                >
                  Segment
                </Button>
                <Button 
                  variant={recipient === "individual" ? "default" : "outline"}
                  onClick={() => setRecipient("individual")}
                  size="sm"
                >
                  Individual
                </Button>
              </div>
            </div>

            {recipient === "individual" && (
              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Recipient Email/Phone</Label>
                <Input id="recipientEmail" placeholder="Enter email or phone number" />
              </div>
            )}

            {recipient === "segment" && (
              <div className="space-y-2">
                <Label htmlFor="segment">Select Segment</Label>
                <select 
                  id="segment"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="">Choose a segment...</option>
                  <option value="new-users">New Users (Last 30 days)</option>
                  <option value="active-bookers">Active Bookers</option>
                  <option value="inactive">Inactive Users (90+ days)</option>
                  <option value="vip">VIP Customers</option>
                </select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter notification subject" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Enter your message..."
                rows={5}
              />
            </div>

            {notificationType === "email" && (
              <div className="space-y-2">
                <Label htmlFor="template">Email Template</Label>
                <select 
                  id="template"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="">No template (plain text)</option>
                  <option value="marketing">Marketing Template</option>
                  <option value="transactional">Transactional Template</option>
                  <option value="newsletter">Newsletter Template</option>
                </select>
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
            <CardDescription>History of sent notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full bg-muted ${
                      notification.type === "email" ? "text-blue-500" :
                      notification.type === "sms" ? "text-green-500" : "text-purple-500"
                    }`}>
                      {notification.type === "email" ? <Mail className="h-4 w-4" /> :
                       notification.type === "sms" ? <Smartphone className="h-4 w-4" /> :
                       <Bell className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{notification.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.recipients} recipients • {notification.sent}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 font-medium capitalize">
                    {notification.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
