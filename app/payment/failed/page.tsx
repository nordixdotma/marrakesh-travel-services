"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { XCircle, Loader2, AlertCircle, RefreshCw, Calendar, Users, Banknote, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { bookingApi } from "@/lib/api"
import Header from "@/components/header"
import Footer from "@/components/footer"

function FailedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'failed' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [booking, setBooking] = useState<any>(null)
  const bookingRef = searchParams.get('bookingRef') || searchParams.get('oid') // CMI uses 'oid'
  const errorCode = searchParams.get('errorCode')
  const errorMessage = searchParams.get('errorMessage')
  const procReturnCode = searchParams.get('ProcReturnCode') // CMI parameter

  useEffect(() => {
    const loadBookingInfo = async () => {
      // Simulate a brief loading state
      const timer = setTimeout(async () => {
        setStatus('failed')
        
        // Set error message based on URL parameters or default
        if (errorMessage) {
          setMessage(errorMessage)
        } else if (errorCode) {
          setMessage(`Le paiement a échoué avec le code d'erreur : ${errorCode}`)
          setErrorDetails(`Code d'erreur : ${errorCode}`)
        } else if (procReturnCode && procReturnCode !== '00') {
          setMessage('Le paiement n\'a pas pu être traité. Veuillez réessayer ou contacter le support si le problème persiste.')
          setErrorDetails(`Code de retour : ${procReturnCode}`)
        } else {
          setMessage('Votre paiement n\'a pas pu être traité. Veuillez réessayer ou contacter le support si le problème persiste.')
        }

        // Fetch booking details if bookingRef is available
        if (bookingRef) {
          try {
            const bookingResponse = await bookingApi.getBookingByReference(bookingRef)
            setBooking(bookingResponse.booking)
          } catch (error) {
            console.error('Failed to fetch booking:', error)
          }
        }
      }, 500)

      return () => clearTimeout(timer)
    }

    loadBookingInfo()
  }, [errorCode, errorMessage, bookingRef, procReturnCode])

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
              </div>
              <CardTitle className="text-2xl">Traitement...</CardTitle>
            </>
          )}
          {status === 'failed' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-500/10">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-red-600">Paiement échoué</CardTitle>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-orange-500/10">
                  <AlertCircle className="h-16 w-16 text-orange-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-orange-600">Erreur de paiement</CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">{message}</p>
          
          {errorDetails && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Détails de l'erreur</p>
              <p className="text-sm font-mono font-semibold">{errorDetails}</p>
            </div>
          )}
          
          {booking && (
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-semibold text-lg mb-3">Détails de votre réservation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Référence</p>
                    <p className="text-sm font-semibold">{booking.bookingReference}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-semibold">{new Date(booking.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Participants</p>
                    <p className="text-sm font-semibold">
                      {booking.adults} adulte{booking.adults > 1 ? 's' : ''}
                      {booking.children > 0 && `, ${booking.children} enfant${booking.children > 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Banknote className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Montant</p>
                    <p className="text-sm font-semibold">{booking.totalPrice?.toFixed(2) || '0.00'} MAD</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-1">Offre</p>
                <p className="text-sm font-semibold">{booking.offerTitle || 'N/A'}</p>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-1">Statut</p>
                <p className="text-sm font-semibold capitalize">
                  {booking.status === 'pending' ? 'En attente de paiement' : booking.status}
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg mt-3">
                <p className="text-xs text-muted-foreground">
                  Votre réservation est toujours en attente. Vous pouvez réessayer le paiement ou contacter le support.
                </p>
              </div>
            </div>
          )}
          
          {bookingRef && !booking && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Référence de réservation</p>
              <p className="text-sm font-mono font-semibold">{bookingRef}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Votre réservation est toujours en attente. Vous pouvez réessayer le paiement ou contacter le support.
              </p>
            </div>
          )}

          <div className="space-y-3 pt-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="flex-1"
              >
                Accueil
              </Button>
              {bookingRef && (
                <Button
                  variant="outline"
                  onClick={() => router.push(`/offers?retry=${bookingRef}`)}
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Réessayer
                </Button>
              )}
            </div>
            
            {bookingRef && (
              <Button
                onClick={() => router.push(`/users/bookings`)}
                className="w-full"
              >
                Mes réservations
              </Button>
            )}
            
            <div className="pt-2 border-t">
              <p className="text-xs text-center text-muted-foreground mb-3">
                Besoin d'aide ? Contactez notre équipe de support
              </p>
              <Button
                variant="outline"
                onClick={() => router.push('/contact')}
                className="w-full"
              >
                Contacter le support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      }>
        <FailedContent />
      </Suspense>
      <Footer />
    </main>
  )
}
