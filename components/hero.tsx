"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, Search, Compass, ChevronDown, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
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

// Quick search suggestions
const SUGGESTIONS = [
  { service: "tours", city: "Marrakech", label: { en: "Medina Tour", fr: "Visite Médina", es: "Tour Medina" } },
  { service: "excursions", city: "Marrakech", label: { en: "Atlas Mountains", fr: "Montagnes Atlas", es: "Montañas Atlas" } },
  { service: "excursions", city: "Marrakech", label: { en: "Sahara Desert", fr: "Désert Sahara", es: "Desierto Sahara" } },
  { service: "transfers", city: "Marrakech", label: { en: "Airport Transfer", fr: "Transfert Aéroport", es: "Traslado Aeropuerto" } },
  { service: "activities", city: "Fes", label: { en: "Cooking Class", fr: "Cours de Cuisine", es: "Clase de Cocina" } },
]

// Custom Dropdown Component
function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  icon: Icon, 
  label,
  renderOption 
}: { 
  options: any[]
  value: string
  onChange: (value: string) => void
  icon: React.ElementType
  label: string
  renderOption?: (option: any, isSelected: boolean) => React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Get display text for the selected value
  const getDisplayText = () => {
    const found = options.find(o => (typeof o === 'string' ? o : (o.id || o.name)) === value)
    if (typeof found === 'string') return found
    return found?.label?.[label as keyof typeof found.label] || found?.label?.en || found?.name || value
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
      >
        <span className="font-semibold text-gray-900 text-sm hover:text-primary transition-colors truncate cursor-pointer">
          {getDisplayText()}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute left-0 top-full mt-3 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top cursor-pointer ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="py-2 max-h-64 overflow-y-auto">
          {options.map((option) => {
            const optionValue = typeof option === 'string' ? option : (option.id || option.name)
            const optionLabel = typeof option === 'string' ? option : (option.label?.[label as keyof typeof option.label] || option.label?.en || option.name)
            const isSelected = optionValue === value
            return (
              <button
                key={optionValue}
                type="button"
                onClick={() => {
                  onChange(optionValue)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2.5 flex items-center justify-between text-left transition-all duration-150 cursor-pointer  ${
                  isSelected 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">{optionLabel}</span>
                {isSelected && <Check className="w-4 h-4 text-primary" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const router = useRouter()
  const { language } = useLanguage()
  const [activeService, setActiveService] = useState(SERVICES[0])
  const [selectedCity, setSelectedCity] = useState("Marrakech")

  const handleSearch = () => {
    router.push(`${activeService.path}?city=${selectedCity}`)
  }

  const [highlightInputs, setHighlightInputs] = useState(false)

  const handleSuggestionClick = (suggestion: typeof SUGGESTIONS[0]) => {
    const service = SERVICES.find(s => s.id === suggestion.service)
    if (service) {
      setActiveService(service)
      setSelectedCity(suggestion.city)
      // Visual feedback - highlight inputs briefly
      setHighlightInputs(true)
      setTimeout(() => setHighlightInputs(false), 600)
    }
  }

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100dvh" }}>
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 w-[400vw] h-[400vh] md:w-[300vw] md:h-[300vh] lg:w-[150vw] lg:h-[150vh]"
          style={{
            transform: "translate(-50%, -50%)",
            pointerEvents: "none"
          }}
          src="https://www.youtube-nocookie.com/embed/1XKaUV4dJFU?autoplay=1&mute=1&loop=1&playlist=1XKaUV4dJFU&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=0&end=150"
          title="Background video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-20">
        <div className="w-full max-w-4xl mx-auto space-y-4">
          {/* Main Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-full p-2 md:p-2.5 flex flex-col md:flex-row items-stretch gap-2 border border-white/20 relative z-20">
            {/* Service Selector Dropdown */}
            <div className={`flex-1 w-full md:w-auto flex items-center gap-3 px-5 py-3.5 md:border-r border-gray-200/80 relative group hover:bg-gray-50/50 rounded-xl md:rounded-l-full transition-all duration-300 ${highlightInputs ? 'bg-primary/10 ring-2 ring-primary/30' : ''}`}>
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/15 transition-colors">
                <Compass className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col w-full relative z-10">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">
                  {language === 'fr' ? 'Service' : language === 'es' ? 'Servicio' : 'Service'}
                </span>
                <CustomDropdown
                  options={SERVICES}
                  value={activeService.id}
                  onChange={(id) => {
                    const service = SERVICES.find(s => s.id === id)
                    if (service) setActiveService(service)
                  }}
                  icon={Compass}
                  label={language}
                />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-primary absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
            </div>

            {/* City Selector */}
            <div className={`flex-1 w-full md:w-auto flex items-center gap-3 px-5 py-3.5 md:border-r border-gray-200/80 relative group hover:bg-gray-50/50 rounded-xl transition-all duration-300 ${highlightInputs ? 'bg-primary/10 ring-2 ring-primary/30' : ''}`}>
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/15 transition-colors">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col w-full relative z-10">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">
                  {language === 'fr' ? 'Ville de départ' : language === 'es' ? 'Ciudad de salida' : 'Departure City'}
                </span>
                <CustomDropdown
                  options={CITIES}
                  value={selectedCity}
                  onChange={setSelectedCity}
                  icon={MapPin}
                  label={language}
                />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-primary absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              size="lg"
              className="w-full md:w-auto rounded-xl md:rounded-full bg-primary hover:bg-primary/90 text-white min-w-[140px] h-12 md:h-auto px-8 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold cursor-pointer"
            >
              <Search className="h-5 w-5 mr-2" />
              {language === 'fr' ? 'Rechercher' : language === 'es' ? 'Buscar' : 'Search'}
            </Button>
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 px-2 cur">
            <span className="text-white/70 text-xs font-medium flex items-center gap-1.5 mr-1">
              <Sparkles className="h-3.5 w-3.5" />
              {language === 'fr' ? 'Populaires:' : language === 'es' ? 'Populares:' : 'Popular:'}
            </span>
            {SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                {suggestion.label[language as keyof typeof suggestion.label] || suggestion.label.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TripAdvisor Badge */}
      <a
        href="https://www.tripadvisor.com/Attraction_Review-g293734-d8514036-Reviews-Marrakesh_Travel_Services-Marrakech_Marrakech_Safi.html"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 z-20 hover:scale-110 transition-transform duration-300"
        aria-label="Visit our TripAdvisor page"
      >
        <Image
          src="/certif.png"
          alt="TripAdvisor"
          width={56}
          height={56}
          className="w-10 h-10 md:w-14 md:h-14 rounded-sm"
          sizes="(max-width: 768px) 40px, 56px"
        />
      </a>
    </section>
  )
}