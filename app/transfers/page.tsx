"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageHero from "@/components/page-hero"
import { Container } from "@/components/ui/container"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

export default function TransfersPage() {
  return (
    <main className="w-full">
      <Header />
      <PageHero
        title="Transfers"
        backgroundImage="https://images.unsplash.com/photo-1609281362702-f46a060b2044?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <section className="py-12 bg-background">
        <Container className="max-w-6xl px-4">
          <Empty className="mx-auto">
            <EmptyHeader>
              <EmptyTitle>Transfers coming soon</EmptyTitle>
              <EmptyDescription>
                We're setting up our transfer options. Check back soon for full details and booking.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Container>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
