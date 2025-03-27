"use client"

interface Match {
  id: string
  team1: string | null
  team2: string | null
  winner?: string | null
  round: number
}

interface BracketProps {
  matches: Match[]
}

export function Bracket({ matches }: BracketProps) {
  // Group matches by round
  const matchesByRound = matches.reduce<Record<number, Match[]>>((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = []
    }
    acc[match.round].push(match)
    return acc
  }, {})

  // Extract all round numbers and sort them
  const rounds = Object.keys(matchesByRound)
    .map(Number)
    .sort((a, b) => a - b)

  // Optional dictionary for round labels
  const roundLabels: Record<number, string> = {
    1: "Round 1",
    2: "Round 2",
    3: "Semifinals",
    4: "Finals",
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-start gap-8 p-4 min-w-[900px]">
        {rounds.map((roundNumber, roundIndex) => (
          <div
            key={roundNumber}
            className="flex flex-col justify-around"
            // Inline styles can remain if you want dynamic layout
            style={{
              height: `${100 - (roundIndex * 15)}%`,
              marginTop: `${roundIndex * 2}rem`,
            }}
          >
            <div className="text-sm font-medium mb-4">
              {roundLabels[roundNumber] ?? `Round ${roundNumber}`}
            </div>

            {matchesByRound[roundNumber].map((match) => (
              <div
                key={match.id}
                className="flex flex-col mb-8 relative"
                style={{
                  marginBottom: `${2 ** roundIndex}rem`,
                }}
              >
                <div className="border rounded-lg p-2 bg-card w-[300px]">
                  <div
                    className={`p-2 ${
                      match.winner === match.team1 ? "bg-primary/20" : ""
                    }`}
                  >
                    {match.team1 || "TBD"}
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div
                    className={`p-2 ${
                      match.winner === match.team2 ? "bg-primary/20" : ""
                    }`}
                  >
                    {match.team2 || "TBD"}
                  </div>
                </div>

   
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
