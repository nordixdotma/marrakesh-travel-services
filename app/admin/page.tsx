"use client"
 
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
 
export default function AdminPage() {
  const router = useRouter()
  const { t } = useLanguage()
 
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
        <span className="text-sm text-muted-foreground">{t.admin?.common?.redirecting || "Redirecting..."}</span>
      </div>
    </div>
  )
}
