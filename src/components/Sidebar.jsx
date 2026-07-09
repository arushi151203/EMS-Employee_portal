import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, User, Clock, Calendar, Wallet, CheckSquare,
  TrendingUp, MessageSquare, Bell, GraduationCap, FileText, Settings, Layers
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/attendance', label: 'Attendance', icon: Clock },
  { to: '/leave', label: 'Leave', icon: Calendar },
  { to: '/payroll', label: 'Payroll', icon: Wallet },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/performance', label: 'Performance', icon: TrendingUp },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/training', label: 'Training', icon: GraduationCap },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: '230px',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px 20px' }}>
        <div
          style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: 'var(--accent-blue)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Layers size={16} color="white" />
        </div>
        <span style={{ fontWeight: 700, fontSize: '15px' }}>Nexus HR</span>
      </div>

      <div style={{ fontSize: '10.5px', letterSpacing: '0.06em', color: 'var(--text-muted)', padding: '4px 10px 8px' }}>
        EMPLOYEE PORTAL
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              borderRadius: '8px',
              fontSize: '13.5px',
              textDecoration: 'none',
              color: isActive ? 'white' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-blue)' : 'transparent',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
