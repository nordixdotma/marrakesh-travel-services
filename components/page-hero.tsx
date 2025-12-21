import { Container } from "@/components/ui/container"

interface PageHeroProps {
  title: string
  backgroundImage: string
  showOverlay?: boolean
}

export default function PageHero({ title, backgroundImage, showOverlay = true }: PageHeroProps) {
  // Ensure we have a valid image URL
  const imageUrl = backgroundImage && backgroundImage !== '/placeholder.svg' 
    ? backgroundImage 
    : '/placeholder.jpg'
  
  return (
    <section
      className="relative h-[50dvh] md:h-[60dvh] w-full flex items-end overflow-hidden bg-muted"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better text readability - conditionally rendered */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0" />
      )}
      
      {/* Content */}
      <Container className="relative z-10 max-w-7xl mx-auto pb-8 px-4">
        <h1 className={`text-2xl md:text-4xl font-bold font-trajan-pro uppercase tracking-wider ${showOverlay ? 'text-white drop-shadow-lg' : 'text-foreground'}`}>{title}</h1>
      </Container>
    </section>
  )
}
