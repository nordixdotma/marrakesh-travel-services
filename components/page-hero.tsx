import { Container } from "@/components/ui/container"

interface PageHeroProps {
  title: string
  backgroundImage: string
  showOverlay?: boolean
}

export default function PageHero({ title, backgroundImage, showOverlay = true }: PageHeroProps) {
  // Ensure we have a valid image URL
  const imageUrl = backgroundImage && backgroundImage !== '/placeholder.svg' && backgroundImage !== '/placeholder.jpg'
    ? backgroundImage 
    : '/placeholder.jpg'
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 PageHero image:', { backgroundImage, imageUrl, showOverlay })
  }
  
  return (
    <section className="relative h-[50dvh] md:h-[60dvh] w-full flex items-end overflow-hidden bg-muted">
      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            console.error('❌ Image failed to load:', imageUrl)
            const target = e.target as HTMLImageElement
            target.src = '/placeholder.jpg'
          }}
          onLoad={() => {
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ Image loaded successfully:', imageUrl)
            }
          }}
        />
      )}
      
      {/* Dark overlay for better text readability - conditionally rendered */}
      {showOverlay && (
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/5 z-10" />
      )}
      
      {/* Content */}
      <Container className="relative z-20 max-w-7xl mx-auto pb-8 px-4">
        <h1 className="text-2xl md:text-4xl font-bold font-trajan-pro uppercase tracking-wider text-white drop-shadow-lg">{title}</h1>
      </Container>
    </section>
  )
}
