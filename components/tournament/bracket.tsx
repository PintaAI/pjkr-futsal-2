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
  const matchesByRound = matches.reduce((acc, match) => {
    acc[match.round] = acc[match.round] || []
    acc[match.round].push(match)
    return acc
  }, {} as Record<number, Match[]>)

  const rounds = Object.keys(matchesByRound).sort((a, b) => Number(a) - Number(b))

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-start gap-8 p-4 min-w-[900px]">
        {rounds.map((round, roundIndex) => (
          <div 
            key={round} 
            className="flex flex-col justify-around"
            style={{
              height: `${100 - (roundIndex * 15)}%`,
              marginTop: `${roundIndex * 2}rem`
            }}
          >
            <div className="text-sm font-medium mb-4">
              Round {Number(round) === 4 ? "Finals" : Number(round)}
            </div>
            {matchesByRound[Number(round)].map((match, index) => (
              <div
                key={match.id}
                className="flex flex-col mb-8 relative"
                style={{
                  marginBottom: `${2 ** roundIndex}rem`
                }}
              >
                <div className="border rounded-lg p-2 bg-card w-[200px]">
                  <div className={`p-2 ${match.winner === match.team1 ? "bg-primary/20" : ""}`}>
                    {match.team1 || "TBD"}
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className={`p-2 ${match.winner === match.team2 ? "bg-primary/20" : ""}`}>
                    {match.team2 || "TBD"}
                  </div>
                </div>
                {roundIndex < rounds.length - 1 && (
                  <div className="absolute right-0 top-1/2 w-8 border-t border-border" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
