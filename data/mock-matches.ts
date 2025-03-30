// Define team types
type Team = {
  id: number;
  name: string;
  color: string;
};

// Mock teams data
export const MOCK_TEAMS: Team[] = [
  { id: 1, name: "Team A", color: "#ff0000" },
  { id: 2, name: "Team B", color: "#0000ff" },
  { id: 3, name: "Team C", color: "#00ff00" },
  { id: 4, name: "Team D", color: "#ffff00" }
];

// Define match type
type Match = {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  group: string;
  stage: string;
  dateTime: string;
};

// Mock matches data
export const MOCK_MATCHES: Match[] = [
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

// Export types for use in components
export type { Team, Match };
