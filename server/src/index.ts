import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const connectedClients = new Map<string, Socket>();

// In-memory storage for match states
interface MatchState {
  matchId: string;
  matchStarted: boolean;
  matchClockRunning: boolean;
  matchTime: number;
  homeScore: number;
  awayScore: number;
  possessionTeam: number | null;
  homeTeamPossessionTime: number;
  awayTeamPossessionTime: number;
  events: any[];
}

const matchStates = new Map<string, MatchState>();

// Configure CORS for Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend origin (adjust if your frontend runs elsewhere)
    methods: ["GET", "POST"]
  }
});

// Enable CORS for regular HTTP requests as well
app.use(cors({
    origin: "http://localhost:3000" // Allow frontend origin
}));

// Simple route for basic check
app.get('/', (req, res) => {
  res.send('Socket.IO Server is running!');
});

// Helper function to broadcast the updated user list
const broadcastUserList = () => {
  const userIds = Array.from(connectedClients.keys());
  io.emit('update-user-list', { count: connectedClients.size, users: userIds });
  console.log(`[${new Date().toISOString()}] Broadcasting user list: Count=${connectedClients.size}, Users=${userIds.join(', ')}`);
};

// Socket.IO connection handling
io.on('connection', (socket: Socket) => {
  console.log(`[${new Date().toISOString()}] User connected: ${socket.id}`);
  connectedClients.set(socket.id, socket);

  // Join match room
  socket.on('join-match', (matchId: string) => {
    console.log(`[${new Date().toISOString()}] User ${socket.id} joined match ${matchId}`);
    socket.join(`match:${matchId}`);
    
    // Send current match state if it exists
    const matchState = matchStates.get(matchId);
    if (matchState) {
      socket.emit('match-state', matchState);
    }
  });

  // Handle match clock updates
  socket.on('update-match-clock', ({ matchId, running, time }: { matchId: string; running: boolean; time: number }) => {
    console.log(`[${new Date().toISOString()}] Match ${matchId} clock update - running: ${running}, time: ${time}`);
    
    let matchState = matchStates.get(matchId);
    if (!matchState) {
      matchState = {
        matchId,
        matchStarted: true,
        matchClockRunning: running,
        matchTime: time,
        homeScore: 0,
        awayScore: 0,
        possessionTeam: null,
        homeTeamPossessionTime: 0,
        awayTeamPossessionTime: 0,
        events: []
      };
      matchStates.set(matchId, matchState);
    } else {
      matchState.matchClockRunning = running;
      matchState.matchTime = time;
    }

    io.to(`match:${matchId}`).emit('match-state', matchState);
  });

  // Handle score updates
  socket.on('update-score', ({ matchId, homeScore, awayScore }: { matchId: string; homeScore: number; awayScore: number }) => {
    console.log(`[${new Date().toISOString()}] Match ${matchId} score update - home: ${homeScore}, away: ${awayScore}`);
    
    const matchState = matchStates.get(matchId);
    if (matchState) {
      matchState.homeScore = homeScore;
      matchState.awayScore = awayScore;
      io.to(`match:${matchId}`).emit('match-state', matchState);
    }
  });

  // Handle possession updates
  socket.on('update-possession', ({ matchId, team, homeTime, awayTime }: { matchId: string; team: number | null; homeTime: number; awayTime: number }) => {
    console.log(`[${new Date().toISOString()}] Match ${matchId} possession update - team: ${team}, home: ${homeTime}, away: ${awayTime}`);
    
    const matchState = matchStates.get(matchId);
    if (matchState) {
      matchState.possessionTeam = team;
      matchState.homeTeamPossessionTime = homeTime;
      matchState.awayTeamPossessionTime = awayTime;
      io.to(`match:${matchId}`).emit('match-state', matchState);
    }
  });

  // Handle match events
  socket.on('record-event', ({ matchId, event }: { matchId: string; event: any }) => {
    console.log(`[${new Date().toISOString()}] Match ${matchId} new event:`, event);
    
    const matchState = matchStates.get(matchId);
    if (matchState) {
      matchState.events.push(event);
      io.to(`match:${matchId}`).emit('match-state', matchState);
    }
  });

  // Handle match reset
  socket.on('reset-match', (matchId: string) => {
    console.log(`[${new Date().toISOString()}] Match ${matchId} reset`);
    
    matchStates.delete(matchId);
    io.to(`match:${matchId}`).emit('match-reset');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`[${new Date().toISOString()}] User disconnected: ${socket.id}`);
    connectedClients.delete(socket.id);
  });
});

const PORT = process.env.SOCKET_PORT || 3001; // Use an environment variable or default
server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Socket.IO server listening on port ${PORT}`);
});

// Basic error handling for the server
server.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] Server error:`, error);
});
