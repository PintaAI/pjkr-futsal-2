import { Team } from "./mock-matches"

export interface TeamStanding extends Team {
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export const MOCK_STANDINGS: TeamStanding[] = [
  {
    id: 1,
    name: "Team A",
    color: "#ff0000",
    played: 3,
    won: 2,
    drawn: 1,
    lost: 0,
    goalsFor: 8,
    goalsAgainst: 3,
    points: 7
  },
  {
    id: 2,
    name: "Team B",
    color: "#0000ff",
    played: 3,
    won: 2,
    drawn: 0,
    lost: 1,
    goalsFor: 6,
    goalsAgainst: 4,
    points: 6
  },
  {
    id: 3,
    name: "Team C",
    color: "#00ff00",
    played: 3,
    won: 1,
    drawn: 1,
    lost: 1,
    goalsFor: 5,
    goalsAgainst: 5,
    points: 4
  },
  {
    id: 4,
    name: "Team D",
    color: "#ffff00",
    played: 3,
    won: 1,
    drawn: 0,
    lost: 2,
    goalsFor: 4,
    goalsAgainst: 6,
    points: 3
  },
  {
    id: 5,
    name: "Team E",
    color: "#800080",
    played: 3,
    won: 0,
    drawn: 2,
    lost: 1,
    goalsFor: 3,
    goalsAgainst: 5,
    points: 2
  },
  {
    id: 6,
    name: "Team F",
    color: "#ffa500",
    played: 3,
    won: 0,
    drawn: 0,
    lost: 3,
    goalsFor: 2,
    goalsAgainst: 5,
    points: 0
  }
]
