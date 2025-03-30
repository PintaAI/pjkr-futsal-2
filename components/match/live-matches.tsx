import { MOCK_MATCHES } from "@/data/mock-matches"
import { MatchCard } from "./components/match-card"

// Temporary mock data for status and court - in real app this would come from API
const matchStatuses = [
  { id: 1, status: "LIVE" as const, court: "A1" },
  { id: 2, status: "UPCOMING" as const, court: "B1" },
]

export function LiveMatches() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <h2 className="text-2xl font-bold">Live & Upcoming Matches</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_MATCHES.map((match) => {
            const matchStatus = matchStatuses.find(s => s.id === match.id)
            return (
              <MatchCard
                key={match.id}
                match={match}
                status={matchStatus?.status || "UPCOMING"}
                court={matchStatus?.court || "TBA"}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
