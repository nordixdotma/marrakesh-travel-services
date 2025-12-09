"use client"

import { useState, useEffect, useMemo } from "react"
import type { CSSProperties } from "react"
import { toursOffers, excursionsOffers, activitiesOffers, packagesOffers } from "@/lib/offers-data"
import { MapPin, Compass, Zap, Car, Package, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const TravelThemes = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useLanguage()

  // Calculate offer counts dynamically from offers-data
  const offerCounts = useMemo(() => ({
    tours: toursOffers.length,
    excursions: excursionsOffers.length,
    activities: activitiesOffers.length,
    transfers: 0, // No transfers in offers-data
    packages: packagesOffers.length,
  }), [])

  const themes = [
    {
      id: "tours",
      title: t.travelThemes.tours.title,
      subtitle: t.travelThemes.tours.subtitle,
      offers: offerCounts.tours,
      buttonText: t.travelThemes.tours.buttonText,
      link: "/tours",
      icon: MapPin,
      bgImage:
        "https://images.unsplash.com/photo-1615482475488-8f1ff9addba5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "excursions",
      title: t.travelThemes.excursions.title,
      subtitle: t.travelThemes.excursions.subtitle,
      offers: offerCounts.excursions,
      buttonText: t.travelThemes.excursions.buttonText,
      link: "/excursions",
      icon: Compass,
      bgImage:
        "https://images.unsplash.com/photo-1615482475488-8f1ff9addba5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "activities",
      title: t.travelThemes.activities.title,
      subtitle: t.travelThemes.activities.subtitle,
      offers: offerCounts.activities,
      buttonText: t.travelThemes.activities.buttonText,
      link: "/activities",
      icon: Zap,
      bgImage:
        "https://images.unsplash.com/photo-1615482475488-8f1ff9addba5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "transfers",
      title: t.travelThemes.transfers.title,
      subtitle: t.travelThemes.transfers.subtitle,
      offers: offerCounts.transfers,
      buttonText: t.travelThemes.transfers.buttonText,
      link: "/transfers",
      icon: Car,
      bgImage:
        "https://images.unsplash.com/photo-1615482475488-8f1ff9addba5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "packages",
      title: t.travelThemes.packages.title,
      subtitle: t.travelThemes.packages.subtitle,
      offers: offerCounts.packages,
      buttonText: t.travelThemes.packages.buttonText,
      link: "/packages",
      icon: Package,
      bgImage:
        "https://images.unsplash.com/photo-1615482475488-8f1ff9addba5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  const handleClick = (index: number) => {
    setActiveIndex(index)
  }

  // Apply media queries when component mounts
  useEffect(() => {
    const styleElement = document.createElement("style")

    styleElement.innerHTML = `
      /* Mobile styles */
      @media (max-width: 767px) {
        .travel-gallery-container {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          grid-template-rows: auto auto auto !important;
          gap: 10px !important;
          height: auto !important;
          justify-items: center !important;
        }
        
        .travel-gallery-container .travel-image-container {
          width: 100% !important;
        }
        
        .travel-gallery-container .travel-image-container:last-child {
          grid-column: 1 / -1 !important;
          max-width: calc(50% - 5px) !important;
        }

        .travel-image-container {
          height: 200px !important;
          border-radius: 12px !important;
          flex: none !important;
        }

        .travel-theme-icon {
          width: 32px !important;
          height: 32px !important;
          border-radius: 8px !important;
          top: 12px !important;
          left: 12px !important;
        }

        .travel-theme-icon svg {
          width: 16px !important;
          height: 16px !important;
        }

        .travel-theme-title {
          font-size: 16px !important;
        }

        .travel-theme-subtitle {
          font-size: 10px !important;
        }

        .travel-theme-offers {
          padding: 4px 8px !important;
          top: 12px !important;
          right: 12px !important;
          gap: 3px !important;
        }

        .travel-theme-button {
          padding: 6px 12px !important;
          font-size: 11px !important;
        }

        .travel-overlay-content {
          opacity: 1 !important;
          padding: 12px !important;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%) !important;
        }
      }

      /* Medium screens (md) */
      @media (min-width: 768px) {
        .travel-gallery-container {
          height: 480px !important;
          display: flex !important;
        }

        .travel-image-container {
          border-radius: 12px !important;
        }

        .travel-image-container:hover img {
          transform: scale(1.05);
        }
      }
    `

    document.head.appendChild(styleElement)

    return () => {
      if (styleElement) {
        styleElement.remove()
      }
    }
  }, [])

  return (
    <section className="w-full py-16 px-2 md:px-8" style={{ backgroundColor: "var(--color-neutral-50)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
            <span className="text-lg font-semibold">{t.travelThemes.sectionTitle}</span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.travelThemes.sectionDescription}
          </p>
        </div>

        <div className="travel-gallery-container" style={styles.galleryContainer as CSSProperties}>
          {themes.map((theme, index) => {
            const IconComponent = theme.icon
            return (
              <div
                key={theme.id}
                className="travel-image-container travel-theme-item"
                style={
                  {
                    ...styles.imageContainer,
                    flex: index === activeIndex ? 5 : 1,
                  } as CSSProperties
                }
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleClick(index)}
              >
                <div style={styles.imageWrapper as CSSProperties}>
                  <img
                    src={theme.bgImage || "/placeholder.svg"}
                    alt={theme.title}
                    style={styles.image as CSSProperties}
                  />
                  <div
                    className="travel-overlay-content"
                    style={
                      {
                        ...styles.overlay,
                        opacity: index === activeIndex ? 1 : 0,
                      } as CSSProperties
                    }
                  >
                    {/* Icon Badge - Top Left */}
                    <div className="travel-theme-icon" style={styles.iconBadge as CSSProperties}>
                      <IconComponent size={20} strokeWidth={2} />
                    </div>
                    
                    {/* Offers Count Badge - Top Right */}
                    <div className="travel-theme-offers" style={styles.offersBadge as CSSProperties}>
                      <span style={styles.offersNumber as CSSProperties}>{theme.offers}</span>
                      <span style={styles.offersText as CSSProperties}>
                        {t.travelThemes.offers}
                      </span>
                    </div>
                    
                    {/* Center Content - Title & CTA */}
                    <div style={styles.contentWrapper as CSSProperties}>
                      <h3 className="travel-theme-title" style={styles.title as CSSProperties}>
                        {theme.title}
                      </h3>
                      <p className="travel-theme-subtitle" style={styles.subtitle as CSSProperties}>
                        {theme.subtitle}
                      </p>
                      
                      {/* CTA Button */}
                      <a
                        href={theme.link}
                        style={styles.button as CSSProperties}
                        className="travel-theme-button travel-theme-cta group"
                      >
                        <span>{theme.buttonText}</span>
                        <ExternalLink size={14} className="ml-2 transition-transform group-hover:scale-110" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        .travel-theme-cta {
          position: relative;
          overflow: hidden;
          background: var(--color-primary) !important;
          color: white !important;
          border: none;
          padding: 10px 20px !important;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600 !important;
          font-size: 13px !important;
          text-decoration: none;
          display: inline-flex !important;
          align-items: center;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .travel-theme-cta::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, #fac360, #fce97c);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .travel-theme-cta:hover::before {
          transform: scaleX(1);
        }

        .travel-theme-cta:hover {
          color: var(--color-primary) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .travel-theme-item:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  galleryContainer: {
    display: "flex",
    width: "100%",
    height: "480px",
    overflow: "hidden",
    borderRadius: "16px",
    gap: "10px",
    backgroundColor: "transparent",
  } as CSSProperties,
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    minWidth: "80px",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "12px",
  } as CSSProperties,
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  } as CSSProperties,
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.5s ease",
  } as CSSProperties,
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.7) 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.4s ease",
    borderRadius: "12px",
    padding: "16px",
  } as CSSProperties,
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "6px",
  } as CSSProperties,
  iconBadge: {
    position: "absolute",
    top: "16px",
    left: "16px",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
  } as CSSProperties,
  title: {
    color: "#ffffff",
    margin: "0",
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    textShadow: "0 2px 8px rgba(0,0,0,0.4)",
  } as CSSProperties,
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    margin: "0",
    fontSize: "13px",
    fontWeight: "500",
    letterSpacing: "0.02em",
    textShadow: "0 1px 4px rgba(0,0,0,0.3)",
  } as CSSProperties,
  offersBadge: {
    position: "absolute",
    top: "16px",
    right: "16px",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "6px 12px",
    borderRadius: "20px",
    backgroundColor: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
  } as CSSProperties,
  offersNumber: {
    color: "white",
    fontSize: "14px",
    fontWeight: "700",
  } as CSSProperties,
  offersText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
  } as CSSProperties,
  button: {
    backgroundColor: "var(--color-primary)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4px",
  } as CSSProperties,
}

export default TravelThemes
