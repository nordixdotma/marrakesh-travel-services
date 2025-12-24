"use client"

import { useLanguage } from "@/components/language-provider"
import { User, Mail, Lock, Bell, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { authApi, userApi, ApiError } from "@/lib/api"
import { toast } from "sonner"

export default function AffiliateSettingsPage() {
  const { language } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await authApi.getMe()
        if (response.user) {
          setName(response.user.name || "")
          setEmail(response.user.email || "")
        }
      } catch (err) {
        console.error('Error fetching user data:', err)
        if (err instanceof ApiError) {
          setError(err.message)
          toast.error('Failed to load profile', {
            description: err.message || 'Please try again later',
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
      await userApi.updateProfile({ name, email })
      setSaved(true)
      toast.success(
        language === "fr" 
          ? "Profil mis à jour avec succès"
          : language === "es"
          ? "Perfil actualizado exitosamente"
          : "Profile updated successfully"
      )
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Error updating profile:', err)
      if (err instanceof ApiError) {
        setError(err.message)
        toast.error('Failed to update profile', {
          description: err.message || 'Please try again later',
        })
      } else {
        toast.error('Failed to update profile', {
          description: 'Please try again later',
        })
      }
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error(
        language === "fr" 
          ? "Les mots de passe ne correspondent pas"
          : language === "es"
          ? "Las contraseñas no coinciden"
          : "Passwords do not match"
      )
      return
    }

    if (newPassword.length < 6) {
      toast.error(
        language === "fr" 
          ? "Le mot de passe doit contenir au moins 6 caractères"
          : language === "es"
          ? "La contraseña debe tener al menos 6 caracteres"
          : "Password must be at least 6 characters long"
      )
      return
    }

    try {
      setChangingPassword(true)
      setError(null)
      await authApi.changePassword(currentPassword, newPassword)
      toast.success(
        language === "fr" 
          ? "Mot de passe modifié avec succès"
          : language === "es"
          ? "Contraseña cambiada exitosamente"
          : "Password changed successfully"
      )
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error('Error changing password:', err)
      if (err instanceof ApiError) {
        setError(err.message)
        toast.error('Failed to change password', {
          description: err.message || 'Please try again later',
        })
      } else {
        toast.error('Failed to change password', {
          description: 'Please try again later',
        })
      }
    } finally {
      setChangingPassword(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === "fr" ? "Paramètres" : language === "es" ? "Configuración" : "Settings"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "fr" 
            ? "Gérez vos informations personnelles et préférences" 
            : language === "es"
            ? "Gestiona tu información personal y preferencias"
            : "Manage your personal information and preferences"}
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            {language === "fr" ? "Informations personnelles" : language === "es" ? "Información personal" : "Personal Information"}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {language === "fr" ? "Nom complet" : language === "es" ? "Nombre completo" : "Full Name"}
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9"
                placeholder={
                  language === "fr" 
                    ? "Entrez votre nom complet" 
                    : language === "es"
                    ? "Ingrese su nombre completo"
                    : "Enter your full name"
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {language === "fr" ? "Email" : "Email"}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                placeholder={
                  language === "fr" 
                    ? "Entrez votre email" 
                    : language === "es"
                    ? "Ingrese su correo electrónico"
                    : "Enter your email"
                }
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <Button onClick={handleSave} className="w-full sm:w-auto" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {language === "fr" ? "Enregistrement..." : language === "es" ? "Guardando..." : "Saving..."}
              </>
            ) : saved ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                {language === "fr" ? "Enregistré!" : language === "es" ? "¡Guardado!" : "Saved!"}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {language === "fr" ? "Enregistrer" : language === "es" ? "Guardar" : "Save"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Password Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            {language === "fr" ? "Changer le mot de passe" : language === "es" ? "Cambiar contraseña" : "Change Password"}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              {language === "fr" ? "Mot de passe actuel" : language === "es" ? "Contraseña actual" : "Current Password"}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pl-9"
                placeholder={
                  language === "fr" 
                    ? "Entrez votre mot de passe actuel" 
                    : language === "es"
                    ? "Ingrese su contraseña actual"
                    : "Enter your current password"
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">
              {language === "fr" ? "Nouveau mot de passe" : language === "es" ? "Nueva contraseña" : "New Password"}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-9"
                placeholder={
                  language === "fr" 
                    ? "Entrez votre nouveau mot de passe" 
                    : language === "es"
                    ? "Ingrese su nueva contraseña"
                    : "Enter your new password"
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {language === "fr" ? "Confirmer le mot de passe" : language === "es" ? "Confirmar contraseña" : "Confirm Password"}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-9"
                placeholder={
                  language === "fr" 
                    ? "Confirmez votre nouveau mot de passe" 
                    : language === "es"
                    ? "Confirme su nueva contraseña"
                    : "Confirm your new password"
                }
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <Button onClick={handlePasswordChange} className="w-full sm:w-auto" disabled={changingPassword}>
            {changingPassword ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {language === "fr" ? "Mise à jour..." : language === "es" ? "Actualizando..." : "Updating..."}
              </>
            ) : (
              language === "fr" ? "Mettre à jour le mot de passe" : language === "es" ? "Actualizar contraseña" : "Update Password"
            )}
          </Button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            {language === "fr" ? "Notifications" : language === "es" ? "Notificaciones" : "Notifications"}
          </h2>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">
              {language === "fr" ? "Notifications par email" : language === "es" ? "Notificaciones por correo" : "Email Notifications"}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === "fr" 
                ? "Recevez des notifications sur vos réservations et commissions"
                : language === "es"
                ? "Recibe notificaciones sobre tus reservas y comisiones"
                : "Receive notifications about your bookings and commissions"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  )
}

