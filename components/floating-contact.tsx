"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// Custom WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-9 md:h-9">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path
      d="M20.636 3.363C18.399 1.193 15.38 0 12.217 0 5.546 0 .123 5.422.123 12.093c0 2.136.553 4.22 1.6 6.067L0 24l6.037-1.584c1.77.966 3.769 1.474 5.8 1.474h.006c6.67 0 12.093-5.422 12.093-12.093 0-3.164-1.193-6.183-3.3-8.434zM12.217 22.093c-1.798 0-3.558-.484-5.097-1.398l-.366-.217-3.8 1.006.996-3.647-.238-.38c-1.003-1.59-1.534-3.43-1.534-5.365 0-5.52 4.488-10.007 10.01-10.007 2.683 0 5.207 1.046 7.115 2.954 1.908 1.908 2.954 4.432 2.954 7.115 0 5.52-4.488 10.007-10.01 10.007z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

export default function FloatingContact() {

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <Link href="https://wa.me/212661044503" target="_blank" rel="noopener noreferrer" className="inline-flex">
          <motion.div
            className="w-12 h-12 md:w-14 md:h-14 text-white bg-green-500 rounded-md flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
            style={{
              boxShadow: "0 0 10px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)",
            }}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <WhatsAppIcon />
          </motion.div>
        </Link>
    </div>
  )
}
