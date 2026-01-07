
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/auth/Login';
import { Logout } from './pages/auth/Logout';
import { ClientHome } from './pages/client/Home';
import { BookingPage } from './pages/client/Booking';
import { MyBookings } from './pages/client/MyBookings';
import { ProfilePage } from './pages/client/Profile';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminServices } from './pages/admin/Services';
import { AdminTeam } from './pages/admin/Team';
import { AdminClients } from './pages/admin/Clients';
import { AdminSettings } from './pages/admin/Settings';
import { AdminSchedule } from './pages/admin/Schedule';
import { BusinessHub } from './pages/admin/BusinessHub';
import { AdminMarketing } from './pages/admin/Marketing';
import { AdminInventory } from './pages/admin/Inventory';
import { authService } from './services/authService';
import { UserRole } from './types';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: UserRole[] }> = ({ children, allowedRoles }) => {
  const user = authService.getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === UserRole.ADMIN ? '/admin' : '/'} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Public Routes - Landing Page is now the first thing users see */}
        <Route path="/" element={
          <Layout><ClientHome /></Layout>
        } />

        {/* Protected Client Routes */}
        <Route path="/booking" element={
          <ProtectedRoute allowedRoles={[UserRole.CLIENT]}>
            <Layout><BookingPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/my-bookings" element={
          <ProtectedRoute allowedRoles={[UserRole.CLIENT]}>
            <Layout><MyBookings /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={[UserRole.CLIENT]}>
            <Layout><ProfilePage /></Layout>
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><AdminDashboard /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/schedule" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><AdminSchedule /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/business" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><BusinessHub /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/marketing" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><AdminMarketing /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/inventory" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><AdminInventory /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/clients" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><AdminClients /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/services" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><AdminServices /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/team" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><AdminTeam /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/settings" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout><AdminSettings /></Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
