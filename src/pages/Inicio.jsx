// Página de presentación personal
export default function Inicio() {
  return (
    <div>
      <h1 className="page-title">Hola, bienvenido 👋</h1>
      <p className="page-subtitle">Datos personales del desarrollador</p>

      <div className="card" style={styles.card}>
        {/* Foto 2x2 */}
        <div style={styles.photoWrap}>
          <img
            src="/foto.jpg"
            alt="Foto de perfil"
            style={styles.photo}
            onError={(e) => {
              // Placeholder si no se encuentra la foto
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          {/* Fallback visual */}
          <div style={{ ...styles.photoFallback, display: 'none' }}>
            <span style={{ fontSize: '2.5rem' }}>👤</span>
          </div>
        </div>

        {/* Datos */}
        <div style={styles.info}>
          <div style={styles.field}>
            <span style={styles.label}>Nombre</span>
            <span style={styles.value}>Sebastian</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Apellido</span>
            <span style={styles.value}>Pilier Mercedes</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Correo</span>
            <span style={styles.value}>20240132@itla.edu.do</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
    flexWrap: 'wrap',
  },
  photoWrap: {
    flexShrink: 0,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid var(--accent)',
    boxShadow: '0 0 30px rgba(245,166,35,0.25)',
  },
  photoFallback: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    background: 'var(--bg-elevated)',
    border: '3px solid var(--border)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  label: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
  },
  value: {
    fontSize: '1.05rem',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
  },
}