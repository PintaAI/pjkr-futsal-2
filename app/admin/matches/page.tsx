import Link from "next/link"

// Mock data for demonstration - this would come from a database in a real app
const MOCK_TEAMS = [
  { id: 1, name: "Team A", color: "#ff0000" },
  { id: 2, name: "Team B", color: "#0000ff" },
  { id: 3, name: "Team C", color: "#00ff00" },
  { id: 4, name: "Team D", color: "#ffff00" }
];

const MOCK_MATCHES = [
  { 
    id: 1, 
    homeTeam: MOCK_TEAMS[0], 
    awayTeam: MOCK_TEAMS[1], 
    group: "A", 
    stage: "Group Stage",
    dateTime: "2025-03-26T15:00:00" 
  },
  { 
    id: 2, 
    homeTeam: MOCK_TEAMS[2], 
    awayTeam: MOCK_TEAMS[3], 
    group: "A", 
    stage: "Group Stage",
    dateTime: "2025-03-26T17:00:00" 
  }
];

type Team = typeof MOCK_TEAMS[0];
type Match = typeof MOCK_MATCHES[0];

export default function AdminMatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Matches</h2>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          New Match
        </button>
      </div>
      
      <div className="rounded-md border">
        <div className="p-4">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors">
                  <th className="h-12 px-4 text-left align-middle font-medium">Match</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {MOCK_MATCHES.map((match) => (
                  <tr key={match.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <div>
                        <div className="font-medium">
                          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: match.homeTeam.color }}></span>
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {match.stage} - Group {match.group}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Upcoming
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div>
                        <div className="font-medium">
                          {new Date(match.dateTime).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(match.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/matches/${match.id}`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3"
                        >
                          View
                        </Link>
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
