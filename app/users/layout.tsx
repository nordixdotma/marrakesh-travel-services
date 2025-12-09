"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import { Container } from "@/components/ui/container"
import { useAuth } from "@/components/login-modal"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { User, CalendarDays, Heart, Settings, LogOut, Headphones } from "lucide-react"

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoggedIn, user, logout, openLoginModal } = useAuth()
  const { t } = useLanguage()

  const sidebarLinks = [
    {
      href: "/users/profile",
      label: t.users.sidebar.profile,
      icon: User,
    },
    {
      href: "/users/bookings",
      label: t.users.sidebar.myBookings,
      icon: CalendarDays,
    },
    {
      href: "/users/favorites",
      label: t.users.sidebar.favorites,
      icon: Heart,
    },
    {
      href: "/users/settings",
      label: t.users.sidebar.settings,
      icon: Settings,
    },
    {
      href: "/users/support",
      label: t.users.sidebar.support,
      icon: Headphones,
    },
  ]

  useEffect(() => {
    // If not logged in, redirect to home and show login modal
    if (!isLoggedIn) {
      router.push("/")
      setTimeout(() => {
        openLoginModal("Please sign in to access your account")
      }, 100)
    }
  }, [isLoggedIn, router, openLoginModal])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Don't render the layout if not logged in
  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      <Header isStatic />
      <main className="min-h-screen bg-muted/30 py-8">
        <Container className="max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-background rounded-xl border border-border p-4 sticky top-24">
                {/* User Info */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {user?.email || user?.phone || ""}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>

                {/* Logout Button */}
                <div className="pt-4 mt-4 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    {t.users.sidebar.logout}
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
