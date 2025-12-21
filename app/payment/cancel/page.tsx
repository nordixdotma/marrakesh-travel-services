"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PaymentCancelPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingRef = searchParams.get('bookingRef')

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-yellow-500/10">
                <XCircle className="h-16 w-16 text-yellow-500" />
              </div>
            </div>
            <CardTitle className="text-2xl text-yellow-600">Payment Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              You cancelled the payment process. Your booking is still pending payment.
            </p>
            
            {bookingRef && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Booking Reference</p>
                <p className="text-sm font-mono font-semibold">{bookingRef}</p>
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
      <Footer />
    </main>
  )
}

