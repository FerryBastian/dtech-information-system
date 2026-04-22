import { useState, useEffect } from 'react'

const GlobalAchievement = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    const el = document.getElementById('global-achievement')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="global-achievement" style={{ background: '#000', padding: '5rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '3.5rem',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s ease',
        }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            GLOBAL ACHIEVEMENT
          </h2>
        </div>

        {/* Top: image left + text right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
          transition: 'all 0.7s ease 0.15s',
        }} className="achieve-row">
          <div style={{ position: 'relative', minHeight: '280px', overflow: 'hidden' }}>
            <img src="/GA1.jpg" alt="Jet Engine"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) grayscale(20%)' }} />

          </div>
          <div style={{ background: '#0d0d0d', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.3)', borderRadius: '20px', padding: '3px 12px', marginBottom: '1.25rem', width: 'fit-content' }}>
              <span style={{ fontFamily: 'Rajdhani', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.15em', color: '#00b4d8' }}>1ST PLACE</span>
            </div>
            <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1rem, 2.2vw, 1.65rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              GE &amp; FUSE – ON WING JET ENGINE INSPECTION DESIGN
            </h3>
            <p style={{ fontSize: '0.86rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.62)', marginBottom: '1.5rem' }}>
              We are solving an "almost impossible" problem to upgrade an engine inspection device. The objective is to improve the safety and efficiency of commercial aircraft. We are combining multi-axis robotic arms and advanced sensors with artificial intelligence to get things done.
            </p>
            <p style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
              Trusted by 47 of the best research institutions worldwide
            </p>
            <a href="#" style={{ alignSelf: 'flex-start', padding: '0.6rem 1.75rem', background: '#00b4d8', color: '#000', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', borderRadius: '4px', textDecoration: 'none' }}>LEARN MORE</a>
          </div>
        </div>

        {/* Bottom: text left + aircraft image right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
          transition: 'all 0.7s ease 0.3s',
        }} className="achieve-row">
          <div style={{ background: '#0d0d0d', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', letterSpacing: '0.03em' }}>
              Ultralight Aircraft Development
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem' }}>
              {['Fuel consumption of 3.5 liters per hour', 'Capable of performing loop maneuvers and gliding', 'The aircraft has been certified by the FAA', 'Manufactured in Wichita, Kansas'].map((p, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.55rem 0', fontSize: '0.86rem', fontWeight: 300, color: 'rgba(255,255,255,0.68)', lineHeight: 1.6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#00b4d8', fontWeight: 700, flexShrink: 0 }}>—</span>{p}
                </li>
              ))}
            </ul>
            <a href="#" style={{ alignSelf: 'flex-start', padding: '0.6rem 1.75rem', background: '#00b4d8', color: '#000', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', borderRadius: '4px', textDecoration: 'none' }}>LEARN MORE</a>
          </div>
          <div style={{ position: 'relative', minHeight: '260px', overflow: 'hidden' }}>
            <img src="/GA2.png" alt="Ultralight Aircraft"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
          </div>
        </div>

      </div>
      <style>{`@media(max-width:768px){.achieve-row{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

export default GlobalAchievement