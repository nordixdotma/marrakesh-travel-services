"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, Calendar, Users, User, MessageSquare, Send, CheckCircle2 } from "lucide-react"

export default function CustomizedQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    guests: "",
    details: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: "", email: "", phone: "", travelDate: "", guests: "", details: "" })
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50 relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
            <span className="text-lg font-semibold">Personalized Travel Planning</span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tell us about your dream trip and we'll craft the perfect itinerary just for you
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-primary rounded-2xl shadow-xl shadow-primary/20 overflow-hidden">
          {/* Form Header Accent */}
          <div className="h-1.5 bg-linear-to-r from-secondary via-accent to-secondary" />
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* Top Row - 3 columns on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Full Name
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                <label htmlFor="phone" className="text-xs font-medium text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  Phone
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'phone' ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Second Row - 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Travel Date */}
              <div className="space-y-1.5">
                <label htmlFor="travelDate" className="text-xs font-medium text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Preferred Date
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'travelDate' ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('travelDate')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all text-sm scheme-dark"
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-1.5">
                <label htmlFor="guests" className="text-xs font-medium text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Guests
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'guests' ? 'scale-[1.02]' : ''}`}>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('guests')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-primary text-white">Select guests</option>
                    <option value="1" className="bg-primary text-white">1 Guest</option>
                    <option value="2" className="bg-primary text-white">2 Guests</option>
                    <option value="3-5" className="bg-primary text-white">3-5 Guests</option>
                    <option value="6-10" className="bg-primary text-white">6-10 Guests</option>
                    <option value="11+" className="bg-primary text-white">11+ Guests</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-1.5 mb-6">
              <label htmlFor="details" className="text-xs font-medium text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                Trip Details & Preferences
              </label>
              <div className={`relative transition-all duration-200 ${focusedField === 'details' ? 'scale-[1.01]' : ''}`}>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('details')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all resize-none text-sm"
                  placeholder="Tell us about your interests, preferred activities, budget range, and any special requirements..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3 px-6 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Request Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Get Your Custom Quote
                </>
              )}
            </button>

            {/* Success Message */}
            {submitted && (
              <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-sm text-white">
                  <span className="font-medium">Thank you!</span> We'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            <span>Free consultation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            <span>24h response time</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            <span>No obligations</span>
          </div>
        </div>
      </div>
    </section>
  )
}
