import { Button } from "@/components/ui/button";
import { MdReport } from "react-icons/md";
import { GiRunningShoe } from "react-icons/gi";
import { IoMdFootball } from "react-icons/io";
import { PiCardsFill } from "react-icons/pi";

type MatchEvent = {
  id: number;
  matchId: number;
  teamId: number;
  type: "goal" | "yellowCard" | "redCard" | "foul" | "assist";
  minute: number;
  playerId?: number;
  assistPlayerId?: number;
};

interface EventRecordingProps {
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
  };
  matchStarted: boolean;
  onRecordEvent: (type: MatchEvent["type"], teamId: number) => void;
  matchEvents: MatchEvent[];
}

export function EventRecording({
  selectedMatch,
  matchStarted,
  onRecordEvent,
  matchEvents
}: EventRecordingProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Home Team */}
        <div className="border rounded-lg p-3 bg-card">
          <h3 className="text-sm mb-3 text-card-foreground text-center">
            {selectedMatch.homeTeam.name}
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Button 
                onClick={() => onRecordEvent("goal", selectedMatch.homeTeam.id)}
                disabled={!matchStarted}
                size="icon"
                variant="default"
                className="w-full h-8"
              >
                <IoMdFootball className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => onRecordEvent("assist", selectedMatch.homeTeam.id)}
                disabled={!matchStarted}
                size="icon"
                variant="default"
                className="w-full h-8"
              >
                <GiRunningShoe className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={() => onRecordEvent("yellowCard", selectedMatch.homeTeam.id)}
                disabled={!matchStarted}
                size="icon"
                variant="outline"
                className="w-full h-8 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
              >
                <PiCardsFill className="h-4 w-4 text-yellow-500" />
              </Button>
              <Button 
                onClick={() => onRecordEvent("redCard", selectedMatch.homeTeam.id)}
                disabled={!matchStarted}
                size="icon"
                variant="outline"
                className="w-full h-8 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <PiCardsFill className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <Button 
              onClick={() => onRecordEvent("foul", selectedMatch.homeTeam.id)}
              disabled={!matchStarted}
              size="icon"
              variant="outline"
              className="w-full h-8 col-span-2"
            >
              <MdReport className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Away Team */}
        <div className="border rounded-lg p-3 bg-card">
          <h3 className="text-sm mb-3 text-card-foreground text-center">
            {selectedMatch.awayTeam.name}
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Button 
                onClick={() => onRecordEvent("goal", selectedMatch.awayTeam.id)}
                disabled={!matchStarted}
                size="icon"
                variant="default"
                className="w-full h-8"
              >
                <IoMdFootball className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => onRecordEvent("assist", selectedMatch.awayTeam.id)}
                disabled={!matchStarted}
                size="icon"
                variant="default"
                className="w-full h-8"
              >
                <GiRunningShoe className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={() => onRecordEvent("yellowCard", selectedMatch.awayTeam.id)}
                disabled={!matchStarted}
                size="icon"
                variant="outline"
                className="w-full h-8 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
              >
                <PiCardsFill className="h-4 w-4 text-yellow-500" />
              </Button>
              <Button 
                onClick={() => onRecordEvent("redCard", selectedMatch.awayTeam.id)}
                disabled={!matchStarted}
                size="icon"
                variant="outline"
                className="w-full h-8 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <PiCardsFill className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <Button 
              onClick={() => onRecordEvent("foul", selectedMatch.awayTeam.id)}
              disabled={!matchStarted}
              size="icon"
              variant="outline"
              className="w-full h-8 col-span-2"
            >
              <MdReport className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Events Log */}
      <div className="border rounded-lg p-3 bg-card">
        <h3 className="text-sm mb-2 text-card-foreground text-center">Match Events</h3>
        {matchEvents.length === 0 ? (
          <div className="text-center text-muted-foreground text-xs">No events</div>
        ) : (
          <div className="space-y-1.5 max-h-[300px] overflow-auto">
            {matchEvents.map(event => {
              const team = event.teamId === selectedMatch.homeTeam.id 
                ? selectedMatch.homeTeam 
                : selectedMatch.awayTeam;
              
              const eventIcon = () => {
                switch(event.type) {
                  case 'goal':
                    return <IoMdFootball className="h-3 w-3" />;
                  case 'assist':
                    return <GiRunningShoe className="h-3 w-3" />;
                  case 'yellowCard':
                    return <PiCardsFill className="h-3 w-3 text-yellow-500" />;
                  case 'redCard':
                    return <PiCardsFill className="h-3 w-3 text-red-500" />;
                  case 'foul':
                    return <MdReport className="h-3 w-3" />;
                }
              };
              
              return (
                <div key={event.id} className="flex justify-between p-1.5 border rounded bg-muted text-xs">
                  <div className="text-muted-foreground truncate flex items-center gap-1">
                    {eventIcon()} {team.name}
                  </div>
                  <div className="text-muted-foreground ml-2">
                    {event.minute}'
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
