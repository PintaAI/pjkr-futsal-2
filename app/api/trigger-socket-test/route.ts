import { NextResponse } from 'next/server';

// URL of your separate Socket.IO server's test endpoint
const SOCKET_SERVER_TEST_URL = 'http://localhost:3001/api/test-socket';

export async function POST() {
  try {
    console.log('API route /api/trigger-socket-test called. Fetching backend...');
    const response = await fetch(SOCKET_SERVER_TEST_URL, { method: 'GET' }); // The backend route uses GET

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching backend: ${response.status} ${response.statusText}`, errorText);
      return NextResponse.json({ message: `Error triggering socket event: ${response.statusText}`, error: errorText }, { status: response.status });
    }

    const data = await response.json();
    console.log('Backend response:', data);
    return NextResponse.json({ message: 'Socket event triggered successfully via API route', backendResponse: data });

  } catch (error) {
    console.error('Error in API route /api/trigger-socket-test:', error);
    return NextResponse.json({ message: 'Internal server error in API route', error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

// Optional: Add a GET handler if you want to test this route directly via browser
export async function GET() {
    return NextResponse.json({ message: 'Use POST method to trigger the socket test event.' });
}
