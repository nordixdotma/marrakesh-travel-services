"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      items: ["+212 (0) 524 375 251", "+212 (0) 661 044 503"],
    },
    {
      icon: Mail,
      title: "Email",
      items: ["marrakeshtravelservices@gmail.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      items: ["Rue Bani marine, Appt N°5", "2ème étage, Medina", "Marrakech - Maroc"],
    },
    {
      icon: Clock,
      title: "Hours",
      items: ["Monday - Sunday: 8:00 AM - 8:00 PM"],
    },
  ]

  return (
    <main className="w-full">
      <Header />
      <PageHero title="Get In Touch" backgroundImage="/moroccan-medina-streets-marrakech.jpg" />

      <section className="py-20 md:py-28 bg-background">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1 space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Contact Information</h2>
                <p className="text-muted-foreground">
                  Reach out to us for any inquiries or to plan your next adventure.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                      <div className="space-y-1">
                        {info.items.map((item, i) => (
                          <p key={i} className="text-sm text-muted-foreground break-words">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 md:p-10 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-2">Send a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Tell us about your travel plans and let's create something amazing together.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                      placeholder="Inquiry about tours"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your travel plans and preferences..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>

                  {submitted && (
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-sm text-green-800">Thank you! We'll get back to you soon.</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Find Us On The Map</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border h-96 md:h-[500px]">
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
