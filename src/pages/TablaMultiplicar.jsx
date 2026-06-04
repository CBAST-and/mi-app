import { useState } from 'react'

export default function TablaMultiplicar() {
  const [num, setNum] = useState('')
  const [tabla, setTabla] = useState([])

  // Genera un array con las filas de la tabla hasta el 13
  const generar = () => {
    const n = parseInt(num, 10)
    if (isNaN(n)) return
    const filas = Array.from({ length: 13 }, (_, i) => ({
      multiplicador: i + 1,
      resultado: n * (i + 1),
    }))
    setTabla(filas)
  }

  return (
    <div>
      <h1 className="page-title">Tabla de Multiplicar</h1>
      <p className="page-subtitle">Genera la tabla de cualquier número hasta el ×13</p>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={styles.label}>Número</label>
          <input
            className="input"
            type="number"
            placeholder="Ej. 7"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generar()}
            style={{ width: 140 }}
          />
        </div>
        <button className="btn" onClick={generar}>Generar</button>
      </div>

      {tabla.length > 0 && (
        <div style={styles.grid}>
          {tabla.map(({ multiplicador, resultado }) => (
            <div key={multiplicador} style={styles.row}>
              <span style={styles.numBase}>{num}</span>
              <span style={styles.op}>×</span>
              <span style={styles.mult}>{multiplicador}</span>
              <span style={styles.eq}>=</span>
              <span style={styles.res}>{resultado}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  label: { fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '0.6rem',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 9,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    transition: 'border-color 0.2s',
    cursor: 'default',
  },
  numBase: { fontSize: '1rem', minWidth: 24, textAlign: 'right' },
  op: { color: 'var(--text-muted)', fontSize: '0.9rem' },
  mult: { fontSize: '1rem', minWidth: 22 },
  eq: { color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: 'auto' },
  res: { fontSize: '1.15rem', color: 'var(--accent)', minWidth: 40, textAlign: 'right' },
}