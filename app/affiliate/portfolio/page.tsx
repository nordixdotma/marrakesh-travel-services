"use client"

import { useLanguage } from "@/components/language-provider"
import { Link2, QrCode, Copy, CheckCircle, MousePointerClick, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AffiliatePortfolioPage() {
  const { language } = useLanguage()
  const [copied, setCopied] = useState<string | null>(null)

  const affiliateLinks = [
    {
      id: "1",
      name: language === "fr" ? "Lien principal" : language === "es" ? "Enlace principal" : "Main Link",
      url: "https://marrakeshtravelservices.com/?ref=AFF001",
      clicks: 245,
      conversions: 12
    },
    {
      id: "2",
      name: language === "fr" ? "Page Tours" : language === "es" ? "Página Tours" : "Tours Page",
      url: "https://marrakeshtravelservices.com/tours?ref=AFF001",
      clicks: 180,
      conversions: 8
    },
    {
      id: "3",
      name: language === "fr" ? "Page Excursions" : language === "es" ? "Página Excursiones" : "Excursions Page",
      url: "https://marrakeshtravelservices.com/excursions?ref=AFF001",
      clicks: 156,
      conversions: 6
    },
  ]

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  // Calculate totals for KPIs
  const totalClicks = affiliateLinks.reduce((sum, link) => sum + link.clicks, 0)
  const totalConversions = affiliateLinks.reduce((sum, link) => sum + link.conversions, 0)
  const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : "0.00"
  const totalCommission = totalConversions * 100 // Assuming 100 MAD per conversion

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === "fr" ? "Portfolio" : language === "es" ? "Portafolio" : "Portfolio"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "fr" 
            ? "Gérez vos liens d'affiliation et suivez vos performances" 
            : language === "es"
            ? "Gestiona tus enlaces de afiliados y rastrea tu rendimiento"
            : "Manage your affiliate links and track your performance"}
        </p>
      </div>

      {/* KPIs Summary */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {language === "fr" ? "Résumé" : language === "es" ? "Resumen" : "Summary"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Total des clics" : language === "es" ? "Total de clics" : "Total Clicks"}
            </p>
            <div className="flex items-center gap-2">
              <MousePointerClick className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold text-foreground">{totalClicks}</p>
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Total des conversions" : language === "es" ? "Total de conversiones" : "Total Conversions"}
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{totalConversions}</p>
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Taux de conversion" : language === "es" ? "Tasa de conversión" : "Conversion Rate"}
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">{conversionRate}%</p>
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Commissions totales" : language === "es" ? "Comisiones totales" : "Total Commissions"}
            </p>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{totalCommission} MAD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate ID Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Votre ID d'affilié" : language === "es" ? "Tu ID de afiliado" : "Your Affiliate ID"}
            </p>
            <p className="text-2xl font-bold text-foreground">AFF001</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <QrCode className="h-12 w-12 text-primary" />
          </div>
        </div>
      </div>

      {/* Affiliate Links */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          {language === "fr" ? "Vos liens d'affiliation" : language === "es" ? "Tus enlaces de afiliados" : "Your Affiliate Links"}
        </h2>
        
        {affiliateLinks.map((link) => (
          <div key={link.id} className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{link.name}</h3>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                  <code className="text-sm text-foreground flex-1 break-all">{link.url}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(link.url, link.id)}
                    className="shrink-0"
                  >
                    {copied === link.id ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-primary/5 rounded-lg border border-primary/20 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          {language === "fr" ? "Comment utiliser vos liens" : language === "es" ? "Cómo usar tus enlaces" : "How to use your links"}
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              {language === "fr" 
                ? "Partagez vos liens d'affiliation sur vos réseaux sociaux, blog ou site web"
                : language === "es"
                ? "Comparte tus enlaces de afiliados en tus redes sociales, blog o sitio web"
                : "Share your affiliate links on your social media, blog, or website"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              {language === "fr" 
                ? "Chaque réservation effectuée via vos liens vous rapporte une commission"
                : language === "es"
                ? "Cada reserva realizada a través de tus enlaces te genera una comisión"
                : "Each booking made through your links earns you a commission"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              {language === "fr" 
                ? "Suivez vos performances en temps réel dans cette section"
                : language === "es"
                ? "Rastrea tu rendimiento en tiempo real en esta sección"
                : "Track your performance in real-time in this section"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

