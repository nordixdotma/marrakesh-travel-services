"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building, Save, MapPin, FileText, Users, Clock, Award } from "lucide-react"

export default function AgencySettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agency Information</h1>
          <p className="text-muted-foreground">Manage your agency details and legal information</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Details
            </CardTitle>
            <CardDescription>Legal company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Legal Name</Label>
              <Input id="companyName" defaultValue="Marrakesh Travel Services SARL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input id="registrationNumber" defaultValue="RC 12345" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID (IF)</Label>
              <Input id="taxId" defaultValue="12345678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ice">ICE Number</Label>
              <Input id="ice" defaultValue="001234567890123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patente">Patente</Label>
              <Input id="patente" defaultValue="45678901" />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
            <CardDescription>Office location details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input id="streetAddress" defaultValue="123 Avenue Mohammed V" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="Marrakech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" defaultValue="40000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input id="region" defaultValue="Marrakech-Safi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" defaultValue="Morocco" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpsCoordinates">GPS Coordinates</Label>
              <Input id="gpsCoordinates" defaultValue="31.6258, -7.9892" />
            </div>
          </CardContent>
        </Card>

        {/* Licenses & Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Licenses & Certifications
            </CardTitle>
            <CardDescription>Tourism licenses and certifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tourismLicense">Tourism License Number</Label>
              <Input id="tourismLicense" defaultValue="TL-MAR-2024-001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseExpiry">License Expiry Date</Label>
              <Input id="licenseExpiry" type="date" defaultValue="2025-12-31" />
            </div>
            <div className="space-y-2">
              <Label>Certifications</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border rounded-lg">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Ministry of Tourism Approved</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>TripAdvisor Certificate of Excellence</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg">
                  <input type="checkbox" className="rounded" />
                  <span>Sustainable Tourism Certified</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Business Hours
            </CardTitle>
            <CardDescription>Office operating hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="w-24 text-sm">{day}</span>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="time" 
                      defaultValue={day === "Sunday" ? "" : "09:00"} 
                      className="w-28"
                      disabled={day === "Sunday"}
                    />
                    <span>-</span>
                    <Input 
                      type="time" 
                      defaultValue={day === "Sunday" ? "" : "18:00"} 
                      className="w-28"
                      disabled={day === "Sunday"}
                    />
                    <label className="flex items-center gap-1 text-sm">
                      <input 
                        type="checkbox" 
                        defaultChecked={day === "Sunday"}
                        className="rounded"
                      />
                      Closed
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Note: Customer support is available 24/7 via WhatsApp
            </p>
          </CardContent>
        </Card>

        {/* Team Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Information
            </CardTitle>
            <CardDescription>Display team details on website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input id="teamSize" type="number" defaultValue="15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsFounded">Founded Year</Label>
              <Input id="yearsFounded" type="number" defaultValue="2015" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input id="experience" type="number" defaultValue="10" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="showTeam" defaultChecked className="rounded" />
              <Label htmlFor="showTeam">Display team on About page</Label>
            </div>
          </CardContent>
        </Card>

        {/* About Us */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              About Us Content
            </CardTitle>
            <CardDescription>Agency description for website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea 
                id="shortDescription" 
                rows={3}
                defaultValue="Marrakesh Travel Services is a premier travel agency offering authentic Moroccan experiences since 2015."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea 
                id="fullDescription" 
                rows={6}
                defaultValue="We are a team of passionate travel experts dedicated to creating unforgettable experiences in Morocco. From desert adventures to cultural tours, we provide personalized services tailored to each traveler's needs. Our local expertise and commitment to quality have made us a trusted choice for visitors from around the world."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea 
                id="mission" 
                rows={2}
                defaultValue="To share the beauty and culture of Morocco with travelers from around the world through authentic, sustainable, and memorable experiences."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
