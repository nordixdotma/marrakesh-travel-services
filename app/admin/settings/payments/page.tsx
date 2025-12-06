"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Save, DollarSign, Percent, CheckCircle, AlertCircle } from "lucide-react"

export default function PaymentSettingsPage() {
  const [autoCapture, setAutoCapture] = useState(true)
  const [allowPartialPayment, setAllowPartialPayment] = useState(true)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Settings</h1>
          <p className="text-muted-foreground">Configure payment methods and processing</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Gateways */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Gateways
            </CardTitle>
            <CardDescription>Configure your payment processors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* CMI */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">CMI (Centre Monétique Interbancaire)</p>
                    <p className="text-sm text-muted-foreground">Morocco's local payment processor</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="cmiMerchant" className="text-xs">Merchant ID</Label>
                    <Input id="cmiMerchant" placeholder="••••••••" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cmiKey" className="text-xs">API Key</Label>
                    <Input id="cmiKey" placeholder="••••••••" type="password" />
                  </div>
                </div>
                <Button variant="outline" size="sm">Configure CMI</Button>
              </div>
            </div>

            {/* PayPal */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-muted-foreground">International payments</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="paypalClient" className="text-xs">Client ID</Label>
                    <Input id="paypalClient" placeholder="••••••••" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="paypalSecret" className="text-xs">Secret</Label>
                    <Input id="paypalSecret" placeholder="••••••••" type="password" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Configure PayPal</Button>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Sandbox Mode
                  </label>
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-muted-foreground">Manual bank payments</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-amber-600">Manual</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Configure Bank Details</Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Payment Options
            </CardTitle>
            <CardDescription>Configure payment rules and options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-capture Payments</p>
                  <p className="text-sm text-muted-foreground">Automatically capture authorized payments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={autoCapture}
                    onChange={(e) => setAutoCapture(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Partial Payments</p>
                  <p className="text-sm text-muted-foreground">Allow deposits for bookings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={allowPartialPayment}
                    onChange={(e) => setAllowPartialPayment(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="depositPercent">Deposit Percentage</Label>
              <div className="flex gap-2">
                <Input 
                  id="depositPercent" 
                  type="number" 
                  defaultValue="30" 
                  className="w-24"
                />
                <span className="flex items-center text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground">Minimum deposit required for booking confirmation</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancellationFee">Cancellation Fee</Label>
              <div className="flex gap-2">
                <Input 
                  id="cancellationFee" 
                  type="number" 
                  defaultValue="10" 
                  className="w-24"
                />
                <span className="flex items-center text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground">Fee charged for cancellations</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refundDays">Full Refund Period</Label>
              <div className="flex gap-2">
                <Input 
                  id="refundDays" 
                  type="number" 
                  defaultValue="48" 
                  className="w-24"
                />
                <span className="flex items-center text-muted-foreground">hours before tour</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Currency Settings
            </CardTitle>
            <CardDescription>Multi-currency configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Accepted Currencies</Label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-3 border rounded-lg">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>MAD (Moroccan Dirham)</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>EUR (Euro)</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>USD (US Dollar)</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg">
                  <input type="checkbox" className="rounded" />
                  <span>GBP (British Pound)</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exchangeUpdate">Exchange Rate Update</Label>
              <select 
                id="exchangeUpdate"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="realtime">Real-time</option>
                <option value="daily">Daily</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Invoice Settings
            </CardTitle>
            <CardDescription>Configure invoice generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
              <Input id="invoicePrefix" defaultValue="INV-" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input id="taxRate" type="number" defaultValue="20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxNumber">Tax ID / VAT Number</Label>
              <Input id="taxNumber" placeholder="Enter tax identification number" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="autoInvoice" defaultChecked className="rounded" />
              <Label htmlFor="autoInvoice">Auto-generate invoices on payment</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
