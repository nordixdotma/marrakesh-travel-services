"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { paymentApi } from "@/lib/api"
import Header from "@/components/header"
import Footer from "@/components/footer"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)
  const bookingRef = searchParams.get('bookingRef')
  const token = searchParams.get('token')
  const payerId = searchParams.get('PayerID')

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get orderId from URL (PayPal returns it as 'token')
        const paypalOrderId = token || searchParams.get('token')
        
        if (!paypalOrderId) {
          setStatus('error')
          setMessage('Payment order ID not found. Please contact support.')
          return
        }

        setOrderId(paypalOrderId)

        // Capture the PayPal payment
        const captureResult = await paymentApi.capturePayPalOrder(paypalOrderId, bookingRef || undefined)

        if (captureResult.success) {
          setStatus('success')
          setMessage('Payment confirmed successfully! Your booking has been confirmed.')
          
          // TODO: Update booking status in database via API
          // You can call a backend endpoint to update the booking status to CONFIRMED
          
        } else {
          setStatus('error')
          setMessage('Payment verification failed. Please contact support if payment was deducted.')
        }
      } catch (error: any) {
        console.error('Payment verification error:', error)
        setStatus('error')
        setMessage(error.message || 'Failed to verify payment. Please contact support.')
      }
    }

    verifyPayment()
  }, [token, searchParams, bookingRef])

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
              </div>
              <CardTitle className="text-2xl">Verifying Payment...</CardTitle>
            </>
          )}
          {status === 'success' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-500/10">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-red-600">Payment Verification Failed</CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">{message}</p>
          
          {bookingRef && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Booking Reference</p>
              <p className="text-sm font-mono font-semibold">{bookingRef}</p>
            </div>
          )}
          
          {orderId && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">PayPal Order ID</p>
              <p className="text-sm font-mono font-semibold">{orderId}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="flex-1"
            >
              Go Home
            </Button>
            {bookingRef && (
              <Button
                onClick={() => router.push(`/users/bookings`)}
                className="flex-1"
              >
                View Bookings
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
    <main className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  )
}


