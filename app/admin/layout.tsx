"use client"

import type React from "react"
import { useState, useEffect, createContext, useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Map,
  Compass,
  Activity,
  Car,
  CalendarCheck,
  CreditCard,
  Users,
  Star,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Auth Context
interface AdminAuthContextType {
  isAuthenticated: boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within AdminLayout")
  }
  return context
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Tours", href: "/admin/tours", icon: Map },
  { title: "Excursions", href: "/admin/excursions", icon: Compass },
  { title: "Activities", href: "/admin/activities", icon: Activity },
  { title: "Transfers", href: "/admin/transfers", icon: Car },
  { title: "Bookings", href: "/admin/bookings", icon: CalendarCheck, badge: 12 },
  { title: "Payments", href: "/admin/payments", icon: CreditCard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Reviews", href: "/admin/reviews", icon: Star, badge: 5 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("admin_authenticated")
      setIsAuthenticated(authStatus === "true")
      setIsLoading(false)
    }
    
    checkAuth()
    
    // Listen for storage changes (for when login happens in another tab)
    const handleStorageChange = () => {
      const authStatus = localStorage.getItem("admin_authenticated")
      setIsAuthenticated(authStatus === "true")
    }
    
    // Listen for custom auth change event (for same-tab login)
    const handleAuthChange = () => {
      const authStatus = localStorage.getItem("admin_authenticated")
      setIsAuthenticated(authStatus === "true")
    }
    
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("admin-auth-change", handleAuthChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("admin-auth-change", handleAuthChange)
    }
  }, [])

  // Re-check auth when pathname changes (handles navigation after login)
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated")
    if (authStatus === "true" && !isAuthenticated) {
      setIsAuthenticated(true)
    }
  }, [pathname, isAuthenticated])

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, isLoading, isLoginPage, router])

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
    router.push("/admin/login")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-primary border-r-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>
    )
  }

  // Login page - no layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // Not authenticated - redirect handled by useEffect
  if (!isAuthenticated) {
    return null
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, logout }}>
      <div className="min-h-screen bg-muted/30">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-200 lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-center px-5 border-b border-border relative">
            <Link href="/admin/dashboard" className="flex items-center">
              <Image
                src="/blacklogo.png"
                alt="Marrakesh Travel"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-md hover:bg-muted absolute right-5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100%-4rem-4.5rem)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded font-medium",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Top Header */}
          <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center justify-between px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">AD</span>
                    </div>
                    <span className="hidden sm:block font-medium">Admin</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthContext.Provider>
  )
}
