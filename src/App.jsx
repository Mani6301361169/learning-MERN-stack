import LoginPage from './pages/registration/login page/login';
import RegisterPage from './pages/registration/register';
import Dashboard from './components/dashboard/dasboard';
import Layout from './components/layouts/layout';
import StudentPage from './pages/student/StudentPage';
import CompaniesPage from './pages/companies/CompaniesPage';
import PlacementsPage from './pages/placements/PlacementsPage';
import './App.css';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  if (location.pathname === '/login') {
    return <LoginPage />;
  }

  if (location.pathname === '/' || location.pathname === '/register') {
    return (
      <div className="landing-page">
        <RegisterPage />

        <div className="landing-panel">
          <h3>Continue to your dashboard</h3>
          <p>After creating your account, you can explore placements, companies, and student updates.</p>
          <div className="landing-actions">
            <Link to="/dashboard" className="landing-btn primary">Go to Dashboard</Link>
            <Link to="/login" className="landing-btn secondary">Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;