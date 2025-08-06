import { useEffect } from 'react';
import KnowledgeBase from '../components/KnowledgeBase';

export default function KnowledgePage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return <KnowledgeBase />;
}