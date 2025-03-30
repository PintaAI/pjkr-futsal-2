import { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";

// Basic team information type
type Team = {
  id: number;
  name: string;
  color: string;
};

// Props interface for the PossessionTracking component
interface PossessionTrackingProps {
  selectedMatch: {
    homeTeam: Team;
    awayTeam: Team;
  };
  homeTeamPossessionTime: number;
  awayTeamPossessionTime: number;
  possessionTeam: number | null;
  matchClockRunning: boolean;
  onPossessionChange: (teamId: number) => void;
  onPausePossession: () => void;
  formatTime: (seconds: number) => string;
}

// Visual indicator for possession percentage
const PossessionBar = ({ percentage, isHome }: { percentage: number; isHome: boolean }) => (
  <div className="flex-1 bg-muted rounded-full h-1.5">
    <div
      className={cn(
        "h-1.5 rounded-full transition-all duration-300",
        isHome ? "bg-primary" : "bg-primary"
      )}
      style={{
        width: `${percentage}%`
      }}
    />
  </div>
);

// Component to display possession statistics for a team
const TeamPossessionStats = ({ 
  label, 
  percentage, 
  isHome 
}: { 
  label: string; 
  percentage: number; 
  isHome: boolean;
}) => (
  <div className="flex-1">
    <div className={cn(
      "text-xs mb-1 font-medium text-muted-foreground",
      isHome ? "text-left" : "text-right"
    )}>
      {label}: {percentage}%
    </div>
    <PossessionBar percentage={percentage} isHome={isHome} />
  </div>
);

// Button component for toggling team possession
const PossessionButton = ({
  team,
  isActive,
  matchClockRunning,
  onClick,
  isHome,
}: {
  team: Team;
  isActive: boolean;
  matchClockRunning: boolean;
  onClick: () => void;
  isHome: boolean;
}) => (
  <Button 
    onClick={onClick}
    variant={isActive ? "default" : "outline"}
    className="flex-1 h-29 text-sm transition-colors duration-200"
    disabled={!matchClockRunning}
    data-testid={`possession-button-${team.id}`}
    aria-label={`${team.name} Possession`}
  >
    {team.name}
  </Button>
);

export function PossessionTracking(props: PossessionTrackingProps) {
  const {
    selectedMatch,
    homeTeamPossessionTime,
    awayTeamPossessionTime,
    possessionTeam,
    matchClockRunning,
    onPossessionChange,
    onPausePossession,
    formatTime
  } = props;

  // Calculate possession percentages for both teams
  const possessionPercentages = useMemo(() => {
    const totalTime = homeTeamPossessionTime + awayTeamPossessionTime;
    if (totalTime === 0) return { home: 0, away: 0 };
    
    const homePercentage = Math.round((homeTeamPossessionTime / totalTime) * 100);
    return {
      home: homePercentage,
      away: 100 - homePercentage
    };
  }, [homeTeamPossessionTime, awayTeamPossessionTime]);

  return (
    // Main possession tracking card container
    <div className="border rounded-lg p-3 bg-card">
      <h3 className="text-base font-bold mb-3 text-card-foreground text-center">
        Possession Tracking
      </h3>
      
      {/* Possession statistics display section */}
      <div className="flex items-center gap-3 mb-3">
        <TeamPossessionStats
          label="Home"
          percentage={possessionPercentages.home}
          isHome={true}
        />
        
        <div className="text-xs font-mono text-card-foreground">
          {formatTime(homeTeamPossessionTime)} | {formatTime(awayTeamPossessionTime)}
        </div>
        
        <TeamPossessionStats
          label="Away"
          percentage={possessionPercentages.away}
          isHome={false}
        />
      </div>
      
      {/* Possession control buttons section */}
      <div className="flex justify-between items-center space-x-3">
        <PossessionButton
          team={selectedMatch.homeTeam}
          isActive={possessionTeam === selectedMatch.homeTeam.id}
          matchClockRunning={matchClockRunning}
          onClick={() => onPossessionChange(selectedMatch.homeTeam.id)}
          isHome={true}
        />
        
        <Button
          onClick={onPausePossession}
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={!matchClockRunning}
          data-testid="pause-possession-button"
          aria-label={possessionTeam === null ? "No Possession" : "Pause Possession"}
        >
          {possessionTeam === null ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
        
        <PossessionButton
          team={selectedMatch.awayTeam}
          isActive={possessionTeam === selectedMatch.awayTeam.id}
          matchClockRunning={matchClockRunning}
          onClick={() => onPossessionChange(selectedMatch.awayTeam.id)}
          isHome={false}
        />
      </div>
    </div>
  );
}
