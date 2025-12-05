import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { MapPin, Users, Award, Heart } from "lucide-react"

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
      description: "We listen to your needs and tailor every journey to your preferences.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Commitment to delivering the highest standards in every service.",
    },
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "Genuine love for sharing Morocco's beauty with travelers worldwide.",
    },
  ]

  return (
    <main className="w-full">
      <Header />
      <PageHero title="About Us" backgroundImage="/moroccan-riad-architecture-interior.jpg" />

      <section className="py-20 md:py-28 bg-background">
        <Container className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Discover the <span className="text-primary">Real Morocco</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Marrakech Travel Services is your gateway to authentic Moroccan experiences that go beyond the typical
              tourist path.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 mb-16 md:mb-20">
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              By offering{" "}
              <span className="font-semibold text-primary">excursions, city tours, and various activities</span> across
              all regions of Morocco, we listen to your needs and select the best travelling opportunities for you. Our
              experienced team is dedicated to crafting unforgettable journeys that showcase Morocco's authentic beauty,
              culture, and hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 md:mb-20">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/moroccan-landscape-atlas-mountains.jpg"
                alt="Morocco landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Why Choose Us</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>Expert knowledge of hidden gems and authentic experiences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>Personalized itineraries tailored to your preferences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>Professional team dedicated to excellence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>24/7 support and seamless travel coordination</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide every journey we create</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
