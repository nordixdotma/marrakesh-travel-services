import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"

export default function TermsPage() {
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
      <PageHero title="Terms & Conditions" backgroundImage="/moroccan-desert-sand-dunes.jpg" />

      <section className="py-20 md:py-28 bg-background">
        <Container className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Please carefully read through our terms and conditions. By using Marrakesh Travel Services, you
              acknowledge and accept all terms outlined below.
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="border-l-4 border-primary/30 pl-6">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>

                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">{section.content}</p>

                  {section.items && (
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subContent && <p className="leading-relaxed text-sm">{section.subContent}</p>}

                  {section.note && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                      <p className="text-sm font-medium text-primary">{section.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-border">
            <div className="bg-card rounded-xl p-8 text-center border border-border">
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
