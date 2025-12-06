"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }, 1000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+212 524 375 251",
      subValue: "+212 661 044 503",
      action: "tel:+212524375251",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "contact@marrakeshtravelservices.com",
      action: "mailto:contact@marrakeshtravelservices.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Rue Bani marine, Appt N°5",
      subValue: "Medina, Marrakech",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Sun",
      subValue: "8:00 AM - 8:00 PM",
    },
  ]

  const subjects = [
    "General Inquiry",
    "Tour Booking",
    "Custom Package",
    "Group Travel",
    "Transportation",
    "Other",
  ]

  return (
    <main className="w-full">
      <Header />
      <PageHero title="CONTACT" backgroundImage="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/a5/17/55.jpg" />

      <section className="py-16 md:py-24 bg-linear-to-b from-background to-muted/20">
        <Container className="max-w-7xl mx-auto px-4">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.action || "#"}
                className="group relative bg-card rounded-xl p-4 md:p-5 border border-border/50 hover:border-primary/40 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <info.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{info.title}</p>
                    <p className="text-xs md:text-sm font-medium text-foreground leading-tight">{info.value}</p>
                    {info.subValue && (
                      <p className="text-xs text-muted-foreground mt-0.5">{info.subValue}</p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Side - Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Let's Talk
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Ready to Plan Your <span className="text-primary">Adventure?</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Whether you're dreaming of exploring ancient medinas, crossing desert dunes, or discovering hidden gems — we're here to make it happen.
                </p>
              </div>

              {/* Why Choose Us */}
              <div className="bg-linear-to-br from-primary/5 via-primary/3 to-transparent rounded-xl p-5 border border-primary/10">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Why Choose Us?</h3>
                <ul className="space-y-2.5">
                  {[
                    "Local expertise & insider knowledge",
                    "Personalized travel experiences",
                    "24/7 support during your trip",
                    "Best price guarantee",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm text-green-700 dark:text-green-400">
                  Average response time: <span className="font-semibold">Under 2 hours</span>
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a topic</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-foreground mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                      placeholder="Tell us about your travel plans, preferred dates, group size..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-70 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  {submitted && (
                    <div className="p-3.5 rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 animate-in fade-in slide-in-from-bottom-2">
                      <p className="text-sm text-green-700 dark:text-green-400 font-medium flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</span>
                        Message sent! We'll get back to you shortly.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12 md:mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Our Location</h2>
              <a
                href="https://maps.google.com/?q=Rue+Bani+marine,+Marrakech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
              >
                Get Directions
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="rounded-xl overflow-hidden border border-border shadow-sm h-72 md:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.7733920937365!2d-8.010463899999999!3d31.629532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee5c3c3c3c3c3%3A0x1234567890abcdef!2sRue%20Bani%20marine%2C%20Marrakech!5e0!3m2!1sen!2sma!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
