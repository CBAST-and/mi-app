// El video ID de YouTube se puede cambiar para mostrar un video diferente
const VIDEO_ID = 'wzSQNv56uP4' 

export default function Experiencia() {
  return (
    <div>
      <h1 className="page-title">Mi Experiencia</h1>
      <p className="page-subtitle">Video explicando el proceso de desarrollo de esta tarea</p>

      {/* Contenedor del iframe con aspect-ratio 16:9 */}
      <div style={styles.videoWrap}>
        <iframe
          style={styles.iframe}
          src={`https://www.youtube.com/embed/${VIDEO_ID}`}
          title="Video de experiencia personal"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="card" style={{ marginTop: '1.5rem', maxWidth: 620 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          En este video explico paso a paso cómo construí la aplicación:
          la estructura de carpetas, la lógica del traductor de números y las decisiones de diseño
          que tomé para lograr una interfaz limpia y funcional.
        </p>
      </div>
    </div>
  )
}

const styles = {
  videoWrap: {
    position: 'relative',
    width: '100%',
    maxWidth: 720,
    aspectRatio: '16 / 9',
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid var(--border)',
    background: '#000',
  },
  iframe: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  },
}