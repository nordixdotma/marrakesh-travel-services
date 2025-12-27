"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { XCircle, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

function FailedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'failed' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const bookingRef = searchParams.get('bookingRef')
  const errorCode = searchParams.get('errorCode')
  const errorMessage = searchParams.get('errorMessage')

  useEffect(() => {
    // Simulate a brief loading state
    const timer = setTimeout(() => {
      setStatus('failed')
      
      // Set error message based on URL parameters or default
      if (errorMessage) {
        setMessage(errorMessage)
      } else if (errorCode) {
        setMessage(`Payment failed with error code: ${errorCode}`)
        setErrorDetails(`Error Code: ${errorCode}`)
      } else {
        setMessage('Your payment could not be processed. Please try again or contact support if the problem persists.')
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [errorCode, errorMessage])

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
              </div>
              <CardTitle className="text-2xl">Processing...</CardTitle>
            </>
          )}
          {status === 'failed' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-500/10">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-orange-500/10">
                  <AlertCircle className="h-16 w-16 text-orange-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-orange-600">Payment Error</CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">{message}</p>
          
          {errorDetails && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Error Details</p>
              <p className="text-sm font-mono font-semibold">{errorDetails}</p>
            </div>
          )}
          
          {bookingRef && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Booking Reference</p>
              <p className="text-sm font-mono font-semibold">{bookingRef}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Your booking is still pending. You can retry the payment or contact support.
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
                Go Home
              </Button>
              {bookingRef && (
                <Button
                  variant="outline"
                  onClick={() => router.push(`/offers?retry=${bookingRef}`)}
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry Payment
                </Button>
              )}
            </div>
            
            {bookingRef && (
              <Button
                onClick={() => router.push(`/users/bookings`)}
                className="w-full"
              >
                View My Bookings
              </Button>
            )}
            
            <div className="pt-2 border-t">
              <p className="text-xs text-center text-muted-foreground mb-3">
                Need help? Contact our support team
              </p>
              <Button
                variant="outline"
                onClick={() => router.push('/contact')}
                className="w-full"
              >
                Contact Support
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

