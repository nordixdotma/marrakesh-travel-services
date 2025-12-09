"use client"
import { useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Hero() {
  const sliderRef = useRef<HTMLUListElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { t } = useLanguage()

  const services = [
    {
      title: t.hero.tours.title,
      description: t.hero.tours.description,
      image:
        "https://images.unsplash.com/photo-1705765276710-51b6362f9ea7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: t.hero.tours.buttonText,
      buttonLink: "/tours",
    },
    {
      title: t.hero.excursions.title,
      description: t.hero.excursions.description,
      image:
        "https://images.unsplash.com/photo-1546936703-c36c420d4e5c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: t.hero.excursions.buttonText,
      buttonLink: "/excursions",
    },
    {
      title: t.hero.activities.title,
      description: t.hero.activities.description,
      image:
        "https://images.unsplash.com/photo-1627240330670-2a18ff1f6b82?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: t.hero.activities.buttonText,
      buttonLink: "/activities",
    },
    {
      title: t.hero.packages.title,
      description: t.hero.packages.description,
      image: "https://images.unsplash.com/photo-1624804823268-7d5454caa8c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: t.hero.packages.buttonText,
      buttonLink: "/packages",
    },
    {
      title: t.hero.transfers.title,
      description: t.hero.transfers.description,
      image:
        "https://i.pinimg.com/736x/0a/5e/c8/0a5ec8aac838b3fad4fbb4985a45972f.jpg",
      buttonText: t.hero.transfers.buttonText,
      buttonLink: "/transfers",
    },
  ]

  const resetAutoRotate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      if (!sliderRef.current) return
      const items = sliderRef.current.querySelectorAll(".carousel-item")
      sliderRef.current.appendChild(items[0])
    }, 4000)
  }, [])

  const handleNavigation = (direction: "prev" | "next") => {
    if (!sliderRef.current) return

    const items = sliderRef.current.querySelectorAll(".carousel-item")

    if (direction === "next") {
      sliderRef.current.appendChild(items[0])
    } else {
      sliderRef.current.prepend(items[items.length - 1])
    }
    
    // Reset the auto-rotate timer when user manually navigates
    resetAutoRotate()
  }

  const handleThumbnailClick = (clickedIndex: number) => {
    if (!sliderRef.current) return

    const items = sliderRef.current.querySelectorAll(".carousel-item")
    const itemsArray = Array.from(items)
    
    // Find the current active item (index 1 is the visible one)
    // We need to move items until the clicked one is at position 1
    const clicksNeeded = clickedIndex - 1
    
    if (clicksNeeded > 0) {
      for (let i = 0; i < clicksNeeded; i++) {
        const firstItem = sliderRef.current.querySelector(".carousel-item")
        if (firstItem) {
          sliderRef.current.appendChild(firstItem)
        }
      }
    }
    
    // Reset the auto-rotate timer when user clicks thumbnail
    resetAutoRotate()
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.closest(".next-btn")) {
        handleNavigation("next")
      } else if (target.closest(".prev-btn")) {
        handleNavigation("prev")
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    resetAutoRotate()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [resetAutoRotate])

  return (
    <main className="hero-carousel" style={{ height: "100dvh", minHeight: "100dvh" }}>
      <ul className="slider" ref={sliderRef}>
        {services.map((service, index) => (
          <li 
            key={index} 
            className="carousel-item" 
            style={{ backgroundImage: `url(${service.image})` }}
            onClick={() => handleThumbnailClick(index)}
          >
            <div className="content">
              <h2 className="title font-sans">{service.title}</h2>
              <p className="description">{service.description}</p>
              <div className="hero-button-wrapper">
                <a
                  href={service.buttonLink}
                  className="hero-button inline-flex items-center px-6 py-2.5 rounded-md text-sm font-medium"
                >
                  {service.buttonText}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <a
        href="https://www.tripadvisor.com/Attraction_Review-g293734-d8514036-Reviews-Marrakesh_Travel_Services-Marrakech_Marrakech_Safi.html"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 z-10 hover:scale-110 transition-transform duration-300"
        aria-label="Visit our TripAdvisor page"
      >
        <img
          src="https://morthai.vercel.app/certif.png"
          alt="TripAdvisor"
          className="w-10 h-10 md:w-14 md:h-14 rounded-sm"
        />
      </a>

      <nav className="nav">
        <button className="nav-btn prev-btn" aria-label="Previous slide">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="nav-btn next-btn" aria-label="Next slide">
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    </main>
  )
}
