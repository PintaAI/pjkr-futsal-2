import { Button } from "./ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface HeroProps {
  tournamentName?: string
  date?: Date
  location?: string
}

export function Hero({
  tournamentName = "PJKR Futsal Tournament 2025",
  date = new Date("2025-08-16"),
  location = "Sinansan Futsal Park"
}: HeroProps) {
  const formattedDate = format(date, "d MMMM yyyy", { locale: id })

  return (
    <section 
      className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="container max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 
            id="hero-heading"
            className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent animate-gradient hover:animate-pulse transition-all duration-300"
          >
            {tournamentName}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
            {formattedDate} — {location}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center px-4 flex-wrap">
          <Button asChild size="lg" className="min-w-[200px] flex-1 sm:flex-none">
            <Link href="/register" aria-label="Register a team">
              Register a Team
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[200px] flex-1 sm:flex-none">
            <Link href="/public/schedule" aria-label="View tournament fixtures">
              View Fixtures
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[200px] flex-1 sm:flex-none">
            <Link href="/public/live" aria-label="Watch live matches">
              Watch Live Matches
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
