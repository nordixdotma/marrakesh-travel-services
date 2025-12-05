import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description - KEEPING ORIGINAL */}
          <div>
            <a href="/" className="inline-block mb-2">
              <div className="h-16 w-24">
                <img src="/logo.png" alt="Marrakesh Travel Services" className="h-full w-full object-contain" />
              </div>
            </a>
            <p className="text-sm text-white/90 mb-4">
              Marrakesh Travel Services - Your trusted partner for authentic Moroccan travel experiences and luxury
              transportation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/marrakeshtravelservices/"
                className="text-white/90 hover:text-white transition"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/marrakeshtravelservice/"
                className="text-white/90 hover:text-white transition"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links - REDESIGNED */}
          <div>
            <h4 className="font-bold mb-6 text-amber-400">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/tours", label: "Tours" },
                { href: "/excursions", label: "Excursions" },
                { href: "/activities", label: "Activities" },
                { href: "/packages", label: "Packages" },
                { href: "/transfers", label: "Transfers" }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact - REDESIGNED */}
          <div>
            <h4 className="font-bold mb-6 text-amber-400">
              Contact
            </h4>
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
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

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">Email</span>
                </div>
                <a
                  href="mailto:marrakeshtravelservices@gmail.com"
                  className="pl-6 block text-sm text-white/70 hover:text-white transition-colors break-all"
                >
                  marrakeshtravelservices@gmail.com
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
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

          {/* Payment - REDESIGNED */}
          <div>
            <h4 className="font-bold mb-6 text-amber-400">
              Pay Safely With Us
            </h4>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              The payment is encrypted and transmitted securely with an SSL protocol.
            </p>
            <div className="relative h-12 w-full">
                <img
                  src="/payment.png"
                  alt="Secure Payment"
                  className="object-cover object-left rounded-xs"
                />
              </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom - REDESIGNED */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
          <p className="text-sm text-white/60">
            © 2025 Marrakesh Travel Services. All rights reserved.
          </p>
          <a 
            href="/terms" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Terms and Conditions
          </a>
        </div>
      </div>
    </footer>
  )
}