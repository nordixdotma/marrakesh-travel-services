"use client"

import { useState } from "react"
import { useAuth } from "@/components/login-modal"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Camera, Save } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false)
    // Update localStorage with new user data
    const updatedUser = {
      ...user,
      ...formData,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.users.profile.pageTitle}</h1>
        <p className="text-muted-foreground">{t.users.profile.pageDescription}</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.users.profile.personalInfo}</CardTitle>
              <CardDescription>{t.users.profile.updateDetails}</CardDescription>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                {t.users.profile.editProfile}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  {t.users.profile.cancel}
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {t.users.profile.save}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground">{user?.name || "User"}</p>
              <p className="text-sm text-muted-foreground">{t.users.profile.memberSince}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t.users.profile.fullName}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder={t.users.profile.namePlaceholder}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.users.profile.emailAddress}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder={t.users.profile.emailPlaceholder}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t.users.profile.phoneNumber}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder={t.users.profile.phonePlaceholder}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">0</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="font-semibold">No bookings yet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <span className="text-xl font-bold text-red-500">0</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Favorites</p>
                <p className="font-semibold">No favorites yet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">0</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Trips</p>
                <p className="font-semibold">No trips yet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
