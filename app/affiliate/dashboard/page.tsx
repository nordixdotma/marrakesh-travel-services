"use client"

import { useLanguage } from "@/components/language-provider"
import { 
  CalendarCheck, 
  DollarSign, 
  TrendingUp, 
  Users,
  Briefcase,
  Award
} from "lucide-react"

export default function AffiliateDashboardPage() {
  const { language } = useLanguage()

  const stats = [
    {
      title: language === "fr" ? "Réservations totales" : language === "es" ? "Reservas totales" : "Total Bookings",
      value: "24",
      change: "+12%",
      icon: CalendarCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: language === "fr" ? "Revenus" : language === "es" ? "Ingresos" : "Revenue",
      value: "2,450 MAD",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: language === "fr" ? "Taux de conversion" : language === "es" ? "Tasa de conversión" : "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: language === "fr" ? "Clients" : language === "es" ? "Clientes" : "Clients",
      value: "18",
      change: "+3",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === "fr" ? "Tableau de bord" : language === "es" ? "Panel" : "Dashboard"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "fr" 
            ? "Bienvenue dans votre espace d'affiliation" 
            : language === "es"
            ? "Bienvenido a tu espacio de afiliados"
            : "Welcome to your affiliate space"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {language === "fr" ? "Réservations récentes" : language === "es" ? "Reservas recientes" : "Recent Bookings"}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    {language === "fr" ? "Tour du désert" : language === "es" ? "Tour del desierto" : "Desert Tour"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "fr" ? "15 Jan 2025" : "Jan 15, 2025"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">120 MAD</p>
                  <p className="text-xs text-green-600">
                    {language === "fr" ? "Commis" : language === "es" ? "Comisión" : "Commission"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {language === "fr" ? "Performance" : language === "es" ? "Rendimiento" : "Performance"}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-foreground">
                  {language === "fr" ? "Niveau" : language === "es" ? "Nivel" : "Level"}
                </span>
              </div>
              <span className="font-semibold text-primary">Bronze</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="text-foreground">
                  {language === "fr" ? "Statut" : language === "es" ? "Estado" : "Status"}
                </span>
              </div>
              <span className="font-semibold text-green-600">
                {language === "fr" ? "Actif" : language === "es" ? "Activo" : "Active"}
              </span>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">
                {language === "fr" 
                  ? "Prochain niveau: 10 réservations de plus" 
                  : language === "es"
                  ? "Próximo nivel: 10 reservas más"
                  : "Next level: 10 more bookings"}
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

