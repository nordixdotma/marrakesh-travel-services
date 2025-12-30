"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { FileText, Plus, Search, Eye, Pencil, Trash2, Loader2, Calendar, User, Image as ImageIcon, Upload } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { adminApi, uploadApi, type ApiError } from "@/lib/api"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"

interface BlogPost {
  id: string
  title: Record<string, string>
  content: Record<string, string>
  author: string
  main_image: string | null
  publish_date: string | null
  is_published: boolean
  created_at: string
  updated_at: string
  thumbnail_images: Array<{
    id: string
    image_url: string
    image_order: number
  }>
}

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingMainImage, setUploadingMainImage] = useState(false)
  const [uploadingThumbnails, setUploadingThumbnails] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: { fr: '', en: '', es: '' } as Record<string, string>,
    content: { fr: '', en: '', es: '' } as Record<string, string>,
    description: { fr: '', en: '', es: '' } as Record<string, string>,
    author: '',
    mainImage: '',
    thumbnailImages: [] as string[],
    publishDate: '',
    isPublished: false,
  })

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await adminApi.getAllBlogPosts()
      setBlogPosts(response.blogPosts)
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.message || 'Failed to load blog posts')
      console.error('Error fetching blog posts:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts
    const query = searchQuery.toLowerCase()
    return blogPosts.filter((post) => {
      const titleFr = post.title.fr?.toLowerCase() || ''
      const titleEn = post.title.en?.toLowerCase() || ''
      const titleEs = post.title.es?.toLowerCase() || ''
      const author = post.author.toLowerCase()
      return titleFr.includes(query) || titleEn.includes(query) || titleEs.includes(query) || author.includes(query)
    })
  }, [searchQuery, blogPosts])

  const handleCreate = () => {
    setFormData({
      title: { fr: '', en: '', es: '' },
      content: { fr: '', en: '', es: '' },
      description: { fr: '', en: '', es: '' },
      author: '',
      mainImage: '',
      thumbnailImages: [],
      publishDate: new Date().toISOString().split('T')[0],
      isPublished: false,
    })
    setSelectedPost(null)
    setShowCreateDialog(true)
  }

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title || { fr: '', en: '', es: '' },
      content: post.content || { fr: '', en: '', es: '' },
      description: { fr: '', en: '', es: '' }, // Extract from content if needed
      author: post.author,
      mainImage: post.main_image || '',
      thumbnailImages: post.thumbnail_images.map(img => img.image_url),
      publishDate: post.publish_date ? new Date(post.publish_date).toISOString().split('T')[0] : '',
      isPublished: post.is_published,
    })
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return

    try {
      setIsDeleting(true)
      await adminApi.deleteBlogPost(postToDelete)
      toast.success('Blog post deleted successfully')
      fetchBlogPosts()
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    } catch (err) {
      const apiError = err as ApiError
      toast.error(apiError.message || 'Failed to delete blog post')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    try {
      setUploadingMainImage(true)
      const url = await uploadApi.uploadFile(file)
      setFormData(prev => ({ ...prev, mainImage: url }))
      toast.success('Image uploaded successfully')
    } catch (err) {
      const apiError = err as ApiError
      console.error('Upload error:', err)
      toast.error(apiError.message || 'Failed to upload image')
    } finally {
      setUploadingMainImage(false)
      // Reset input so same file can be selected again
      e.target.value = ''
    }
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    if (imageFiles.length === 0) {
      toast.error('Please select image files')
      return
    }

    try {
      setUploadingThumbnails(true)
      const urls = await uploadApi.uploadFiles(imageFiles)
      setFormData(prev => ({
        ...prev,
        thumbnailImages: [...prev.thumbnailImages, ...urls]
      }))
      toast.success(`${urls.length} image(s) uploaded successfully`)
    } catch (err) {
      const apiError = err as ApiError
      console.error('Upload error:', err)
      toast.error(apiError.message || 'Failed to upload images')
    } finally {
      setUploadingThumbnails(false)
      // Reset input so same file can be selected again
      e.target.value = ''
    }
  }

  const handleRemoveThumbnail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      thumbnailImages: prev.thumbnailImages.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title.fr || !formData.content.fr || !formData.author) {
      toast.error('Please fill in all required fields (at least in French)')
      return
    }

    try {
      setIsSubmitting(true)

      const data = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        mainImage: formData.mainImage || undefined,
        thumbnailImages: formData.thumbnailImages.length > 0 ? formData.thumbnailImages : undefined,
        publishDate: formData.publishDate || undefined,
        isPublished: formData.isPublished,
      }

      if (selectedPost) {
        await adminApi.updateBlogPost(selectedPost.id, data)
        toast.success('Blog post updated successfully')
      } else {
        await adminApi.createBlogPost(data)
        toast.success('Blog post created successfully')
      }

      setShowCreateDialog(false)
      setShowEditDialog(false)
      setSelectedPost(null)
      fetchBlogPosts()
    } catch (err) {
      const apiError = err as ApiError
      toast.error(apiError.message || 'Failed to save blog post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleView = (post: BlogPost) => {
    window.open(`/blog/${post.id}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog articles</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus size={20} />
          Create Blog Post
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search blog posts by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              {post.main_image ? (
                <img
                  src={post.main_image}
                  alt={post.title.fr || post.title.en || 'Blog post'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder.jpg'
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              {!post.is_published && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Draft
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {post.title.fr || post.title.en || post.title.es || 'Untitled'}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                {post.publish_date && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(post.publish_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(post)}
                  className="flex-1"
                >
                  <Eye size={16} className="mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(post)}
                  className="flex-1"
                >
                  <Pencil size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(post.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && !isLoading && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No blog posts found matching your search' : 'No blog posts yet. Create your first one!'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={showCreateDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowCreateDialog(false)
          setShowEditDialog(false)
          setSelectedPost(null)
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPost ? 'Edit Blog Post' : 'Create Blog Post'}</DialogTitle>
            <DialogDescription>
              {selectedPost ? 'Update the blog post details' : 'Create a new blog post with multilingual support'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Author */}
            <div>
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Author name"
              />
            </div>

            {/* Languages Tabs */}
            {LANGUAGES.map((lang) => (
              <div key={lang.code} className="space-y-4 border rounded-lg p-4">
                <h3 className="font-semibold">{lang.label}</h3>
                
                <div>
                  <Label htmlFor={`title-${lang.code}`}>
                    Title {lang.code === 'fr' && '*'}
                  </Label>
                  <Input
                    id={`title-${lang.code}`}
                    value={formData.title[lang.code] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, [lang.code]: e.target.value }
                    }))}
                    placeholder={`Title in ${lang.label}`}
                  />
                </div>

                <div>
                  <Label htmlFor={`content-${lang.code}`}>
                    Content {lang.code === 'fr' && '*'}
                  </Label>
                  <Textarea
                    id={`content-${lang.code}`}
                    value={formData.content[lang.code] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      content: { ...prev.content, [lang.code]: e.target.value }
                    }))}
                    placeholder={`Content in ${lang.label}`}
                    rows={8}
                    className="resize-none"
                  />
                </div>
              </div>
            ))}

            {/* Main Image */}
            <div>
              <Label>Main Image</Label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <Input
                    value={formData.mainImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, mainImage: e.target.value }))}
                    placeholder="Image URL"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="hidden"
                    id="main-image-upload"
                    disabled={uploadingMainImage}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingMainImage}
                    onClick={() => document.getElementById('main-image-upload')?.click()}
                  >
                    {uploadingMainImage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Upload
                  </Button>
                </div>
              </div>
              {formData.mainImage && (
                <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden border bg-muted">
                  <img
                    src={formData.mainImage}
                    alt="Main image preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder.jpg'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div>
              <Label>Thumbnail Images</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    id="thumbnail-upload"
                    disabled={uploadingThumbnails}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingThumbnails}
                    onClick={() => document.getElementById('thumbnail-upload')?.click()}
                  >
                    {uploadingThumbnails ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Upload Thumbnails
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {formData.thumbnailImages.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border bg-muted group">
                      <img
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/placeholder.jpg'
                        }}
                      />
                      <button
                        onClick={() => handleRemoveThumbnail(index)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white z-10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Publish Date */}
            <div>
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input
                id="publishDate"
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
              />
            </div>

            {/* Published Status */}
            <div className="flex items-center justify-between">
              <Label htmlFor="isPublished">Published</Label>
              <Switch
                id="isPublished"
                checked={formData.isPublished}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublished: checked }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateDialog(false)
                setShowEditDialog(false)
                setSelectedPost(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

