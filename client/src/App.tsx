import { Router, Route, useLocation } from 'wouter';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import KnowledgePage from './pages/KnowledgePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import DocumentAnalysisPage from './pages/DocumentAnalysisPage';
import LegalTemplatesPage from './pages/LegalTemplatesPage';
import CaseLawPage from './pages/CaseLawPage';
import StateLawGuidesPage from './pages/StateLawGuidesPage';
import Footer from './components/Footer';

function App() {
  const [location] = useLocation();
  
  // Determine active section from current route
  const getActiveSection = () => {
    if (location.startsWith('/chat')) return 'chat';
    if (location.startsWith('/knowledge')) return 'knowledge';
    if (location.startsWith('/documents')) return 'documents';
    if (location.startsWith('/templates')) return 'templates';
    if (location.startsWith('/cases')) return 'cases';
    if (location.startsWith('/guides')) return 'guides';
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
          <Route path="/knowledge/article/:id" component={ArticleDetailPage} />
          <Route path="/documents" component={DocumentAnalysisPage} />
          <Route path="/templates" component={LegalTemplatesPage} />
          <Route path="/cases" component={CaseLawPage} />
          <Route path="/guides" component={StateLawGuidesPage} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;