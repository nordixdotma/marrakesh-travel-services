"use client"

import { Save, ExternalLink, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PayPalPaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">PayPal Settings</h1>
          <p className="text-muted-foreground">Configure PayPal payment integration</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      {/* Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connection Status</CardTitle>
              <CardDescription>PayPal account connection</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 font-medium">Connected</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">423</p>
              <p className="text-xs text-muted-foreground">transactions</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold">$15,890</p>
              <p className="text-xs text-muted-foreground">this month</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Fees Paid</p>
              <p className="text-2xl font-bold">$476</p>
              <p className="text-xs text-muted-foreground">2.9% + $0.30</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              API Credentials
            </CardTitle>
            <CardDescription>PayPal REST API settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client-id">Client ID</Label>
              <Input id="client-id" placeholder="PayPal Client ID" defaultValue="AX...XXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-secret">Client Secret</Label>
              <Input id="client-secret" type="password" placeholder="PayPal Client Secret" defaultValue="••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <Select defaultValue="live">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live (Production)</SelectItem>
                  <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                defaultValue="https://marrakesh-travel.com/api/paypal/webhook"
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Options */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Options</CardTitle>
            <CardDescription>Configure PayPal checkout experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable PayPal</p>
                <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">PayPal Credit</p>
                <p className="text-sm text-muted-foreground">Allow Pay Later options</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Venmo</p>
                <p className="text-sm text-muted-foreground">Accept Venmo payments (US only)</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Button Style</Label>
              <Select defaultValue="gold">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Intent</Label>
              <Select defaultValue="capture">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="capture">Capture (Immediate)</SelectItem>
                  <SelectItem value="authorize">Authorize (Manual capture)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Account */}
      <Card>
        <CardHeader>
          <CardTitle>Connected PayPal Account</CardTitle>
          <CardDescription>Business account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center text-white font-bold">
                PP
              </div>
              <div>
                <p className="font-medium">marrakesh.travel@business.com</p>
                <p className="text-sm text-muted-foreground">Business Account • Morocco</p>
              </div>
            </div>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open PayPal Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
