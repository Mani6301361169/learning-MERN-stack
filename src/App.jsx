import { useState } from 'react';
import LoginPage from './pages/registration/login page/login';
import RegisterPage from './pages/registration/register';
import Dashboard from './components/dashboard/dasboard';
import Layout from './components/layouts/layout';
import StudentPage from './pages/student/StudentPage';
import CompaniesPage from './pages/companies/CompaniesPage';
import PlacementsPage from './pages/placements/PlacementsPage';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
function App() {
  const [isLogin, setLogin] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage isLogin={isLogin} setLogin={setLogin} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/student" element={<Layout><StudentPage /></Layout>} />
      <Route path="/companies" element={<Layout><CompaniesPage /></Layout>} />
      <Route path="/placements" element={<Layout><PlacementsPage /></Layout>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;