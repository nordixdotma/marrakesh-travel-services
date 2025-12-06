"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X, Calendar, DollarSign, Tag, Compass } from "lucide-react"
import type { OfferType } from "@/lib/offers-data"
import { cn } from "@/lib/utils"

export interface Filters {
  minPrice?: number | null
  maxPrice?: number | null
  theme?: string
  category?: OfferType | "all"
  availableOn?: string | null
}

interface Props {
  onChange: (filters: Filters) => void
  initial?: Filters
  showCategoryFilter?: boolean
}

export default function SearchFilter({ onChange, initial, showCategoryFilter = true }: Props) {
  const [minPrice, setMinPrice] = useState<number | "">(initial?.minPrice ?? "")
  const [maxPrice, setMaxPrice] = useState<number | "">(initial?.maxPrice ?? "")
  const [theme, setTheme] = useState<string>(initial?.theme ?? "")
  const [category, setCategory] = useState<OfferType | "all">(initial?.category ?? "all")
  const [availableOn, setAvailableOn] = useState<string>(initial?.availableOn ?? "")
  const [isExpanded, setIsExpanded] = useState(false)

  const emit = () => {
    onChange({
      minPrice: minPrice === "" ? null : Number(minPrice),
      maxPrice: maxPrice === "" ? null : Number(maxPrice),
      theme: theme || undefined,
      category,
      availableOn: availableOn || null,
    })
  }

  const reset = () => {
    setMinPrice("")
    setMaxPrice("")
    setTheme("")
    setCategory("all")
    setAvailableOn("")
    onChange({})
  }

  const hasActiveFilters = minPrice !== "" || maxPrice !== "" || theme !== "" || category !== "all" || availableOn !== ""

  const themes = [
    { value: "", label: "All Themes" },
    { value: "adventure", label: "Adventure" },
    { value: "culture", label: "Culture" },
    { value: "relaxation", label: "Relaxation" },
    { value: "photography", label: "Photography" },
    { value: "food", label: "Food & Cuisine" },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "tours", label: "Tours" },
    { value: "excursions", label: "Excursions" },
    { value: "activities", label: "Activities" },
    { value: "packages", label: "Packages" },
  ]

  return (
    <div className="w-full mb-8">
      {/* Compact Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
            "border shadow-sm hover:shadow-md",
            isExpanded
              ? "bg-primary text-white border-primary"
              : "bg-background text-foreground border-border hover:border-primary/50"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center">
              {[minPrice, maxPrice, theme, category !== "all" ? category : "", availableOn].filter(Boolean).length}
            </span>
          )}
        </button>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {theme && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Tag className="w-3 h-3" />
              {themes.find(t => t.value === theme)?.label}
              <button onClick={() => { setTheme(""); emit() }} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(minPrice !== "" || maxPrice !== "") && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <DollarSign className="w-3 h-3" />
              {minPrice !== "" && maxPrice !== "" ? `$${minPrice} - $${maxPrice}` : minPrice !== "" ? `From $${minPrice}` : `Up to $${maxPrice}`}
              <button onClick={() => { setMinPrice(""); setMaxPrice(""); emit() }} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {availableOn && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Calendar className="w-3 h-3" />
              {new Date(availableOn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              <button onClick={() => { setAvailableOn(""); emit() }} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {showCategoryFilter && category !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Compass className="w-3 h-3" />
              {categories.find(c => c.value === category)?.label}
              <button onClick={() => { setCategory("all"); emit() }} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {/* Clear All */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Expanded Filter Panel */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-5 bg-card rounded-xl border border-border shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Price Range */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <DollarSign className="w-3.5 h-3.5" />
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <input
                      type="number"
                      value={minPrice as any}
                      onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                      onBlur={emit}
                      className="w-full pl-7 pr-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Min"
                      min={0}
                    />
                  </div>
                  <span className="text-muted-foreground text-sm">–</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <input
                      type="number"
                      value={maxPrice as any}
                      onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                      onBlur={emit}
                      className="w-full pl-7 pr-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Max"
                      min={0}
                    />
                  </div>
                </div>
              </div>

              {/* Theme */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <Tag className="w-3.5 h-3.5" />
                  Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => { setTheme(e.target.value); setTimeout(emit, 0) }}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  {themes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              {showCategoryFilter && (
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    <Compass className="w-3.5 h-3.5" />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value as any); setTimeout(emit, 0) }}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Available On */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <Calendar className="w-3.5 h-3.5" />
                  Available On
                </label>
                <input
                  type="date"
                  value={availableOn}
                  onChange={(e) => { setAvailableOn(e.target.value); setTimeout(emit, 0) }}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                />
              </div>

              {/* Actions */}
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={emit}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
