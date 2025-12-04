"use client"

import {
  Home,
  Plane,
  Compass,
  Activity,
  Package,
  Car,
  PhoneIcon,
  MailIcon,
  CrossIcon as AddressIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left: Logo and description */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-12 w-32">
                <Image src="/logo.png" alt="Marrakesh Travel Services" fill className="object-contain" priority />
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/90 mb-6">
              Marrakesh Travel Services - Your trusted partner for authentic Moroccan travel experiences and luxury
              transportation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className="text-primary-foreground/90 hover:text-white transition"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                className="text-primary-foreground/90 hover:text-white transition"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                className="text-primary-foreground/90 hover:text-white transition"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Right: Quick Links and Contact */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-white">
                <span className="font-bold">Quick Links</span>
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-primary-foreground/90 hover:text-white transition flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/tours"
                    className="text-primary-foreground/90 hover:text-white transition flex items-center gap-2"
                  >
                    <Plane className="w-4 h-4" />
                    Tours
                  </a>
                </li>
                <li>
                  <a
                    href="/excursions"
                    className="text-primary-foreground/90 hover:text-white transition flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4" />
                    Excursions
                  </a>
                </li>
                <li>
                  <a
                    href="/activities"
                    className="text-primary-foreground/90 hover:text-white transition flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    Activities
                  </a>
                </li>
                <li>
                  <a
                    href="/packages"
                    className="text-primary-foreground/90 hover:text-white transition flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Packages
                  </a>
                </li>
                <li>
                  <a
                    href="/transfers"
                    className="text-primary-foreground/90 hover:text-white transition flex items-center gap-2"
                  >
                    <Car className="w-4 h-4" />
                    Transfers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">
                <span className="font-bold">Contact</span>
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <PhoneIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a href="tel:+212XXXXXXXXX" className="text-primary-foreground/90 hover:text-white transition">
                      +212 XXXXXXXXX
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MailIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a
                      href="mailto:info@example.com"
                      className="text-primary-foreground/90 hover:text-white transition"
                    >
                      info@example.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AddressIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Address</p>
                    <a href="#" className="text-primary-foreground/90 hover:text-white transition">
                      Marrakesh, Morocco
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8">
          <p className="text-sm text-primary-foreground/90">© 2025 Marrakesh Travel Services. All rights reserved.</p>
          <p className="text-sm text-primary-foreground/90">
            Made with care by{" "}
            <a href="https://example.com" className="font-semibold text-white hover:text-white/80 transition">
              Our Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
