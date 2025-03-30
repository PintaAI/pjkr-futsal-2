import { Button } from "./ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent animate-gradient">
            PJKR Futsal Tournament 2025
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
            16 Agustus 2025 — Sinansan Futsal Park
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild size="lg" className="min-w-[200px]">
            <Link href="/register">Register a Team</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[200px]">
            <Link href="/public/schedule">View Fixtures</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[200px]">
            <Link href="/public/live">Watch Live Matches</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
