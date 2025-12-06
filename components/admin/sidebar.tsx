"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
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
  Bell,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/components/admin/auth-provider"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tours Management",
    icon: Map,
    children: [
      { title: "All Tours", href: "/admin/tours" },
      { title: "Add Tour", href: "/admin/tours/add" },
      { title: "Prices", href: "/admin/tours/prices" },
      { title: "Schedules", href: "/admin/tours/schedules" },
    ],
  },
  {
    title: "Excursions",
    icon: Compass,
    children: [
      { title: "All Excursions", href: "/admin/excursions" },
      { title: "Add Excursion", href: "/admin/excursions/add" },
      { title: "Prices", href: "/admin/excursions/prices" },
      { title: "Schedules", href: "/admin/excursions/schedules" },
    ],
  },
  {
    title: "Activities",
    icon: Activity,
    children: [
      { title: "All Activities", href: "/admin/activities" },
      { title: "Add Activity", href: "/admin/activities/add" },
    ],
  },
  {
    title: "Transfers",
    icon: Car,
    children: [
      { title: "All Transfers", href: "/admin/transfers" },
      { title: "Vehicle Types", href: "/admin/transfers/vehicles" },
      { title: "Prices", href: "/admin/transfers/prices" },
      { title: "Pickup Points", href: "/admin/transfers/pickup-points" },
    ],
  },
  {
    title: "Bookings",
    icon: CalendarCheck,
    children: [
      { title: "All Bookings", href: "/admin/bookings" },
      { title: "Pending", href: "/admin/bookings/pending" },
      { title: "Confirmed", href: "/admin/bookings/confirmed" },
      { title: "Canceled", href: "/admin/bookings/canceled" },
      { title: "Refunds", href: "/admin/bookings/refunds" },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    children: [
      { title: "Overview", href: "/admin/payments" },
      { title: "CMI", href: "/admin/payments/cmi" },
      { title: "PayPal", href: "/admin/payments/paypal" },
      { title: "History", href: "/admin/payments/history" },
      { title: "Issues", href: "/admin/payments/issues" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "All Users", href: "/admin/users" },
      { title: "Verify Accounts", href: "/admin/users/verify" },
      { title: "Profiles", href: "/admin/users/profiles" },
    ],
  },
  {
    title: "Reviews",
    icon: Star,
    children: [
      { title: "All Reviews", href: "/admin/reviews" },
      { title: "Pending Approval", href: "/admin/reviews/pending" },
      { title: "Spam Reports", href: "/admin/reviews/spam" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    children: [
      { title: "Send Notification", href: "/admin/notifications" },
      { title: "Booking Reminders", href: "/admin/notifications/reminders" },
      { title: "Meeting Points", href: "/admin/notifications/meeting-points" },
    ],
  },
  {
    title: "Live Chat",
    icon: MessageSquare,
    children: [
      { title: "Active Chats", href: "/admin/chat" },
      { title: "Support History", href: "/admin/chat/history" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/admin/settings" },
      { title: "Payment Settings", href: "/admin/settings/payments" },
      { title: "Agency Info", href: "/admin/settings/agency" },
      { title: "Email Templates", href: "/admin/settings/templates" },
      { title: "Phone Verification", href: "/admin/settings/verification" },
      { title: "Languages", href: "/admin/settings/languages" },
      { title: "Security", href: "/admin/settings/security" },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    children: [
      { title: "Overview", href: "/admin/analytics" },
      { title: "Top Tours", href: "/admin/analytics/top-tours" },
      { title: "Performance", href: "/admin/analytics/performance" },
      { title: "Conversions", href: "/admin/analytics/conversions" },
    ],
  },
]

function NavItemComponent({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href
    ? pathname === item.href
    : item.children?.some((child) => pathname === child.href)

  if (!hasChildren && item.href) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.title}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          {item.title}
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && item.children && (
        <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm transition-colors",
                pathname === child.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function AdminSidebar() {
  const { logout } = useAdminAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MT</span>
            </div>
            <div>
              <h2 className="font-semibold text-sm">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">Marrakesh Travel</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1 hover:bg-accent rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItemComponent key={item.title} item={item} />
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
