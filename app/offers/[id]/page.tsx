"use client"

import { useState, use } from "react"
import { notFound } from "next/navigation"
import { Calendar, Check, X, Play, ChevronLeft, ChevronRight, Users, User, Clock, MapPin, Shield } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getOfferById } from "@/lib/offers-data"

interface OfferDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function OfferDetailsPage({ params }: OfferDetailsPageProps) {
  const resolvedParams = use(params)
  const offer = getOfferById(resolvedParams.id)

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

  if (!offer) {
    notFound()
  }

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
    // Handle form submission
    console.log("Reservation request:", formData)
    alert("Your reservation request has been submitted! We will contact you soon.")
  }

  const totalPrice = formData.adults * offer.priceAdult + formData.children * offer.priceChild

  return (
    <main className="w-full">
      <Header />
      <PageHero title={offer.title} backgroundImage={offer.mainImage} />

      <section className="py-10 bg-linear-to-b from-muted/30 to-background">
        <Container className="max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
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

              {/* Quick Info Bar */}
              <div className="flex flex-wrap gap-4 p-4 bg-background rounded-xl border border-border/50 shadow-sm">
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Calendar size={16} className="text-primary" />
                  </div>
                  <span className="text-muted-foreground">Available Now</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-full bg-green-500/10">
                    <Shield size={16} className="text-green-500" />
                  </div>
                  <span className="text-muted-foreground">Free Cancellation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <Clock size={16} className="text-blue-500" />
                  </div>
                  <span className="text-muted-foreground">Instant Confirmation</span>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-3">About This Experience</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{offer.description}</p>
              </div>

              {/* Included & Excluded Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Included Items */}
                <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-green-500/10">
                      <Check size={16} className="text-green-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">What&apos;s Included</h3>
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

                {/* Excluded Items */}
                <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-red-500/10">
                      <X size={16} className="text-red-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">Not Included</h3>
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
              </div>

              {/* Pricing Cards */}
              <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Pricing</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative p-4 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={16} className="text-primary" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Adult</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">${offer.priceAdult}</span>
                      <span className="text-xs text-muted-foreground">/person</span>
                    </div>
                  </div>
                  <div className="relative p-4 rounded-xl bg-linear-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} className="text-blue-500" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Child</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">${offer.priceChild}</span>
                      <span className="text-xs text-muted-foreground">/child</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-background rounded-xl p-5 border border-border/50 shadow-sm">
                <h3 className="font-semibold text-foreground mb-3">Availability</h3>
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
                    <p className="text-xs text-muted-foreground">Book within these dates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Reservation Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-background rounded-2xl border border-border/50 shadow-lg overflow-hidden">
                {/* Price Header */}
                <div className="p-4 bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm opacity-90">From</span>
                    <span className="text-3xl font-bold">${offer.priceAdult}</span>
                    <span className="text-sm opacity-90">/person</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {/* Personal Info Section */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName" className="text-xs font-medium">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="h-10 text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@email.com"
                          className="h-10 text-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-medium">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 234 567"
                          className="h-10 text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="pt-3 border-t border-border/50 space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="date" className="text-xs font-medium">Preferred Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={offer.availabilityDates.startDate}
                        max={offer.availabilityDates.endDate}
                        className="h-10 text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="adults" className="text-xs font-medium flex items-center gap-1.5">
                          <User size={12} />
                          Adults
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
                          Children
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
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-medium">Special Requests</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any special requests?"
                      rows={2}
                      className="text-sm resize-none"
                    />
                  </div>

                  {/* Price Summary */}
                  <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formData.adults} Adult(s) × ${offer.priceAdult}</span>
                      <span>${formData.adults * offer.priceAdult}</span>
                    </div>
                    {formData.children > 0 && (
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formData.children} Child(ren) × ${offer.priceChild}</span>
                        <span>${formData.children * offer.priceChild}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border/50">
                      <span>Total</span>
                      <span className="text-lg text-primary">${totalPrice}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 font-semibold text-sm shadow-md hover:shadow-lg transition-all">
                    Reserve Now
                  </Button>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield size={12} className="text-green-500" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-blue-500" />
                      <span>Instant confirm</span>
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
