import { useState } from 'react'

// Unidades del 1 al 19
const unidades = [
  '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
  'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis',
  'diecisiete', 'dieciocho', 'diecinueve',
]

// Decenas
const decenas = [
  '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
  'sesenta', 'setenta', 'ochenta', 'noventa',
]

/**
 * Convierte un número entero entre 1 y 1000 a su representación en español.
 * No usa ninguna librería ni API externa.
 */
function numeroALetras(n) {
  if (n === 1000) return 'mil'

  if (n < 20) return unidades[n]

  if (n < 30) {
    // 21-29: "veintiuno", "veintidós", etc.
    return n === 20 ? 'veinte' : 'veinti' + unidades[n - 20]
  }

  if (n < 100) {
    const dec = Math.floor(n / 10)
    const uni = n % 10
    return uni === 0 ? decenas[dec] : decenas[dec] + ' y ' + unidades[uni]
  }

  if (n < 200) {
    const resto = n - 100
    return resto === 0 ? 'cien' : 'ciento ' + numeroALetras(resto)
  }

  // 200–999: doscientos, trescientos, etc.
  const centenas = [
    '', '', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos',
    'seiscientos', 'setecientos', 'ochocientos', 'novecientos',
  ]
  const c = Math.floor(n / 100)
  const resto = n % 100
  return resto === 0 ? centenas[c] : centenas[c] + ' ' + numeroALetras(resto)
}

export default function Traductor() {
  const [valor, setValor] = useState('')
  const [letras, setLetras] = useState('')
  const [error, setError] = useState('')

  const traducir = () => {
    const n = parseInt(valor, 10)
    if (isNaN(n) || n < 1 || n > 1000) {
      setError('Ingresa un número entre 1 y 1000.')
      setLetras('')
      return
    }
    setError('')
    setLetras(numeroALetras(n))
  }

  return (
    <div>
      <h1 className="page-title">Traductor</h1>
      <p className="page-subtitle">Número a letras en español (1 – 1000)</p>

      <div className="card" style={{ maxWidth: 460 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
          <label style={styles.label}>Número</label>
          <input
            className="input"
            type="number"
            min="1"
            max="1000"
            placeholder="Ej. 347"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && traducir()}
          />
          {error && <span style={styles.error}>{error}</span>}
        </div>

        <button className="btn" onClick={traducir}>Traducir</button>

        {letras && (
          <div style={styles.result}>
            <span style={styles.resultLabel}>En letras</span>
            {/* Primera letra en mayúscula */}
            <span style={styles.resultValue}>
              {letras.charAt(0).toUpperCase() + letras.slice(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  label: { fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' },
  error: { fontSize: '0.8rem', color: '#f56262' },
  result: {
    marginTop: '1.5rem',
    padding: '1.2rem 1.5rem',
    background: 'var(--accent-dim)',
    border: '1px solid rgba(245,166,35,0.3)',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  resultLabel: { fontSize: '0.72rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' },
  resultValue: { fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.3 },
}