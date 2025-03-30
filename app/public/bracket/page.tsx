'use client'

import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam } from 'react-brackets'

interface TeamData {
  name: string
  score?: number
  winner?: boolean
}

const rounds: IRoundProps[] = [
  {
    title: 'Round 1',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC A', score: 3, winner: true }, 
          { name: 'PJKR FC B', score: 1 }
        ],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC C', score: 2 }, 
          { name: 'PJKR FC D', score: 4, winner: true }
        ],
      },
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC E', score: 4, winner: true }, 
          { name: 'PJKR FC F', score: 2 }
        ],
      },
      {
        id: 4,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC G', score: 1 }, 
          { name: 'PJKR FC H', score: 2, winner: true }
        ],
      },
      {
        id: 5,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC I', score: 3, winner: true }, 
          { name: 'PJKR FC J', score: 2 }
        ],
      },
      {
        id: 6,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC K', score: 1 }, 
          { name: 'PJKR FC L', score: 3, winner: true }
        ],
      },
      {
        id: 7,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC M', score: 2, winner: true }, 
          { name: 'PJKR FC N', score: 1 }
        ],
      },
      {
        id: 8,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC O', score: 0 }, 
          { name: 'PJKR FC P', score: 2, winner: true }
        ],
      },
    ],
  },
  {
    title: 'Quarter Finals',
    seeds: [
      {
        id: 9,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC A', score: 2, winner: true }, 
          { name: 'PJKR FC D', score: 1 }
        ],
      },
      {
        id: 10,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC E', score: 3, winner: true }, 
          { name: 'PJKR FC H', score: 2 }
        ],
      },
      {
        id: 11,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC I', score: 1 }, 
          { name: 'PJKR FC L', score: 2, winner: true }
        ],
      },
      {
        id: 12,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC M', score: 4, winner: true }, 
          { name: 'PJKR FC P', score: 3 }
        ],
      },
    ],
  },
  {
    title: 'Semi Finals',
    seeds: [
      {
        id: 13,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC A', score: 1 }, 
          { name: 'PJKR FC E', score: 2, winner: true }
        ],
      },
      {
        id: 14,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC L', score: 0 }, 
          { name: 'PJKR FC M', score: 3, winner: true }
        ],
      },
    ],
  },
  {
    title: '3rd Place',
    seeds: [
      {
        id: 15,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC A', score: 3, winner: true }, 
          { name: 'PJKR FC L', score: 1 }
        ],
      },
    ],
  },
  {
    title: 'Finals',
    seeds: [
      {
        id: 16,
        date: new Date().toDateString(),
        teams: [
          { name: 'PJKR FC E', score: 2 },
          { name: 'PJKR FC M', score: 4, winner: true }
        ],
      },
    ],
  },
]

const CustomSeed = ({ seed, breakpoint }: { seed: any, breakpoint: number }) => {
  return (
    <Seed mobileBreakpoint={breakpoint}>
      <SeedItem>
        <div className="w-[200px] flex flex-col py-2 px-4 border rounded-md bg-background">
          {seed.teams.map((team: TeamData, index: number) => (
            <div
              key={index}
              className={`flex justify-between items-center py-1 ${
                team.winner ? 'text-primary font-semibold' : ''
              }`}
            >
              <span>{team.name}</span>
              {typeof team.score === 'number' && (
                <span className="ml-4">{team.score}</span>
              )}
            </div>
          ))}
        </div>
      </SeedItem>
    </Seed>
  )
}

export default function TournamentBracket() {
  return (
    <div className="py-8 w-full overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-center px-4">Tournament Bracket</h1>
      <div className="overflow-x-auto flex justify-start md:justify-center -mx-4 px-4 md:px-0">
        <div className="min-w-[1000px] p-4">
          <Bracket 
            rounds={rounds}
            mobileBreakpoint={0}
            renderSeedComponent={CustomSeed}
            roundTitleComponent={(title: string) => (
              <div className="text-center font-semibold mb-4 text-primary">
                {title}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}
