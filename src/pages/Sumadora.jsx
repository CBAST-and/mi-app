import { useState } from 'react'

export default function Sumadora() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [resultado, setResultado] = useState(null)

  // Calcula la suma de los dos campos
  const sumar = () => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)
    if (isNaN(numA) || isNaN(numB)) return
    setResultado(numA + numB)
  }

  const limpiar = () => { setA(''); setB(''); setResultado(null) }

  return (
    <div>
      <h1 className="page-title">Sumadora</h1>
      <p className="page-subtitle">Ingresa dos números para obtener su suma</p>

      <div className="card" style={styles.form}>
        <div style={styles.row}>
          <div style={styles.group}>
            <label style={styles.label}>Primer número</label>
            <input
              className="input"
              type="number"
              placeholder="Ej. 12"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>

          <span style={styles.plus}>+</span>

          <div style={styles.group}>
            <label style={styles.label}>Segundo número</label>
            <input
              className="input"
              type="number"
              placeholder="Ej. 8"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button className="btn" onClick={sumar}>Calcular</button>
          <button
            className="btn"
            onClick={limpiar}
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
          >
            Limpiar
          </button>
        </div>

        {resultado !== null && (
          <div style={styles.result}>
            <span style={styles.resultLabel}>Resultado</span>
            <span style={styles.resultValue}>{resultado}</span>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  form: { maxWidth: 520 },
  row: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  group: { flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' },
  plus: { fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', paddingBottom: '0.2rem' },
  result: {
    marginTop: '1.5rem',
    padding: '1.2rem 1.5rem',
    background: 'var(--accent-dim)',
    border: '1px solid rgba(245,166,35,0.3)',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  resultLabel: { fontSize: '0.72rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' },
  resultValue: { fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 },
}