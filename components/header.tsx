"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [language, setLanguage] = useState<"fr" | "en" | "es">("en")
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
      tours: "Tours",
      excursions: "Excursions",
      activities: "Activités",
      packages: "Forfaits",
      transfers: "Transferts",
      contact: "Contact",
      about: "À propos",
      login: "Connexion",
    },
    en: {
      home: "Home",
      tours: "Tours",
      excursions: "Excursions",
      activities: "Activities",
      packages: "Packages",
      transfers: "Transfers",
      contact: "Contact",
      about: "About",
      login: "Login",
    },
    es: {
      home: "Inicio",
      tours: "Tours",
      excursions: "Excursiones",
      activities: "Actividades",
      packages: "Paquetes",
      transfers: "Transferencias",
      contact: "Contacto",
      about: "Acerca de",
      login: "Iniciar sesión",
    },
  }

  const t = translations[language]

  const navigationLinks = [
    { href: "/", label: t.home },
    { href: "/tours", label: t.tours },
    { href: "/excursions", label: t.excursions },
    { href: "/activities", label: t.activities },
    { href: "/packages", label: t.packages },
    { href: "/transfers", label: t.transfers },
    { href: "/contact", label: t.contact },
    { href: "/about", label: t.about },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled ? "bg-primary shadow-md border-b border-primary/20" : "bg-transparent",
      )}
    >
      <Container className="max-w-7xl mx-auto">
        {/* Mobile layout - three columns */}
        <div className="md:hidden flex h-16 items-center justify-between">
          {/* Left: Language Switcher */}
          <div className="relative z-20 language-dropdown-container">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 hover:bg-white/10`}
            >
              <img
                src={languages.find((lang) => lang.code === language)?.flag || "/placeholder.svg"}
                alt={language}
                className="w-6 h-4 object-cover rounded"
              />
              <span className="text-sm font-medium uppercase text-white">{language}</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-300 text-white" />
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

          {/* Center: Logo - Removed second image, using only one logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center z-10">
            <div className="relative h-12 w-24">
              <Image src="/logo.png" alt="Marrakesh Travel Services Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Right: Menu Button */}
          <div className="flex items-center gap-2 z-20">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors"
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
                  stroke="#ffffff"
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
          {/* First row: Language Switcher, Logo, and Login Button */}
          <div className="flex h-20 items-center justify-between relative">
            {/* Left: Language Switcher */}
            <div className="relative language-dropdown-container">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
              >
                <img
                  src={languages.find((lang) => lang.code === language)?.flag || "/placeholder.svg"}
                  alt={language}
                  className="w-6 h-4 object-cover rounded"
                />
                <span className="text-sm font-medium uppercase text-white">{language}</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 text-white" />
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
                <Image src="/logo.png" alt="Marrakesh Travel Services Logo" fill className="object-contain" priority />
              </div>
            </Link>

            <Link href="/login">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 text-sm bg-transparent">
                {t.login}
              </Button>
            </Link>
          </div>

          {/* Second row: Navigation with primary background */}
          <div className="border-t border-white/20">
            <nav className="flex items-center justify-center gap-5 py-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 relative group font-trajan-pro uppercase tracking-wider text-white hover:text-secondary ${
                    pathname === link.href ? "text-secondary" : ""
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
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
              className={cn(
                "fixed top-0 right-0 bottom-0 w-[85%] max-w-[350px] z-50 md:hidden overflow-y-auto shadow-2xl transition-colors duration-300",
                scrolled ? "bg-white" : "bg-primary",
              )}
            >
              <div className="h-full flex flex-col">
                {/* Header with logo and close button */}
                <div
                  className={cn(
                    "flex items-center justify-between p-6 border-b transition-colors duration-300",
                    scrolled ? "border-gray-200 bg-white" : "border-white/20 bg-primary",
                  )}
                >
                  <Link href="/" className="inline-block" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative h-10 w-28">
                      <Image src="/logo.png" alt="Marrakesh Logo" fill className="object-contain" priority />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "rounded-full transition-colors",
                      scrolled ? "hover:bg-gray-100 text-black" : "hover:bg-white/10 text-white",
                    )}
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
                          className={cn(
                            "flex items-center py-2 md:py-3 px-4 rounded-xl transition-colors text-sm md:text-base font-medium font-trajan-pro uppercase",
                            scrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10",
                            pathname === link.href
                              ? scrolled
                                ? "bg-primary/20 text-primary"
                                : "bg-white/20 text-white"
                              : "",
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                <div
                  className={cn(
                    "p-6 border-t space-y-3 transition-colors duration-300",
                    scrolled ? "border-gray-200 bg-white" : "border-white/20 bg-primary",
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Link
                      href="/login"
                      className={cn(
                        "flex items-center justify-center py-3 px-6 font-medium text-base font-trajan-pro uppercase rounded-lg transition-all duration-300",
                        scrolled
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-white text-primary hover:bg-white/90",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t.login}
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
