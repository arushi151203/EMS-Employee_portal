import { Search, Bell } from 'lucide-react';

export default function Topbar() {
  return (
    <header
      style={{
        height: '60px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        background: 'var(--bg-page)',
      }}
    >
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
          borderRadius: '8px', padding: '7px 12px', width: '260px',
        }}
      >
        <Search size={15} color="var(--text-muted)" />
        <input
          placeholder="Search..."
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-primary)', fontSize: '13px', width: '100%',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div style={{ position: 'relative' }}>
          <Bell size={18} color="var(--text-secondary)" />
          <span
            style={{
              position: 'absolute', top: '-2px', right: '-2px',
              width: '7px', height: '7px', borderRadius: '50%',
              background: 'var(--accent-blue)',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--accent-blue)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 600,
            }}
          >
            AC
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.2 }}>Alex Chen</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Senior Engineer</div>
          </div>
        </div>
      </div>
    </header>
  );
}