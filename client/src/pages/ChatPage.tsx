import { useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';
import LegalBackground from '../components/LegalBackground';

export default function ChatPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <LegalBackground variant="subtle" className="opacity-15" />
      <div className="relative z-10">
        <ChatInterface />
      </div>
    </div>
  );
}