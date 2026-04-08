import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Plans from './pages/Plans';
import Coverage from './pages/Coverage';
import PaymentProfile from './pages/PaymentProfile';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://gigshieldbackend.onrender.com';

function App() {
  // Wake up the Render free-tier backend on app load so it's warm before login/signup
  useEffect(() => {
    fetch(`${API_URL}/workers`, { method: 'GET' }).catch(() => {
      // Silently ignore — this is just a warm-up ping
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/coverage" element={<Coverage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Wrapped Dashboard/Internal Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment-profile" element={<PaymentProfile />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
