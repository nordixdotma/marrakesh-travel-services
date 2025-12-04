"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, X } from "lucide-react"
import Link from "next/link"

// Custom WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path
      d="M20.636 3.363C18.399 1.193 15.38 0 12.217 0 5.546 0 .123 5.422.123 12.093c0 2.136.553 4.22 1.6 6.067L0 24l6.037-1.584c1.77.966 3.769 1.474 5.8 1.474h.006c6.67 0 12.093-5.422 12.093-12.093 0-3.164-1.193-6.183-3.3-8.434zM12.217 22.093c-1.798 0-3.558-.484-5.097-1.398l-.366-.217-3.8 1.006.996-3.647-.238-.38c-1.003-1.59-1.534-3.43-1.534-5.365 0-5.52 4.488-10.007 10.01-10.007 2.683 0 5.207 1.046 7.115 2.954 1.908 1.908 2.954 4.432 2.954 7.115 0 5.52-4.488 10.007-10.01 10.007z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)

  // Bounce animation every 10 seconds when closed
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setIsBouncing(true)
        setTimeout(() => setIsBouncing(false), 1000)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    setIsBouncing(false)
  }

  const contactOptions = [
    {
      id: "phone",
      icon: Phone,
      href: "tel:+2125XXXXXXX",
      label: "Call Us",
      color: "bg-blue-500",
    },
    {
      id: "whatsapp",
      icon: WhatsAppIcon,
      href: "https://wa.me/2125XXXXXXX",
      label: "WhatsApp",
      color: "bg-green-500",
    },
    {
      id: "email",
      icon: Mail,
      href: "mailto:info@moroccoluxurytransport.com",
      label: "Email",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Main Button with Pulsing Effect */}
      <motion.button
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative ${
          isOpen ? "bg-gray-700" : "bg-primary"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isBouncing
            ? {
                y: [0, -10, 0],
                transition: {
                  duration: 0.5,
                  repeat: 1,
                  repeatType: "reverse",
                },
              }
            : {}
        }
        aria-label="Contact options"
      >
        {/* Pulsing effect */}
        {!isOpen && <span className="absolute inset-0 rounded-full bg-terracotta animate-ping opacity-75"></span>}

        {/* Ripple effect */}
        {!isOpen && <span className="absolute inset-0 rounded-full bg-terracotta animate-pulse opacity-75"></span>}

        {isOpen ? (
          <X className="h-6 w-6 text-white relative z-10" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white relative z-10"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )}
      </motion.button>

      {/* Contact Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 left-0 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center"
              >
                <Link
                  href={option.href}
                  className="flex items-center"
                  target={option.id === "whatsapp" ? "_blank" : undefined}
                  rel={option.id === "whatsapp" ? "noopener noreferrer" : undefined}
                >
                  <motion.div
                    className={`w-14 h-14 ${option.color} rounded-full flex items-center justify-center shadow-md`}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {typeof option.icon === "function" ? (
                      <option.icon />
                    ) : (
                      <option.icon className="h-6 w-6 text-white" />
                    )}
                  </motion.div>
                  <motion.span
                    className="ml-3 px-3 py-1.5 bg-white rounded-lg shadow-md text-sm font-medium text-gray-700 whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {option.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
