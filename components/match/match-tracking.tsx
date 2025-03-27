"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

type Match = typeof MOCK_MATCHES[0];
type MatchEvent = {
  id: number;
  matchId: number;
  teamId: number;
  type: "goal" | "yellowCard" | "redCard" | "foul" | "assist";
  minute: number;
  playerId?: number;
  assistPlayerId?: number;
};

interface MatchTrackingProps {
  matchId: string;
}

export function MatchTracking({ matchId }: MatchTrackingProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>([]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  
  // Possession tracking
  const [possessionTeam, setPossessionTeam] = useState<number | null>(null);
  const [homeTeamPossessionTime, setHomeTeamPossessionTime] = useState(0);
  const [awayTeamPossessionTime, setAwayTeamPossessionTime] = useState(0);
  const [possessionStartTime, setPossessionStartTime] = useState<number | null>(null);
  
  // Match clock
  const [matchTime, setMatchTime] = useState(0);
  const [matchClockRunning, setMatchClockRunning] = useState(false);
  const [matchTimerId, setMatchTimerId] = useState<NodeJS.Timeout | null>(null);

  // Set initial match data
  useEffect(() => {
    const match = MOCK_MATCHES.find(m => m.id.toString() === matchId);
    if (match) setSelectedMatch(match);
  }, [matchId]);
  
  // Start/stop match timer
  const toggleMatchClock = () => {
    if (matchClockRunning) {
      if (matchTimerId) clearInterval(matchTimerId);
      setMatchClockRunning(false);
      
      // Also stop possession timer if running
      if (possessionTeam !== null) {
        updatePossessionTime();
        setPossessionTeam(null);
        setPossessionStartTime(null);
      }
    } else {
      const timerId = setInterval(() => {
        setMatchTime(prev => prev + 1);
      }, 1000);
      setMatchTimerId(timerId);
      setMatchClockRunning(true);
      setMatchStarted(true);
    }
  };
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (matchTimerId) clearInterval(matchTimerId);
    };
  }, [matchTimerId]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate possession percentages
  const calculatePossessionPercentage = () => {
    const totalTime = homeTeamPossessionTime + awayTeamPossessionTime;
    if (totalTime === 0) return { home: 0, away: 0 };
    
    const homePercentage = Math.round((homeTeamPossessionTime / totalTime) * 100);
    return {
      home: homePercentage,
      away: 100 - homePercentage
    };
  };
  
  // Update possession time when switching possession
  const updatePossessionTime = () => {
    if (possessionTeam === null || possessionStartTime === null) return;
    
    const currentTime = Date.now();
    const possessionDuration = Math.round((currentTime - possessionStartTime) / 1000);
    
    if (possessionTeam === selectedMatch?.homeTeam.id) {
      setHomeTeamPossessionTime(prev => prev + possessionDuration);
    } else {
      setAwayTeamPossessionTime(prev => prev + possessionDuration);
    }
  };
  
  // Handle possession change
  const handlePossessionChange = (teamId: number) => {
    if (!matchClockRunning) return;
    
    if (possessionTeam !== null) {
      updatePossessionTime();
    }
    
    setPossessionTeam(teamId);
    setPossessionStartTime(Date.now());
  };
  
  // Record a match event
  const recordEvent = (type: MatchEvent["type"], teamId: number) => {
    if (!selectedMatch || !matchStarted) return;
    
    const newEvent: MatchEvent = {
      id: Date.now(),
      matchId: selectedMatch.id,
      teamId,
      type,
      minute: Math.max(1, Math.floor(matchTime / 60))
    };
    
    setMatchEvents(prev => [...prev, newEvent]);
    
    // Update score for goals
    if (type === "goal") {
      if (teamId === selectedMatch.homeTeam.id) {
        setHomeScore(prev => prev + 1);
      } else {
        setAwayScore(prev => prev + 1);
      }
    }
  };
  
  // Reset the match
  const resetMatch = () => {
    if (matchTimerId) clearInterval(matchTimerId);
    setMatchClockRunning(false);
    setMatchStarted(false);
    setMatchTime(0);
    setHomeScore(0);
    setAwayScore(0);
    setMatchEvents([]);
    setHomeTeamPossessionTime(0);
    setAwayTeamPossessionTime(0);
    setPossessionTeam(null);
    setPossessionStartTime(null);
  };
  
  // Handle pausing possession
  const handlePausePossession = () => {
    if (!matchClockRunning) return;
    
    if (possessionTeam !== null) {
      updatePossessionTime();
      setPossessionTeam(null);
      setPossessionStartTime(null);
    }
  };

  const possessionPercentages = calculatePossessionPercentage();

  if (!selectedMatch) {
    return <div>Match not found</div>;
  }
  
  return (
    <div className="space-y-6">
      {/* Match Info */}
      <div className="border rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {selectedMatch.homeTeam.name} vs {selectedMatch.awayTeam.name}
          </h2>
          <div className="text-sm text-muted-foreground">
            {selectedMatch.stage} - Group {selectedMatch.group}
          </div>
        </div>
        
        <div className="flex justify-center items-center mt-6 space-x-8">
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full mb-2 mx-auto flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: selectedMatch.homeTeam.color }}
            >
              {selectedMatch.homeTeam.name.substring(0, 2)}
            </div>
            <div className="font-semibold">{selectedMatch.homeTeam.name}</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{homeScore} - {awayScore}</div>
            <div className="text-lg font-mono">{formatTime(matchTime)}</div>
          </div>
          
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full mb-2 mx-auto flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: selectedMatch.awayTeam.color }}
            >
              {selectedMatch.awayTeam.name.substring(0, 2)}
            </div>
            <div className="font-semibold">{selectedMatch.awayTeam.name}</div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-4">
          <button 
            onClick={toggleMatchClock}
            className={`px-4 py-2 rounded-md ${matchClockRunning 
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
          >
            {matchClockRunning ? 'Pause Match' : matchStarted ? 'Resume Match' : 'Start Match'}
          </button>
          
          <button 
            onClick={resetMatch}
            className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
            disabled={!matchStarted}
          >
            Reset Match
          </button>
          
          <button 
            onClick={() => {
              // Stop match clock
              if (matchTimerId) clearInterval(matchTimerId);
              setMatchClockRunning(false);
              
              // Update final possession time if needed
              if (possessionTeam !== null) {
                updatePossessionTime();
                setPossessionTeam(null);
                setPossessionStartTime(null);
              }
              
              // Update match status to completed
              setMatchStarted(false);
            }}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            disabled={!matchStarted}
          >
            Finish Match
          </button>
        </div>
      </div>
      
      {/* Possession Tracking */}
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Possession Tracking</h3>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm mb-2">Home: {possessionPercentages.home}%</div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${possessionPercentages.home}%`,
                  backgroundColor: selectedMatch.homeTeam.color
                }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-mono">
              {formatTime(homeTeamPossessionTime)} | {formatTime(awayTeamPossessionTime)}
            </div>
          </div>
          
          <div>
            <div className="text-sm mb-2">Away: {possessionPercentages.away}%</div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${possessionPercentages.away}%`,
                  backgroundColor: selectedMatch.awayTeam.color
                }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between space-x-4">
          <button 
            onClick={() => handlePossessionChange(selectedMatch.homeTeam.id)}
            className="flex-1 py-8 rounded-md font-bold text-white"
            style={{ 
              backgroundColor: selectedMatch.homeTeam.color,
              opacity: possessionTeam === selectedMatch.homeTeam.id ? 1 : 0.6
            }}
            disabled={!matchClockRunning}
          >
            {selectedMatch.homeTeam.name} Possession
          </button>
          
          <button
            onClick={handlePausePossession}
            className="px-4 rounded-md font-bold bg-secondary hover:bg-secondary/90"
            disabled={!matchClockRunning}
          >
            {possessionTeam === null ? "No Possession" : "Pause Possession"}
          </button>
          
          <button 
            onClick={() => handlePossessionChange(selectedMatch.awayTeam.id)}
            className="flex-1 py-8 rounded-md font-bold text-white"
            style={{ 
              backgroundColor: selectedMatch.awayTeam.color,
              opacity: possessionTeam === selectedMatch.awayTeam.id ? 1 : 0.6
            }}
            disabled={!matchClockRunning}
          >
            {selectedMatch.awayTeam.name} Possession
          </button>
        </div>
      </div>
      
      {/* Event Recording */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Home Team Events */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4" style={{ color: selectedMatch.homeTeam.color }}>
            {selectedMatch.homeTeam.name} Events
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => recordEvent("goal", selectedMatch.homeTeam.id)}
              className="py-2 border rounded-md hover:bg-accent"
              disabled={!matchStarted}
            >
              Goal ⚽
            </button>
            <button 
              onClick={() => recordEvent("assist", selectedMatch.homeTeam.id)}
              className="py-2 border rounded-md hover:bg-accent"
              disabled={!matchStarted}
            >
              Assist 👟
            </button>
            <button 
              onClick={() => recordEvent("yellowCard", selectedMatch.homeTeam.id)}
              className="py-2 border rounded-md hover:bg-accent"
              disabled={!matchStarted}
            >
              Yellow Card 🟨
            </button>
            <button 
              onClick={() => recordEvent("redCard", selectedMatch.homeTeam.id)}
              className="py-2 border rounded-md hover:bg-accent"
              disabled={!matchStarted}
            >
              Red Card 🟥
            </button>
            <button 
              onClick={() => recordEvent("foul", selectedMatch.homeTeam.id)}
              className="py-2 border rounded-md hover:bg-accent col-span-2"
              disabled={!matchStarted}
            >
              Foul 🥊
            </button>
          </div>
        </div>
        
        {/* Away Team Events */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4" style={{ color: selectedMatch.awayTeam.color }}>
            {selectedMatch.awayTeam.name} Events
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => recordEvent("goal", selectedMatch.awayTeam.id)}
              className="py-2 border rounded-md hover:bg-accent"
              disabled={!matchStarted}
            >
              Goal ⚽
            </button>
            <button 
              onClick={() => recordEvent("assist", selectedMatch.awayTeam.id)}
              className="py-2 border rounded-md hover:bg-accent"
              disabled={!matchStarted}
            >
              Assist 👟
            </button>
            <button 
              onClick={() => recordEvent("yellowCard", selectedMatch.awayTeam.id)}
              className="py-2 border rounded-md hover:bg-accent"
              disabled={!matchStarted}
            >
              Yellow Card 🟨
            </button>
            <button 
              onClick={() => recordEvent("redCard", selectedMatch.awayTeam.id)}
              className="py-2 border rounded-md hover:bg-accent"
              disabled={!matchStarted}
            >
              Red Card 🟥
            </button>
            <button 
              onClick={() => recordEvent("foul", selectedMatch.awayTeam.id)}
              className="py-2 border rounded-md hover:bg-accent col-span-2"
              disabled={!matchStarted}
            >
              Foul 🥊
            </button>
          </div>
        </div>
      </div>
      
      {/* Match Events Log */}
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Match Events</h3>
        
        {matchEvents.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No events recorded yet
          </div>
        ) : (
          <div className="space-y-2">
            {matchEvents.map(event => {
              const team = event.teamId === selectedMatch.homeTeam.id 
                ? selectedMatch.homeTeam 
                : selectedMatch.awayTeam;
              
              let eventText = '';
              switch(event.type) {
                case 'goal':
                  eventText = '⚽ Goal';
                  break;
                case 'assist':
                  eventText = '👟 Assist';
                  break;
                case 'yellowCard':
                  eventText = '🟨 Yellow Card';
                  break;
                case 'redCard':
                  eventText = '🟥 Red Card';
                  break;
                case 'foul':
                  eventText = '🥊 Foul';
                  break;
              }
              
              return (
                <div 
                  key={event.id} 
                  className="p-2 border rounded-md flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <span
                      className="w-4 h-4 rounded-full inline-block mr-2"
                      style={{ backgroundColor: team.color }}
                    ></span>
                    <span>{eventText} - {team.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event.minute}'
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Match Summary - Only show when match is finished */}
      {!matchClockRunning && matchTime > 0 && (
        <div className="border rounded-lg p-4 shadow-sm mt-6 bg-accent/10">
          <h3 className="text-xl font-semibold mb-4">Match Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-lg">Final Score:</div>
              <div className="text-xl font-bold">
                {selectedMatch.homeTeam.name} {homeScore} - {awayScore} {selectedMatch.awayTeam.name}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="text-lg mb-2">Match Statistics:</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{formatTime(matchTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ball Possession:</span>
                  <span>{possessionPercentages.home}% - {possessionPercentages.away}%</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="text-lg mb-2">Event Summary:</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">{selectedMatch.homeTeam.name}</h4>
                  <div className="space-y-1">
                    <div>Goals: {matchEvents.filter(e => e.teamId === selectedMatch.homeTeam.id && e.type === 'goal').length}</div>
                    <div>Yellow Cards: {matchEvents.filter(e => e.teamId === selectedMatch.homeTeam.id && e.type === 'yellowCard').length}</div>
                    <div>Red Cards: {matchEvents.filter(e => e.teamId === selectedMatch.homeTeam.id && e.type === 'redCard').length}</div>
                    <div>Fouls: {matchEvents.filter(e => e.teamId === selectedMatch.homeTeam.id && e.type === 'foul').length}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{selectedMatch.awayTeam.name}</h4>
                  <div className="space-y-1">
                    <div>Goals: {matchEvents.filter(e => e.teamId === selectedMatch.awayTeam.id && e.type === 'goal').length}</div>
                    <div>Yellow Cards: {matchEvents.filter(e => e.teamId === selectedMatch.awayTeam.id && e.type === 'yellowCard').length}</div>
                    <div>Red Cards: {matchEvents.filter(e => e.teamId === selectedMatch.awayTeam.id && e.type === 'redCard').length}</div>
                    <div>Fouls: {matchEvents.filter(e => e.teamId === selectedMatch.awayTeam.id && e.type === 'foul').length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
