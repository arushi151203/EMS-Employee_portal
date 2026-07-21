import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AppShell } from '@/components/layout/AppShell';
import { isAuthenticated } from '@/lib/auth';
import HRShell from './hr/components/HRShell';
import AdminShell from './admin/components/AdminShell';

import Login from './pages/Login';
import Dashboard from './employee/pages/Dashboard';
import Profile from './employee/pages/Profile';
import Attendance from './employee/pages/Attendance';
import Leave from './employee/pages/Leave';
import Payroll from './employee/pages/Payroll';
import Tasks from './employee/pages/Tasks';
import Performance from './employee/pages/Performance';
import Chat from './employee/pages/Chat';
import Notifications from './employee/pages/Notifications';
import Training from './employee/pages/Training';
import Documents from './employee/pages/Documents';
import Settings from './employee/pages/Settings';
import HRDashboard from './hr/pages/Dashboard';
import HRPerformance from './hr/pages/Performance';
import AdminDashboard from './admin/pages/Dashboard';

function RequireAuth({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<RequireAuth><AppShell /></RequireAuth>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/training" element={<Training />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/hr" element={<RequireAuth><HRShell /></RequireAuth>}>
          <Route index element={<HRDashboard />} />
          <Route path="performance" element={<HRPerformance />} />
        </Route>

        <Route path="/admin" element={<RequireAuth><AdminShell /></RequireAuth>}>
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}