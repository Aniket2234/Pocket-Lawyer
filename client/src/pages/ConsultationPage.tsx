import { useEffect } from 'react';
import ConsultationBooking from '../components/ConsultationBooking';

export default function ConsultationPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return <ConsultationBooking />;
}