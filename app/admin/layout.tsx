"use client"

import type React from "react"
import { useState, useEffect, createContext, useContext, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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
  Package,
  Users2,
  Ticket,
  Shield,
  Settings,
  FileText,
} from "lucide-react"
import { adminApi } from "@/lib/api"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"


// Auth Context
interface AdminAuthContextType {
  isAuthenticated: boolean
  logout: () => void
}

interface Permission {
  page: string
  can_read: boolean
  can_write: boolean
  can_delete: boolean
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

// Map of page identifiers to navigation items
const pageToNavItem: Record<string, NavItem> = {
  'dashboard': { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  'tours': { title: "Tours", href: "/admin/tours", icon: Map },
  'excursions': { title: "Excursions", href: "/admin/excursions", icon: Compass },
  'activities': { title: "Activities", href: "/admin/activities", icon: Activity },
  'transfers': { title: "Transfers", href: "/admin/transfers", icon: Car },
  'packages': { title: "Packages", href: "/admin/packages", icon: Package },
  'bookings': { title: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  'payments': { title: "Payments", href: "/admin/payments", icon: CreditCard },
  'users': { title: "Users", href: "/admin/users", icon: Users },
  'reviews': { title: "Reviews", href: "/admin/reviews", icon: Star },
  'affiliates': { title: "Affiliates", href: "/admin/affiliates", icon: Users2 },
  'promo-codes': { title: "Promo Codes", href: "/admin/promo-codes", icon: Ticket },
  'team': { title: "Team", href: "/admin/team", icon: Shield },
  'settings': { title: "Settings", href: "/admin/settings", icon: Settings },
  'blog': { title: "Blog", href: "/admin/blog", icon: FileText },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [adminRole, setAdminRole] = useState<'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | null>(null)
  const [permissionsLoading, setPermissionsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useLanguage()

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("admin_token")
      const authStatus = localStorage.getItem("admin_authenticated")
      // Check both token and auth status for backward compatibility
      setIsAuthenticated(!!(token && authStatus === "true"))
      setIsLoading(false)
    }
    
    checkAuth()
    
    // Listen for storage changes (for when login happens in another tab)
    const handleStorageChange = () => {
      const token = localStorage.getItem("admin_token")
      const authStatus = localStorage.getItem("admin_authenticated")
      setIsAuthenticated(!!(token && authStatus === "true"))
    }
    
    // Listen for custom auth change event (for same-tab login)
    const handleAuthChange = () => {
      const token = localStorage.getItem("admin_token")
      const authStatus = localStorage.getItem("admin_authenticated")
      setIsAuthenticated(!!(token && authStatus === "true"))
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
    const token = localStorage.getItem("admin_token")
    const authStatus = localStorage.getItem("admin_authenticated")
    if (token && authStatus === "true" && !isAuthenticated) {
      setIsAuthenticated(true)
    }
  }, [pathname, isAuthenticated])

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, isLoading, isLoginPage, router])

  // Fetch admin permissions when authenticated
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!isAuthenticated || isLoginPage) {
        setPermissionsLoading(false)
        return
      }

      try {
        setPermissionsLoading(true)
        const response = await adminApi.getMyPermissions()
        setPermissions(response.permissions || [])
        setAdminRole(response.admin.role)
      } catch (error) {
        console.error('Failed to fetch permissions:', error)
        // On error, show all items (fallback to allow access)
        setPermissions([])
        setAdminRole(null)
      } finally {
        setPermissionsLoading(false)
      }
    }

    fetchPermissions()
  }, [isAuthenticated, isLoginPage])

  // Filter navigation items based on permissions
  const filteredNavItems = useMemo(() => {
    // SUPER_ADMIN sees everything
    if (adminRole === 'SUPER_ADMIN') {
      return Object.values(pageToNavItem)
    }

    // For other admins, filter based on read permissions
    const allowedPages = new Set(
      permissions
        .filter(p => p.can_read)
        .map(p => p.page)
    )

    return Object.entries(pageToNavItem)
      .filter(([page]) => allowedPages.has(page))
      .map(([_, navItem]) => navItem)
  }, [permissions, adminRole])

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_info")
    router.push("/admin/login")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-primary border-r-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">{t.admin?.header?.loading || "Loading..."}</span>
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
              className="lg:hidden p-1.5 rounded-sm hover:bg-muted absolute right-5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-4rem-4.5rem)]">
            {permissionsLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="h-4 w-4 border-2 border-primary border-r-transparent rounded-full animate-spin" />
              </div>
            ) : (
              filteredNavItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{t.admin?.sidebar?.[Object.keys(pageToNavItem).find(key => pageToNavItem[key].href === item.href) || ''] || item.title}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-sm font-medium",
                        isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })
            )}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>{t.admin?.sidebar?.signOut || "Sign Out"}</span>
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
                className="lg:hidden p-2 -ml-2 rounded-sm hover:bg-muted"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher 
                buttonClassName="bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary"
              />
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">AD</span>
                </div>
                <span className="hidden sm:block font-medium">{t.admin?.header?.admin || "Admin"}</span>
              </div>
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
