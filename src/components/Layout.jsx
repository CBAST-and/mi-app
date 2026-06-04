import { NavLink, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

const navItems = [
  { to: '/inicio',      icon: '◈', label: 'Inicio' },
  { to: '/sumadora',    icon: '⊕', label: 'Sumadora' },
  { to: '/traductor',   icon: '⟐', label: 'Traductor' },
  { to: '/tabla',       icon: '⊞', label: 'Tabla' },
  { to: '/experiencia', icon: '▷', label: 'Experiencia' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Detecta cambios de tamaño de pantalla
  useEffect(() => {
    const handle = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setOpen(false) // cierra el drawer al pasar a escritorio
    }
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  // Evita scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div style={styles.shell}>

      {/* ── Overlay oscuro al abrir menú en móvil ── */}
      {open && isMobile && (
        <div style={styles.overlay} onClick={() => setOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        ...styles.sidebar,
        // En móvil: drawer que entra desde la izquierda
        ...(isMobile ? {
          position: 'fixed',
          top: 0, left: 0,
          height: '100dvh',
          zIndex: 30,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: open ? '4px 0 40px rgba(0,0,0,0.5)' : 'none',
        } : {
          position: 'relative',
          transform: 'none',
          transition: 'none',
        })
      }}>
        {/* Cabecera del sidebar */}
        <div style={styles.brand}>
          <span style={styles.brandDot} />
          <span style={styles.brandName}>MiApp</span>
          {/* Botón cerrar solo en móvil dentro del drawer */}
          {isMobile && (
            <button style={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
          )}
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

      {/* ── Contenido principal ── */}
      <main style={styles.main}>

        {/* Topbar móvil con hamburguesa */}
        {isMobile && (
          <div style={styles.topbar}>
            <button style={styles.hamburger} onClick={() => setOpen(true)}>
              <span style={styles.hamburgerLine} />
              <span style={styles.hamburgerLine} />
              <span style={styles.hamburgerLine} />
            </button>
            <span style={styles.topbarTitle}>MiApp</span>
            {/* Espacio para centrar el título visualmente */}
            <div style={{ width: 38 }} />
          </div>
        )}

        <div style={{
          ...styles.content,
          // En móvil menos padding y sin máximo tan estrecho
          ...(isMobile ? { padding: '1.5rem 1.2rem' } : {}),
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

const styles = {
  shell: {
    display: 'flex',
    height: '100dvh',  // dvh respeta la barra del navegador móvil
    overflow: 'hidden',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.65)',
    zIndex: 20,
    backdropFilter: 'blur(2px)',
  },
  sidebar: {
    width: 'var(--sidebar-w)',
    minWidth: 'var(--sidebar-w)',
    height: '100dvh',
    background: '#0f1014',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.8rem 1.2rem',
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
    flexShrink: 0,
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1.3rem',
    letterSpacing: '-0.01em',
    flex: 1,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '0.2rem',
    lineHeight: 1,
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
    padding: '0.75rem 0.9rem',
    borderRadius: 9,
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '0.95rem',
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
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0, // evita que el contenido desborde
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.9rem 1.2rem',
    borderBottom: '1px solid var(--border)',
    background: '#0f1014',
    flexShrink: 0,
  },
  topbarTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1.1rem',
  },
  hamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    padding: '0.2rem',
    width: 38,
  },
  hamburgerLine: {
    display: 'block',
    width: 22,
    height: 2,
    background: 'var(--text-primary)',
    borderRadius: 2,
  },
  content: {
    padding: '3rem',
    maxWidth: 780,
    margin: '0 auto',
    width: '100%',
  },
}