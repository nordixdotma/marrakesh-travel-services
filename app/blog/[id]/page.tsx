"use client"

import { useState, use, useMemo } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, ChevronLeft, ChevronRight, Play, User, ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { getBlogById, getTranslatedBlog, blogPosts } from "@/lib/offers-data"
import { useLanguage } from "@/components/language-provider"

interface BlogDetailPageProps {
  params: Promise<{ id: string }>
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = use(params)
  const rawPost = getBlogById(resolvedParams.id)
  const { t, language } = useLanguage()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  if (!rawPost) {
    notFound()
  }

  // Get translated blog based on current language
  const post = useMemo(() => getTranslatedBlog(rawPost, language), [rawPost, language])

  const allImages = [post.mainImage, ...post.thumbnailImages]

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
    setShowVideo(false)
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
    setShowVideo(false)
  }

  // Get other blog posts for related articles
  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2)

  return (
    <main className="w-full">
      <Header />
      <PageHero title={post.title} backgroundImage={post.mainImage} />

      <section className="py-10 bg-gray-50">
        <Container className="max-w-4xl px-2 md:px-8">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>

          {/* Image Gallery */}
          <div className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden mb-8">
            {/* Main Display */}
            <div className="relative aspect-16/10 bg-muted">
              <img
                src={allImages[selectedImageIndex] || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 transition-all shadow-lg hover:scale-105"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 transition-all shadow-lg hover:scale-105"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-muted/30">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index)
                      setShowVideo(false)
                    }}
                    className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ring-2 ring-offset-2 ring-offset-background ${
                      selectedImageIndex === index && !showVideo
                        ? "ring-primary scale-105"
                        : "ring-transparent hover:ring-muted-foreground/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Article Meta */}
          <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Calendar size={14} className="text-primary" />
              </div>
              <span>
                {new Date(post.publishDate).toLocaleDateString(
                  language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <User size={14} className="text-primary" />
              </div>
              <span>{post.author}</span>
            </div>
          </div>

          {/* Article Content */}
          <article className="bg-background rounded-xl p-6 md:p-8 border border-border/50 shadow-sm mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-trajan-pro">
              {post.title}
            </h1>
            
            <div className="prose prose-gray max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Related Articles */}
          {otherPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-foreground mb-6 font-trajan-pro">
                {language === "fr" ? "Articles Connexes" : language === "es" ? "Artículos Relacionados" : "Related Articles"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.map((relatedPost) => {
                  const translatedRelated = getTranslatedBlog(relatedPost, language)
                  return (
                    <Link 
                      key={relatedPost.id} 
                      href={`/blog/${relatedPost.id}`}
                      className="group"
                    >
                      <div className="bg-background rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={relatedPost.mainImage}
                            alt={translatedRelated.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {translatedRelated.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {translatedRelated.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </Container>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  )
}
