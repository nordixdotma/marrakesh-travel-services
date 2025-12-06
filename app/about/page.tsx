"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { MapPin, Users, Award, Heart, CheckCircle, Globe, Zap, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "Deep knowledge of Morocco's hidden gems and authentic experiences.",
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "Tailored journeys crafted to match your unique preferences.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Highest standards in every service we deliver.",
    },
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "Genuine love for sharing Morocco's beauty worldwide.",
    },
  ]

  const highlights = [
    { icon: Globe, label: "Countries", value: "50+" },
    { icon: Users, label: "Travelers", value: "10K+" },
    { icon: Award, label: "Experience", value: "15 yrs" },
    { icon: Zap, label: "Guides", value: "100+" },
  ]

  const features = [
    "Hidden gems & authentic experiences",
    "Personalized itineraries",
    "Excellence in every detail",
    "24/7 support",
    "Transparent pricing",
    "Intimate group tours",
  ]

  return (
    <main className="w-full">
      <Header />
      <PageHero title="About Us" backgroundImage="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/a5/17/55.jpg" />

      {/* Hero Story Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-4/5 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1609281362702-f46a060b2044?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Morocco landscape"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -right-4 md:right-0 lg:-right-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50">
                  <div className="grid grid-cols-2 gap-3">
                    {highlights.map((item, index) => (
                      <div key={index} className="text-center px-3 py-2">
                        <p className="text-xl font-bold text-primary">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <span className="inline-block text-sm font-medium text-primary mb-3 tracking-wide uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Discover the <span className="text-primary">Real Morocco</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Marrakesh Travel Services is your gateway to authentic Moroccan experiences. With 15+ years of dedicated service, we've become trusted guides for travelers seeking genuine connections with Morocco's culture, landscapes, and hospitality.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From bustling medinas to serene desert dunes, from cultural immersion to thrilling adventures—we craft unforgettable journeys tailored perfectly to you.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Start your journey <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-14 md:py-18 bg-gray-50">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-medium text-primary mb-2 tracking-wide uppercase">
              What We Stand For
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-background rounded-xl p-5 border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <value.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <Container className="max-w-4xl mx-auto px-4">
          <div className="bg-linear-to-br from-primary to-primary/90 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to Experience Morocco?</h2>
                <p className="text-white/80">
                  Let us create your perfect Moroccan adventure.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/95 hover:gap-3 transition-all duration-300 shadow-lg shrink-0"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
