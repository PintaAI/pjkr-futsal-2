import { LandingPage } from "@/components/landing-page";
import { SocketTest } from "@/components/socket-test"; // Import the new component

export default function Home() {
  return (
    <div>
      <LandingPage />
      <div className="container mx-auto px-4 py-8"> {/* Add some spacing */}
        <SocketTest />
      </div>
    </div>
  );
}
