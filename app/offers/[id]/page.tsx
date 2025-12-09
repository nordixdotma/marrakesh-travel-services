"use client"

import { useState, use, useMemo } from "react"
import { notFound } from "next/navigation"
import { Calendar, Check, X, Play, ChevronLeft, ChevronRight, Users, User, Clock, MapPin, Shield, ChevronDown, Sparkles, Lightbulb, ListChecks, Info, Car, ArrowRight, Route } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { getOfferById, getTranslatedOffer } from "@/lib/offers-data"
import { useAuth } from "@/components/login-modal"
import { useLanguage } from "@/components/language-provider"

interface OfferDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function OfferDetailsPage({ params }: OfferDetailsPageProps) {
  const resolvedParams = use(params)
  const rawOffer = getOfferById(resolvedParams.id)
  const { isLoggedIn, openLoginModal } = useAuth()
  const { t, language } = useLanguage()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    adults: 1,
    children: 0,
    message: "",
  })

  if (!rawOffer) {
    notFound()
  }

  // Get translated offer based on current language
  const offer = useMemo(() => getTranslatedOffer(rawOffer, language), [rawOffer, language])

  const allImages = [offer.mainImage, ...offer.thumbnailImages]

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
    setShowVideo(false)
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
    setShowVideo(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user is logged in
    if (!isLoggedIn) {
      openLoginModal("Please sign in to make a reservation")
      return
    }
    
    // Handle form submission
    console.log("Reservation request:", formData)
    alert("Your reservation request has been submitted! We will contact you soon.")
  }

  const totalPrice = formData.adults * (offer.priceAdult ?? 0) + formData.children * (offer.priceChild ?? 0)

  return (
    <main className="w-full">
      <Header />
      <PageHero title={offer.title} backgroundImage={offer.mainImage} />

      <section className="py-10 bg-gray-50">
        <Container className="max-w-7xl px-2 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image/Video Gallery */}
              <div className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                {/* Main Display */}
                <div className="relative aspect-16/10 bg-muted">
                  {showVideo && offer.video ? (
                    <video
                      src={offer.video}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img
                        src={allImages[selectedImageIndex] || "/placeholder.svg"}
                        alt={offer.title}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {selectedImageIndex + 1} / {allImages.length}
                      </div>
                      {/* Navigation Arrows */}
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 transition-all shadow-lg hover:scale-105"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 transition-all shadow-lg hover:scale-105"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 p-3 overflow-x-auto bg-muted/30">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImageIndex(index)
                        setShowVideo(false)
                      }}
                      className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ring-2 ring-offset-2 ring-offset-background ${
                        selectedImageIndex === index && !showVideo
                          ? "ring-primary scale-105"
                          : "ring-transparent hover:ring-muted-foreground/50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  {offer.video && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ring-2 ring-offset-2 ring-offset-background bg-muted flex items-center justify-center ${
                        showVideo
                          ? "ring-primary scale-105"
                          : "ring-transparent hover:ring-muted-foreground/50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className="absolute inset-0 bg-primary/10" />
                      <Play size={20} className="text-primary relative z-10" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Info Bar - Hidden if no info available */}
              <div className="flex flex-wrap gap-4 p-4 bg-background rounded-xl border border-border/50 shadow-sm">
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Calendar size={16} className="text-primary" />
                  </div>
                  <span className="text-muted-foreground">{t.offerDetails.availableNow}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-full bg-green-500/10">
                    <Shield size={16} className="text-green-500" />
                  </div>
                  <span className="text-muted-foreground">{t.offerDetails.freeCancellation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <Clock size={16} className="text-blue-500" />
                  </div>
                  <span className="text-muted-foreground">{t.offerDetails.instantConfirmation}</span>
                </div>
              </div>

              {/* Transfer Route Info - Only for transfers */}
              {offer.type === "transfers" && offer.transferDetails && (
                <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <Route size={16} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{t.offerDetails.transferRoute}</h3>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <MapPin size={14} className="text-primary" />
                        <span>{t.offerDetails.from}</span>
                      </div>
                      <p className="font-medium text-foreground">{offer.transferDetails.from}</p>
                    </div>
                    <ArrowRight size={24} className="text-primary shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <MapPin size={14} className="text-primary" />
                        <span>{t.offerDetails.to}</span>
                      </div>
                      <p className="font-medium text-foreground">{offer.transferDetails.to}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} className="text-primary" />
                      <span className="text-muted-foreground">{t.offerDetails.duration}: <strong className="text-foreground">{offer.transferDetails.duration}</strong></span>
                    </div>
                    {offer.transferDetails.distance && (
                      <div className="flex items-center gap-2 text-sm">
                        <Route size={14} className="text-primary" />
                        <span className="text-muted-foreground">{t.offerDetails.distance}: <strong className="text-foreground">{offer.transferDetails.distance}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Vehicle Options - Only for transfers */}
              {offer.type === "transfers" && offer.transferDetails?.vehicleOptions && offer.transferDetails.vehicleOptions.length > 0 && (
                <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-blue-500/10">
                      <Car size={16} className="text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">{t.offerDetails.vehicleOptions}</h3>
                  </div>
                  <div className="grid gap-3">
                    {offer.transferDetails.vehicleOptions.map((vehicle, index) => (
                      <div key={index} className="p-4 rounded-lg border border-border hover:border-primary transition-colors bg-muted/20">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">{vehicle.type}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Users size={14} />
                              {vehicle.capacity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">${vehicle.price}</p>
                            <p className="text-xs text-muted-foreground">{t.offerDetails.perVehicle}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.features.map((feature, featureIndex) => (
                            <span key={featureIndex} className="text-xs px-2 py-1 bg-background rounded-full border border-border text-muted-foreground">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description Card */}
              {offer.description && (
                <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-3">{offer.type === "transfers" ? t.offerDetails.aboutTransfer : t.offerDetails.aboutExperience}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{offer.description}</p>
                </div>
              )}

              {/* Included & Excluded Grid */}
              {(offer.includedItems?.length > 0 || offer.excludedItems?.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Included Items */}
                  {offer.includedItems?.length > 0 && (
                    <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-lg bg-green-500/10">
                          <Check size={16} className="text-green-500" />
                        </div>
                        <h3 className="font-semibold text-foreground">{t.offerDetails.whatsIncluded}</h3>
                      </div>
                      <ul className="space-y-2.5">
                        {offer.includedItems.map((item, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Excluded Items */}
                  {offer.excludedItems?.length > 0 && (
                    <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-lg bg-red-500/10">
                          <X size={16} className="text-red-500" />
                        </div>
                        <h3 className="font-semibold text-foreground">{t.offerDetails.notIncluded}</h3>
                      </div>
                      <ul className="space-y-2.5">
                        {offer.excludedItems.map((item, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <X size={14} className="text-red-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Description - Expandable Sections */}
              {offer.detailedDescription && (
                <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
                  {/* Overview Section - Always Visible */}
                  {offer.detailedDescription.overview && (
                    <div className="p-5 border-b border-border/50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg bg-primary/10">
                          <Info size={16} className="text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{t.offerDetails.overview}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{offer.detailedDescription.overview}</p>
                    </div>
                  )}

                  {/* Highlights Section - Collapsible */}
                  {offer.detailedDescription.highlights?.length > 0 && (
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-5 border-b border-border/50 hover:bg-muted/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-yellow-500/10">
                            <Sparkles size={16} className="text-yellow-500" />
                          </div>
                          <h3 className="font-semibold text-foreground">{t.offerDetails.highlights}</h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{offer.detailedDescription.highlights.length} {t.offerDetails.items}</span>
                        </div>
                        <ChevronDown size={18} className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-5 bg-muted/20">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {offer.detailedDescription.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <Sparkles size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Detailed Sections - Collapsible */}
                  {offer.detailedDescription.sections?.length > 0 && offer.detailedDescription.sections.map((section, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-5 border-b border-border/50 hover:bg-muted/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-blue-500/10">
                            <ListChecks size={16} className="text-blue-500" />
                          </div>
                          <h3 className="font-semibold text-foreground">{section.title}</h3>
                        </div>
                        <ChevronDown size={18} className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-5 bg-muted/20">
                          <p className="text-muted-foreground text-sm leading-relaxed">{section.content}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}

                  {/* Itinerary Section - Collapsible */}
                  {offer.detailedDescription.itinerary && offer.detailedDescription.itinerary.length > 0 && (
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-5 border-b border-border/50 hover:bg-muted/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-purple-500/10">
                            <Clock size={16} className="text-purple-500" />
                          </div>
                          <h3 className="font-semibold text-foreground">{t.offerDetails.itinerary}</h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{offer.detailedDescription.itinerary.length} {t.offerDetails.stops}</span>
                        </div>
                        <ChevronDown size={18} className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-5 bg-muted/20">
                          <div className="space-y-3">
                            {offer.detailedDescription.itinerary.map((item, index) => (
                              <div key={index} className="flex items-start gap-3 text-sm">
                                <div className="flex items-center justify-center min-w-[70px] px-2 py-1 bg-primary/10 text-primary font-medium rounded-md text-xs">
                                  {item.time}
                                </div>
                                <span className="text-muted-foreground pt-0.5">{item.activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Tips Section - Collapsible */}
                  {offer.detailedDescription.tips && offer.detailedDescription.tips.length > 0 && (
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-5 border-b border-border/50 hover:bg-muted/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-orange-500/10">
                            <Lightbulb size={16} className="text-orange-500" />
                          </div>
                          <h3 className="font-semibold text-foreground">{t.offerDetails.tipsRecommendations}</h3>
                        </div>
                        <ChevronDown size={18} className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-5 bg-muted/20">
                          <ul className="space-y-2.5">
                            {offer.detailedDescription.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <Lightbulb size={14} className="text-orange-500 shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Quick Info Footer */}
                  {(offer.detailedDescription.duration || offer.detailedDescription.difficulty || offer.detailedDescription.groupSize) && (
                    <div className="p-5 bg-muted/30 flex flex-wrap gap-4">
                      {offer.detailedDescription.duration && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={14} className="text-primary" />
                          <span className="text-muted-foreground"><strong className="text-foreground">{t.offerDetails.duration}:</strong> {offer.detailedDescription.duration}</span>
                        </div>
                      )}
                      {offer.detailedDescription.difficulty && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={14} className="text-primary" />
                          <span className="text-muted-foreground"><strong className="text-foreground">{t.offerDetails.difficulty}:</strong> {offer.detailedDescription.difficulty}</span>
                        </div>
                      )}
                      {offer.detailedDescription.groupSize && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={14} className="text-primary" />
                          <span className="text-muted-foreground"><strong className="text-foreground">{t.offerDetails.groupSize}:</strong> {offer.detailedDescription.groupSize}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Pricing Cards - Hide for transfers since vehicle options show pricing */}
              {offer.type !== "transfers" && (offer.priceAdult !== undefined || offer.priceChild !== undefined) && (
                <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-4">{t.offerDetails.pricing}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {offer.priceAdult !== undefined && (
                      <div className="relative p-4 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <User size={16} className="text-primary" />
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t.offerDetails.adult}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-foreground">${offer.priceAdult}</span>
                          <span className="text-xs text-muted-foreground">{t.offerDetails.perPerson}</span>
                        </div>
                      </div>
                    )}
                    {offer.priceChild !== undefined && (
                      <div className="relative p-4 rounded-xl bg-linear-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={16} className="text-blue-500" />
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t.offerDetails.child}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-foreground">${offer.priceChild}</span>
                          <span className="text-xs text-muted-foreground">{t.offerDetails.perChild}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Availability - Hide availability dates section for transfers */}
              {offer.type !== "transfers" && offer.availabilityDates?.startDate && offer.availabilityDates?.endDate && (
                <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-3">{t.offerDetails.availability}</h3>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Calendar size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(offer.availabilityDates.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        —{" "}
                        {new Date(offer.availabilityDates.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.offerDetails.bookWithinDates}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Reservation Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-background rounded-2xl border border-border/50 shadow-lg overflow-hidden">
                {/* Price Header */}
                {offer.priceAdult !== undefined && (
                  <div className="p-4 bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm opacity-90">{t.offerDetails.reservationForm.fromPrice}</span>
                      <span className="text-3xl font-bold">${offer.priceAdult}</span>
                      <span className="text-sm opacity-90">{offer.type === "transfers" ? "/" + t.offerDetails.perVehicle.split(" ")[1] : t.offerDetails.perPerson}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {/* Personal Info Section */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName" className="text-xs font-medium">{t.offerDetails.reservationForm.fullName}</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t.offerDetails.reservationForm.fullNamePlaceholder}
                        className="h-10 text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-medium">{t.offerDetails.reservationForm.email}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t.offerDetails.reservationForm.emailPlaceholder}
                          className="h-10 text-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-medium">{t.offerDetails.reservationForm.phone}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t.offerDetails.reservationForm.phonePlaceholder}
                          className="h-10 text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="pt-3 border-t border-border/50 space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="date" className="text-xs font-medium">{offer.type === "transfers" ? t.offerDetails.reservationForm.transferDate : t.offerDetails.reservationForm.preferredDate}</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={offer.availabilityDates?.startDate}
                        max={offer.availabilityDates?.endDate}
                        className="h-10 text-sm"
                        required
                      />
                    </div>

                    {offer.type === "transfers" ? (
                      <div className="space-y-1.5">
                        <Label htmlFor="adults" className="text-xs font-medium flex items-center gap-1.5">
                          <Users size={12} />
                          {t.offerDetails.reservationForm.numberOfPassengers}
                        </Label>
                        <Input
                          id="adults"
                          name="adults"
                          type="number"
                          min={1}
                          max={7}
                          value={formData.adults}
                          onChange={handleInputChange}
                          className="h-10 text-sm"
                          required
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="adults" className="text-xs font-medium flex items-center gap-1.5">
                            <User size={12} />
                            {t.offerDetails.reservationForm.adults}
                          </Label>
                          <Input
                            id="adults"
                            name="adults"
                            type="number"
                            min={1}
                            value={formData.adults}
                            onChange={handleInputChange}
                            className="h-10 text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="children" className="text-xs font-medium flex items-center gap-1.5">
                            <Users size={12} />
                            {t.offerDetails.reservationForm.children}
                          </Label>
                          <Input
                            id="children"
                            name="children"
                            type="number"
                            min={0}
                            value={formData.children}
                            onChange={handleInputChange}
                            className="h-10 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-medium">{offer.type === "transfers" ? t.offerDetails.reservationForm.pickupDetails : t.offerDetails.reservationForm.specialRequests}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={offer.type === "transfers" ? t.offerDetails.reservationForm.pickupDetailsPlaceholder : t.offerDetails.reservationForm.specialRequestsPlaceholder}
                      rows={offer.type === "transfers" ? 3 : 2}
                      className="text-sm resize-none"
                    />
                  </div>

                  {/* Price Summary - Different for transfers */}
                  {offer.type === "transfers" ? (
                    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{t.offerDetails.reservationForm.transfer} ({formData.adults} {formData.adults > 1 ? t.offerDetails.reservationForm.passengers : t.offerDetails.reservationForm.passenger})</span>
                        <span>{t.offerDetails.reservationForm.fromPrice} ${offer.priceAdult}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border/50">
                        <span>{t.offerDetails.reservationForm.startingFrom}</span>
                        <span className="text-lg text-primary">${offer.priceAdult}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{t.offerDetails.reservationForm.finalPriceNote}</p>
                    </div>
                  ) : (offer.priceAdult !== undefined || offer.priceChild !== undefined) && (
                    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                      {offer.priceAdult !== undefined && (
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{formData.adults} {t.offerDetails.reservationForm.adults} × ${offer.priceAdult}</span>
                          <span>${formData.adults * offer.priceAdult}</span>
                        </div>
                      )}
                      {formData.children > 0 && offer.priceChild !== undefined && (
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{formData.children} {t.offerDetails.reservationForm.children} × ${offer.priceChild}</span>
                          <span>${formData.children * offer.priceChild}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border/50">
                        <span>{t.offerDetails.reservationForm.total}</span>
                        <span className="text-lg text-primary">${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full h-11 font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer">
                    {t.offerDetails.reservationForm.reserveNow}
                  </Button>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield size={12} className="text-green-500" />
                      <span>{t.offerDetails.reservationForm.secure}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-blue-500" />
                      <span>{t.offerDetails.reservationForm.instantConfirm}</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
