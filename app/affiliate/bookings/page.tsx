"use client"

import { useLanguage } from "@/components/language-provider"
import { CalendarCheck, MapPin, Users, DollarSign, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function AffiliateBookingsPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  const bookings = [
    {
      id: "BK001",
      tour: language === "fr" ? "Tour du désert de 3 jours" : language === "es" ? "Tour del desierto de 3 días" : "3-Day Desert Tour",
      client: "John Doe",
      date: "2025-01-15",
      guests: 2,
      amount: 240,
      commission: 24,
      status: "confirmed"
    },
    {
      id: "BK002",
      tour: language === "fr" ? "Excursion à Essaouira" : language === "es" ? "Excursión a Essaouira" : "Essaouira Excursion",
      client: "Jane Smith",
      date: "2025-01-18",
      guests: 4,
      amount: 180,
      commission: 18,
      status: "pending"
    },
    {
      id: "BK003",
      tour: language === "fr" ? "Visite guidée de Marrakech" : language === "es" ? "Visita guiada de Marrakech" : "Marrakech Guided Tour",
      client: "Mike Johnson",
      date: "2025-01-20",
      guests: 1,
      amount: 80,
      commission: 8,
      status: "confirmed"
    },
  ]

  const getStatusColor = (status: string) => {
    if (status === "confirmed") {
      return "bg-green-100 text-green-800"
    } else if (status === "pending") {
      return "bg-yellow-100 text-yellow-800"
    }
    return "bg-gray-100 text-gray-800"
  }

  const getStatusText = (status: string) => {
    if (status === "confirmed") {
      return language === "fr" ? "Confirmé" : language === "es" ? "Confirmado" : "Confirmed"
    } else if (status === "pending") {
      return language === "fr" ? "En attente" : language === "es" ? "Pendiente" : "Pending"
    }
    return status
  }

  const filteredBookings = bookings.filter(booking =>
    booking.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {booking.tour}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {booking.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {booking.guests}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {booking.amount} MAD
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    {booking.commission} MAD
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {getStatusText(booking.status)}
                    </span>
                  </td>
                </tr>
              ))}
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
              {bookings.reduce((sum, b) => sum + b.amount, 0)} MAD
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              {language === "fr" ? "Commissions totales" : language === "es" ? "Comisiones totales" : "Total Commissions"}
            </p>
            <p className="text-2xl font-bold text-green-600">
              {bookings.reduce((sum, b) => sum + b.commission, 0)} MAD
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

