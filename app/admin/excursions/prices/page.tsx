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

const excursionPrices = [
  { id: 1, excursion: "Ouzoud Waterfalls Day Trip", adultPrice: 85, childPrice: 45, groupPrice: 70 },
  { id: 2, excursion: "Ourika Valley Excursion", adultPrice: 65, childPrice: 35, groupPrice: 55 },
  { id: 3, excursion: "Agafay Desert Sunset", adultPrice: 120, childPrice: 70, groupPrice: 100 },
  { id: 4, excursion: "Berber Villages Tour", adultPrice: 95, childPrice: 50, groupPrice: 80 },
  { id: 5, excursion: "Imlil & Toubkal Day Hike", adultPrice: 110, childPrice: 60, groupPrice: 95 },
]

export default function ExcursionPricesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Excursion Prices</h1>
          <p className="text-muted-foreground">Manage pricing for all excursions</p>
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
          <CardDescription>Configure default pricing rules for excursions</CardDescription>
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
              <label className="text-sm font-medium">Child Age Limit</label>
              <Input type="number" defaultValue="12" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Group Size for Discount</label>
              <Input type="number" defaultValue="6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Excursion Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Excursion</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Adult Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Child Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Group Price</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {excursionPrices.map((price) => (
                  <tr key={price.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-medium text-sm">{price.excursion}</td>
                    <td className="py-3 px-4">
                      <Input type="number" defaultValue={price.adultPrice} className="w-24" />
                    </td>
                    <td className="py-3 px-4">
                      <Input type="number" defaultValue={price.childPrice} className="w-24" />
                    </td>
                    <td className="py-3 px-4">
                      <Input type="number" defaultValue={price.groupPrice} className="w-24" />
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
