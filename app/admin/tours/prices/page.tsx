"use client"

import { useState } from "react"
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

const tourPrices = [
  {
    id: 1,
    tour: "Sahara Desert 3-Day Adventure",
    basePrice: 450,
    groupPrice: 380,
    childPrice: 250,
    season: "all",
  },
  {
    id: 2,
    tour: "Marrakech City Tour",
    basePrice: 120,
    groupPrice: 100,
    childPrice: 60,
    season: "all",
  },
  {
    id: 3,
    tour: "Atlas Mountains Trek",
    basePrice: 280,
    groupPrice: 240,
    childPrice: 150,
    season: "summer",
  },
  {
    id: 4,
    tour: "Essaouira Day Trip",
    basePrice: 180,
    groupPrice: 150,
    childPrice: 90,
    season: "all",
  },
  {
    id: 5,
    tour: "Fes Cultural Experience",
    basePrice: 350,
    groupPrice: 300,
    childPrice: 180,
    season: "all",
  },
]

export default function TourPricesPage() {
  const [prices, setPrices] = useState(tourPrices)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tour Prices</h1>
          <p className="text-muted-foreground">Manage pricing for all tours</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Price Rule
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
          <CardTitle>Global Price Settings</CardTitle>
          <CardDescription>Configure default pricing rules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
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
              <label className="text-sm font-medium">Default Group Discount (%)</label>
              <Input type="number" defaultValue="15" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Child Discount (%)</label>
              <Input type="number" defaultValue="50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tour</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Base Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Group Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Child Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Season</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price) => (
                  <tr key={price.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-medium text-sm">{price.tour}</td>
                    <td className="py-3 px-4">
                      <Input
                        type="number"
                        defaultValue={price.basePrice}
                        className="w-24"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        type="number"
                        defaultValue={price.groupPrice}
                        className="w-24"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        type="number"
                        defaultValue={price.childPrice}
                        className="w-24"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Select defaultValue={price.season}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Year</SelectItem>
                          <SelectItem value="summer">Summer</SelectItem>
                          <SelectItem value="winter">Winter</SelectItem>
                          <SelectItem value="spring">Spring</SelectItem>
                        </SelectContent>
                      </Select>
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
    </div>
  )
}
