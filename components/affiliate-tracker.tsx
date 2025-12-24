"use client"

import { useEffect } from "react"
import { trackAffiliateFromUrl } from "@/lib/affiliate-tracking"

/**
 * Client component to track affiliate codes from URL parameters
 * This should be included in the root layout to track on all pages
 */
export default function AffiliateTracker() {
  useEffect(() => {
    trackAffiliateFromUrl()
  }, [])

  return null
}

