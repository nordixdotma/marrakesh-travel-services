"use client"

import { useLanguage } from "@/components/language-provider"
import { 
  CalendarCheck, 
  DollarSign, 
  TrendingUp, 
  Users,
  Briefcase,
  Award,
  Loader2,
  AlertCircle
} from "lucide-react"
import { useState, useEffect } from "react"
import { affiliateApi, ApiError } from "@/lib/api"
import { toast } from "sonner"

interface DashboardData {
  affiliate: any
  stats: {
    totalBookings: number
    totalRevenue: number
    totalCommission: number
    totalClients: number
    conversionRate: string
    totalClicks: number
    totalConversions: number
  }
  performance: {
    level: string
    nextLevelBookings: number | null
    bookingsToNextLevel: number
    progressPercentage: number
  }
  recentBookings: any[]
}

export default function AffiliateDashboardPage() {
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await affiliateApi.getDashboard()
        setDashboardData(response as any)
      } catch (err) {
        console.error('Error fetching dashboard:', err)
        if (err instanceof ApiError) {
          setError(err.message)
          toast.error('Failed to load dashboard', {
            description: err.message || 'Please try again later',
          })
        } else {
          setError('Failed to load dashboard')
          toast.error('Failed to load dashboard', {
            description: 'Please try again later',
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !dashboardData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "fr" ? "Tableau de bord" : language === "es" ? "Panel" : "Dashboard"}
          </h1>
        </div>
        <div className="bg-card rounded-lg border border-destructive/50 p-8 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
          <p className="text-destructive">{error || 'Failed to load dashboard'}</p>
        </div>
      </div>
    )
  }

  const { stats, performance, recentBookings, affiliate } = dashboardData

  const statsCards = [
    {
      title: language === "fr" ? "Réservations totales" : language === "es" ? "Reservas totales" : "Total Bookings",
      value: stats.totalBookings.toString(),
      change: "",
      icon: CalendarCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: language === "fr" ? "Revenus" : language === "es" ? "Ingresos" : "Revenue",
      value: `${stats.totalRevenue.toFixed(2)} €`,
      change: "",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: language === "fr" ? "Taux de conversion" : language === "es" ? "Tasa de conversión" : "Conversion Rate",
      value: `${stats.conversionRate}%`,
      change: "",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: language === "fr" ? "Clients" : language === "es" ? "Clientes" : "Clients",
      value: stats.totalClients.toString(),
      change: "",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold':
        return 'text-yellow-600'
      case 'Silver':
        return 'text-gray-600'
      default:
        return 'text-amber-600'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

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
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  {stat.change && <p className="text-xs text-green-600 mt-1">{stat.change}</p>}
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
            {recentBookings && recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      {booking.offer_title || 'Untitled Offer'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(booking.date || booking.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {parseFloat(booking.total_price || 0).toFixed(2)} €
                    </p>
                    <p className="text-xs text-green-600">
                      {language === "fr" ? "Commis" : language === "es" ? "Comisión" : "Commission"}: {parseFloat(booking.commission_amount || 0).toFixed(2)} €
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                {language === "fr" ? "Aucune réservation récente" : language === "es" ? "No hay reservas recientes" : "No recent bookings"}
              </p>
            )}
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
              <span className={`font-semibold ${getLevelColor(performance.level)}`}>
                {performance.level}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="text-foreground">
                  {language === "fr" ? "Statut" : language === "es" ? "Estado" : "Status"}
                </span>
              </div>
              <span className={`font-semibold ${affiliate.status === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'}`}>
                {affiliate.status === 'ACTIVE' 
                  ? (language === "fr" ? "Actif" : language === "es" ? "Activo" : "Active")
                  : (language === "fr" ? "Inactif" : language === "es" ? "Inactivo" : "Inactive")}
              </span>
            </div>
            {affiliate.days_until_expiration !== null && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">
                  {language === "fr" ? "Expiration" : language === "es" ? "Expiración" : "Expiration"}
                </span>
                <span className={`text-sm font-medium ${affiliate.days_until_expiration <= 7 ? 'text-red-600' : affiliate.days_until_expiration <= 15 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {affiliate.days_until_expiration > 0 
                    ? `${affiliate.days_until_expiration} ${language === "fr" ? "jours" : language === "es" ? "días" : "days"}`
                    : language === "fr" ? "Expiré" : language === "es" ? "Expirado" : "Expired"}
                </span>
              </div>
            )}
            {performance.nextLevelBookings !== null && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "fr" 
                    ? `Prochain niveau: ${performance.bookingsToNextLevel} réservations de plus` 
                    : language === "es"
                    ? `Próximo nivel: ${performance.bookingsToNextLevel} reservas más`
                    : `Next level: ${performance.bookingsToNextLevel} more bookings`}
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${Math.min(performance.progressPercentage, 100)}%` }} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

