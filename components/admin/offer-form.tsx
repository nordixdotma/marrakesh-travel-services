"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Save,
  Pencil,
  Trash2,
  Plus,
  X,
  ImageIcon,
  Video,
  Calendar,
  MapPin,
  Car,
  Upload,
  Banknote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Offer, OfferType } from "@/lib/offers-data"

type FormMode = "view" | "edit" | "add"
type Language = "en" | "fr" | "es"

interface LanguageData {
  title: string
  description: string
  overview: string
  highlights: string[]
  sections: { title: string; content: string }[]
  itinerary: { time: string; activity: string }[]
  tips: string[]
  includedItems: string[]
  excludedItems: string[]
}

interface FormData {
  // Shared fields (non-translatable)
  id: string
  type: OfferType
  departCity: string
  priceAdult: number
  priceChild: number
  availabilityDates: { startDate: string; endDate: string }
  duration: string
  difficulty: string
  groupSize: string
  mainImage: string
  thumbnailImages: string[]
  video: string
  // Language-specific content
  languages: {
    en: LanguageData
    fr: LanguageData
    es: LanguageData
  }
  // Transfer-specific
  transferDetails?: {
    from: string
    to: string
    duration: string
    distance?: string
    vehicleOptions: { type: string; capacity: string; price: number; features: string[] }[]
  }
}

interface OfferFormProps {
  mode: FormMode
  offerType: OfferType
  offer?: Offer
  onModeChange?: (mode: FormMode) => void
  backUrl: string
}

const createEmptyLanguageData = (): LanguageData => ({
  title: "",
  description: "",
  overview: "",
  highlights: [],
  sections: [],
  itinerary: [],
  tips: [],
  includedItems: [],
  excludedItems: [],
})

const offerToFormData = (offer: Offer | undefined, type: OfferType): FormData => {
  if (!offer) {
    return {
      id: "",
      type,
      departCity: "",
      priceAdult: 0,
      priceChild: 0,
      availabilityDates: { startDate: "", endDate: "" },
      duration: "",
      difficulty: "",
      groupSize: "",
      mainImage: "",
      thumbnailImages: [],
      video: "",
      languages: {
        en: createEmptyLanguageData(),
        fr: createEmptyLanguageData(),
        es: createEmptyLanguageData(),
      },
    }
  }

  // Convert offer to form data
  const baseLanguageData: LanguageData = {
    title: offer.title,
    description: offer.description,
    overview: offer.detailedDescription.overview,
    highlights: offer.detailedDescription.highlights || [],
    sections: offer.detailedDescription.sections || [],
    itinerary: offer.detailedDescription.itinerary || [],
    tips: offer.detailedDescription.tips || [],
    includedItems: offer.includedItems || [],
    excludedItems: offer.excludedItems || [],
  }

  return {
    id: offer.id,
    type: offer.type,
    departCity: offer.departCity,
    priceAdult: offer.priceAdult,
    priceChild: offer.priceChild,
    availabilityDates: offer.availabilityDates,
    duration: offer.detailedDescription.duration || "",
    difficulty: offer.detailedDescription.difficulty || "",
    groupSize: offer.detailedDescription.groupSize || "",
    mainImage: offer.mainImage,
    thumbnailImages: offer.thumbnailImages || [],
    video: offer.video || "",
    languages: {
      en: { ...baseLanguageData },
      fr: offer.translations?.fr ? {
        title: offer.translations.fr.title || "",
        description: offer.translations.fr.description || "",
        overview: offer.translations.fr.detailedDescription?.overview || "",
        highlights: offer.translations.fr.detailedDescription?.highlights || [],
        sections: offer.translations.fr.detailedDescription?.sections || [],
        itinerary: offer.translations.fr.detailedDescription?.itinerary || [],
        tips: offer.translations.fr.detailedDescription?.tips || [],
        includedItems: offer.translations.fr.includedItems || [],
        excludedItems: offer.translations.fr.excludedItems || [],
      } : createEmptyLanguageData(),
      es: offer.translations?.es ? {
        title: offer.translations.es.title || "",
        description: offer.translations.es.description || "",
        overview: offer.translations.es.detailedDescription?.overview || "",
        highlights: offer.translations.es.detailedDescription?.highlights || [],
        sections: offer.translations.es.detailedDescription?.sections || [],
        itinerary: offer.translations.es.detailedDescription?.itinerary || [],
        tips: offer.translations.es.detailedDescription?.tips || [],
        includedItems: offer.translations.es.includedItems || [],
        excludedItems: offer.translations.es.excludedItems || [],
      } : createEmptyLanguageData(),
    },
    transferDetails: offer.transferDetails,
  }
}

export function OfferForm({ mode, offerType, offer, onModeChange, backUrl }: OfferFormProps) {
  const router = useRouter()
  const isViewMode = mode === "view"
  const isAddMode = mode === "add"

  const [formData, setFormData] = useState<FormData>(offerToFormData(offer, offerType))
  
  // File input refs
  const mainImageRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  const getOfferTypeName = () => {
    switch (offerType) {
      case "tours": return "Tour"
      case "excursions": return "Excursion"
      case "activities": return "Activity"
      case "transfers": return "Transfer"
      case "packages": return "Package"
      default: return "Offer"
    }
  }

  const handleSave = () => {
    console.log("Saving offer:", formData)
    alert(`${isAddMode ? "Created" : "Updated"} ${getOfferTypeName()} successfully!`)
    router.push(backUrl)
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this ${getOfferTypeName().toLowerCase()}?`)) {
      console.log("Deleting offer:", formData.id)
      alert(`Deleted ${getOfferTypeName()} successfully!`)
      router.push(backUrl)
    }
  }

  const handleCancel = () => {
    if (isAddMode) {
      router.push(backUrl)
    } else {
      onModeChange?.("view")
    }
  }

  const handleEdit = () => {
    onModeChange?.("edit")
  }

  // File upload handlers
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, mainImage: url }))
    }
  }

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file))
      setFormData(prev => ({ ...prev, thumbnailImages: [...prev.thumbnailImages, ...urls] }))
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, video: url }))
    }
  }

  const removeThumbnail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      thumbnailImages: prev.thumbnailImages.filter((_, i) => i !== index)
    }))
  }

  // Language-specific field helpers
  const updateLangField = (lang: Language, field: keyof LanguageData, value: any) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          [field]: value,
        },
      },
    }))
  }

  const addLangArrayItem = (lang: Language, field: "highlights" | "tips" | "includedItems" | "excludedItems") => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          [field]: [...prev.languages[lang][field], ""],
        },
      },
    }))
  }

  const updateLangArrayItem = (lang: Language, field: "highlights" | "tips" | "includedItems" | "excludedItems", index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          [field]: prev.languages[lang][field].map((item, i) => i === index ? value : item),
        },
      },
    }))
  }

  const removeLangArrayItem = (lang: Language, field: "highlights" | "tips" | "includedItems" | "excludedItems", index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          [field]: prev.languages[lang][field].filter((_, i) => i !== index),
        },
      },
    }))
  }

  // Section helpers
  const addLangSection = (lang: Language) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          sections: [...prev.languages[lang].sections, { title: "", content: "" }],
        },
      },
    }))
  }

  const updateLangSection = (lang: Language, index: number, field: "title" | "content", value: string) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          sections: prev.languages[lang].sections.map((section, i) =>
            i === index ? { ...section, [field]: value } : section
          ),
        },
      },
    }))
  }

  const removeLangSection = (lang: Language, index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          sections: prev.languages[lang].sections.filter((_, i) => i !== index),
        },
      },
    }))
  }

  // Itinerary helpers
  const addLangItinerary = (lang: Language) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          itinerary: [...prev.languages[lang].itinerary, { time: "", activity: "" }],
        },
      },
    }))
  }

  const updateLangItinerary = (lang: Language, index: number, field: "time" | "activity", value: string) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          itinerary: prev.languages[lang].itinerary.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          ),
        },
      },
    }))
  }

  const removeLangItinerary = (lang: Language, index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: {
          ...prev.languages[lang],
          itinerary: prev.languages[lang].itinerary.filter((_, i) => i !== index),
        },
      },
    }))
  }

  // Vehicle Options helpers (for transfers)
  const addVehicleOption = () => {
    setFormData(prev => ({
      ...prev,
      transferDetails: {
        ...prev.transferDetails!,
        vehicleOptions: [
          ...(prev.transferDetails?.vehicleOptions || []),
          { type: "", capacity: "", price: 0, features: [] },
        ],
      },
    }))
  }

  const updateVehicleOption = (index: number, field: string, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      transferDetails: {
        ...prev.transferDetails!,
        vehicleOptions: prev.transferDetails?.vehicleOptions.map((opt, i) =>
          i === index ? { ...opt, [field]: value } : opt
        ) || [],
      },
    }))
  }

  const removeVehicleOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      transferDetails: {
        ...prev.transferDetails!,
        vehicleOptions: prev.transferDetails?.vehicleOptions.filter((_, i) => i !== index) || [],
      },
    }))
  }

  const languageLabels: Record<Language, string> = {
    en: "🇬🇧 English",
    fr: "🇫🇷 Français",
    es: "🇪🇸 Español",
  }

  // Render content for each language tab
  const renderLanguageContent = (lang: Language) => {
    const langData = formData.languages[lang]
    const isEnglish = lang === "en"

    return (
      <div className="space-y-6">
        {/* Basic Info */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={langData.title}
                onChange={(e) => updateLangField(lang, "title", e.target.value)}
                disabled={isViewMode}
                placeholder={`Title in ${languageLabels[lang]}`}
                className="rounded-sm bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Textarea
                value={langData.description}
                onChange={(e) => updateLangField(lang, "description", e.target.value)}
                disabled={isViewMode}
                placeholder={`Description in ${languageLabels[lang]}`}
                rows={3}
                className="rounded-sm bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Overview</Label>
              <Textarea
                value={langData.overview}
                onChange={(e) => updateLangField(lang, "overview", e.target.value)}
                disabled={isViewMode}
                placeholder={`Overview in ${languageLabels[lang]}`}
                rows={5}
                className="rounded-sm bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Shared fields only in English tab */}
        {isEnglish && (
          <>
            <Card className="rounded-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Duration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Departure City</Label>
                    <Input
                      value={formData.departCity}
                      onChange={(e) => setFormData(prev => ({ ...prev, departCity: e.target.value }))}
                      disabled={isViewMode}
                      placeholder="e.g., Marrakech"
                      className="rounded-sm bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      disabled={isViewMode}
                      placeholder="e.g., 4-5 hours"
                      className="rounded-sm bg-gray-50"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Input
                      value={formData.difficulty}
                      onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                      disabled={isViewMode}
                      placeholder="e.g., Easy, Moderate"
                      className="rounded-sm bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Group Size</Label>
                    <Input
                      value={formData.groupSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, groupSize: e.target.value }))}
                      disabled={isViewMode}
                      placeholder="e.g., 2-12 people"
                      className="rounded-sm bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  Pricing (MAD)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Adult Price (MAD)</Label>
                    <Input
                      type="number"
                      value={formData.priceAdult}
                      onChange={(e) => setFormData(prev => ({ ...prev, priceAdult: Number(e.target.value) }))}
                      disabled={isViewMode}
                      placeholder="0"
                      className="rounded-sm bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Child Price (MAD)</Label>
                    <Input
                      type="number"
                      value={formData.priceChild}
                      onChange={(e) => setFormData(prev => ({ ...prev, priceChild: Number(e.target.value) }))}
                      disabled={isViewMode}
                      placeholder="0"
                      className="rounded-sm bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.availabilityDates.startDate}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        availabilityDates: { ...prev.availabilityDates, startDate: e.target.value }
                      }))}
                      disabled={isViewMode}
                      className="rounded-sm bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.availabilityDates.endDate}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        availabilityDates: { ...prev.availabilityDates, endDate: e.target.value }
                      }))}
                      disabled={isViewMode}
                      className="rounded-sm bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Highlights */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {langData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={highlight}
                  onChange={(e) => updateLangArrayItem(lang, "highlights", index, e.target.value)}
                  disabled={isViewMode}
                  placeholder="Enter highlight"
                  className="rounded-sm bg-gray-50"
                />
                {!isViewMode && (
                  <Button variant="ghost" size="icon" onClick={() => removeLangArrayItem(lang, "highlights", index)} className="shrink-0 rounded-sm">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {!isViewMode && (
              <Button variant="outline" onClick={() => addLangArrayItem(lang, "highlights")} className="gap-2 rounded-sm">
                <Plus className="h-4 w-4" />
                Add Highlight
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Content Sections */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle>Content Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {langData.sections.map((section, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-sm">
                <div className="flex items-center justify-between">
                  <Label>Section {index + 1}</Label>
                  {!isViewMode && (
                    <Button variant="ghost" size="sm" onClick={() => removeLangSection(lang, index)} className="rounded-sm bg-gray-50">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input
                  value={section.title}
                  onChange={(e) => updateLangSection(lang, index, "title", e.target.value)}
                  disabled={isViewMode}
                  placeholder="Section title"
                  className="rounded-sm bg-gray-50"
                />
                <Textarea
                  value={section.content}
                  onChange={(e) => updateLangSection(lang, index, "content", e.target.value)}
                  disabled={isViewMode}
                  placeholder="Section content"
                  rows={3}
                  className="rounded-sm bg-gray-50"
                />
              </div>
            ))}
            {!isViewMode && (
              <Button variant="outline" onClick={() => addLangSection(lang)} className="gap-2 rounded-sm">
                <Plus className="h-4 w-4" />
                Add Section
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Itinerary */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle>Itinerary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {langData.itinerary.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item.time}
                  onChange={(e) => updateLangItinerary(lang, index, "time", e.target.value)}
                  disabled={isViewMode}
                  placeholder="Time"
                  className="w-32 rounded-sm bg-gray-50"
                />
                <Input
                  value={item.activity}
                  onChange={(e) => updateLangItinerary(lang, index, "activity", e.target.value)}
                  disabled={isViewMode}
                  placeholder="Activity"
                  className="flex-1 rounded-sm bg-gray-50"
                />
                {!isViewMode && (
                  <Button variant="ghost" size="icon" onClick={() => removeLangItinerary(lang, index)} className="shrink-0 rounded-sm">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {!isViewMode && (
              <Button variant="outline" onClick={() => addLangItinerary(lang)} className="gap-2 rounded-sm">
                <Plus className="h-4 w-4" />
                Add Itinerary Item
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle>Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {langData.tips.map((tip, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={tip}
                  onChange={(e) => updateLangArrayItem(lang, "tips", index, e.target.value)}
                  disabled={isViewMode}
                  placeholder="Enter tip"
                  className="rounded-sm bg-gray-50"
                />
                {!isViewMode && (
                  <Button variant="ghost" size="icon" onClick={() => removeLangArrayItem(lang, "tips", index)} className="shrink-0 rounded-sm">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {!isViewMode && (
              <Button variant="outline" onClick={() => addLangArrayItem(lang, "tips")} className="gap-2 rounded-sm">
                <Plus className="h-4 w-4" />
                Add Tip
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Included Items */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle>Included Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {langData.includedItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateLangArrayItem(lang, "includedItems", index, e.target.value)}
                  disabled={isViewMode}
                  placeholder="Enter included item"
                  className="rounded-sm bg-gray-50"
                />
                {!isViewMode && (
                  <Button variant="ghost" size="icon" onClick={() => removeLangArrayItem(lang, "includedItems", index)} className="shrink-0 rounded-sm">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {!isViewMode && (
              <Button variant="outline" onClick={() => addLangArrayItem(lang, "includedItems")} className="gap-2 rounded-sm">
                <Plus className="h-4 w-4" />
                Add Included Item
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Excluded Items */}
        <Card className="rounded-sm bg-white">
          <CardHeader>
            <CardTitle>Excluded Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {langData.excludedItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateLangArrayItem(lang, "excludedItems", index, e.target.value)}
                  disabled={isViewMode}
                  placeholder="Enter excluded item"
                  className="rounded-sm bg-gray-50"
                />
                {!isViewMode && (
                  <Button variant="ghost" size="icon" onClick={() => removeLangArrayItem(lang, "excludedItems", index)} className="shrink-0 rounded-sm">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {!isViewMode && (
              <Button variant="outline" onClick={() => addLangArrayItem(lang, "excludedItems")} className="gap-2 rounded-sm">
                <Plus className="h-4 w-4" />
                Add Excluded Item
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Media - Only in English tab */}
        {isEnglish && (
          <>
            <Separator />
            <Card className="rounded-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Main Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={mainImageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainImageUpload}
                />
                {!isViewMode && (
                  <Button variant="outline" onClick={() => mainImageRef.current?.click()} className="gap-2 rounded-sm">
                    <Upload className="h-4 w-4" />
                    Upload Main Image
                  </Button>
                )}
                {formData.mainImage && (
                  <div className="relative w-full h-48 rounded-sm overflow-hidden border">
                    <Image src={formData.mainImage} alt="Main image preview" fill className="object-cover" />
                    {!isViewMode && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-sm"
                        onClick={() => setFormData(prev => ({ ...prev, mainImage: "" }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Thumbnail Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleThumbnailUpload}
                />
                {!isViewMode && (
                  <Button variant="outline" onClick={() => thumbnailInputRef.current?.click()} className="gap-2 rounded-sm">
                    <Upload className="h-4 w-4" />
                    Upload Thumbnails
                  </Button>
                )}
                {formData.thumbnailImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.thumbnailImages.map((url, index) => (
                      <div key={index} className="relative h-24 rounded-sm overflow-hidden border">
                        <Image src={url} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                        {!isViewMode && (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 rounded-sm"
                            onClick={() => removeThumbnail(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={videoRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
                {!isViewMode && (
                  <Button variant="outline" onClick={() => videoRef.current?.click()} className="gap-2 rounded-sm">
                    <Upload className="h-4 w-4" />
                    Upload Video
                  </Button>
                )}
                {formData.video && (
                  <div className="flex items-center gap-2 p-3 border rounded-sm">
                    <Video className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm flex-1 truncate">Video uploaded</span>
                    {!isViewMode && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-sm"
                        onClick={() => setFormData(prev => ({ ...prev, video: "" }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transfer Details - Only for transfers, only in English tab */}
            {offerType === "transfers" && (
              <>
                <Separator />
                <Card className="rounded-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Transfer Route
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>From</Label>
                        <Input
                          value={formData.transferDetails?.from || ""}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            transferDetails: { ...prev.transferDetails!, from: e.target.value }
                          }))}
                          disabled={isViewMode}
                          placeholder="e.g., Marrakesh Airport"
                          className="rounded-sm bg-gray-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>To</Label>
                        <Input
                          value={formData.transferDetails?.to || ""}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            transferDetails: { ...prev.transferDetails!, to: e.target.value }
                          }))}
                          disabled={isViewMode}
                          placeholder="e.g., City Center"
                          className="rounded-sm bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Transfer Duration</Label>
                        <Input
                          value={formData.transferDetails?.duration || ""}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            transferDetails: { ...prev.transferDetails!, duration: e.target.value }
                          }))}
                          disabled={isViewMode}
                          placeholder="e.g., 20-40 minutes"
                          className="rounded-sm bg-gray-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Distance</Label>
                        <Input
                          value={formData.transferDetails?.distance || ""}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            transferDetails: { ...prev.transferDetails!, distance: e.target.value }
                          }))}
                          disabled={isViewMode}
                          placeholder="e.g., 6 km"
                          className="rounded-sm bg-gray-50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-sm bg-gray-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Vehicle Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(formData.transferDetails?.vehicleOptions || []).map((option, index) => (
                      <div key={index} className="p-4 border rounded-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Vehicle {index + 1}</Label>
                          {!isViewMode && (
                            <Button variant="ghost" size="sm" onClick={() => removeVehicleOption(index)} className="rounded-sm bg-gray-50">
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <Input
                            value={option.type}
                            onChange={(e) => updateVehicleOption(index, "type", e.target.value)}
                            disabled={isViewMode}
                            placeholder="Type (e.g., Sedan)"
                            className="rounded-sm bg-gray-50"
                          />
                          <Input
                            value={option.capacity}
                            onChange={(e) => updateVehicleOption(index, "capacity", e.target.value)}
                            disabled={isViewMode}
                            placeholder="Capacity"
                            className="rounded-sm bg-gray-50"
                          />
                          <Input
                            type="number"
                            value={option.price}
                            onChange={(e) => updateVehicleOption(index, "price", Number(e.target.value))}
                            disabled={isViewMode}
                            placeholder="Price (MAD)"
                            className="rounded-sm bg-gray-50"
                          />
                        </div>
                        <Input
                          value={option.features.join(", ")}
                          onChange={(e) => updateVehicleOption(index, "features", e.target.value.split(", ").filter(f => f))}
                          disabled={isViewMode}
                          placeholder="Features (comma-separated)"
                          className="rounded-sm bg-gray-50"
                        />
                      </div>
                    ))}
                    {!isViewMode && (
                      <Button variant="outline" onClick={addVehicleOption} className="gap-2 rounded-sm">
                        <Plus className="h-4 w-4" />
                        Add Vehicle Option
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push(backUrl)} className="gap-2 rounded-sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isAddMode ? "Create" : isViewMode ? "View" : "Edit"} {getOfferTypeName()}
            </h1>
            {!isAddMode && (
              <p className="text-sm text-muted-foreground">{formData.languages.en.title || "Untitled"}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isViewMode ? (
            <>
              <Button variant="outline" onClick={handleEdit} className="gap-2 rounded-sm">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete} className="gap-2 rounded-sm">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel} className="rounded-sm bg-gray-50">
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2 rounded-sm">
                <Save className="h-4 w-4" />
                {isAddMode ? "Create" : "Save Changes"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Language Tabs */}
      <Tabs defaultValue="en" className="space-y-6">
        <TabsList className="rounded-sm">
          <TabsTrigger value="en" className="rounded-sm gap-2">🇬🇧 English</TabsTrigger>
          <TabsTrigger value="fr" className="rounded-sm gap-2">🇫🇷 Français</TabsTrigger>
          <TabsTrigger value="es" className="rounded-sm gap-2">🇪🇸 Español</TabsTrigger>
        </TabsList>

        <TabsContent value="en">{renderLanguageContent("en")}</TabsContent>
        <TabsContent value="fr">{renderLanguageContent("fr")}</TabsContent>
        <TabsContent value="es">{renderLanguageContent("es")}</TabsContent>
      </Tabs>
    </div>
  )
}
