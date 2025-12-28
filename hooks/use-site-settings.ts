"use client"

import { useState, useEffect } from "react"
import { offersApi } from "@/lib/api"

interface SiteSettings {
  whatsapp_number?: string
  hero_home?: string
  hero_tours?: string
  hero_excursions?: string
  hero_activities?: string
  hero_transfers?: string
  hero_packages?: string
  hero_about?: string
  hero_contact?: string
  hero_blog?: string
  hero_terms?: string
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Use the public settings endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030'}/api/v1/settings`)
        if (response.ok) {
          const data = await response.json()
          setSettings(data.settings || {})
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error)
        // Use defaults if fetch fails
        setSettings({
          whatsapp_number: '212661044503',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, loading }
}

