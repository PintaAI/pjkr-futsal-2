import { Bracket } from "@/components/tournament/bracket"

// Sample tournament data - replace with real data later
const sampleMatches = [
  // Round 1 (16 teams - 8 matches)
  { id: "1", team1: "Team 1", team2: "Team 2", round: 1 },
  { id: "2", team1: "Team 3", team2: "Team 4", round: 1 },
  { id: "3", team1: "Team 5", team2: "Team 6", round: 1 },
  { id: "4", team1: "Team 7", team2: "Team 8", round: 1 },
  { id: "5", team1: "Team 9", team2: "Team 10", round: 1 },
  { id: "6", team1: "Team 11", team2: "Team 12", round: 1 },
  { id: "7", team1: "Team 13", team2: "Team 14", round: 1 },
  { id: "8", team1: "Team 15", team2: "Team 16", round: 1 },
  
  // Round 2 (8 teams - 4 matches)
  { id: "9", team1: null, team2: null, round: 2 },
  { id: "10", team1: null, team2: null, round: 2 },
  { id: "11", team1: null, team2: null, round: 2 },
  { id: "12", team1: null, team2: null, round: 2 },
  
  // Round 3 (4 teams - 2 matches)
  { id: "13", team1: null, team2: null, round: 3 },
  { id: "14", team1: null, team2: null, round: 3 },
  
  // Round 4 (Finals - 1 match)
  { id: "15", team1: null, team2: null, round: 4 },
]

export default function TournamentBracket() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Tournament Bracket</h1>
      <Bracket matches={sampleMatches} />
    </div>
  )
}
