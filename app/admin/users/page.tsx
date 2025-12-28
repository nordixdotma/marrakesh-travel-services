"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  Search,
  Eye,
  Mail,
  Phone,
  Calendar,
  CalendarCheck,
  Loader2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/api"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface User {
  id: string
  name: string
  email?: string
  phone?: string
  role: string
  isActive: boolean
  createdAt: string
  bookingsCount: number
}

export default function AdminUsersPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getUsers()
        setUsers(response.users || [])
      } catch (err: any) {
        console.error('Error fetching users:', err)
        setError(err.message || t.admin?.users?.errorLoading || 'Failed to load users')
        toast.error(t.admin?.users?.errorLoading || 'Failed to load users', {
          description: err.message || 'Please try again later',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        if (!searchQuery.trim()) return true
        const query = searchQuery.toLowerCase()
        return (
          user.name.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.phone?.toLowerCase().includes(query) ||
          user.id.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [searchQuery, users])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleViewDetails = (id: string) => {
    router.push(`/admin/users/${id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/10 rounded-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">{t.admin?.users?.errorLoading || "Error loading users"}</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-sm">
            {t.admin?.dashboard?.retry || "Retry"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.admin?.users?.title || "Users"}</h1>
        <p className="text-sm text-muted-foreground">
          {t.admin?.users?.description?.replace('{count}', String(users.length)) || `Manage registered users and accounts. ${users.length} total users.`}
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.admin?.users?.searchPlaceholder || "Search users..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-sm bg-white"
        />
      </div>

      {/* Users List */}
      {filteredUsers.length > 0 ? (
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:bg-muted/30 transition-colors rounded-sm bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: User Info */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        {user.email && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3.5 w-3.5" />
                            <span>{user.email}</span>
                          </div>
                        )}
                        {user.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Stats & Actions */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{t.admin?.users?.joined || "Joined"} {formatDate(user.createdAt)}</span>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <CalendarCheck className="h-3 w-3" />
                        {user.bookingsCount} booking{user.bookingsCount !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 rounded-sm"
                      onClick={() => handleViewDetails(user.id)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {t.admin?.users?.details || t.admin?.bookings?.details || "Details"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.admin?.users?.noUsersFound || "No users found"}</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery
                ? (t.admin?.users?.noMatch || "No users match your search criteria. Try a different search term.")
                : (t.admin?.users?.emptyState || "Registered users will appear here once customers create accounts.")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
