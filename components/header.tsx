"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, ChevronDown } from "lucide-react"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [language, setLanguage] = useState<"fr" | "en" | "es">("fr")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (languageDropdownOpen && !target.closest(".language-dropdown-container")) {
        setLanguageDropdownOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [languageDropdownOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const languages = [
    {
      code: "fr",
      name: "Français",
      flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    },
    {
      code: "en",
      name: "English",
      flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    },
    {
      code: "es",
      name: "Español",
      flag: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg",
    },
  ]

  const translations = {
    fr: {
      home: "Accueil",
      massages: "Massages",
      hammam: "Hammam",
      hammamPackage: "Forfait Hammam",
      facialCare: "Soins du Visage",
      prices: "Tarifs",
      homeMassage: "Massage à Domicile",
      giftIdea: "Idée Cadeau",
      contact: "Contact",
      call: "Appeler",
    },
    en: {
      home: "Home",
      massages: "Massages",
      hammam: "Hammam",
      hammamPackage: "Hammam Package",
      facialCare: "Facial Care",
      prices: "Prices",
      homeMassage: "Home Massage",
      giftIdea: "Gift Idea",
      contact: "Contact",
      call: "Call",
    },
    es: {
      home: "Inicio",
      massages: "Masajes",
      hammam: "Hammam",
      hammamPackage: "Paquete Hammam",
      facialCare: "Cuidado Facial",
      prices: "Precios",
      homeMassage: "Masaje a Domicilio",
      giftIdea: "Idea de Regalo",
      contact: "Contacto",
      call: "Llamar",
    },
  }

  const t = translations[language]

  const navigationLinks = [
    { href: "/", label: t.home },
    { href: "/massages", label: t.massages },
    { href: "/hammam", label: t.hammam },
    { href: "/hammam-massage-package", label: t.hammamPackage },
    { href: "/facial-care", label: t.facialCare },
    { href: "/tariffs", label: t.prices },
    { href: "/home-massage", label: t.homeMassage },
    { href: "/gift-idea", label: t.giftIdea },
    { href: "/contact", label: t.contact },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-transparent",
      )}
    >
      <Container className="max-w-7xl mx-auto">
        {/* Mobile layout - three columns */}
        <div className="md:hidden flex h-16 items-center justify-between">
          {/* Left: Language Switcher */}
          <div className="relative z-20 language-dropdown-container">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
              }`}
            >
              <img
                src={languages.find((lang) => lang.code === language)?.flag || "/placeholder.svg"}
                alt={language}
                className="w-6 h-4 object-cover rounded"
              />
              <span className={`text-sm font-medium uppercase ${scrolled ? "text-gray-800" : "text-white"}`}>
                {language}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${languageDropdownOpen ? "rotate-180" : ""} ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              />
            </button>

            {languageDropdownOpen && (
              <div className="absolute left-0 top-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 py-2 min-w-[140px] z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as "en" | "fr" | "es")
                      setLanguageDropdownOpen(false)
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-primary/20 transition-colors ${
                      lang.code === language ? "bg-primary/10" : ""
                    }`}
                  >
                    <img
                      src={lang.flag || "/placeholder.svg"}
                      alt={lang.name}
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span className="text-sm font-medium text-gray-800">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center z-10">
            <div className="relative h-14 w-28">
              <Image
                src={scrolled ? "/logo.png" : "/logo.png"}
                alt="Enchanting Association Logo"
                fill
                className="object-contain transition-opacity duration-300"
                priority
              />
            </div>
          </Link>

          {/* Right: Menu Button */}
          <div className="flex items-center gap-2 z-20">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative flex flex-col justify-center items-center w-10 h-10 rounded-lg transition-colors ${
                scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300"
              >
                <path
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"}
                  stroke={scrolled ? "#1f2937" : "#ffffff"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop layout - two rows */}
        <div className="hidden md:block">
          {/* First row: Language Switcher and Logo (centered) */}
          <div className="flex h-20 items-center justify-between relative">
            {/* Left: Language Switcher */}
            <div className="relative language-dropdown-container">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                }`}
              >
                <img
                  src={languages.find((lang) => lang.code === language)?.flag || "/placeholder.svg"}
                  alt={language}
                  className="w-6 h-4 object-cover rounded"
                />
                <span className={`text-sm font-medium uppercase ${scrolled ? "text-gray-800" : "text-white"}`}>
                  {language}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${languageDropdownOpen ? "rotate-180" : ""} ${
                    scrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              </button>

              {languageDropdownOpen && (
                <div className="absolute left-0 top-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 py-2 min-w-[160px] z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as "en" | "fr" | "es")
                        setLanguageDropdownOpen(false)
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-primary/20 transition-colors ${
                        lang.code === language ? "bg-primary/10" : ""
                      }`}
                    >
                      <img
                        src={lang.flag || "/placeholder.svg"}
                        alt={lang.name}
                        className="w-6 h-4 object-cover rounded"
                      />
                      <span className="text-sm font-medium text-gray-800">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Center: Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center z-10">
              <div className="relative h-16 w-32">
                <Image
                  src={scrolled ? "/logo.png" : "/logo.png"}
                  alt="Enchanting Association Logo"
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Second row: Navigation with border */}
          <div
            className={cn("border-t transition-colors duration-300", scrolled ? "border-gray-200" : "border-white/20")}
          >
            <nav className="flex items-center justify-center gap-5 py-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300  relative group font-trajan-pro uppercase tracking-wider ${
                    scrolled ? "text-gray-800 hover:text-primary" : "text-white hover:text-white/80"
                  } ${pathname === link.href ? "text-primary" : ""}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay with blur effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[350px] z-50 md:hidden overflow-y-auto bg-white shadow-2xl"
            >
              <div className="h-full flex flex-col">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <Link href="/" className="inline-block" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative h-10 w-28">
                      <Image src="/logo.png" alt="Enchanting Logo" fill className="object-contain" priority />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-full hover:bg-gray-100 text-black"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </div>

                {/* Navigation links */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <nav className="space-y-1">
                    {navigationLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center py-2 md:py-3 px-4 rounded-xl text-gray-800 hover:bg-gray-100 transition-colors text-sm md:text-base ${
                            pathname === link.href ? "bg-primary/20 text-primary" : ""
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="font-medium font-trajan-pro uppercase">{link.label}</span>
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                <div className="p-6 border-t border-gray-200 space-y-3">
                  {/* Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Link
                      href="/contact"
                      className="flex items-center justify-center py-3 px-6 bg-gray-200 text-gray-800 font-medium text-base font-trajan-pro uppercase transition-all duration-300 hover:bg-gray-300 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      {t.call}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}