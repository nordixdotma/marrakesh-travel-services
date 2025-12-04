"use client"
import { useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const services = [
  {
    title: "Home",
    description:
      "Welcome to Marrakesh Travel Services, your premier destination for authentic Moroccan travel experiences and luxury transportation solutions.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Explore",
    buttonLink: "#contact",
  },
  {
    title: "Tours",
    description:
      "Discover the beauty of Morocco through our expertly curated tours. From desert adventures to cultural experiences, explore iconic landmarks with knowledgeable local guides.",
    image:
      "https://images.unsplash.com/photo-1664346288114-ee72907d2c52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "View Tours",
    buttonLink: "#contact",
  },
  {
    title: "Excursions",
    description:
      "Experience thrilling day excursions to Morocco's most scenic destinations. Our excursions offer the perfect blend of adventure, culture, and natural beauty.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Book Excursion",
    buttonLink: "#contact",
  },
  {
    title: "Activities",
    description:
      "Engage in unforgettable activities tailored to your interests. From cultural workshops to outdoor adventures, find the perfect activity for your Moroccan getaway.",
    image:
      "https://images.unsplash.com/photo-1603982449700-534948b9e408?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Discover Activities",
    buttonLink: "#contact",
  },
  {
    title: "Packages",
    description:
      "Explore our comprehensive travel packages designed for every budget and preference. All-inclusive packages with accommodations, transportation, and curated experiences.",
    image: "https://images.unsplash.com/photo-1585089858717-f4378c2031d8?q=80&w=2069&auto=format&fit=crop",
    buttonText: "View Packages",
    buttonLink: "#contact",
  },
  {
    title: "Transfers",
    description:
      "Reliable and professional transportation services throughout Morocco. From airport pickups to intercity transfers, we ensure comfortable and timely service.",
    image:
      "https://images.unsplash.com/photo-1612727979818-5b7ad4b2f492?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Book Transfer",
    buttonLink: "#contact",
  },
]

export default function Hero() {
  const sliderRef = useRef<HTMLUListElement>(null)

  const handleNavigation = (direction: "prev" | "next") => {
    if (!sliderRef.current) return

    const items = sliderRef.current.querySelectorAll(".carousel-item")

    if (direction === "next") {
      sliderRef.current.appendChild(items[0])
    } else {
      sliderRef.current.prepend(items[items.length - 1])
    }
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

  return (
    <main className="hero-carousel">
      <ul className="slider" ref={sliderRef}>
        {services.map((service, index) => (
          <li key={index} className="carousel-item" style={{ backgroundImage: `url(${service.image})` }}>
            <div className="content">
              <h2 className="title font-optima">{service.title}</h2>
              <p className="description">{service.description}</p>
              <div className="hero-button-wrapper">
                <a
                  href="#contact"
                  className="hero-button inline-flex items-center px-6 py-2.5 rounded-md text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {service.buttonText}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

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
