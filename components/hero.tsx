"use client"

import HeroSearch from "@/components/hero-search"

export default function Hero() {

  return (
    <main className="relative w-full overflow-hidden" style={{ height: "100dvh" }}>
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 w-[400vw] h-[400vh] md:w-[300vw] md:h-[300vh] lg:w-[150vw] lg:h-[150vh]"
          style={{
            transform: "translate(-50%, -50%)",
            pointerEvents: "none"
          }}
          src="https://www.youtube.com/embed/1XKaUV4dJFU?autoplay=1&mute=1&loop=1&playlist=1XKaUV4dJFU&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=0&end=150"
          title="Background video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-20">
         <HeroSearch />
      </div>

      {/* TripAdvisor Badge */}
      <a
        href="https://www.tripadvisor.com/Attraction_Review-g293734-d8514036-Reviews-Marrakesh_Travel_Services-Marrakech_Marrakech_Safi.html"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 z-20 hover:scale-110 transition-transform duration-300"
        aria-label="Visit our TripAdvisor page"
      >
        <img
          src="https://morthai.vercel.app/certif.png"
          alt="TripAdvisor"
          className="w-10 h-10 md:w-14 md:h-14 rounded-sm"
        />
      </a>
    </main>
  )
}