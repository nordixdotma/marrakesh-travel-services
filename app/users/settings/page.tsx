"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/login-modal"
import { useLanguage } from "@/components/language-provider"
import { Settings, Bell, Shield, Globe, Trash2, Lock, Eye, EyeOff } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const router = useRouter()
  const { logout } = useAuth()
  const { t } = useLanguage()
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [promotionalEmails, setPromotionalEmails] = useState(true)
  
  // Privacy settings
  const [showProfile, setShowProfile] = useState(true)
  
  // Password change
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const handleDeleteAccount = () => {
    // Clear all user data
    localStorage.removeItem("user")
    localStorage.removeItem("favorites")
    logout()
    router.push("/")
  }

  const handlePasswordChange = () => {
    // In a real app, this would validate and update the password
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!")
      return
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters!")
      return
    }
    // Reset form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
    setShowPasswordForm(false)
    alert("Password updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.users.settings.pageTitle}</h1>
        <p className="text-muted-foreground">{t.users.settings.pageDescription}</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            {t.users.settings.notifications}
          </CardTitle>
          <CardDescription>{t.users.settings.notificationsDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">{t.users.settings.emailNotifications}</Label>
              <p className="text-sm text-muted-foreground">
                {t.users.settings.emailNotificationsDesc}
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">{t.users.settings.smsNotifications}</Label>
              <p className="text-sm text-muted-foreground">
                {t.users.settings.smsNotificationsDesc}
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="promotional-emails">{t.users.settings.promotionalEmails}</Label>
              <p className="text-sm text-muted-foreground">
                {t.users.settings.promotionalEmailsDesc}
              </p>
            </div>
            <Switch
              id="promotional-emails"
              checked={promotionalEmails}
              onCheckedChange={setPromotionalEmails}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {t.users.settings.security}
          </CardTitle>
          <CardDescription>{t.users.settings.securityDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showPasswordForm ? (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t.users.settings.changePassword}</Label>
                <p className="text-sm text-muted-foreground">
                  Last changed: Never
                </p>
              </div>
              <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
                <Lock className="h-4 w-4 mr-2" />
                {t.users.settings.changePassword}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
              <div className="space-y-2">
                <Label htmlFor="current-password">{t.users.settings.currentPassword}</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder={t.users.settings.currentPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">{t.users.settings.newPassword}</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t.users.settings.newPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">{t.users.settings.confirmNewPassword}</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder={t.users.settings.confirmNewPassword}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handlePasswordChange}>{t.users.settings.updatePassword}</Button>
                <Button variant="outline" onClick={() => setShowPasswordForm(false)}>
                  {t.users.settings.cancelAction}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            {t.users.settings.dangerZone}
          </CardTitle>
          <CardDescription>{t.users.settings.dangerZoneDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium text-foreground">{t.users.settings.deleteAccount}</p>
              <p className="text-sm text-muted-foreground">
                {t.users.settings.deleteAccountDesc}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">{t.users.settings.deleteAccount}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.users.settings.deleteAccountConfirmTitle}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.users.settings.deleteAccountConfirmDesc}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t.users.settings.cancelAction}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {t.users.settings.yesDeleteAccount}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
