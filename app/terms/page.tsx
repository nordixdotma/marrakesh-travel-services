"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function TermsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const sections = [
    {
      title: "Introduction",
      content:
        "The following general conditions of sale govern all transactions made through Marrakesh Travel Services. Any order placed assumes the customer's unconditional and irrevocable acceptance of these conditions.",
    },
    {
      title: "Object",
      content:
        "This contract defines the rights and obligations of parties in the context of the sale of travel services by Marrakesh Travel Services. We provide a comprehensive platform for booking excursions, tours, and travel experiences across Morocco.",
      subContent:
        "Morocco Telecommerce is a transaction management service and registered trademark of Morocco Telecommerce SA.",
    },
    {
      title: "Payment Method",
      content: "We accept the following payment methods:",
      items: [
        "Credit cards (Visa, MasterCard, Maestro, CMI, Diners Club, Discover)",
        "Digital wallets (Moicash)",
        "Cash payment services (Binga Wafacash)",
      ],
      note: "Transaction processing occurs on the day following delivery confirmation.",
    },
    {
      title: "Payment Security",
      content:
        "All payments are secured by Morocco Telecommerce with full encryption and fraud protection. When paying by credit card, your card issuer's fraud protection terms apply. You guarantee that you have permission to use your chosen payment method.",
    },
    {
      title: "Proof of Transactions",
      content:
        "All transaction data recorded on the Morocco Telecommerce platform on behalf of Marrakesh Travel Services constitutes official proof of all commercial transactions between you and our company.",
    },
    {
      title: "Cancellation & Refunds",
      content:
        "Cancellation policies vary by tour type and booking terms. Please review the specific cancellation policy for your booking. Refund requests must be submitted within 48 hours of booking confirmation.",
    },
    {
      title: "Liability",
      content:
        "Marrakesh Travel Services is not responsible for circumstances beyond our control, including weather conditions, natural disasters, or political events that may affect your travel experience.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content on our website, including images, descriptions, and branding, is the property of Marrakesh Travel Services and protected by copyright law.",
    },
  ]

  return (
    <main className="w-full">
      <Header />
      <PageHero title="Terms & Conditions" backgroundImage="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/a5/17/55.jpg" />

      <section className="py-20 md:py-28 bg-background">
        <Container className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Please carefully read through our terms and conditions. By using Marrakesh Travel Services, you
              acknowledge and accept all terms outlined below. Click on each section to expand and read more.
            </p>
          </div>

          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-card hover:bg-card/80 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 text-left flex-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                      {index + 1}
                    </div>
                    <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-all duration-300 shrink-0 ${
                      expandedIndex === index ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-5 bg-background border-t border-border space-y-4">
                    <p className="leading-relaxed text-muted-foreground">{section.content}</p>

                    {section.items && (
                      <ul className="list-disc list-inside space-y-2 ml-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="leading-relaxed text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.subContent && (
                      <p className="leading-relaxed text-sm text-muted-foreground">{section.subContent}</p>
                    )}

                    {section.note && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                        <p className="text-sm font-medium text-primary">{section.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-border">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">Questions About Our Terms?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions or concerns about these terms and conditions, please don't hesitate to contact
                us.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get In Touch
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
