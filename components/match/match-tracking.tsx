"use client";

import { useState, useEffect } from "react";
import { EventRecording } from "./components/event-recording";
import { MatchInfo } from "./components/match-info";
import { MatchSummary } from "./components/match-summary";
import { PossessionTracking } from "./components/possession-tracking";

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
      <MatchInfo
        selectedMatch={selectedMatch}
        homeScore={homeScore}
        awayScore={awayScore}
        matchTime={matchTime}
        matchStarted={matchStarted}
        matchClockRunning={matchClockRunning}
        formatTime={formatTime}
        onToggleClock={toggleMatchClock}
        onResetMatch={resetMatch}
        onFinishMatch={() => {
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
      />
      
      <PossessionTracking
        selectedMatch={selectedMatch}
        homeTeamPossessionTime={homeTeamPossessionTime}
        awayTeamPossessionTime={awayTeamPossessionTime}
        possessionTeam={possessionTeam}
        matchClockRunning={matchClockRunning}
        onPossessionChange={handlePossessionChange}
        onPausePossession={handlePausePossession}
        formatTime={formatTime}
      />
      
      <EventRecording
        selectedMatch={selectedMatch}
        matchStarted={matchStarted}
        onRecordEvent={recordEvent}
        matchEvents={matchEvents}
      />
      
      {!matchClockRunning && matchTime > 0 && (
        <MatchSummary
          selectedMatch={selectedMatch}
          homeScore={homeScore}
          awayScore={awayScore}
          matchTime={matchTime}
          matchEvents={matchEvents}
          possessionPercentages={possessionPercentages}
          formatTime={formatTime}
        />
      )}
    </div>
  );
}
