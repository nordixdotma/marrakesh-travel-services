"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Bell, Calendar, Send, Settings, Plus, Trash2, Edit } from "lucide-react"

export default function RemindersPage() {
  const [reminderType, setReminderType] = useState<"booking" | "payment" | "review">("booking")

  const activeReminders = [
    { 
      id: 1, 
      name: "24h Before Tour", 
      type: "booking",
      trigger: "24 hours before",
      channel: "Email + SMS",
      status: "active",
      sent: 156
    },
    { 
      id: 2, 
      name: "Tour Day Morning", 
      type: "booking",
      trigger: "Day of tour at 8:00 AM",
      channel: "SMS + Push",
      status: "active",
      sent: 89
    },
    { 
      id: 3, 
      name: "Payment Reminder", 
      type: "payment",
      trigger: "48 hours after booking",
      channel: "Email",
      status: "active",
      sent: 234
    },
    { 
      id: 4, 
      name: "Review Request", 
      type: "review",
      trigger: "24 hours after tour",
      channel: "Email",
      status: "active",
      sent: 567
    },
    { 
      id: 5, 
      name: "2h Before Pickup", 
      type: "booking",
      trigger: "2 hours before",
      channel: "SMS",
      status: "paused",
      sent: 45
    },
  ]

  const reminderTemplates = [
    { id: 1, name: "Standard Booking Reminder", type: "booking" },
    { id: 2, name: "VIP Booking Reminder", type: "booking" },
    { id: 3, name: "Payment Due Reminder", type: "payment" },
    { id: 4, name: "Final Payment Warning", type: "payment" },
    { id: 5, name: "Review Request", type: "review" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Booking Reminders</h1>
          <p className="text-muted-foreground">Configure automated reminders for customers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Reminder
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Active Reminders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Send className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,091</p>
                <p className="text-sm text-muted-foreground">Sent This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Scheduled Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">98.2%</p>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Reminders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Active Reminders
              </CardTitle>
              <CardDescription>Automated reminder rules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeReminders.map((reminder) => (
                  <div 
                    key={reminder.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        reminder.type === "booking" ? "bg-blue-100 text-blue-600" :
                        reminder.type === "payment" ? "bg-green-100 text-green-600" :
                        "bg-purple-100 text-purple-600"
                      }`}>
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{reminder.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {reminder.trigger} • {reminder.channel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          reminder.status === "active" 
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {reminder.status}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {reminder.sent} sent
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Setup
            </CardTitle>
            <CardDescription>Add a new reminder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Reminder Type</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={reminderType === "booking" ? "default" : "outline"}
                  onClick={() => setReminderType("booking")}
                  size="sm"
                >
                  Booking
                </Button>
                <Button 
                  variant={reminderType === "payment" ? "default" : "outline"}
                  onClick={() => setReminderType("payment")}
                  size="sm"
                >
                  Payment
                </Button>
                <Button 
                  variant={reminderType === "review" ? "default" : "outline"}
                  onClick={() => setReminderType("review")}
                  size="sm"
                >
                  Review
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminderName">Reminder Name</Label>
              <Input id="reminderName" placeholder="Enter reminder name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="triggerTime">Trigger Time</Label>
              <select 
                id="triggerTime"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="2h">2 hours before</option>
                <option value="24h">24 hours before</option>
                <option value="48h">48 hours before</option>
                <option value="7d">7 days before</option>
                <option value="day-of">Day of event</option>
                <option value="after-24h">24 hours after</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Channels</Label>
              <div className="flex gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">SMS</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Push</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <select 
                id="template"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="">Select template...</option>
                {reminderTemplates
                  .filter(t => t.type === reminderType)
                  .map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))
                }
              </select>
            </div>

            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Reminder
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
