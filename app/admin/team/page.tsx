"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Shield,
  Mail,
  Calendar,
  Loader2,
  AlertCircle,
  Check,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { adminApi, type ApiError } from "@/lib/api"
import { toast } from "sonner"

interface Permission {
  page: string
  can_read: boolean
  can_write: boolean
  can_delete: boolean
}

interface TeamMember {
  id: string
  username: string
  email: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR'
  last_login: string | null
  created_at: string
  permissions?: Permission[]
}

const AVAILABLE_PAGES = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tours', label: 'Tours' },
  { id: 'excursions', label: 'Excursions' },
  { id: 'activities', label: 'Activities' },
  { id: 'transfers', label: 'Transfers' },
  { id: 'packages', label: 'Packages' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'payments', label: 'Payments' },
  { id: 'users', label: 'Users' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'affiliates', label: 'Affiliates' },
  { id: 'promo-codes', label: 'Promo Codes' },
  { id: 'team', label: 'Team' },
]

export default function AdminTeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    permissions: {} as Record<string, { can_read: boolean; can_write: boolean; can_delete: boolean }>,
  })

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await adminApi.getTeamMembers()
      setTeamMembers(response.teamMembers || [])
    } catch (err: any) {
      console.error('Error fetching team members:', err)
      const apiError = err as ApiError
      setError(apiError.message || 'Failed to load team members')
      if (apiError.status === 403) {
        toast.error('Access Denied', {
          description: 'Only SUPER_ADMIN can access team management',
        })
      } else {
        toast.error('Failed to load team members', {
          description: apiError.message || 'Please try again later',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const filteredMembers = useMemo(() => {
    return teamMembers
      .filter((member) => {
        if (!searchQuery.trim()) return true
        const query = searchQuery.toLowerCase()
        return (
          member.username.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [searchQuery, teamMembers])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPermissionSummary = (permissions?: Permission[]) => {
    if (!permissions || permissions.length === 0) return "No permissions"
    const pagesWithRead = permissions.filter(p => p.can_read).length
    return `${pagesWithRead} page${pagesWithRead !== 1 ? 's' : ''} with access`
  }

  const handleCreate = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      permissions: {},
    })
    setShowCreateDialog(true)
  }

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member)
    // Convert permissions array to object
    const permissionsObj: Record<string, { can_read: boolean; can_write: boolean; can_delete: boolean }> = {}
    if (member.permissions) {
      member.permissions.forEach(perm => {
        permissionsObj[perm.page] = {
          can_read: perm.can_read,
          can_write: perm.can_write,
          can_delete: perm.can_delete,
        }
      })
    }
    setFormData({
      username: member.username,
      email: member.email,
      password: "",
      permissions: permissionsObj,
    })
    setShowEditDialog(true)
  }

  const handleDelete = (member: TeamMember) => {
    setSelectedMember(member)
    setShowDeleteDialog(true)
  }

  const updatePermission = (page: string, field: 'can_read' | 'can_write' | 'can_delete', value: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [page]: {
          ...prev.permissions[page],
          [field]: value,
          // If can_read is false, disable write and delete
          can_read: field === 'can_read' ? value : (prev.permissions[page]?.can_read || false),
          can_write: field === 'can_read' && !value ? false : (field === 'can_write' ? value : (prev.permissions[page]?.can_write || false)),
          can_delete: field === 'can_read' && !value ? false : (field === 'can_delete' ? value : (prev.permissions[page]?.can_delete || false)),
        },
      },
    }))
  }

  const handleSubmitCreate = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Validation Error', {
        description: 'Please fill in all required fields',
      })
      return
    }

    if (formData.password.length < 6) {
      toast.error('Validation Error', {
        description: 'Password must be at least 6 characters long',
      })
      return
    }

    try {
      setIsSubmitting(true)
      // Convert permissions object to array
      const permissionsArray = Object.entries(formData.permissions)
        .filter(([_, perm]) => perm.can_read) // Only include pages with read access
        .map(([page, perm]) => ({
          page,
          can_read: perm.can_read,
          can_write: perm.can_write || false,
          can_delete: perm.can_delete || false,
        }))

      await adminApi.createTeamMember({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        permissions: permissionsArray,
      })
      toast.success('Team member created successfully')
      setShowCreateDialog(false)
      fetchTeamMembers()
      setFormData({
        username: "",
        email: "",
        password: "",
        permissions: {},
      })
    } catch (err: any) {
      const apiError = err as ApiError
      toast.error('Failed to create team member', {
        description: apiError.message || 'Please try again',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitEdit = async () => {
    if (!selectedMember) return

    if (!formData.username || !formData.email) {
      toast.error('Validation Error', {
        description: 'Username and email are required',
      })
      return
    }

    if (formData.password && formData.password.length < 6) {
      toast.error('Validation Error', {
        description: 'Password must be at least 6 characters long',
      })
      return
    }

    try {
      setIsSubmitting(true)
      // Convert permissions object to array
      const permissionsArray = Object.entries(formData.permissions)
        .filter(([_, perm]) => perm.can_read) // Only include pages with read access
        .map(([page, perm]) => ({
          page,
          can_read: perm.can_read,
          can_write: perm.can_write || false,
          can_delete: perm.can_delete || false,
        }))

      const updateData: any = {
        username: formData.username,
        email: formData.email,
        permissions: permissionsArray,
      }
      if (formData.password) {
        updateData.password = formData.password
      }
      await adminApi.updateTeamMember(selectedMember.id, updateData)
      toast.success('Team member updated successfully')
      setShowEditDialog(false)
      setSelectedMember(null)
      fetchTeamMembers()
    } catch (err: any) {
      const apiError = err as ApiError
      toast.error('Failed to update team member', {
        description: apiError.message || 'Please try again',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!selectedMember) return

    try {
      setIsSubmitting(true)
      await adminApi.deleteTeamMember(selectedMember.id)
      toast.success('Team member deleted successfully')
      setShowDeleteDialog(false)
      setSelectedMember(null)
      fetchTeamMembers()
    } catch (err: any) {
      const apiError = err as ApiError
      toast.error('Failed to delete team member', {
        description: apiError.message || 'Please try again',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error && error.includes('Access denied')) {
    return (
      <Card className="border-destructive/50 bg-destructive/10 rounded-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Only SUPER_ADMIN can access team management. Please contact your administrator.
          </p>
        </CardContent>
      </Card>
    )
  }

  const renderPermissionsForm = () => (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      <div className="text-sm font-medium mb-2">Page Permissions</div>
      <div className="space-y-3">
        {AVAILABLE_PAGES.map((page) => {
          const perm = formData.permissions[page.id] || { can_read: false, can_write: false, can_delete: false }
          return (
            <Card key={page.id} className="p-3 border">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-medium cursor-pointer" htmlFor={`read-${page.id}`}>
                  {page.label}
                </Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`read-${page.id}`}
                    checked={perm.can_read}
                    onCheckedChange={(checked) => updatePermission(page.id, 'can_read', checked as boolean)}
                  />
                  <Label htmlFor={`read-${page.id}`} className="text-xs text-muted-foreground cursor-pointer">
                    Read
                  </Label>
                </div>
              </div>
              {perm.can_read && (
                <div className="flex gap-4 ml-6 mt-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`write-${page.id}`}
                      checked={perm.can_write}
                      onCheckedChange={(checked) => updatePermission(page.id, 'can_write', checked as boolean)}
                    />
                    <Label htmlFor={`write-${page.id}`} className="text-sm text-muted-foreground cursor-pointer">
                      Write
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`delete-${page.id}`}
                      checked={perm.can_delete}
                      onCheckedChange={(checked) => updatePermission(page.id, 'can_delete', checked as boolean)}
                    />
                    <Label htmlFor={`delete-${page.id}`} className="text-sm text-muted-foreground cursor-pointer">
                      Delete
                    </Label>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your admin team members and their page permissions
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                {teamMembers.length} total member{teamMembers.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? "No members found matching your search" : "No team members yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{member.username}</h3>
                          {member.role === 'SUPER_ADMIN' && (
                            <Badge variant="destructive">SUPER ADMIN</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Joined {formatDate(member.created_at)}
                          </div>
                          <div className="text-xs">
                            {getPermissionSummary(member.permissions)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(member)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Create a new admin account and select page permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password (min 6 characters)"
              />
            </div>
            {renderPermissionsForm()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitCreate} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update team member information and page permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username *</Label>
              <Input
                id="edit-username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password">New Password (leave empty to keep current)</Label>
              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter new password (min 6 characters)"
              />
            </div>
            {renderPermissionsForm()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitEdit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedMember?.username}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
