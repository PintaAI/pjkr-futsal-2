"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io"); // Import Socket type
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const connectedClients = new Map(); // Use a Map to store sockets by ID
let triggerCount = 0; // Shared counter state on the server
// Configure CORS for Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow frontend origin (adjust if your frontend runs elsewhere)
        methods: ["GET", "POST"]
    }
});
// Enable CORS for regular HTTP requests as well
app.use((0, cors_1.default)({
    origin: "http://localhost:3000" // Allow frontend origin
}));
// Simple route for basic check
app.get('/', (req, res) => {
    res.send('Socket.IO Server is running!');
});
// Test route to increment counter and emit update
app.get('/api/test-socket', (req, res) => {
    triggerCount++; // Increment the counter
    console.log(`[${new Date().toISOString()}] Test route hit. Incrementing counter to ${triggerCount}. Emitting 'update-counter'...`);
    // Emit the new count to all connected clients
    io.emit('update-counter', { count: triggerCount });
    res.status(200).json({ message: `Counter incremented to ${triggerCount}` });
});
// Helper function to broadcast the updated user list
const broadcastUserList = () => {
    const userIds = Array.from(connectedClients.keys());
    io.emit('update-user-list', { count: connectedClients.size, users: userIds });
    console.log(`[${new Date().toISOString()}] Broadcasting user list: Count=${connectedClients.size}, Users=${userIds.join(', ')}`);
};
// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log(`[${new Date().toISOString()}] User connected: ${socket.id}`);
    connectedClients.set(socket.id, socket); // Add client to map
    broadcastUserList(); // Send updated list to everyone
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`[${new Date().toISOString()}] User disconnected: ${socket.id}`);
        connectedClients.delete(socket.id); // Remove client from map
        broadcastUserList(); // Send updated list to everyone
    });
    // Example: Listen for a message from a client
    socket.on('client-message', (data) => {
        console.log(`[${new Date().toISOString()}] Message from ${socket.id}:`, data);
        // Example: Broadcast message to other clients (excluding sender)
        // socket.broadcast.emit('server-message', { sender: socket.id, message: data });
    });
    // Send a welcome message and the current counter state to the newly connected client
    socket.emit('welcome', { message: `Welcome! You are connected with ID: ${socket.id}` });
    socket.emit('update-counter', { count: triggerCount }); // Send current count on connect
});
const PORT = process.env.SOCKET_PORT || 3001; // Use an environment variable or default
server.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Socket.IO server listening on port ${PORT}`);
});
// Basic error handling for the server
server.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] Server error:`, error);
});
