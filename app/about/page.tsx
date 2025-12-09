"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { MapPin, Users, Award, Heart, CheckCircle, Globe, Zap, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: MapPin,
      title: t.about.values.localExpertise,
      description: t.about.values.localExpertiseDesc,
    },
    {
      icon: Users,
      title: t.about.values.personalizedService,
      description: t.about.values.personalizedServiceDesc,
    },
    {
      icon: Award,
      title: t.about.values.qualityExcellence,
      description: t.about.values.qualityExcellenceDesc,
    },
    {
      icon: Heart,
      title: t.about.values.passionForTravel,
      description: t.about.values.passionForTravelDesc,
    },
  ]

  const highlights = [
    { icon: Globe, label: t.about.countries, value: "50+" },
    { icon: Users, label: t.about.travelers, value: "10K+" },
    { icon: Award, label: t.about.experience, value: "15 yrs" },
    { icon: Zap, label: t.about.guides, value: "100+" },
  ]

  const features = [
    t.about.features.hiddenGems,
    t.about.features.personalizedItineraries,
    t.about.features.excellenceInDetail,
    t.about.features.support247,
    t.about.features.transparentPricing,
    t.about.features.intimateGroupTours,
  ]

  return (
    <main className="w-full">
      <Header />
      <PageHero title={t.about.pageTitle} backgroundImage="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/a5/17/55.jpg" />

      {/* Hero Story Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container className="max-w-6xl mx-auto px-2 md:px-8">
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
                {t.about.ourStory}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t.about.heroTitle} <span className="text-primary">{t.about.heroTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.about.heroDescription1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.about.heroDescription2}
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
                {t.about.startJourney} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-14 md:py-18 bg-gray-50">
        <Container className="max-w-6xl mx-auto px-2 md:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-medium text-primary mb-2 tracking-wide uppercase">
              {t.about.valuesTitle}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.about.valuesSubtitle}</h2>
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
        <Container className="max-w-4xl mx-auto px-2 md:px-8">
          <div className="bg-linear-to-br from-primary to-primary/90 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.about.ctaTitle}</h2>
                <p className="text-white/80">
                  {t.about.ctaDescription}
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/95 hover:gap-3 transition-all duration-300 shadow-lg shrink-0"
              >
                {t.about.getStarted} <ArrowRight className="w-4 h-4" />
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
