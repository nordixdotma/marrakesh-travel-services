"use client"
import { useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Service content for the slides
const services = [
  {
    title: "Airport Transfers",
    description:
      "Reliable transportation from airports to hotels and back. Our professional chauffeurs monitor flight times to ensure timely pickup, even if your flight is delayed.",
    image:
      "https://images.unsplash.com/photo-1612727979818-5b7ad4b2f492?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Book Transfer",
    buttonLink: "#contact",
  },
  {
    title: "City Tours",
    description:
      "Transportation between Morocco's most beautiful city attractions. Our knowledgeable drivers take you from one landmark to another while sharing insights about local culture and history.",
    image:
      "https://images.unsplash.com/photo-1664346288114-ee72907d2c52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Plan Your Tour",
    buttonLink: "#contact",
  },
  {
    title: "Hotel Pickup",
    description:
      "Convenient transportation from your hotel to any destination in Morocco and back. Our professional drivers ensure timely pickup and a comfortable journey between your accommodations and desired locations.",
    image:
      "https://images.unsplash.com/photo-1567214871203-640282b6bdd3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Schedule Pickup",
    buttonLink: "#contact",
  },
  {
    title: "Event Transport",
    description:
      "Reliable transportation to and from special events. From weddings to corporate gatherings, we provide elegant vehicles with professional chauffeurs to transport you and your guests between venues.",
    image:
      "https://images.unsplash.com/photo-1603982449700-534948b9e408?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Request Quote",
    buttonLink: "#contact",
  },
  {
    title: "Intercity Travel",
    description:
      "Comfortable transportation between Morocco's beautiful cities. Our intercity transport services offer a stress-free way to travel from one city to another with pickup and drop-off at your specified locations.",
    image: "https://images.unsplash.com/photo-1585089858717-f4378c2031d8?q=80&w=2069&auto=format&fit=crop",
    buttonText: "View Routes",
    buttonLink: "#contact",
  },
]

export default function Hero() {
  const sliderRef = useRef<HTMLUListElement>(null)

  // Function to handle navigation
  const handleNavigation = (direction: "prev" | "next") => {
    if (!sliderRef.current) return

    const items = sliderRef.current.querySelectorAll(".carousel-item")

    if (direction === "next") {
      // Move first item to the end
      sliderRef.current.appendChild(items[0])
    } else {
      // Move last item to the beginning
      sliderRef.current.prepend(items[items.length - 1])
    }
  }

  // Set up event listeners
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

      {/* Isolated CSS for the hero carousel */}
      <style jsx>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          height: 100vh; /* Fallback */
          height: calc(100vh - var(--mobile-browser-header, 0px));
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          overflow: hidden;
          will-change: transform; /* Performance optimization */
        }
        
        .slider {
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          will-change: transform; /* Performance optimization */
        }
        
        .carousel-item {
          width: 200px;
          height: 300px;
          list-style-type: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          background-position: center;
          background-size: cover;
          border-radius: 20px;
          box-shadow: 0 20px 30px rgba(255,255,255,0.3) inset;
          transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
          will-change: transform, left, top, width, height; /* Performance optimization */
        }
        
        .carousel-item:nth-child(1),
        .carousel-item:nth-child(2) {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: none;
          border-radius: 0;
          box-shadow: none;
          opacity: 1;
        }
        
        .carousel-item:nth-child(3) { left: 50%; }
        .carousel-item:nth-child(4) { left: calc(50% + 220px); }
        .carousel-item:nth-child(5) { left: calc(50% + 440px); }
        .carousel-item:nth-child(6) { left: calc(50% + 660px); opacity: 0; }
        
        .content {
          width: min(30vw, 400px);
          position: absolute;
          top: 50%;
          left: 3rem;
          transform: translateY(-50%);
          color: white;
          text-shadow: 0 3px 8px rgba(0,0,0,0.5);
          opacity: 0;
          display: none;
        }
        
        .title {
          text-transform: uppercase;
          font-size: 2rem;
          font-weight: bold;
        }
        
        .description {
          line-height: 1.7;
          margin: 1rem 0 1.5rem;
          font-size: 0.9rem;
        }
        
        .carousel-item:nth-of-type(2) .content {
          display: block;
          animation: show 0.75s ease-in-out 0.3s forwards;
        }
        
        /* Hero button styles with fill effect */
        .hero-button {
          position: relative;
          overflow: hidden;
          border: 2px solid white !important;
          color: white !important;
          background: transparent !important;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .hero-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          z-index: -1;
        }

        .hero-button:hover {
          color: var(--terracotta) !important;
          text-shadow: none !important;
        }

        .hero-button:hover::before {
          transform: scaleX(1);
        }
        
        @keyframes show {
          0% {
            filter: blur(5px);
            transform: translateY(calc(-50% + 75px));
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }
        
        .nav {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          user-select: none;
          display: flex;
        }
        
        .nav-btn {
          background-color: rgba(255,255,255,0.5);
          color: rgba(0,0,0,0.7);
          border: 2px solid rgba(0,0,0,0.6);
          margin: 0 0.25rem;
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          transition: background-color 0.3s ease;
        }

        .nav-btn:hover {
          background-color: rgba(255,255,255,0.3);
        }

        .nav-btn:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.5);
        }
        
        /* Add a gradient overlay to the active slide for better text visibility */
        .carousel-item:nth-child(1)::before,
        .carousel-item:nth-child(2)::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, 
            rgba(0,0,0,0.8) 0%, 
            rgba(0,0,0,0.5) 15%, 
            rgba(0,0,0,0.2) 30%, 
            rgba(0,0,0,0) 50%, 
            rgba(0,0,0,0.2) 70%, 
            rgba(0,0,0,0.5) 85%, 
            rgba(0,0,0,0.8) 100%
          );
        }
        
        /* Responsive styles */
        @media (min-width: 650px) and (max-width: 900px) {
          .hero-carousel {
            height: calc(100vh - 60px); /* Adjust for smaller screens */
          }
          .title { font-size: 1.5rem; }
          .description { font-size: 0.8rem; }
          .cta-button { font-size: 0.8rem; }
          
          .carousel-item {
            width: 160px;
            height: 270px;
          }
          
          .carousel-item:nth-child(3) { left: 50%; }
          .carousel-item:nth-child(4) { left: calc(50% + 170px); }
          .carousel-item:nth-child(5) { left: calc(50% + 340px); }
          .carousel-item:nth-child(6) { left: calc(50% + 510px); opacity: 0; }
        }
        
        @media (max-width: 650px) {
          .hero-carousel {
            height: calc(100vh - 50px); /* Adjust for mobile screens */
          }
          .content {
            width: 80%;
            left: 1.5rem;
          }
          
          .title { font-size: 1.25rem; }
          .description { font-size: 0.75rem; }
          .cta-button { font-size: 0.75rem; }
          
          /* Hide all small images on mobile */
          .carousel-item:nth-child(3),
          .carousel-item:nth-child(4),
          .carousel-item:nth-child(5),
          .carousel-item:nth-child(6) { 
            display: none; 
          }
        }
      `}</style>
    </main>
  )
}
