import Link from "next/link"
import { Plus, Eye, Pencil } from "lucide-react"

// Mock data for demonstration - this would come from a database in a real app
const MOCK_TEAMS = [
  { id: 1, name: "Pjkr Futsal", color: "#ff0000" },
  { id: 2, name: "Pasoepati", color: "#0000ff" },
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
    <div className="p-4 space-y-4 md:p-6 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Matches</h2>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          New Match
        </button>
      </div>
      
      <div className="rounded-md border overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium whitespace-nowrap">Match</th>
                  <th className="h-10 px-4 text-left align-middle font-medium hidden md:table-cell">Status</th>
                  <th className="h-10 px-4 text-left align-middle font-medium hidden sm:table-cell">Date</th>
                  <th className="h-10 px-4 text-right align-middle font-medium sm:text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {MOCK_MATCHES.map((match) => (
                  <tr key={match.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <div className="font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: match.homeTeam.color }}></span>
                          {match.homeTeam.name}
                          <span className="text-muted-foreground">vs</span>
                          {match.awayTeam.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Group {match.group}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden md:table-cell">
                      <span className="text-xs bg-secondary/40 rounded-full px-2 py-1">
                        Upcoming
                      </span>
                    </td>
                    <td className="p-4 align-middle hidden sm:table-cell whitespace-nowrap">
                      <div className="text-sm">
                        {new Date(match.dateTime).toLocaleDateString('en-US', { 
                          month: 'short',
                          day: 'numeric'
                        })}
                        {' '}
                        {new Date(match.dateTime).toLocaleTimeString('en-US', { 
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center justify-end gap-2 sm:justify-start">
                        <Link
                          href={`/admin/matches/${match.id}`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 sm:w-auto sm:px-3 hover:bg-accent hover:text-accent-foreground"
                          title="View match"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:block sm:ml-2">View</span>
                        </Link>
                        <button 
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 sm:w-auto sm:px-3 hover:bg-accent hover:text-accent-foreground"
                          title="Edit match"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="hidden sm:block sm:ml-2">Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  )
}
