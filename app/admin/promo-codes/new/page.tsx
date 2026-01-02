"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Ticket,
  ArrowLeft,
  Save,
  Loader2,
  Percent,
  DollarSign,
  Calendar,
  Package,
  X,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { adminApi, offersApi } from "@/lib/api"
import { toast } from "sonner"

interface Offer {
  id: string
  type: string
  title: string
  depart_city: string
}

export default function CreatePromoCodePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState<Offer[]>([])
  
  const [formData, setFormData] = useState({
    code: "",
    discountType: "PERCENTAGE" as "PERCENTAGE" | "FIXED_AMOUNT",
    discountValue: 0,
    minPurchase: "",
    maxDiscount: "",
    validFrom: "",
    validTo: "",
    usageLimit: "",
    isActive: true,
    selectedOfferIds: [] as string[],
  })

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoadingOffers(true)
        // Fetch all offer types - use Promise.allSettled to handle partial failures
        const results = await Promise.allSettled([
          offersApi.getOffers("TOURS", "en"),
          offersApi.getOffers("EXCURSIONS", "en"),
          offersApi.getOffers("ACTIVITIES", "en"),
          offersApi.getOffers("PACKAGES", "en"),
          offersApi.getOffers("TRANSFERS", "en"),
        ])

        const allOffers: Offer[] = []

        // Process each result
        const types = ["tours", "excursions", "activities", "packages", "transfers"]
        results.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value?.offers) {
            const typeOffers = result.value.offers.map((o: any) => ({
              id: o.id,
              type: types[index],
              title: o.title || `Untitled ${types[index].charAt(0).toUpperCase() + types[index].slice(1)}`,
              depart_city: o.depart_city || 'N/A',
            }))
            allOffers.push(...typeOffers)
          }
        })

        setOffers(allOffers)
      } catch (err: any) {
        console.error('Error fetching offers:', err)
        toast.error(t.admin?.promoCodes?.form?.noOffers || 'Failed to load offers', {
          description: err.message || t.admin?.common?.errorOccurred || 'Please try again later',
        })
      } finally {
        setLoadingOffers(false)
      }
    }

    fetchOffers()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)

    try {
      // Validate required fields
      if (!formData.code || !formData.discountValue || !formData.validFrom || !formData.validTo) {
        throw new Error(t.admin?.promoCodes?.form?.validationError || 'Please fill in all required fields (Code, Discount Value, Valid From, Valid To)')
      }

      if (formData.discountValue <= 0) {
        throw new Error(t.admin?.promoCodes?.form?.discountError || 'Discount value must be greater than 0')
      }

      if (formData.discountType === "PERCENTAGE" && formData.discountValue > 100) {
        throw new Error(t.admin?.promoCodes?.form?.percentageError || 'Percentage discount cannot exceed 100%')
      }

      const validFromDate = new Date(formData.validFrom)
      const validToDate = new Date(formData.validTo)
      if (validToDate <= validFromDate) {
        throw new Error(t.admin?.promoCodes?.form?.dateError || 'Valid To date must be after Valid From date')
      }

      const requestData = {
        code: formData.code.toUpperCase(),
        discountType: formData.discountType,
        discountValue: formData.discountValue,
        minPurchase: formData.minPurchase ? parseFloat(formData.minPurchase) : null,
        maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
        validFrom: validFromDate.toISOString(),
        validTo: validToDate.toISOString(),
        usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
        isActive: formData.isActive,
        offerIds: formData.selectedOfferIds,
      }

      await adminApi.createPromoCode(requestData)

      toast.success(t.admin?.promoCodes?.form?.successCreated || 'Promo code created successfully!', {
        description: t.admin?.promoCodes?.form?.successCreatedDesc || "The promo code has been added to your promotions.",
        duration: 3000,
      })
      
      setTimeout(() => {
        router.push("/admin/promo-codes")
      }, 500)
    } catch (error: any) {
      console.error('Error saving promo code:', error)
      const errorMessage = error.message || t.admin?.promoCodes?.form?.errorCreating || 'Failed to save promo code. Please try again.'
      setSaveError(errorMessage)
      toast.error(t.admin?.offerForm?.errorSaving || 'Failed to save', {
        description: errorMessage,
        duration: 5000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const toggleOfferSelection = (offerId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedOfferIds: prev.selectedOfferIds.includes(offerId)
        ? prev.selectedOfferIds.filter(id => id !== offerId)
        : [...prev.selectedOfferIds, offerId]
    }))
  }

  const selectAllOffers = () => {
    setFormData(prev => ({
      ...prev,
      selectedOfferIds: offers.map(o => o.id)
    }))
  }

  const deselectAllOffers = () => {
    setFormData(prev => ({
      ...prev,
      selectedOfferIds: []
    }))
  }

  const offersByType = offers.reduce((acc, offer) => {
    if (!acc[offer.type]) {
      acc[offer.type] = []
    }
    acc[offer.type].push(offer)
    return acc
  }, {} as Record<string, Offer[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/admin/promo-codes")} className="gap-2 rounded-sm">
            <ArrowLeft className="h-4 w-4" />
            {t.admin?.common?.back || "Back"}
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create Promo Code</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/promo-codes")} className="rounded-sm bg-gray-50">
            {t.admin?.offerForm?.cancel || "Cancel"}
          </Button>
          <Button onClick={handleSave} className="gap-2 rounded-sm" disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Promo Code
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {saveError && (
        <Card className="border-destructive/50 bg-destructive/10 rounded-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div>
              <p className="text-sm font-medium text-destructive">{t.admin?.promoCodes?.form?.errorCreating || "Error creating promo code"}</p>
              <p className="text-xs text-destructive/80">{saveError}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Basic Info */}
        <div className="space-y-6">
          <Card className="rounded-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                {t.admin?.offerForm?.basicInfo || "Basic Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.admin?.promoCodes?.form?.code || "Promo Code"} *</Label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g., SUMMER2024"
                  className="rounded-sm bg-gray-50 font-mono"
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">Code will be converted to uppercase</p>
              </div>

              <div className="space-y-2">
                <Label>{t.admin?.promoCodes?.form?.discountType || "Discount Type"} *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="discountType"
                      value="PERCENTAGE"
                      checked={formData.discountType === "PERCENTAGE"}
                      onChange={(e) => setFormData(prev => ({ ...prev, discountType: e.target.value as "PERCENTAGE" | "FIXED_AMOUNT" }))}
                      className="rounded-sm"
                    />
                    <Percent className="h-4 w-4" />
                    <span>{t.admin?.promoCodes?.form?.percentage || "Percentage"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="discountType"
                      value="FIXED_AMOUNT"
                      checked={formData.discountType === "FIXED_AMOUNT"}
                      onChange={(e) => setFormData(prev => ({ ...prev, discountType: e.target.value as "PERCENTAGE" | "FIXED_AMOUNT" }))}
                      className="rounded-sm"
                    />
                    <DollarSign className="h-4 w-4" />
                    <span>{t.admin?.promoCodes?.form?.fixedAmount || "Fixed Amount"}</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  {t.admin?.promoCodes?.form?.discountValue || "Discount Value"} * {formData.discountType === "PERCENTAGE" ? "(%)" : "(€)"}
                </Label>
                <Input
                  type="number"
                  value={formData.discountValue || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, discountValue: parseFloat(e.target.value) || 0 }))}
                  placeholder={formData.discountType === "PERCENTAGE" ? "e.g., 10" : "e.g., 50"}
                  className="rounded-sm bg-gray-50"
                  min="0"
                  max={formData.discountType === "PERCENTAGE" ? "100" : undefined}
                  step="0.01"
                />
              </div>

              {formData.discountType === "PERCENTAGE" && (
                <div className="space-y-2">
                  <Label>{t.admin?.promoCodes?.form?.maxDiscount || "Maximum Discount (€) - Optional"}</Label>
                  <Input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxDiscount: e.target.value }))}
                    placeholder="e.g., 100"
                    className="rounded-sm bg-gray-50"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground">Limit the maximum discount amount for percentage discounts</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>{t.admin?.promoCodes?.form?.minPurchase || "Minimum Purchase (€) - Optional"}</Label>
                <Input
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => setFormData(prev => ({ ...prev, minPurchase: e.target.value }))}
                  placeholder="e.g., 100"
                  className="rounded-sm bg-gray-50"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-muted-foreground">Minimum purchase amount required to use this code</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {t.admin?.promoCodes?.form?.validityPeriod || "Validity Period"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t.admin?.promoCodes?.form?.validFrom || "Valid From"} *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.validFrom}
                    onChange={(e) => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
                    className="rounded-sm bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.admin?.promoCodes?.form?.validTo || "Valid To"} *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.validTo}
                    onChange={(e) => setFormData(prev => ({ ...prev, validTo: e.target.value }))}
                    className="rounded-sm bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm bg-white">
            <CardHeader>
              <CardTitle>{t.admin?.promoCodes?.form?.usageLimits || "Usage Limits"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.admin?.promoCodes?.form?.usageLimit || "Usage Limit - Optional"}</Label>
                <Input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: e.target.value }))}
                  placeholder="e.g., 100"
                  className="rounded-sm bg-gray-50"
                  min="1"
                />
                <p className="text-xs text-muted-foreground">Maximum number of times this code can be used. Leave empty for unlimited.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded-sm"
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  {t.admin?.promoCodes?.form?.activeLabel || "Active (promo code is enabled)"}
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Offer Selection */}
        <div className="space-y-6">
          <Card className="rounded-sm bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t.admin?.promoCodes?.form?.linkOffers || "Link to Offers"}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAllOffers} className="rounded-sm text-xs">
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={deselectAllOffers} className="rounded-sm text-xs">
                    Deselect All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select one or more offers to link this promo code to. If no offers are selected, the code will apply to all offers.
              </p>

              {loadingOffers ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : offers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No offers available</p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {Object.entries(offersByType).map(([type, typeOffers]) => (
                    <div key={type} className="space-y-2">
                      <h4 className="font-medium text-sm capitalize">{type}</h4>
                      <div className="space-y-2 pl-4">
                        {typeOffers.map((offer) => (
                          <label
                            key={offer.id}
                            className="flex items-center gap-2 p-2 rounded-sm hover:bg-muted/50 cursor-pointer"
                          >
                            <Checkbox
                              checked={formData.selectedOfferIds.includes(offer.id)}
                              onCheckedChange={() => toggleOfferSelection(offer.id)}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{offer.title}</p>
                              <p className="text-xs text-muted-foreground">{offer.depart_city}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {formData.selectedOfferIds.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {t.admin?.promoCodes?.form?.selectedCount?.replace('{count}', formData.selectedOfferIds.length.toString()) || `${formData.selectedOfferIds.length} offer(s) selected`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

