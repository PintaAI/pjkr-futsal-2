import { Hero } from "./hero"
import { LiveMatches } from "./match/live-matches"
import { Announcements } from "./tournament/announcements"
import { RegistrationStatus } from "./tournament/registration-status"
import { Standings } from "./tournament/standings"
import { TournamentInfo } from "./tournament/tournament-info"

export function LandingPage() {
  return (
    <main className="flex-1">
      <Hero />
      <TournamentInfo />
      <RegistrationStatus />
      <Announcements />
      <LiveMatches />
      <Standings />
    </main>
  )
}
