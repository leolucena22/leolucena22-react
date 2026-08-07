import { useState, useEffect, useCallback } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from 'lucide-react';

const MOBILE_BREAKPOINT = 768;

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const navItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Visão Geral', end: true },
    { to: '/admin/posts', icon: <FileText size={20} />, label: 'Meus Posts' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Configurações' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'var(--bg-deep)',
        color: 'var(--text-primary)',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* ── Mobile Top Bar ── */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)',
            zIndex: 1100,
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--accent)' }}>
            Painel Admin
          </h2>
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* ── Overlay (mobile only) ── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1040,
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          height: '100vh',
          backgroundColor: 'var(--bg-card)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          overflowY: 'auto',
          zIndex: 1050,
          transition: 'transform 0.3s ease',
          ...(isMobile
            ? {
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              }
            : {
                position: 'relative',
                transform: 'none',
              }),
        }}
      >
        {/* Sidebar Header */}
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--accent)' }}>Painel Admin</h2>
        </div>

        {/* Nav Links */}
        <div style={{ flexGrow: 1, padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeSidebar}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.85rem 1.5rem',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(0, 229, 255, 0.05)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'all 0.15s ease',
              })}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '0.75rem 1rem',
              background: 'none',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
          >
            <LogOut size={20} /> Sair
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: isMobile ? '1rem' : '2rem',
          paddingTop: isMobile ? '72px' : '2rem',
          height: '100vh',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
