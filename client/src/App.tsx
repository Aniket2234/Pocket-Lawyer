import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ChatInterface from './components/ChatInterface';
import KnowledgeBase from './components/KnowledgeBase';
import ConsultationBooking from './components/ConsultationBooking';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatInterface />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'consultation':
        return <ConsultationBooking />;
      default:
        return (
          <>
            <Hero onGetStarted={() => setActiveSection('chat')} />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="pt-16">
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
}

export default App;