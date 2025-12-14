"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    // Check if consent is already given
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show after a small delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  const content = {
    en: {
      text: "We use cookies to enhance your user experience. By continuing to visit this site you agree to our use of cookies.",
      accept: "Accept",
      decline: "Decline"
    },
    fr: {
      text: "Nous utilisons des cookies pour améliorer votre expérience utilisateur. En continuant à visiter ce site, vous acceptez notre utilisation des cookies.",
      accept: "Accepter",
      decline: "Refuser"
    },
    es: {
      text: "Utilizamos cookies para mejorar su experiencia de usuario. Al continuar visitando este sitio, acepta nuestro uso de cookies.",
      accept: "Aceptar",
      decline: "Rechazar"
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left max-w-2xl">
              {currentContent.text}
            </p>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleDecline}
                className="text-gray-600 border-gray-300 hover:bg-gray-100"
              >
                {currentContent.decline}
              </Button>
              <Button 
                onClick={handleAccept}
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              >
                {currentContent.accept}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
