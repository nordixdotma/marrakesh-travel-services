"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, Search, Calendar, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

const SERVICES = [
  { id: "tours", label: { en: "Tours", fr: "Circuits", es: "Circuitos" }, path: "/tours" },
  { id: "excursions", label: { en: "Excursions", fr: "Excursions", es: "Excursiones" }, path: "/excursions" },
  { id: "activities", label: { en: "Activities", fr: "Activités", es: "Actividades" }, path: "/activities" },
  { id: "transfers", label: { en: "Transfers", fr: "Transferts", es: "Traslados" }, path: "/transfers" },
]

const CITIES = [
  "Marrakech",
  "Casablanca",
  "Agadir",
  "Tanger",
  "Fes",
  "Rabat",
  "Ouarzazate"
]

export default function HeroSearch() {
  const router = useRouter()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState(SERVICES[0])
  const [selectedCity, setSelectedCity] = useState("Marrakech")

  const handleSearch = () => {
    // Construct search URL
    // Currently redirects to the service page with a city query param
    router.push(`${activeTab.path}?city=${selectedCity}`)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 md:p-4 shadow-2xl">
        {/* Service Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeTab.id === service.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {service.label[language as keyof typeof service.label] || service.label.en}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-2 flex flex-col md:flex-row items-center gap-2">
          {/* Service Indicator (Visual only) */}
          <div className="flex-1 w-full md:w-auto flex items-center gap-3 px-4 py-3 md:border-r border-gray-100">
            <Compass className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                {language === 'fr' ? 'Service' : language === 'es' ? 'Servicio' : 'Service'}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {activeTab.label[language as keyof typeof activeTab.label] || activeTab.label.en}
              </span>
            </div>
          </div>

          {/* City Selector */}
          <div className="flex-1 w-full md:w-auto flex items-center gap-3 px-4 py-3 md:border-r border-gray-100 relative group">
            <MapPin className="h-5 w-5 text-primary" />
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                {language === 'fr' ? 'Ville de départ' : language === 'es' ? 'Ciudad de salida' : 'Departure City'}
              </span>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent font-semibold text-gray-900 outline-none p-0 cursor-pointer appearance-none"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <Button 
            onClick={handleSearch}
            size="lg"
            className="w-full md:w-auto rounded-lg bg-primary hover:bg-primary/90 text-white min-w-[140px] h-14"
          >
            <Search className="h-5 w-5 mr-2" />
            {language === 'fr' ? 'Rechercher' : language === 'es' ? 'Buscar' : 'Search'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
