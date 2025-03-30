import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MOCK_STANDINGS } from "@/data/mock-standings"

export function Standings() {
  // Sort teams by points, then goal difference
  const sortedTeams = [...MOCK_STANDINGS].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const aGD = a.goalsFor - a.goalsAgainst
    const bGD = b.goalsFor - b.goalsAgainst
    return bGD - aGD
  })

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <h2 className="text-2xl font-bold">Tournament Standings</h2>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">GF</TableHead>
                <TableHead className="text-center">GA</TableHead>
                <TableHead className="text-center">GD</TableHead>
                <TableHead className="text-center">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTeams.map((team, index) => {
                const isTopFour = index < 4
                const goalDiff = team.goalsFor - team.goalsAgainst

                return (
                  <TableRow 
                    key={team.id}
                    className={isTopFour ? "bg-muted/50" : undefined}
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: team.color }}
                        />
                        <span>{team.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{team.played}</TableCell>
                    <TableCell className="text-center">{team.won}</TableCell>
                    <TableCell className="text-center">{team.drawn}</TableCell>
                    <TableCell className="text-center">{team.lost}</TableCell>
                    <TableCell className="text-center">{team.goalsFor}</TableCell>
                    <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                    <TableCell className="text-center">{goalDiff >= 0 ? `+${goalDiff}` : goalDiff}</TableCell>
                    <TableCell className="text-center font-bold">{team.points}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
