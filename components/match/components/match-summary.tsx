import { Trophy, Timer, Clock, AlertTriangle, CircleDot } from "lucide-react";
import { IoMdFootball } from "react-icons/io";
import { cn } from "@/lib/utils";

type MatchEvent = {
  id: number;
  matchId: number;
  teamId: number;
  type: "goal" | "yellowCard" | "redCard" | "foul" | "assist";
  minute: number;
};

interface MatchSummaryProps {
  selectedMatch: {
    homeTeam: {
      id: number;
      name: string;
    };
    awayTeam: {
      id: number;
      name: string;
    };
  };
  homeScore: number;
  awayScore: number;
  matchTime: number;
  matchEvents: MatchEvent[];
  possessionPercentages: {
    home: number;
    away: number;
  };
  formatTime: (seconds: number) => string;
}

export function MatchSummary({
  selectedMatch,
  homeScore,
  awayScore,
  matchTime,
  matchEvents,
  possessionPercentages,
  formatTime
}: MatchSummaryProps) {
  return (
    <div className="border rounded-lg p-3 sm:p-4 shadow-sm mt-4 sm:mt-6 bg-card">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <h3 className="text-base sm:text-lg font-semibold">Match Summary</h3>
      </div>
      
      <div className="space-y-6">
        {/* Score Section */}
        <div className="bg-accent/20 rounded-lg p-2 sm:p-3">
          <div className="grid grid-cols-3 items-center text-center">
            <div className="text-sm sm:text-base font-bold">{selectedMatch.homeTeam.name}</div>
            <div className="text-lg sm:text-2xl font-bold text-primary">
              {homeScore} - {awayScore}
            </div>
            <div className="text-sm sm:text-base font-bold">{selectedMatch.awayTeam.name}</div>
          </div>
        </div>
        
        {/* Match Statistics */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-base sm:text-lg font-semibold">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Match Statistics</span>
          </div>
          
          <div className="space-y-2 sm:space-y-3 bg-accent/10 rounded-lg p-2 sm:p-3">
            <div className="flex justify-center items-center gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Timer className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <span className="text-xs sm:text-sm">Duration</span>
              </div>
              <span className="text-xs sm:text-sm font-mono">{formatTime(matchTime)}</span>
            </div>
            
            {/* Possession Bar */}
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="text-left">{possessionPercentages.home}%</div>
                <div className="text-center">Possession</div>
                <div className="text-right">{possessionPercentages.away}%</div>
              </div>
              <div className="h-1.5 sm:h-2 bg-accent rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${possessionPercentages.home}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Summary */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-base sm:text-lg font-semibold">
            <CircleDot className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Event Summary</span>
          </div>
          
          <div className="bg-accent/10 rounded-lg p-2 sm:p-3 space-y-2 sm:space-y-3">
            <div className="grid grid-cols-3 gap-2 items-center text-center">
              <div className="font-semibold text-xs sm:text-sm">{selectedMatch.homeTeam.name}</div>
              <div className="font-semibold text-xs sm:text-sm">Event</div>
              <div className="font-semibold text-xs sm:text-sm">{selectedMatch.awayTeam.name}</div>
            </div>
            
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-center">{matchEvents.filter(e => e.teamId === selectedMatch.homeTeam.id && e.type === 'goal').length}</div>
                <div className="flex items-center justify-center gap-2">
                  <IoMdFootball className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Goals</span>
                </div>
                <div className="text-center">{matchEvents.filter(e => e.teamId === selectedMatch.awayTeam.id && e.type === 'goal').length}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-center">{matchEvents.filter(e => e.teamId === selectedMatch.homeTeam.id && e.type === 'yellowCard').length}</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 bg-yellow-400 rounded-sm" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Kartu kuning</span>
                </div>
                <div className="text-center">{matchEvents.filter(e => e.teamId === selectedMatch.awayTeam.id && e.type === 'yellowCard').length}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-center">{matchEvents.filter(e => e.teamId === selectedMatch.homeTeam.id && e.type === 'redCard').length}</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 bg-red-500 rounded-sm" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Kartu Merah</span>
                </div>
                <div className="text-center">{matchEvents.filter(e => e.teamId === selectedMatch.awayTeam.id && e.type === 'redCard').length}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-center">{matchEvents.filter(e => e.teamId === selectedMatch.homeTeam.id && e.type === 'foul').length}</div>
                <div className="flex items-center justify-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Pelanggaran</span>
                </div>
                <div className="text-center">{matchEvents.filter(e => e.teamId === selectedMatch.awayTeam.id && e.type === 'foul').length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
