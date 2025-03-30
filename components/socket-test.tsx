'use client'; // This component needs to run on the client

import React, { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button'; // Assuming you have Shadcn UI Button

const SOCKET_SERVER_URL = 'http://localhost:3001'; // Your Socket.IO server URL

export function SocketTest() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userCount, setUserCount] = useState(0); // State for user count
  const [userList, setUserList] = useState<string[]>([]); // State for user IDs
  const [currentTriggerCount, setCurrentTriggerCount] = useState(0); // State for the shared counter

  useEffect(() => {
    // Initialize socket connection
    const socket: Socket = io(SOCKET_SERVER_URL, {
      // Optional: Add connection options if needed
      // transports: ['websocket'],
    });

    // --- Socket Event Listeners ---
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setIsConnected(true);
      setSocketId(socket.id ?? null); // Use nullish coalescing operator to provide null if socket.id is undefined
      setError(null);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setIsConnected(false);
      setSocketId(null);
      setLastMessage(null); // Clear message on disconnect
      // Optional: Handle reconnection logic here if needed
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setIsConnected(false);
      setError(`Connection failed: ${err.message}`);
    });

    socket.on('welcome', (data: { message: string }) => {
        console.log('Welcome message received:', data);
        setLastMessage(data.message);
    });

    socket.on('test-event', (data: { message: string }) => {
      console.log('test-event received:', data);
      setLastMessage(data.message);
    });

    // Listen for user list updates from the server
    socket.on('update-user-list', (data: { count: number; users: string[] }) => {
      console.log('update-user-list received:', data);
      setUserCount(data.count);
      setUserCount(data.count);
      setUserList(data.users);
    });

    // Listen for counter updates from the server
    socket.on('update-counter', (data: { count: number }) => {
      console.log('update-counter received:', data);
      setCurrentTriggerCount(data.count);
    });

    // --- Cleanup ---
    // Disconnect socket when component unmounts
    return () => {
      console.log('Disconnecting socket...');
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Button Click Handler ---
  const handleTriggerEvent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLastMessage(null); // Clear previous message
    console.log('Triggering socket event via API...');

    try {
      const response = await fetch('/api/trigger-socket-test', {
        method: 'POST',
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('API call failed:', result);
        setError(`API Error: ${result.message || response.statusText}`);
      } else {
        console.log('API call successful:', result);
        // Message will update via socket event listener
      }
    } catch (err) {
      console.error('Error calling API route:', err);
      setError(`Fetch Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="p-4 border rounded-md space-y-3">
      <h2 className="text-lg font-semibold">Socket.IO Test</h2>
      <p className="text-xl font-bold">Trigger Count: {currentTriggerCount}</p> {/* Display the counter */}
      <p>
        Status:{' '}
        <span className={`font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
        {socketId && <span className="text-sm text-gray-500 ml-2">(ID: {socketId})</span>}
      </p>
      {error && <p className="text-red-600 text-sm">Error: {error}</p>}
      <div>
        <Button
          onClick={handleTriggerEvent}
          disabled={!isConnected || isLoading}
        >
          {isLoading ? 'Triggering...' : 'Trigger Test Event'}
        </Button>
      </div>
      {lastMessage && (
        <div className="mt-2 p-3 bg-gray-100 rounded">
          <p className="font-medium">Last Message Received:</p>
          <p className="text-sm">{lastMessage}</p>
        </div>
      )}
      {/* Display Connected Users */}
      <div className="mt-4">
        <h3 className="font-semibold">Connected Users ({userCount})</h3>
        {userList.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-600 max-h-20 overflow-y-auto">
            {userList.map((userId) => (
              <li key={userId} className={userId === socketId ? 'font-bold' : ''}>
                {userId} {userId === socketId ? '(You)' : ''}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No users connected.</p>
        )}
      </div>
    </div>
  );
}
