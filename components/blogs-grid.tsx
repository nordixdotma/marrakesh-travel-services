"use client"

import Link from "next/link"
import { blogPosts, getTranslatedBlog } from "@/lib/offers-data"
import { useLanguage, useTranslations } from "@/components/language-provider"

export default function BlogsGrid() {
  const posts = blogPosts.slice(0, 3)
  const { language } = useLanguage()
  const t = useTranslations()
  const localeMap: Record<string, string> = {
    en: "en-US",
    fr: "fr-FR",
    es: "es-ES",
  }

  return (
    <section className="w-full py-20 px-2 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
            <span className="text-lg font-semibold">{t.blog?.latestPosts ?? "From the Blog"}</span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.blog?.heroDescription ?? "Latest articles, tips and guides from Marrakesh."}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              className="group block h-full"
            >
              <article className="h-full bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                  <img 
                    src={post.mainImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {getTranslatedBlog(post, language).title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {getTranslatedBlog(post, language).description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-white font-medium text-sm">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.author}
                        </div>
                        <time
                          dateTime={post.publishDate}
                          className="text-xs text-gray-500"
                        >
                          {new Date(post.publishDate).toLocaleDateString(localeMap[language] ?? "en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </div>

                      <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      <span>{t.blog?.readMore ?? t.common?.readMore ?? "Read"}</span>
                      <svg 
                        className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}