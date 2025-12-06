"use client"

import { Save, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const transferPrices = [
  { id: 1, route: "Marrakech Airport → City Center", sedan: 35, suv: 50, minivan: 60, luxury: 80 },
  { id: 2, route: "Marrakech → Essaouira", sedan: 120, suv: 150, minivan: 180, luxury: 250 },
  { id: 3, route: "Marrakech → Ouarzazate", sedan: 180, suv: 220, minivan: 280, luxury: 350 },
  { id: 4, route: "Marrakech → Fes", sedan: 350, suv: 420, minivan: 500, luxury: 650 },
  { id: 5, route: "Marrakech → Casablanca", sedan: 200, suv: 250, minivan: 300, luxury: 400 },
  { id: 6, route: "Marrakech → Agadir", sedan: 180, suv: 220, minivan: 280, luxury: 350 },
]

export default function TransferPricesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transfer Prices</h1>
          <p className="text-muted-foreground">Manage pricing for all transfer routes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Route
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      {/* Price Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
          <CardDescription>Configure default pricing options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="mad">MAD (DH)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Night Surcharge (%)</label>
              <Input type="number" defaultValue="20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Weekend Surcharge (%)</label>
              <Input type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Holiday Surcharge (%)</label>
              <Input type="number" defaultValue="25" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route Prices</CardTitle>
          <CardDescription>Prices by vehicle type (one-way)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Route</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sedan ($)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">SUV ($)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Minivan ($)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Luxury ($)</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transferPrices.map((price) => (
                  <tr key={price.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-medium text-sm">{price.route}</td>
                    <td className="py-3 px-4">
                      <Input type="number" defaultValue={price.sedan} className="w-20" />
                    </td>
                    <td className="py-3 px-4">
                      <Input type="number" defaultValue={price.suv} className="w-20" />
                    </td>
                    <td className="py-3 px-4">
                      <Input type="number" defaultValue={price.minivan} className="w-20" />
                    </td>
                    <td className="py-3 px-4">
                      <Input type="number" defaultValue={price.luxury} className="w-20" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Round Trip Discount */}
      <Card>
        <CardHeader>
          <CardTitle>Round Trip Discount</CardTitle>
          <CardDescription>Discount applied for round trip bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount Percentage</label>
              <Input type="number" defaultValue="10" className="w-24" />
            </div>
            <p className="text-sm text-muted-foreground">
              Customers booking round trip transfers receive this discount on the return journey.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
