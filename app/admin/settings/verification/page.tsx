"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Save, Settings, CheckCircle, AlertCircle, Send, MessageSquare } from "lucide-react"

export default function VerificationSettingsPage() {
  const [smsProvider, setSmsProvider] = useState("twilio")

  const verificationStats = [
    { label: "SMS Sent Today", value: "156" },
    { label: "Verified Today", value: "142" },
    { label: "Success Rate", value: "91%" },
    { label: "Pending", value: "14" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Phone Verification</h1>
          <p className="text-muted-foreground">Configure SMS verification for customer accounts</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {verificationStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SMS Provider Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              SMS Provider
            </CardTitle>
            <CardDescription>Configure your SMS service provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Provider</Label>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    smsProvider === "twilio" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSmsProvider("twilio")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Twilio</p>
                    {smsProvider === "twilio" && <CheckCircle className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">International SMS provider</p>
                </div>
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    smsProvider === "orange" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSmsProvider("orange")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Orange SMS</p>
                    {smsProvider === "orange" && <CheckCircle className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Morocco local provider</p>
                </div>
              </div>
            </div>

            {smsProvider === "twilio" && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="twilioSid">Account SID</Label>
                  <Input id="twilioSid" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilioToken">Auth Token</Label>
                  <Input id="twilioToken" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilioPhone">Phone Number</Label>
                  <Input id="twilioPhone" placeholder="+1234567890" />
                </div>
              </div>
            )}

            {smsProvider === "orange" && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="orangeApiKey">API Key</Label>
                  <Input id="orangeApiKey" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orangeSender">Sender Name</Label>
                  <Input id="orangeSender" placeholder="MarrakeshTravel" maxLength={11} />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4">
              <Button variant="outline" size="sm">Test Connection</Button>
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Connected
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Verification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Verification Settings
            </CardTitle>
            <CardDescription>Configure verification rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Phone Verification</p>
                  <p className="text-sm text-muted-foreground">Users must verify phone to book</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Verify Before Payment</p>
                  <p className="text-sm text-muted-foreground">Require verification before checkout</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="codeLength">Verification Code Length</Label>
              <select 
                id="codeLength"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="4">4 digits</option>
                <option value="6">6 digits</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="codeExpiry">Code Expiry Time</Label>
              <div className="flex gap-2">
                <Input id="codeExpiry" type="number" defaultValue="10" className="w-24" />
                <span className="flex items-center text-muted-foreground">minutes</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxAttempts">Max Verification Attempts</Label>
              <div className="flex gap-2">
                <Input id="maxAttempts" type="number" defaultValue="3" className="w-24" />
                <span className="flex items-center text-muted-foreground">attempts</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resendCooldown">Resend Cooldown</Label>
              <div className="flex gap-2">
                <Input id="resendCooldown" type="number" defaultValue="60" className="w-24" />
                <span className="flex items-center text-muted-foreground">seconds</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SMS Template */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              SMS Template
            </CardTitle>
            <CardDescription>Customize verification message</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smsTemplate">Message Template</Label>
              <textarea 
                id="smsTemplate"
                className="w-full p-3 rounded-md border border-input bg-background resize-none"
                rows={4}
                defaultValue="Your Marrakesh Travel verification code is: {{code}}. Valid for {{expiry}} minutes. Do not share this code."
              />
              <p className="text-xs text-muted-foreground">
                Available variables: {"{{code}}"}, {"{{expiry}}"}, {"{{customer_name}}"}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Preview</p>
              <p className="text-sm text-muted-foreground">
                Your Marrakesh Travel verification code is: 123456. Valid for 10 minutes. Do not share this code.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Country Restrictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Country Settings
            </CardTitle>
            <CardDescription>Manage allowed countries for SMS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Allowed Countries</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Select countries where SMS verification is available
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {[
                  { code: "MA", name: "Morocco", enabled: true },
                  { code: "FR", name: "France", enabled: true },
                  { code: "ES", name: "Spain", enabled: true },
                  { code: "GB", name: "United Kingdom", enabled: true },
                  { code: "US", name: "United States", enabled: true },
                  { code: "DE", name: "Germany", enabled: true },
                  { code: "IT", name: "Italy", enabled: false },
                  { code: "AE", name: "UAE", enabled: true },
                ].map((country) => (
                  <label key={country.code} className="flex items-center gap-2 p-2 border rounded">
                    <input type="checkbox" defaultChecked={country.enabled} className="rounded" />
                    <span className="text-sm">{country.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">SMS Costs</p>
                  <p className="text-xs text-amber-700">
                    International SMS may incur additional charges. Review your provider's pricing.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
