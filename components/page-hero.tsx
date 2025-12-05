import { Container } from "@/components/ui/container"

interface PageHeroProps {
  title: string
  backgroundImage: string
}

export default function PageHero({ title, backgroundImage }: PageHeroProps) {
  return (
    <section
      className="relative h-[40dvh] w-full flex items-end"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <Container className="relative z-10 max-w-7xl mx-auto pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-trajan-pro uppercase tracking-wider">{title}</h1>
      </Container>
    </section>
  )
}
