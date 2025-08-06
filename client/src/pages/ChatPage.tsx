import ChatInterface from '../components/ChatInterface';
import LegalBackground from '../components/LegalBackground';

export default function ChatPage() {
  return (
    <div className="relative min-h-screen">
      <LegalBackground variant="subtle" className="opacity-15" />
      <div className="relative z-10">
        <ChatInterface />
      </div>
    </div>
  );
}