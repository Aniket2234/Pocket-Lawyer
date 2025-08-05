import { Router, Route, useLocation } from 'wouter';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import KnowledgePage from './pages/KnowledgePage';
import ConsultationPage from './pages/ConsultationPage';
import Footer from './components/Footer';

function App() {
  const [location] = useLocation();
  
  // Determine active section from current route
  const getActiveSection = () => {
    if (location.startsWith('/chat')) return 'chat';
    if (location.startsWith('/knowledge')) return 'knowledge';
    if (location.startsWith('/consultation')) return 'consultation';
    return 'home';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header activeSection={getActiveSection()} />
        <main className="pt-16">
          <Route path="/" component={HomePage} />
          <Route path="/chat" component={ChatPage} />
          <Route path="/knowledge" component={KnowledgePage} />
          <Route path="/consultation" component={ConsultationPage} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;