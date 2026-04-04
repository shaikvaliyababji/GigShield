import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Plans from './pages/Plans';
import Coverage from './pages/Coverage';
import PaymentProfile from './pages/PaymentProfile';
import './index.css';

function App() {
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
