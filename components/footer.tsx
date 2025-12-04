"use client"

import {Shield, FileText, BookOpen, Info, Cookie, FileQuestion } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-white text-foreground pt-16 px-4 sm:px-6 lg:px-8 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Brand & Social */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <a href="https://instagram.com/luzdotma" className="hover:text-primary transition">
                LUZ
              </a>
            </h3>
            <p className="text-sm text-foreground/80 mb-6">
              Building the future of web development, one project at a time.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/luzdotma"
                className="text-foreground/80 hover:text-primary transition"
                aria-label="Instagram"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/luzdotma"
                className="text-foreground/80 hover:text-primary transition"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://instagram.com/luzdotma"
                className="text-foreground/80 hover:text-primary transition"
                aria-label="Instagram"
              >
                X/Twitter
              </a>
            </div>
          </div>

          {/* Platform & Legal */}
          <div className="grid grid-cols-2 gap-8">
            {/* Platform */}
            <div>
              <h4 className="font-semibold mb-4">
                <span className="font-bold">Platform</span>
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <a href="#" className="text-foreground/80 hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FileQuestion className="w-4 h-4 text-primary" />
                  <a href="#" className="text-foreground/80 hover:text-primary transition">
                    Help Center
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  <a href="#" className="text-foreground/80 hover:text-primary transition">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">
                <span className="font-bold">Legal</span>
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <a href="#" className="text-foreground/80 hover:text-primary transition">
                    Privacy Policy
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <a href="#" className="text-foreground/80 hover:text-primary transition">
                    Terms of Service
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-primary" />
                  <a href="#" className="text-foreground/80 hover:text-primary transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/10" />

        {/* Bottom - Reduced vertical space */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8">
          <p className="text-sm text-foreground/80">© 2025 LUZ. All rights reserved.</p>
          <p className="text-sm text-foreground/80">
            Made by{" "}
            <a
              href="https://instagram.com/luzdotma"
              className="font-semibold text-primary hover:text-primary/80 transition"
            >
              LUZ
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
