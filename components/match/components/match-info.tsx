import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

interface MatchInfoProps {
  selectedMatch: {
    homeTeam: {
      id: number;
      name: string;
      color: string;
    };
    awayTeam: {
      id: number;
      name: string;
      color: string;
    };
    stage: string;
    group: string;
  };
  homeScore: number;
  awayScore: number;
  matchTime: number;
  matchStarted: boolean;
  matchClockRunning: boolean;
  onToggleClock: () => void;
  onResetMatch: () => void;
  onFinishMatch: () => void;
  formatTime: (seconds: number) => string;
}

export function MatchInfo({
  selectedMatch,
  homeScore,
  awayScore,
  matchTime,
  matchStarted,
  matchClockRunning,
  onToggleClock,
  onResetMatch,
  onFinishMatch,
  formatTime
}: MatchInfoProps) {
  return (
    <div className="border rounded-lg p-3 bg-card">
      <div className="flex items-center justify-between text-card-foreground">
        <h2 className="text-sm font-medium">
          {selectedMatch.homeTeam.name} vs {selectedMatch.awayTeam.name}
        </h2>
        <div className="text-xs text-muted-foreground">
          {selectedMatch.stage} - Group {selectedMatch.group}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 gap-4">
        <div className="text-center flex-1">
          <div 
            className="w-12 h-12 rounded-full mb-2 mx-auto flex items-center justify-center text-primary-foreground text-sm font-medium"
            style={{ backgroundColor: selectedMatch.homeTeam.color }}
          >
            {selectedMatch.homeTeam.name.substring(0, 2)}
          </div>
          <div className="text-xs font-medium truncate">{selectedMatch.homeTeam.name}</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold mb-1 text-card-foreground">{homeScore} - {awayScore}</div>
          <div className="text-sm font-mono text-muted-foreground">{formatTime(matchTime)}</div>
        </div>
        
        <div className="text-center flex-1">
          <div 
            className="w-12 h-12 rounded-full mb-2 mx-auto flex items-center justify-center text-primary-foreground text-sm font-medium"
            style={{ backgroundColor: selectedMatch.awayTeam.color }}
          >
            {selectedMatch.awayTeam.name.substring(0, 2)}
          </div>
          <div className="text-xs font-medium truncate">{selectedMatch.awayTeam.name}</div>
        </div>
      </div>
      
      <div className="flex justify-center mt-4 gap-2">
        <Button 
          onClick={onToggleClock}
          variant={matchClockRunning ? "destructive" : "default"}
          size="sm"
          className="gap-1"
        >
          {matchClockRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="hidden sm:inline">
            {matchClockRunning ? 'Pause' : matchStarted ? 'Resume' : 'Start'}
          </span>
        </Button>
        
        <Button 
          onClick={onResetMatch}
          variant="outline"
          size="sm"
          disabled={!matchStarted}
          className="gap-1"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
        
        <Button 
          onClick={onFinishMatch}
          variant="secondary"
          size="sm"
          disabled={!matchStarted}
          className="gap-1"
        >
          <Flag className="h-4 w-4" />
          <span className="hidden sm:inline">Finish</span>
        </Button>
      </div>
    </div>
  );
}
