import { useLocation } from 'wouter';
import Hero from '../components/Hero';
import Features from '../components/Features';

export default function HomePage() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation('/chat');
  };

  return (
    <>
      <Hero onGetStarted={handleGetStarted} />
      <Features />
    </>
  );
}