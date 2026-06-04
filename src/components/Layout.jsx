import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

// Ítems del menú lateral
const navItems = [
  { to: '/inicio',      icon: '◈', label: 'Inicio' },
  { to: '/sumadora',    icon: '⊕', label: 'Sumadora' },
  { to: '/traductor',   icon: '⟐', label: 'Traductor' },
  { to: '/tabla',       icon: '⊞', label: 'Tabla' },
  { to: '/experiencia', icon: '▷', label: 'Experiencia' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div style={styles.shell}>
      {/* Overlay móvil */}
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, transform: open ? 'translateX(0)' : '' }}>
        <div style={styles.brand}>
          <span style={styles.brandDot} />
          <span style={styles.brandName}>MiApp</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.navLinkActive : {}),
              })}
            >
              <span style={styles.navIcon}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <p style={styles.sidebarFooter}>v1.0.0</p>
      </aside>

      {/* Contenido principal */}
      <main style={styles.main}>
        {/* Botón hamburguesa (solo mobile) */}
        <button style={styles.hamburger} onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div style={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

const styles = {
  shell: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 10,
  },
  sidebar: {
    width: 'var(--sidebar-w)',
    minWidth: 'var(--sidebar-w)',
    height: '100vh',
    background: 'rgba(255,255,255,0.03)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.8rem 1.2rem',
    // Mobile: oculto por defecto, se muestra con transform
    '@media (max-width: 640px)': {
      position: 'fixed',
      zIndex: 20,
      transform: 'translateX(-100%)',
      transition: 'transform 0.25s',
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '2.5rem',
  },
  brandDot: {
    width: 10, height: 10,
    borderRadius: '50%',
    background: 'var(--accent)',
    boxShadow: '0 0 10px var(--accent)',
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1.3rem',
    letterSpacing: '-0.01em',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.65rem 0.9rem',
    borderRadius: 9,
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '0.92rem',
    transition: 'all 0.18s',
  },
  navLinkActive: {
    background: 'var(--accent-dim)',
    color: 'var(--accent)',
  },
  navIcon: {
    fontSize: '1.1rem',
    lineHeight: 1,
  },
  sidebarFooter: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginTop: '1rem',
  },
  main: {
    flex: 1,
    overflow: 'auto',
    position: 'relative',
  },
  hamburger: {
    display: 'none', // Se muestra vía media query en CSS real; aquí lo dejamos visible
    position: 'absolute',
    top: '1rem', left: '1rem',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    width: 38, height: 38,
    borderRadius: 8,
    fontSize: '1.1rem',
    cursor: 'pointer',
    zIndex: 5,
  },
  content: {
    padding: '3rem 3rem',
    maxWidth: 780,
    margin: '0 auto',
  },
}