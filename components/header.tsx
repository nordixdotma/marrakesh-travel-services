"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronDown, User } from "lucide-react"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/login-modal"
import { useLanguage } from "@/components/language-provider"

export default function Header({ isStatic = false }: { isStatic?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { isLoggedIn, openLoginModal } = useAuth()
  const { language, setLanguage, t, languages } = useLanguage()
  
  // Check if we're in the users section
  const isUsersSection = pathname?.startsWith("/users") || isStatic

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

  const navigationLinks = [
    { href: "/", label: t.header.home },
    { href: "/tours", label: t.header.tours },
    { href: "/excursions", label: t.header.excursions },
    { href: "/activities", label: t.header.activities },
    { href: "/packages", label: t.header.packages },
    { href: "/transfers", label: t.header.transfers },
    { href: "/about", label: t.header.about },
    { href: "/blog", label: t.header.blog },
  ]

  return (
    <header
      className={cn(
        "top-0 z-40 w-full transition-all duration-300",
        isUsersSection 
          ? "relative bg-primary shadow-md border-b border-primary/20" 
          : cn(
              "fixed",
              scrolled ? "bg-primary shadow-md border-b border-primary/20" : "bg-transparent"
            ),
      )}
    >
      <Container className="max-w-7xl mx-auto">
        {/* Mobile layout - three columns */}
        <div className="md:hidden flex h-16 items-center justify-between">
          {/* Left: Login Button */}
          {isLoggedIn ? (
            <Link href="/users/profile" className="z-20">
              <Button 
                size="sm"
                className={cn(
                  "rounded-full p-1.5 transition-all duration-300 border cursor-pointer",
                  (scrolled || isUsersSection)
                    ? "bg-linear-to-r from-[#fac360] to-[#fce97c] text-primary border-[#fac360]/50 hover:opacity-90" 
                    : "bg-primary text-white border-white/30 hover:bg-primary/90"
                )}
              >
                <User className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button 
              size="sm"
              onClick={() => openLoginModal()}
              className={cn(
                "text-xs font-medium rounded-full px-4 py-1.5 transition-all duration-300 border z-20 cursor-pointer",
                (scrolled || isUsersSection)
                  ? "bg-linear-to-r from-[#fac360] to-[#fce97c] text-primary border-[#fac360]/50 hover:opacity-90" 
                  : "bg-primary text-white border-white/30 hover:bg-primary/90"
              )}
            >
              {t.header.login}
            </Button>
          )}

          {/* Center: Logo */}
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

        {/* Desktop layout - single row */}
        <div className="hidden md:block">
          <div className="flex h-20 items-center justify-between gap-6">
            {/* Left: Language Switcher */}
            <div className="relative language-dropdown-container shrink-0">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="w-10 h-10 rounded-full transition-all duration-300 hover:bg-white/10 flex items-center justify-center cursor-pointer"
              >
                <img
                  src={languages.find((lang) => lang.code === language)?.flag || "/placeholder.svg"}
                  alt={language}
                  className="w-8 h-8 object-cover rounded-full"
                />
              </button>

              {languageDropdownOpen && (
                <div className="absolute left-0 top-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 py-2 min-w-40 z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as "en" | "fr" | "es")
                        setLanguageDropdownOpen(false)
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-primary/20 transition-colors cursor-pointer ${
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

            {/* Left Nav Links (4 links) */}
            <nav className="flex items-center gap-5">
              {navigationLinks.slice(0, 4).map((link) => (
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

            {/* Center: Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="relative h-16 w-32">
                <Image src="/logo.png" alt="Marrakesh Travel Services Logo" fill className="object-contain" priority />
              </div>
            </Link>

            {/* Right Nav Links (4 links) */}
            <nav className="flex items-center gap-5">
              {navigationLinks.slice(4, 8).map((link) => (
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

            {/* Right: Contact & Login Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/contact">
                <Button 
                  variant="outline"
                  className={cn(
                    "text-sm font-medium rounded-full px-6 transition-all duration-300 cursor-pointer",
                    (scrolled || isUsersSection)
                      ? "border-white text-primary  hover:text-white hover:bg-primary/10" 
                      : "border-white text-primary hover:text-white hover:bg-white/10"
                  )}
                >
                  {t.header.contact}
                </Button>
              </Link>
              {isLoggedIn ? (
                <Link href="/users/profile">
                  <Button 
                    className={cn(
                      "rounded-full px-4 py-2 transition-all duration-300 cursor-pointer flex items-center gap-2",
                      (scrolled || isUsersSection)
                        ? "bg-linear-to-r from-[#fac360] to-[#fce97c] text-primary hover:opacity-90" 
                        : "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{t.header.myAccount}</span>
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={() => openLoginModal()}
                  className={cn(
                    "text-sm font-medium rounded-full px-6 transition-all duration-300 cursor-pointer",
                    (scrolled || isUsersSection)
                      ? "bg-linear-to-r from-[#fac360] to-[#fce97c] text-primary hover:opacity-90" 
                      : "bg-primary text-white hover:bg-primary/90"
                  )}
                >
                  {t.header.login}
                </Button>
              )}
            </div>
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
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] z-50 md:hidden overflow-hidden shadow-2xl bg-white"
            >
              <div className="h-full flex flex-col">
                {/* Header with close button */}
                <div className="flex items-center justify-between px-5 py-4 bg-primary">
                  <Link href="/" className="inline-block" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative h-9 w-24">
                      <Image src="/logo.png" alt="Marrakesh Logo" fill className="object-contain" priority />
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Navigation links */}
                <div className="flex-1 overflow-y-auto py-3 px-3">
                  <nav className="space-y-0.5">
                    {navigationLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 + index * 0.03 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center py-3 px-4 rounded-lg transition-all duration-200 text-sm font-medium tracking-wide group",
                            pathname === link.href
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primary",
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="flex-1">{link.label}</span>
                          <ChevronRight className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            pathname === link.href ? "text-white/70" : "text-gray-400 group-hover:translate-x-0.5 group-hover:text-primary"
                          )} />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Footer with Language & Login */}
                <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50/50">
                  {/* Language Selector */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">{t.header.language}</p>
                    <div className="flex gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code as "en" | "fr" | "es")}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                            lang.code === language
                              ? "bg-primary text-white shadow-sm"
                              : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:bg-primary/5"
                          )}
                        >
                          <img
                            src={lang.flag || "/placeholder.svg"}
                            alt={lang.name}
                            className="w-5 h-3.5 object-cover rounded-sm"
                          />
                          <span className="uppercase text-xs">{lang.code}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Login Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {isLoggedIn ? (
                      <Link
                        href="/users/profile"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-linear-to-r from-[#fac360] to-[#fce97c] text-primary font-semibold text-sm rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        {t.header.myAccount}
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false)
                          openLoginModal()
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-linear-to-r from-[#fac360] to-[#fce97c] text-primary font-semibold text-sm rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t.header.login}
                      </button>
                    )}
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