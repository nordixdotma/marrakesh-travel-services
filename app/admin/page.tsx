"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      router.push("/admin/dashboard")
    } else {
      router.push("/admin/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-2 border-primary border-r-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Redirecting...</span>
      </div>
    </div>
  )
}
