"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import { OfferForm } from "@/components/admin/offer-form"
import { activitiesOffers } from "@/lib/offers-data"
import { Loader2 } from "lucide-react"

function ActivitiesDetailContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === "new"
  
  const modeParam = searchParams.get("mode")
  const [mode, setMode] = useState<"view" | "edit" | "add">(
    isNew ? "add" : (modeParam === "edit" ? "edit" : "view")
  )

  // Find the offer if editing/viewing
  const offer = isNew ? undefined : activitiesOffers.find(o => o.id === id)

  // If not new and offer not found, redirect back
  useEffect(() => {
    if (!isNew && !offer) {
      router.push("/admin/activities")
    }
  }, [isNew, offer, router])

  // Update mode when URL changes
  useEffect(() => {
    if (!isNew) {
      setMode(modeParam === "edit" ? "edit" : "view")
    }
  }, [modeParam, isNew])

  const handleModeChange = (newMode: "view" | "edit" | "add") => {
    setMode(newMode)
    if (newMode === "edit") {
      router.push(`/admin/activities/${id}?mode=edit`)
    } else if (newMode === "view") {
      router.push(`/admin/activities/${id}?mode=view`)
    }
  }

  if (!isNew && !offer) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <OfferForm
      mode={mode}
      offerType="activities"
      offer={offer}
      onModeChange={handleModeChange}
      backUrl="/admin/activities"
    />
  )
}

export default function ActivitiesDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <ActivitiesDetailContent />
    </Suspense>
  )
}
