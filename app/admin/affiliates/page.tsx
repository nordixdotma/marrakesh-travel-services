"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Users2,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  Loader2,
  TrendingUp,
  MousePointerClick,
  DollarSign,
  CheckCircle2,
  XCircle,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { adminApi, ApiError } from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

type AffiliateStatus = "all" | "active" | "inactive"

interface Affiliate {
  id: string
  userId?: string
  affiliateCode: string
  name: string
  email: string
  userName?: string
  userEmail?: string
  userPhone?: string
  commissionRate: number
  totalClicks: number
  totalConversions: number
  totalCommission: number
  status: string
  createdAt: string
}

export default function AdminAffiliatesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<AffiliateStatus>("all")
  const [affiliates, setAffiliates] = useState<Affiliate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        setLoading(true)
        setError(null)
        const status = statusFilter !== "all" ? statusFilter : undefined
        const response = await adminApi.getAffiliates(status)
        setAffiliates(response.affiliates || [])
      } catch (err: any) {
        console.error('Error fetching affiliates:', err)
        setError(err.message || t.admin?.affiliates?.errorLoading || 'Failed to load affiliates')
        toast.error(t.admin?.affiliates?.errorLoading || 'Failed to load affiliates', {
          description: err.message || 'Please try again later',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAffiliates()
  }, [statusFilter])

  const filteredAffiliates = useMemo(() => {
    return affiliates
      .filter((affiliate) => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          return (
            affiliate.name.toLowerCase().includes(query) ||
            affiliate.email.toLowerCase().includes(query) ||
            affiliate.affiliateCode.toLowerCase().includes(query) ||
            affiliate.userName?.toLowerCase().includes(query) ||
            affiliate.id.toLowerCase().includes(query)
          )
        }
        return true
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [searchQuery, affiliates])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "inactive":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleStatusChange = async (affiliateId: string, newStatus: 'ACTIVE' | 'INACTIVE') => {
    try {
      setUpdatingStatus(affiliateId)
      await adminApi.updateAffiliateStatus(affiliateId, newStatus)
      
      // Update local state
      setAffiliates(prev => prev.map(aff => 
        aff.id === affiliateId 
          ? { ...aff, status: newStatus.toLowerCase() }
          : aff
      ))
      
      toast.success(
        t.admin?.affiliates?.updateStatusSuccess?.replace('{status}', newStatus.toLowerCase()) || `Affiliate status updated to ${newStatus.toLowerCase()}`,
        {
          description: newStatus === 'ACTIVE' 
            ? (t.admin?.affiliates?.updateStatusActiveDesc || 'The affiliate will receive an activation email.')
            : (t.admin?.affiliates?.updateStatusInactiveDesc || 'The affiliate account has been deactivated.')
        }
      )
    } catch (err: any) {
      console.error('Error updating affiliate status:', err)
      toast.error('Failed to update affiliate status', {
        description: err.message || 'Please try again later',
      })
    } finally {
      setUpdatingStatus(null)
    }
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
            <Users2 className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">{t.admin?.affiliates?.errorLoading || "Error loading affiliates"}</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-sm">
            {t.admin?.common?.retry || "Retry"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.admin?.affiliates?.title || "Affiliates"}</h1>
        <p className="text-sm text-muted-foreground">
          {t.admin?.affiliates?.description?.replace('{count}', affiliates.length.toString()) || `Manage affiliate partners and commissions. ${affiliates.length} total affiliates.`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.admin?.affiliates?.searchPlaceholder || "Search affiliates..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-sm bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as AffiliateStatus)}
          >
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder={t.admin?.common?.status || "Status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.admin?.affiliates?.statusAll || "All Status"}</SelectItem>
              <SelectItem value="active">{t.admin?.affiliates?.statusActive || "Active"}</SelectItem>
              <SelectItem value="inactive">{t.admin?.affiliates?.statusInactive || "Inactive"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Affiliates List */}
      {filteredAffiliates.length > 0 ? (
        <div className="space-y-3">
          {filteredAffiliates.map((affiliate) => (
            <Card key={affiliate.id} className="hover:bg-muted/30 transition-colors rounded-sm bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left: Affiliate Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{affiliate.name}</h3>
                      <Badge variant="secondary" className={getStatusColor(affiliate.status)}>
                        {affiliate.status.toLowerCase() === 'active' ? (t.admin?.affiliates?.statusActive || 'active') : (t.admin?.affiliates?.statusInactive || 'inactive')}
                      </Badge>
                      {updatingStatus === affiliate.id && (
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      {affiliate.email && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" />
                          <span>{affiliate.email}</span>
                        </div>
                      )}
                      {affiliate.userPhone && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{affiliate.userPhone}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs font-mono">
                        {t.admin?.affiliates?.code?.replace('{code}', affiliate.affiliateCode) || `Code: ${affiliate.affiliateCode}`}
                      </Badge>
                    </div>
                  </div>

                  {/* Middle: Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MousePointerClick className="h-4 w-4" />
                      <span>{t.admin?.affiliates?.clicks?.replace('{count}', affiliate.totalClicks.toString()) || `${affiliate.totalClicks} clicks`}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>{affiliate.totalConversions} conversions</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <DollarSign className="h-4 w-4" />
                      <span>{affiliate.totalCommission.toFixed(2)} {affiliate.commissionRate}%</span>
                    </div>
                  </div>

                  {/* Right: Status Toggle, Date & Actions */}
                  <div className="flex items-center gap-3">
                    {/* Status Toggle */}
                    <div className="flex items-center gap-2">
                      <Select
                        value={affiliate.status.toUpperCase()}
                        onValueChange={(value) => handleStatusChange(affiliate.id, value as 'ACTIVE' | 'INACTIVE')}
                        disabled={updatingStatus === affiliate.id}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs bg-white">
                          <div className="flex items-center gap-2">
                            {affiliate.status.toLowerCase() === 'active' ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-gray-500" />
                            )}
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              {t.admin?.affiliates?.statusActive || "Active"}
                            </div>
                          </SelectItem>
                          <SelectItem value="INACTIVE">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-3.5 w-3.5 text-gray-500" />
                              {t.admin?.affiliates?.statusInactive || "Inactive"}
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        {formatDate(affiliate.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/affiliates/${affiliate.id}`}>
                        <Button variant="outline" size="sm" className="gap-1 rounded-sm">
                          <Eye className="h-3.5 w-3.5" />
                          {t.admin?.affiliates?.viewDetails || "View Details"}
                        </Button>
                      </Link>
                      {affiliate.userId && (
                        <Link href={`/admin/users/${affiliate.userId}`}>
                          <Button variant="outline" size="sm" className="gap-1 rounded-sm">
                            <User className="h-3.5 w-3.5" />
                            {t.admin?.affiliates?.viewUser || "View User"}
                          </Button>
                        </Link>
                      )}
                    </div>
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
              <Users2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.admin?.affiliates?.noFound || "No affiliates found"}</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {searchQuery || statusFilter !== "all"
                ? (t.admin?.affiliates?.noResults || "No affiliates match your search criteria. Try different filters.")
                : (t.admin?.affiliates?.emptyState || "Your affiliate partners will appear here once they join your program.")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
