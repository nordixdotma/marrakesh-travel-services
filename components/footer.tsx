import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Tours" },
    { href: "/excursions", label: "Excursions" },
    { href: "/activities", label: "Activities" },
    { href: "/packages", label: "Packages" },
    { href: "/transfers", label: "Transfers" },
  ]

  return (
    <footer className="w-full bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <a href="/" className="inline-block">
              <img src="/logo.png" alt="Marrakesh Travel Services" className="h-14 w-auto object-contain" />
            </a>
            <p className="text-sm text-white/80 leading-relaxed">
              Marrakesh Travel Services - Your trusted partner for authentic Moroccan travel experiences and luxury transportation.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://www.facebook.com/marrakeshtravelservices/"
                className="text-white/80 hover:text-amber-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/marrakeshtravelservice/"
                className="text-white/80 hover:text-amber-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">Explore</h4>
            <nav className="space-y-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">Phone</span>
                </div>
                <div className="pl-6 space-y-1">
                  <a href="tel:+212524375251" className="block text-sm text-white/70 hover:text-white transition-colors">
                    +212 (0) 524 375 251
                  </a>
                  <a href="tel:+212661044503" className="block text-sm text-white/70 hover:text-white transition-colors">
                    +212 (0) 661 044 503
                  </a>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">Email</span>
                </div>
                <a href="mailto:contact@marrakeshtravelservices.com" className="pl-6 block text-sm text-white/70 hover:text-white transition-colors break-all">
                  contact@marrakeshtravelservices.com
                </a>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">Address</span>
                </div>
                <p className="pl-6 text-sm text-white/70 leading-relaxed">
                  Rue Bani marine, Appt N°5<br />
                  2ème étage, Medina<br />
                  Marrakech - Maroc
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Security */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">Pay Safely With Us</h4>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              The payment is encrypted and transmitted securely with an SSL protocol.
            </p>
            <div className="relative h-12 w-full">
              <img src="/payment.png" alt="Secure Payment" className="object-cover object-left rounded-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/60">
            <p>© 2025 Marrakesh Travel Services. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <span className="text-white/30">|</span>
              <span>
                Made by{" "}
                <a
                  href="https://la360.ma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  LA360
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
