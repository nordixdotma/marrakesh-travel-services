"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  MousePointerClick,
  Award,
  Link2,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

export default function AffiliateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const affiliateId = params.id as string
  const { t } = useLanguage()
  const [affiliate, setAffiliate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    const fetchAffiliate = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getAffiliateById(affiliateId)
        setAffiliate(response.affiliate)
      } catch (err) {
        console.error('Error fetching affiliate:', err)
        if (err instanceof ApiError) {
          setError(err.message)
          toast.error(t.admin?.affiliates?.errorLoading || 'Failed to load affiliate', {
            description: err.message || t.admin?.common?.errorOccurred || 'Please try again later',
          })
        } else {
          setError('Failed to load affiliate')
          toast.error(t.admin?.affiliates?.errorLoading || 'Failed to load affiliate', {
            description: t.admin?.common?.errorOccurred || 'Please try again later',
          })
        }
      } finally {
        setLoading(false)
      }
    }

    if (affiliateId) {
      fetchAffiliate()
    }
  }, [affiliateId])

  const handleStatusChange = async (newStatus: 'ACTIVE' | 'INACTIVE') => {
    try {
      setUpdatingStatus(true)
      await adminApi.updateAffiliateStatus(affiliateId, newStatus)
      
      // Update local state
      setAffiliate((prev: any) => ({
        ...prev,
        status: newStatus.toLowerCase(),
      }))
      
      toast.success((t.admin?.affiliates?.updateStatusSuccess || "Affiliate status updated to {status}").replace('{status}', newStatus.toLowerCase()))
    } catch (err) {
      console.error('Error updating affiliate status:', err)
      if (err instanceof ApiError) {
        toast.error(t.admin?.affiliates?.updateStatusFailed || 'Failed to update affiliate status', {
          description: err.message || t.admin?.common?.errorOccurred || 'Please try again later',
        })
      } else {
        toast.error(t.admin?.affiliates?.updateStatusFailed || 'Failed to update affiliate status', {
          description: t.admin?.common?.errorOccurred || 'Please try again later',
        })
      }
    } finally {
      setUpdatingStatus(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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

  const getLevelColor = (bookings: number) => {
    if (bookings >= 30) return 'text-yellow-600'
    if (bookings >= 20) return 'text-gray-600'
    return 'text-amber-600'
  }

  const getPerformanceLevel = (bookings: number) => {
    if (bookings >= 30) return 'Gold'
    if (bookings >= 20) return 'Silver'
    return 'Bronze'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !affiliate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1 rounded-sm">
            <ArrowLeft className="h-4 w-4" />
            {t.admin?.common?.back || "Back"}
          </Button>
        </div>
        <Card className="border-dashed rounded-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.admin?.affiliates?.notFound || "Affiliate not found"}</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {t.admin?.affiliates?.notFoundDesc || "The affiliate you're looking for doesn't exist or has been removed."}
            </p>
            <Link href="/admin/affiliates" className="mt-4">
              <Button>{t.admin?.affiliates?.noFound || "Back to Affiliates"}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const performanceLevel = getPerformanceLevel(affiliate.totalBookings || 0)
  const conversionRate = affiliate.totalClicks > 0 
    ? ((affiliate.totalConversions / affiliate.totalClicks) * 100).toFixed(2) 
    : '0.00'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1 rounded-sm">
            <ArrowLeft className="h-4 w-4" />
            {t.admin?.common?.back || "Back"}
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{t.admin?.affiliates?.details || "Affiliate Details"}</h1>
              <Badge variant="secondary" className={getStatusColor(affiliate.status)}>
                {affiliate.status === 'active' ? (t.admin?.affiliates?.statusActive || "active") : (t.admin?.affiliates?.statusInactive || "inactive")}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{t.admin?.affiliates?.code?.replace('{code}', affiliate.affiliateCode) || `Code: ${affiliate.affiliateCode}`}</p>
          </div>
        </div>

        {/* Status Selector */}
        <div className="flex items-center gap-2">
          <Select
            value={affiliate.status.toUpperCase()}
            onValueChange={(value) => handleStatusChange(value as 'ACTIVE' | 'INACTIVE')}
            disabled={updatingStatus}
          >
            <SelectTrigger className="w-[130px] bg-white">
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
          {updatingStatus && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Affiliate Information */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              {t.admin?.affiliates?.info || "Affiliate Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{affiliate.name}</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{affiliate.email}</p>
              </div>
            </div>
            {affiliate.userPhone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{affiliate.userPhone}</p>
                </div>
              </div>
            )}
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Affiliate Code</p>
              <p className="text-sm font-medium font-mono">{affiliate.affiliateCode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Commission Rate</p>
              <p className="text-sm font-medium">{affiliate.commissionRate}%</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="text-sm font-medium">{formatDateTime(affiliate.createdAt)}</p>
              </div>
            </div>
            {affiliate.expirationDate && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Expiration Date</p>
                  <p className="text-sm font-medium">{formatDate(affiliate.expirationDate)}</p>
                </div>
              </>
            )}
            {affiliate.userId && (
              <Link href={`/admin/users/${affiliate.userId}`}>
                <Button variant="outline" className="w-full mt-2">
                  {t.admin?.affiliates?.viewUser || "View User Account"}
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t.admin?.affiliates?.performance || "Performance"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Level</span>
              </div>
              <span className={`font-semibold ${getLevelColor(affiliate.totalBookings || 0)}`}>
                {performanceLevel}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Clicks</span>
              </div>
              <span className="font-medium">{affiliate.totalClicks || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Conversions</span>
              </div>
              <span className="font-medium">{affiliate.totalConversions || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Conversion Rate</span>
              </div>
              <span className="font-medium">{conversionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Bookings</span>
              </div>
              <span className="font-medium">{affiliate.totalBookings || 0}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Commission</span>
              </div>
              <span className="font-semibold text-green-600">
                {affiliate.totalCommission?.toFixed(2) || '0.00'} €
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Commissions */}
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {t.admin?.affiliates?.recentCommissions || "Recent Commissions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {affiliate.commissions && affiliate.commissions.length > 0 ? (
              <div className="space-y-3">
                {affiliate.commissions.slice(0, 5).map((commission: any) => (
                  <div key={commission.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{commission.offerTitle}</p>
                      <Badge variant="secondary" className="text-xs">
                        {commission.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(commission.bookingDate)}</span>
                      <span className="font-semibold text-green-600">
                        {commission.amount.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                {t.admin?.dashboard?.noBookingsYet || "No commissions yet"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Links */}
      {affiliate.links && affiliate.links.length > 0 && (
        <Card className="rounded-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              {t.admin?.affiliates?.links || "Affiliate Links"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {affiliate.links.map((link: any) => (
                <div key={link.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{link.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MousePointerClick className="h-3.5 w-3.5" />
                        {link.clicks} clicks
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {link.conversions} conversions
                      </span>
                    </div>
                  </div>
                  <code className="text-xs text-muted-foreground break-all">{link.url}</code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

