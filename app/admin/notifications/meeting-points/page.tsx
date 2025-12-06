"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Plus, Edit, Trash2, Search, Copy, Send } from "lucide-react"

export default function MeetingPointsPage() {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null)

  const meetingPoints = [
    { 
      id: 1, 
      name: "Jemaa el-Fnaa Square",
      address: "Main entrance near Café de France, Jemaa el-Fnaa, Marrakech",
      coordinates: "31.6258° N, 7.9892° W",
      tours: 24,
      description: "Meet at the main entrance of Jemaa el-Fnaa square, near Café de France. Look for our guide with orange umbrella.",
      landmarks: "Near the mosque, across from the main food stalls"
    },
    { 
      id: 2, 
      name: "Koutoubia Mosque",
      address: "Avenue Mohammed V, Marrakech",
      coordinates: "31.6238° N, 7.9937° W",
      tours: 18,
      description: "Meet at the gardens near Koutoubia Mosque. Our guide will be wearing orange vest.",
      landmarks: "In the garden area, near the main entrance"
    },
    { 
      id: 3, 
      name: "Majorelle Garden Entrance",
      address: "Rue Yves Saint Laurent, Marrakech",
      coordinates: "31.6418° N, 8.0032° W",
      tours: 12,
      description: "Meet at the main ticket entrance of Majorelle Garden.",
      landmarks: "At the blue gates"
    },
    { 
      id: 4, 
      name: "Hotel Pickup Zone A",
      address: "La Mamounia Hotel, Avenue Bab Jdid",
      coordinates: "31.6198° N, 7.9981° W",
      tours: 8,
      description: "Pickup from hotel lobby. Please wait inside.",
      landmarks: "Hotel lobby area"
    },
    { 
      id: 5, 
      name: "Menara Gardens",
      address: "Avenue de la Menara, Marrakech",
      coordinates: "31.6125° N, 8.0183° W",
      tours: 6,
      description: "Meet at the main entrance parking area.",
      landmarks: "Near the olive groves entrance"
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meeting Points</h1>
          <p className="text-muted-foreground">Manage tour meeting locations and send notifications</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Meeting Point
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{meetingPoints.length}</p>
                <p className="text-sm text-muted-foreground">Meeting Points</p>
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
                <p className="text-2xl font-bold">234</p>
                <p className="text-sm text-muted-foreground">Notifications Sent Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting Points List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    All Meeting Points
                  </CardTitle>
                  <CardDescription>Click a point to edit or send notifications</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search locations..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meetingPoints.map((point) => (
                  <div 
                    key={point.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPoint === point.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedPoint(point.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{point.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{point.address}</p>
                          <p className="text-xs text-muted-foreground mt-1">{point.coordinates}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{point.tours} tours</span>
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

        {/* Send Notification Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Location Notification
            </CardTitle>
            <CardDescription>
              {selectedPoint 
                ? `Sending for: ${meetingPoints.find(p => p.id === selectedPoint)?.name}`
                : "Select a meeting point first"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedPoint ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium text-sm mb-2">Meeting Point Details</p>
                  <p className="text-sm text-muted-foreground">
                    {meetingPoints.find(p => p.id === selectedPoint)?.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Landmarks: {meetingPoints.find(p => p.id === selectedPoint)?.landmarks}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Send To</Label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="upcoming">Upcoming Tours (Next 24h)</option>
                    <option value="today">Today's Tours</option>
                    <option value="tomorrow">Tomorrow's Tours</option>
                    <option value="specific">Specific Booking</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Message (Optional)</Label>
                  <Textarea 
                    id="additionalInfo" 
                    placeholder="Any additional instructions..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Include</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Google Maps Link</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Meeting Point Image</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Guide Contact Number</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a meeting point from the list to send notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
