"use client";

import { useState, useEffect, useCallback } from "react";
import { Socket, io } from "socket.io-client";
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
  const [socket, setSocket] = useState<Socket | null>(null);
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

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Join match room and handle socket events
  useEffect(() => {
    if (!socket) return;

    // Join match room
    socket.emit("join-match", matchId);

    // Listen for match state updates
    socket.on("match-state", (state) => {
      setMatchStarted(state.matchStarted);
      setMatchClockRunning(state.matchClockRunning);
      setMatchTime(state.matchTime);
      setHomeScore(state.homeScore);
      setAwayScore(state.awayScore);
      setPossessionTeam(state.possessionTeam);
      setHomeTeamPossessionTime(state.homeTeamPossessionTime);
      setAwayTeamPossessionTime(state.awayTeamPossessionTime);
      setMatchEvents(state.events);
    });

    // Listen for match reset from other clients
    socket.on("match-reset", () => {
      // Reset all state
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
    });

    return () => {
      socket.off("match-state");
      socket.off("match-reset");
    };
  }, [socket, matchId]);

  // Set initial match data
  useEffect(() => {
    const match = MOCK_MATCHES.find(m => m.id.toString() === matchId);
    if (match) setSelectedMatch(match);
  }, [matchId]);
  
  // Start/stop match timer
  const toggleMatchClock = useCallback(() => {
    if (matchClockRunning) {
      if (matchTimerId) clearInterval(matchTimerId);
      setMatchClockRunning(false);
      
      // Also stop possession timer if running
      if (possessionTeam !== null) {
        updatePossessionTime();
        setPossessionTeam(null);
        setPossessionStartTime(null);
      }

      // Emit clock update
      socket?.emit("update-match-clock", {
        matchId,
        running: false,
        time: matchTime
      });
    } else {
      const timerId = setInterval(() => {
        setMatchTime(prev => {
          const newTime = prev + 1;
          // Emit clock update
          socket?.emit("update-match-clock", {
            matchId,
            running: true,
            time: newTime
          });
          return newTime;
        });
      }, 1000);
      setMatchTimerId(timerId);
      setMatchClockRunning(true);
      setMatchStarted(true);

      // Initial clock update emit
      socket?.emit("update-match-clock", {
        matchId,
        running: true,
        time: matchTime
      });
    }
  }, [matchClockRunning, matchTimerId, matchTime, socket, matchId, possessionTeam]);
  
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
  const updatePossessionTime = useCallback(() => {
    if (possessionTeam === null || possessionStartTime === null) return;
    
    const currentTime = Date.now();
    const possessionDuration = Math.round((currentTime - possessionStartTime) / 1000);
    
    // Calculate new possession times
    const newHomeTime = possessionTeam === selectedMatch?.homeTeam.id 
      ? homeTeamPossessionTime + possessionDuration 
      : homeTeamPossessionTime;
      
    const newAwayTime = possessionTeam === selectedMatch?.awayTeam.id
      ? awayTeamPossessionTime + possessionDuration
      : awayTeamPossessionTime;
    
    // Update state with new times
    setHomeTeamPossessionTime(newHomeTime);
    setAwayTeamPossessionTime(newAwayTime);

    // Emit possession update with calculated times
    socket?.emit("update-possession", {
      matchId,
      team: possessionTeam,
      homeTime: newHomeTime,
      awayTime: newAwayTime
    });
  }, [possessionTeam, possessionStartTime, selectedMatch, socket, matchId, homeTeamPossessionTime, awayTeamPossessionTime]);
  
  // Handle possession change
  const handlePossessionChange = useCallback((teamId: number) => {
    if (!matchClockRunning) return;
    
    let newHomeTime = homeTeamPossessionTime;
    let newAwayTime = awayTeamPossessionTime;
    
    // Update current possession time if any
    if (possessionTeam !== null && possessionStartTime !== null) {
      const currentTime = Date.now();
      const possessionDuration = Math.round((currentTime - possessionStartTime) / 1000);
      
      if (possessionTeam === selectedMatch?.homeTeam.id) {
        newHomeTime += possessionDuration;
      } else if (possessionTeam === selectedMatch?.awayTeam.id) {
        newAwayTime += possessionDuration;
      }
    }
    
    // Update states
    setHomeTeamPossessionTime(newHomeTime);
    setAwayTeamPossessionTime(newAwayTime);
    setPossessionTeam(teamId);
    setPossessionStartTime(Date.now());

    // Emit possession update with latest times
    socket?.emit("update-possession", {
      matchId,
      team: teamId,
      homeTime: newHomeTime,
      awayTime: newAwayTime
    });
  }, [matchClockRunning, possessionTeam, updatePossessionTime, socket, matchId, homeTeamPossessionTime, awayTeamPossessionTime]);
  
  // Record a match event
  const recordEvent = useCallback((type: MatchEvent["type"], teamId: number) => {
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
        setHomeScore(prev => {
          const newScore = prev + 1;
          // Emit score update
          socket?.emit("update-score", {
            matchId,
            homeScore: newScore,
            awayScore
          });
          return newScore;
        });
      } else {
        setAwayScore(prev => {
          const newScore = prev + 1;
          // Emit score update
          socket?.emit("update-score", {
            matchId,
            homeScore,
            awayScore: newScore
          });
          return newScore;
        });
      }
    }

    // Emit event
    socket?.emit("record-event", {
      matchId,
      event: newEvent
    });
  }, [selectedMatch, matchStarted, matchTime, socket, matchId, homeScore, awayScore]);
  
  // Reset the match
  const resetMatch = useCallback(() => {
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

    // Emit reset
    socket?.emit("reset-match", matchId);
  }, [matchTimerId, socket, matchId]);
  
  // Handle pausing possession
  const handlePausePossession = useCallback(() => {
    if (!matchClockRunning) return;
    
    if (possessionTeam !== null) {
      updatePossessionTime();
      setPossessionTeam(null);
      setPossessionStartTime(null);

      // Emit possession update
      socket?.emit("update-possession", {
        matchId,
        team: null,
        homeTime: homeTeamPossessionTime,
        awayTime: awayTeamPossessionTime
      });
    }
  }, [matchClockRunning, possessionTeam, updatePossessionTime, socket, matchId, homeTeamPossessionTime, awayTeamPossessionTime]);

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

          // Emit clock update
          socket?.emit("update-match-clock", {
            matchId,
            running: false,
            time: matchTime
          });
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
