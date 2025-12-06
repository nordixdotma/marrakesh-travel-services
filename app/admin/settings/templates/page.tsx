"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Save, Plus, Edit, Trash2, Copy, Eye, FileText } from "lucide-react"

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1)

  const templates = [
    { 
      id: 1, 
      name: "Booking Confirmation",
      type: "transactional",
      subject: "Your Booking is Confirmed - {{booking_id}}",
      lastModified: "2024-01-10",
      status: "active"
    },
    { 
      id: 2, 
      name: "Payment Receipt",
      type: "transactional",
      subject: "Payment Receipt for {{booking_id}}",
      lastModified: "2024-01-08",
      status: "active"
    },
    { 
      id: 3, 
      name: "Booking Reminder - 24h",
      type: "reminder",
      subject: "Your Tour Tomorrow - {{tour_name}}",
      lastModified: "2024-01-05",
      status: "active"
    },
    { 
      id: 4, 
      name: "Review Request",
      type: "marketing",
      subject: "How was your experience with {{tour_name}}?",
      lastModified: "2024-01-03",
      status: "active"
    },
    { 
      id: 5, 
      name: "Welcome Email",
      type: "marketing",
      subject: "Welcome to Marrakesh Travel Services!",
      lastModified: "2024-01-01",
      status: "active"
    },
    { 
      id: 6, 
      name: "Cancellation Confirmation",
      type: "transactional",
      subject: "Booking Cancelled - {{booking_id}}",
      lastModified: "2023-12-28",
      status: "active"
    },
  ]

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate)

  const variables = [
    "{{customer_name}}", "{{booking_id}}", "{{tour_name}}", 
    "{{tour_date}}", "{{tour_time}}", "{{meeting_point}}",
    "{{total_amount}}", "{{payment_status}}", "{{agency_phone}}"
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">Manage email templates for notifications</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Templates
            </CardTitle>
            <CardDescription>{templates.length} templates</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedTemplate === template.id 
                      ? "bg-primary/10 border-l-4 border-l-primary" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{template.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{template.subject}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      template.type === "transactional" ? "bg-blue-100 text-blue-700" :
                      template.type === "reminder" ? "bg-amber-100 text-amber-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {template.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Template Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {selectedTemplateData?.name || "Select Template"}
                </CardTitle>
                <CardDescription>
                  {selectedTemplateData ? `Last modified: ${selectedTemplateData.lastModified}` : ""}
                </CardDescription>
              </div>
              {selectedTemplateData && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedTemplateData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input id="templateName" defaultValue={selectedTemplateData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="templateType">Type</Label>
                    <select 
                      id="templateType"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      defaultValue={selectedTemplateData.type}
                    >
                      <option value="transactional">Transactional</option>
                      <option value="reminder">Reminder</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input id="subject" defaultValue={selectedTemplateData.subject} />
                </div>

                <div className="space-y-2">
                  <Label>Available Variables</Label>
                  <div className="flex flex-wrap gap-2">
                    {variables.map((variable) => (
                      <Button 
                        key={variable}
                        variant="outline"
                        size="sm"
                        className="text-xs font-mono"
                        onClick={() => navigator.clipboard.writeText(variable)}
                      >
                        {variable}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailBody">Email Body (HTML)</Label>
                  <Textarea 
                    id="emailBody" 
                    rows={12}
                    className="font-mono text-sm"
                    defaultValue={`<!DOCTYPE html>
<html>
<head>
  <style>
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: #E85A4F; color: white; padding: 20px; }
    .content { padding: 20px; }
    .footer { background: #f5f5f5; padding: 15px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Marrakesh Travel Services</h1>
    </div>
    <div class="content">
      <p>Dear {{customer_name}},</p>
      <p>Your booking has been confirmed!</p>
      <p><strong>Booking ID:</strong> {{booking_id}}</p>
      <p><strong>Tour:</strong> {{tour_name}}</p>
      <p><strong>Date:</strong> {{tour_date}}</p>
    </div>
    <div class="footer">
      <p>Contact us: {{agency_phone}}</p>
    </div>
  </div>
</body>
</html>`}
                  />
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Template
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">Send Test Email</Button>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a template to edit</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
