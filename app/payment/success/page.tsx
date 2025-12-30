"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { bookingApi, paymentApi } from "@/lib/api"
import { Banknote, Calendar, CheckCircle2, FileText, Loader2, Users, XCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [booking, setBooking] = useState<any>(null)
  const bookingRef = searchParams.get('bookingRef') || searchParams.get('oid') // CMI uses 'oid'
  const token = searchParams.get('token')
  const payerId = searchParams.get('PayerID')
  const procReturnCode = searchParams.get('ProcReturnCode') // CMI parameter

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get all URL parameters
        const urlToken = searchParams.get('token')
        const urlPayerId = searchParams.get('PayerID')
        const urlOid = searchParams.get('oid')
        const urlProcReturnCode = searchParams.get('ProcReturnCode')
        
        // Check if this is a PayPal payment (has token or PayerID)
        const paypalOrderId = token || payerId || urlToken || urlPayerId
        
        if (paypalOrderId) {
          // This is a PayPal payment
          setOrderId(paypalOrderId)

          // Capture the PayPal payment
          const captureResult = await paymentApi.capturePayPalOrder(paypalOrderId, bookingRef || undefined)

          if (captureResult.success) {
            setStatus('success')
            setMessage('Payment confirmed successfully! Your booking has been confirmed.')
            
            // Fetch booking details if bookingRef is available
            if (bookingRef) {
              try {
                const bookingResponse = await bookingApi.getBookingByReference(bookingRef)
                setBooking(bookingResponse.booking)
              } catch (error) {
                console.error('Failed to fetch booking:', error)
              }
            }
          } else {
            setStatus('error')
            setMessage('Payment verification failed. Please contact support if payment was deducted.')
          }
        } else {
          // This is likely a CMI payment redirect
          // CMI may redirect to okUrl with or without parameters
          const cmiOrderId = urlOid || bookingRef
          
          if (!cmiOrderId) {
            setStatus('error')
            setMessage('Référence de commande introuvable. Veuillez contacter le support.')
            return
          }

          setOrderId(cmiOrderId)

          // Check ProcReturnCode if available (CMI may include it in URL)
          const procCode = procReturnCode || urlProcReturnCode
          
          if (procCode === '00' || !procCode) {
            // Payment successful (ProcReturnCode = 00) or no code (assume success if on success page)
            try {
              // Fetch booking details to verify status
              const bookingResponse = await bookingApi.getBookingByReference(cmiOrderId)
              setBooking(bookingResponse.booking)
              
              // Check if booking is confirmed (payment was processed)
              if (bookingResponse.booking.status === 'confirmed' || bookingResponse.booking.paymentStatus === 'completed') {
                setStatus('success')
                setMessage('Paiement confirmé avec succès ! Votre réservation a été confirmée.')
              } else {
                // Booking exists but payment might still be processing
                setStatus('success')
                setMessage('Paiement en cours de traitement. Votre réservation sera confirmée sous peu.')
              }
            } catch (error: any) {
              console.error('Failed to fetch booking:', error)
              // If booking not found, still show success (payment callback may still be processing)
              setStatus('success')
              setMessage('Paiement confirmé avec succès ! Votre réservation est en cours de traitement.')
            }
          } else {
            // Payment failed (ProcReturnCode != 00)
            setStatus('error')
            setMessage('Le paiement n\'a pas pu être confirmé. Veuillez contacter le support.')
          }
        }
      } catch (error: any) {
        console.error('Payment verification error:', error)
        setStatus('error')
        setMessage(error.message || 'Échec de la vérification du paiement. Veuillez contacter le support.')
      }
    }

    verifyPayment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
              </div>
              <CardTitle className="text-2xl">Vérification du paiement...</CardTitle>
            </>
          )}
          {status === 'success' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-600">Paiement réussi !</CardTitle>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-500/10">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-red-600">Échec de la vérification du paiement</CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">{message}</p>
          
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
                <p className="text-sm font-semibold capitalize">{booking.status === 'confirmed' ? 'Confirmée' : booking.status}</p>
              </div>
            </div>
          )}
          
          {bookingRef && !booking && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Référence de réservation</p>
              <p className="text-sm font-mono font-semibold">{bookingRef}</p>
            </div>
          )}
          
          {orderId && (token || payerId) && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">ID de commande PayPal</p>
              <p className="text-sm font-mono font-semibold">{orderId}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="flex-1"
            >
              Accueil
            </Button>
            {bookingRef && (
              <Button
                onClick={() => router.push(`/users/bookings`)}
                className="flex-1"
              >
                Mes réservations
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <br />
      <br />
      <br />
      <br />
      <main className="flex-1 flex flex-col">
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
