"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/login-modal"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Camera, Save, Loader2 } from "lucide-react"
import { userApi, bookingApi, type ApiError } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user, login } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const [stats, setStats] = useState({
    totalBookings: 0,
    favorites: 0,
    completedTrips: 0,
  })
  // Initialize formData with user data from auth context as fallback
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  useEffect(() => {
    // Update formData when user changes
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      })
    }
  }, [user])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        
        // Check if token exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) {
          // Use user data from auth context if no token
          if (user) {
            setFormData({
              name: user.name || "",
              email: user.email || "",
              phone: user.phone || "",
            })
            setProfileData(user)
          }
          setIsLoading(false)
          return
        }
        
        const response = await userApi.getProfile()
        setProfileData(response.user)
        // Update formData with API response, but keep user data as fallback
        setFormData({
          name: response.user.name || user?.name || "",
          email: response.user.email || user?.email || "",
          phone: response.user.phone || user?.phone || "",
        })
      } catch (err) {
        const apiError = err as ApiError
        console.error('Error fetching profile:', err)
        // Use user data from auth context as fallback if API fails
        if (user) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
          })
          setProfileData(user)
        }
        
        // If it's an authentication error, don't show error toast, just use fallback
        if (!apiError.message?.includes('Authentication') && !apiError.message?.includes('User not found')) {
          toast.error('Failed to load profile', {
            description: apiError.message || 'Please try again later',
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    const fetchStats = async () => {
      try {
        // Get bookings count
        const bookingsResponse = await bookingApi.getBookings(undefined, language, 100, 0)
        const bookings = bookingsResponse.bookings || []
        const completed = bookings.filter((b: any) => b.status?.toLowerCase() === 'completed')
        
        // Get favorites count
        const favoritesResponse = await userApi.getFavorites(language)
        const favorites = favoritesResponse.favorites || []

        setStats({
          totalBookings: bookings.length,
          favorites: favorites.length,
          completedTrips: completed.length,
        })
      } catch (err) {
        console.error('Error fetching stats:', err)
      }
    }

    if (user) {
      fetchProfile()
      fetchStats()
    }

    // Listen for favorites updates
    const handleFavoritesUpdate = () => {
      fetchStats()
    }
    
    window.addEventListener('favorites-updated', handleFavoritesUpdate)
    
    return () => {
      window.removeEventListener('favorites-updated', handleFavoritesUpdate)
    }
  }, [user, language])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const response = await userApi.updateProfile(formData)
      
      // Update auth state
      const updatedUser = {
        ...user,
        ...response.user,
      }
      login(updatedUser)
      
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (err) {
      const apiError = err as ApiError
      console.error('Error updating profile:', err)
      toast.error('Failed to update profile', {
        description: apiError.message || 'Please try again',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
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
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {t.users.profile.save}
                    </>
                  )}
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
              <p className="font-semibold text-foreground">{profileData?.name || user?.name || "User"}</p>
              <p className="text-sm text-muted-foreground">
                {profileData?.created_at 
                  ? `Member since ${new Date(profileData.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`
                  : t.users.profile.memberSince}
              </p>
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
                <p className="font-semibold">{stats.totalBookings} {stats.totalBookings === 1 ? 'booking' : 'bookings'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <span className="text-xl font-bold text-red-500">{stats.favorites}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Favorites</p>
                <p className="font-semibold">{stats.favorites === 0 ? 'No favorites yet' : `${stats.favorites} ${stats.favorites === 1 ? 'favorite' : 'favorites'}`}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">{stats.completedTrips}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Trips</p>
                <p className="font-semibold">{stats.completedTrips === 0 ? 'No trips yet' : `${stats.completedTrips} ${stats.completedTrips === 1 ? 'trip' : 'trips'}`}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
