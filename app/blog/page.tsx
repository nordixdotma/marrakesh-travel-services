"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { blogPosts, getTranslatedBlog } from "@/lib/offers-data"

export default function BlogPage() {
  const { t, language } = useLanguage()

  const translatedPosts = blogPosts.map((post) => getTranslatedBlog(post, language))

  return (
    <main className="w-full">
      <Header />
      <PageHero 
        title={t.blog.pageTitle} 
        backgroundImage="https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      />

      <section className="py-16 md:py-24 bg-linear-to-b from-background to-muted/20">
        <Container className="max-w-7xl mx-auto px-2 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-trajan-pro">
              {t.blog.latestPosts}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.blog.heroDescription}
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-12 md:space-y-16">
            {translatedPosts.map((post, index) => {
              const isImageLeft = index % 2 === 0

              return (
                <article 
                  key={post.id}
                  className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg group">
                      <img
                        src={post.mainImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 space-y-4">
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary" />
                        <span>
                          {new Date(post.publishDate).toLocaleDateString(
                            language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "en-US",
                            { month: "long", day: "numeric", year: "numeric" }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-primary" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground font-trajan-pro leading-tight">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>

                    {/* CTA Button */}
                    <Link href={`/blog/${post.id}`}>
                      <Button 
                        className="mt-4 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 group cursor-pointer"
                      >
                        {t.blog.readMore}
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  )
}
