import { Match } from "@/data/mock-matches"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type MatchStatus = "LIVE" | "UPCOMING" | "FINISHED"

interface MatchCardProps {
  match: Match
  status: MatchStatus
  court: string
}

export function MatchCard({ match, status, court }: MatchCardProps) {
  const statusColors = {
    LIVE: "bg-red-500",
    UPCOMING: "bg-blue-500",
    FINISHED: "bg-gray-500"
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="text-xs">
            {match.stage} - Group {match.group}
          </Badge>
          <Badge 
            variant="secondary" 
            className={`${statusColors[status]} text-white`}
          >
            {status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 items-center gap-4 text-center">
          <div className="flex flex-col items-center">
            <div 
              className="w-3 h-3 rounded-full mb-2"
              style={{ backgroundColor: match.homeTeam.color }}
            />
            <span className="font-semibold">{match.homeTeam.name}</span>
          </div>
          
          <div className="font-bold text-2xl">VS</div>
          
          <div className="flex flex-col items-center">
            <div 
              className="w-3 h-3 rounded-full mb-2"
              style={{ backgroundColor: match.awayTeam.color }}
            />
            <span className="font-semibold">{match.awayTeam.name}</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground text-center">
          <p>Court {court}</p>
          <p>{format(new Date(match.dateTime), "MMMM d, yyyy • h:mm a")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
