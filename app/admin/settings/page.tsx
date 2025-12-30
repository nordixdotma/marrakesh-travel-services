"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminApi, uploadApi, type ApiError } from "@/lib/api"
import {
  FileImage,
  Image as ImageIcon,
  Loader2,
  Phone,
  Save,
  Video
} from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface SiteSetting {
  id: string
  setting_key: string
  setting_value: string | null
  description: string | null
  created_at: string
  updated_at: string
}

const HERO_PAGES = [
  { key: 'hero_home', label: 'Home Page', description: 'Hero image for the home page' },
  { key: 'hero_tours', label: 'Tours Page', description: 'Hero image for the tours page' },
  { key: 'hero_excursions', label: 'Excursions Page', description: 'Hero image for the excursions page' },
  { key: 'hero_activities', label: 'Activities Page', description: 'Hero image for the activities page' },
  { key: 'hero_transfers', label: 'Transfers Page', description: 'Hero image for the transfers page' },
  { key: 'hero_packages', label: 'Packages Page', description: 'Hero image for the packages page' },
  { key: 'hero_about', label: 'About Page', description: 'Hero image for the about page' },
  { key: 'hero_contact', label: 'Contact Page', description: 'Hero image for the contact page' },
  { key: 'hero_blog', label: 'Blog Page', description: 'Hero image for the blog page' },
  { key: 'hero_terms', label: 'Terms Page', description: 'Hero image for the terms page' },
]

export default function AdminSettingsPage() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await adminApi.getAllSiteSettings()
      setSettings(response.settings || [])
      
      // Initialize form data
      const initialData: Record<string, string> = {}
      response.settings.forEach(setting => {
        initialData[setting.setting_key] = setting.setting_value || ''
      })
      setFormData(initialData)
    } catch (err: any) {
      console.error('Error fetching settings:', err)
      const apiError = err as ApiError
      toast.error(t.admin?.settings?.errorLoading || 'Failed to load settings', {
        description: apiError.message || 'Please try again later',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleFileUpload = async (key: string, file: File, type: 'image' | 'video') => {
    try {
      setUploading(prev => ({ ...prev, [key]: true }))
      
      // Validate file type
      const isImage = file.type.startsWith('image/')
      const isVideo = file.type.startsWith('video/')
      
      if (type === 'image' && !isImage) {
        toast.error(t.admin?.settings?.invalidFileType || 'Invalid file type', {
          description: t.admin?.settings?.selectImage || 'Please select an image file',
        })
        return
      }
      
      if (type === 'video' && !isVideo) {
        toast.error(t.admin?.settings?.invalidFileType || 'Invalid file type', {
          description: t.admin?.settings?.selectVideo || 'Please select a video file',
        })
        return
      }

      // Upload file
      const url = await uploadApi.uploadFile(file)
      
      // Update form data with the uploaded file URL
      handleInputChange(key, url)
      
      toast.success(t.admin?.settings?.uploadSuccess?.replace('{type}', type === 'image' ? (t.admin?.common?.image || 'Image') : (t.admin?.common?.video || 'Video')) || `${type === 'image' ? 'Image' : 'Video'} uploaded successfully`)
    } catch (err: any) {
      console.error('Error uploading file:', err)
      toast.error('Failed to upload file', {
        description: err.message || 'Please try again',
      })
    } finally {
      setUploading(prev => ({ ...prev, [key]: false }))
    }
  }

  const handleImageUpload = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(key, file, 'image')
    }
    // Reset input so same file can be selected again
    event.target.value = ''
  }

  const handleVideoUpload = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(key, file, 'video')
    }
    // Reset input so same file can be selected again
    event.target.value = ''
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Prepare settings array
      const settingsToUpdate = Object.entries(formData).map(([setting_key, setting_value]) => ({
        setting_key,
        setting_value: setting_value || undefined,
      }))

      await adminApi.updateSiteSettings(settingsToUpdate)
      toast.success(t.admin?.settings?.saveSuccess || 'Settings saved successfully')
      fetchSettings() // Refresh to get updated data
      
      // Dispatch event to notify other components to refresh settings
      if (typeof window !== 'undefined') {
        const event = new Event('settings-updated')
        window.dispatchEvent(event)
        if (process.env.NODE_ENV === 'development') {
          console.log('📢 Settings update event dispatched')
        }
      }
    } catch (err: any) {
      console.error('Error saving settings:', err)
      const apiError = err as ApiError
      toast.error(t.admin?.settings?.saveFailed || 'Failed to save settings', {
        description: apiError.message || 'Please try again',
      })
    } finally {
      setSaving(false)
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.admin?.settings?.title || "Site Settings"}</h1>
        <p className="text-muted-foreground mt-1">
          {t.admin?.settings?.description || "Manage hero images and WhatsApp contact number"}
        </p>
      </div>

      {/* WhatsApp Number */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            {t.admin?.settings?.whatsapp?.title || "WhatsApp Contact"}
          </CardTitle>
          <CardDescription>
            {t.admin?.settings?.whatsapp?.description || "Update the WhatsApp number used in the floating contact widget"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp_number">{t.admin?.settings?.whatsapp?.label || "WhatsApp Number"}</Label>
            <Input
              id="whatsapp_number"
              value={formData['whatsapp_number'] || ''}
              onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
              placeholder="212661044503"
            />
            <p className="text-xs text-muted-foreground">
              {t.admin?.settings?.whatsapp?.help || "Format: Country code + number without + (e.g., 212661044503 for +212 661 044 503)"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hero Images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            {t.admin?.settings?.hero?.title || "Hero Images"}
          </CardTitle>
          <CardDescription>
            {t.admin?.settings?.hero?.description || "Upload hero images or videos for each page. You can also manually enter a URL."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {HERO_PAGES.map((page) => {
            const isUploading = uploading[page.key]
            const currentValue = formData[page.key] || ''
            const isVideo = currentValue && (currentValue.endsWith('.mp4') || currentValue.endsWith('.webm') || currentValue.includes('video'))
            
            return (
              <div key={page.key} className="space-y-2">
                <Label htmlFor={page.key}>{t.admin?.settings?.hero?.pages?.[page.key] || page.label}</Label>
                <div className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="file"
                        id={`${page.key}-image`}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(page.key, e)}
                        className="hidden"
                        disabled={isUploading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isUploading}
                        onClick={() => document.getElementById(`${page.key}-image`)?.click()}
                      >
                        <FileImage className="h-4 w-4 mr-2" />
                        {isUploading ? (t.admin?.settings?.hero?.uploading || 'Uploading...') : (t.admin?.settings?.hero?.uploadImage || 'Upload Image')}
                      </Button>
                      
                      <input
                        type="file"
                        id={`${page.key}-video`}
                        accept="video/*"
                        onChange={(e) => handleVideoUpload(page.key, e)}
                        className="hidden"
                        disabled={isUploading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isUploading}
                        onClick={() => document.getElementById(`${page.key}-video`)?.click()}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {isUploading ? (t.admin?.settings?.hero?.uploading || 'Uploading...') : (t.admin?.settings?.hero?.uploadVideo || 'Upload Video')}
                      </Button>
                    </div>
                    
                    <Input
                      id={page.key}
                      value={currentValue}
                      onChange={(e) => handleInputChange(page.key, e.target.value)}
                      placeholder={t.admin?.settings?.hero?.urlPlaceholder || "/placeholder.jpg or URL"}
                      className="w-full"
                    />
                  </div>
                  
                  {currentValue && (
                    <div className="relative w-24 h-24 rounded-md overflow-hidden border border-border bg-muted flex items-center justify-center">
                      {isVideo ? (
                        <video
                          src={currentValue}
                          className="w-full h-full object-cover"
                          controls={false}
                          muted
                        />
                      ) : (
                        <img
                          src={currentValue}
                          alt={page.label}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/placeholder.jpg'
                          }}
                        />
                      )}
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{page.description}</p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t.admin?.common?.saving || "Saving..."}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {t.admin?.common?.saveSettings || t.admin?.common?.save || "Save Settings"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
