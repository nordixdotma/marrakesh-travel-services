"use client"

import { Star } from "lucide-react"
import { useEffect, useRef } from "react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Luxury Traveler",
    text: "Outstanding service and professional drivers. Made our Morocco trip unforgettable!",
    rating: 5,
    image: "/profile-woman.jpg",
  },
  {
    name: "Michael Brown",
    role: "Business Executive",
    text: "Reliable, punctual, and always friendly. Highly recommend for any travel needs.",
    rating: 5,
    image: "/profile-man.jpg",
  },
  {
    name: "Emma Wilson",
    role: "Tour Group Manager",
    text: "Perfect coordination and excellent knowledge of local attractions. Top-notch!",
    rating: 5,
    image: "/profile-woman-2.jpg",
  },
  {
    name: "David Martinez",
    role: "Corporate Travel Manager",
    text: "Exceptional service for our team retreat. The drivers were knowledgeable and courteous throughout.",
    rating: 5,
    image: "/profile-man.jpg",
  },
  {
    name: "Lisa Anderson",
    role: "Travel Blogger",
    text: "An incredible experience! From airport to destination, everything was seamlessly organized.",
    rating: 5,
    image: "/profile-woman-2.jpg",
  },
  {
    name: "James Thompson",
    role: "Hotel Concierge",
    text: "We recommend Marrakesh Travel Services to all our guests. They never disappoint!",
    rating: 5,
    image: "/profile-man.jpg",
  },
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play carousel functionality
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const autoScroll = () => {
      const scrollAmount = container.scrollLeft + container.clientWidth * 0.35
      const maxScroll = container.scrollWidth - container.clientWidth

      if (scrollAmount >= maxScroll) {
        container.scrollLeft = 0
      } else {
        container.scrollLeft = scrollAmount
      }
    }

    const interval = setInterval(autoScroll, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
            What Our Clients Say
          </h2>
          <p className="text-lg opacity-70">Trusted by thousands of satisfied travelers</p>
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Hide scrollbar */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-1/3 rounded-lg p-8 transition-all hover:shadow-lg"
              style={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm opacity-70">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={16} style={{ color: "var(--color-gradient-start)", fill: "currentColor" }} />
                  ))}
              </div>

              <p className="opacity-80">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
