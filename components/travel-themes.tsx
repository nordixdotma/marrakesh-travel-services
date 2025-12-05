"use client"

import { useState, useEffect } from "react"
import type { CSSProperties } from "react"

const TravelThemes = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const themes = [
    {
      id: "tours",
      title: "Tours",
      offers: 24,
      buttonText: "Explore Tours",
      link: "/tours",
      bgImage:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: "excursions",
      title: "Excursions",
      offers: 18,
      buttonText: "View Excursions",
      link: "/excursions",
      bgImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: "activities",
      title: "Activities",
      offers: 32,
      buttonText: "Discover Activities",
      link: "/activities",
      bgImage:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: "transfers",
      title: "Transfers",
      offers: 12,
      buttonText: "Book Transfer",
      link: "/transfers",
      bgImage:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: "packages",
      title: "Packages",
      offers: 28,
      buttonText: "View Packages",
      link: "/packages",
      bgImage:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
          grid-template-rows: auto auto !important;
          gap: 12px !important;
          height: auto !important;
        }

        .travel-image-container {
          height: 200px !important;
          border-radius: 0.5rem !important;
          flex: none !important;
        }

        .travel-theme-title {
          font-size: 20px !important;
        }

        .travel-theme-offers {
          font-size: 14px !important;
          margin-bottom: 12px !important;
        }

        .travel-theme-button {
          padding: 10px 18px !important;
          font-size: 13px !important;
        }

        .travel-overlay-content {
          opacity: 1 !important;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%) !important;
        }
      }

      /* Medium screens (md) */
      @media (min-width: 768px) {
        .travel-gallery-container {
          height: 450px !important;
          display: flex !important;
        }

        .travel-image-container {
          border-radius: 0.5rem !important;
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
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--color-neutral-50)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>
            Our Travel Themes
          </h2>
        </div>

        <div className="travel-gallery-container" style={styles.galleryContainer as CSSProperties}>
          {themes.map((theme, index) => (
            <div
              key={theme.id}
              className="travel-image-container"
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
                  <div style={styles.contentWrapper as CSSProperties}>
                    <h3 className="travel-theme-title" style={styles.title as CSSProperties}>
                      {theme.title}
                    </h3>
                    <p className="travel-theme-offers" style={styles.offers as CSSProperties}>
                      {theme.offers} Offers Available
                    </p>
                    <a
                      href={theme.link}
                      style={styles.button as CSSProperties}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "linear-gradient(to right, #fac360, #fce97c)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--color-primary)"
                      }}
                      className="travel-theme-button"
                    >
                      {theme.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  galleryContainer: {
    display: "flex",
    width: "100%",
    height: "500px",
    overflow: "hidden",
    borderRadius: "12px",
    gap: "12px",
    backgroundColor: "#f0f2f5",
  } as CSSProperties,
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    minWidth: "100px",
    transition: "all 0.5s ease",
    borderRadius: "0.5rem",
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
  } as CSSProperties,
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s ease",
    borderRadius: "0.5rem",
  } as CSSProperties,
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transform: "translateY(-20px)",
    padding: "0 20px",
    textAlign: "center",
  } as CSSProperties,
  title: {
    color: "white",
    margin: "0 0 8px 0",
    fontSize: "28px",
    fontWeight: "bold",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
  } as CSSProperties,
  offers: {
    color: "rgba(255,255,255,0.9)",
    margin: "0 0 16px 0",
    fontSize: "15px",
    fontWeight: "500",
  } as CSSProperties,
  button: {
    backgroundColor: "var(--color-primary)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
    textDecoration: "none",
    display: "inline-block",
  } as CSSProperties,
}

export default TravelThemes
