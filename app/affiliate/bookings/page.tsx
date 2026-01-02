"use client"

import { useLanguage } from "@/components/language-provider"
import { CalendarCheck, MapPin, Users, DollarSign, Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { affiliateApi, ApiError } from "@/lib/api"
import { toast } from "sonner"

interface Booking {
  id: string
  bookingReference: string
  offerTitle: string
  offerType: string
  customerName: string
  customerEmail: string
  date: string
  adults: number
  children: number
  totalGuests: number
  amount: number
  commission: number
  status: string
  commissionStatus: string
  createdAt: string
}

export default function AffiliateBookingsPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await affiliateApi.getBookings(language)
        setBookings(response.bookings || [])
      } catch (err) {
        console.error('Error fetching bookings:', err)
        if (err instanceof ApiError) {
          setError(err.message)
          toast.error('Failed to load bookings', {
            description: err.message || 'Please try again later',
          })
        } else {
          setError('Failed to load bookings')
          toast.error('Failed to load bookings', {
            description: 'Please try again later',
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [language])

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === "confirmed") {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    } else if (statusLower === "pending") {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    } else if (statusLower === "completed") {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    } else if (statusLower === "cancelled") {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }

  const getStatusText = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === "confirmed") {
      return language === "fr" ? "Confirmé" : language === "es" ? "Confirmado" : "Confirmed"
    } else if (statusLower === "pending") {
      return language === "fr" ? "En attente" : language === "es" ? "Pendiente" : "Pending"
    } else if (statusLower === "completed") {
      return language === "fr" ? "Terminé" : language === "es" ? "Completado" : "Completed"
    } else if (statusLower === "cancelled") {
      return language === "fr" ? "Annulé" : language === "es" ? "Cancelado" : "Cancelled"
    }
    return status
  }

  const filteredBookings = bookings.filter(booking =>
    booking.offerTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error && bookings.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "fr" ? "Réservations" : language === "es" ? "Reservas" : "Bookings"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === "fr" 
              ? "Gérez toutes vos réservations et commissions" 
              : language === "es"
              ? "Gestiona todas tus reservas y comisiones"
              : "Manage all your bookings and commissions"}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-destructive/50 p-8 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === "fr" ? "Réservations" : language === "es" ? "Reservas" : "Bookings"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "fr" 
            ? "Gérez toutes vos réservations et commissions" 
            : language === "es"
            ? "Gestiona todas tus reservas y comisiones"
            : "Manage all your bookings and commissions"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={
              language === "fr" 
                ? "Rechercher des réservations..." 
                : language === "es"
                ? "Buscar reservas..."
                : "Search bookings..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {language === "fr" ? "ID" : "ID"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {language === "fr" ? "Tour" : language === "es" ? "Tour" : "Tour"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {language === "fr" ? "Client" : language === "es" ? "Cliente" : "Client"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {language === "fr" ? "Date" : "Date"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {language === "fr" ? "Invités" : language === "es" ? "Huéspedes" : "Guests"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {language === "fr" ? "Montant" : language === "es" ? "Monto" : "Amount"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {language === "fr" ? "Commission" : language === "es" ? "Comisión" : "Commission"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {language === "fr" ? "Statut" : language === "es" ? "Estado" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {booking.bookingReference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {booking.offerTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {booking.customerName || booking.customerEmail || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {booking.totalGuests}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {booking.amount.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {booking.commission.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-sm text-muted-foreground">
                    {searchTerm
                      ? (language === "fr" 
                          ? "Aucune réservation trouvée pour votre recherche" 
                          : language === "es"
                          ? "No se encontraron reservas para su búsqueda"
                          : "No bookings found for your search")
                      : (language === "fr" 
                          ? "Aucune réservation pour le moment" 
                          : language === "es"
                          ? "No hay reservas por el momento"
                          : "No bookings yet")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {language === "fr" ? "Résumé" : language === "es" ? "Resumen" : "Summary"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Total des réservations" : language === "es" ? "Total de reservas" : "Total Bookings"}
            </p>
            <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Revenus totaux" : language === "es" ? "Ingresos totales" : "Total Revenue"}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {bookings.reduce((sum, b) => sum + b.amount, 0)} €
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Commissions totales" : language === "es" ? "Comisiones totales" : "Total Commissions"}
            </p>
            <p className="text-2xl font-bold text-green-600">
              {bookings.reduce((sum, b) => sum + b.commission, 0)} €
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

