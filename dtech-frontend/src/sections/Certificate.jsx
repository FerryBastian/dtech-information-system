import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHero from './PageHero'

const allCerts = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  title: 'Industrial Design Certificate',
  img: `/cert${i + 1}.jpg`,
}))

const VISIBLE = 4

const Certificate = ({ variant = 'slider', withPageHero = false }) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (variant !== 'slider') return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })

    const element = document.getElementById('certificate')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [variant])

  if (variant === 'gallery') {
    return (
      <section style={{ background: '#000', minHeight: '100vh', paddingTop: '64px' }}>
        <div style={{ textAlign: 'center', padding: '4rem 6vw 3rem' }}>
          <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>
            Patents Industrial Design Certificate
          </h1>
          <p style={{ fontFamily: 'Rajdhani', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
            PT Dtech Inovasi Indonesia
          </p>
        </div>

        <div style={{ padding: '0 6vw', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }} className="cert-page-grid">
            {allCerts.map((cert) => (
              <div
                key={cert.id}
                style={{ background: '#fff', borderRadius: '3px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)'
                }}
              >
                <img src={cert.img} alt={`Certificate ${cert.id}`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: '4rem 0 2rem' }}>
            <p style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, color: '#fff', fontStyle: 'italic' }}>
              "And more to come"
            </p>
          </div>

          <div style={{ textAlign: 'center', paddingBottom: '6rem' }}>
            <button
              onClick={() => navigate('/')}
              style={{ padding: '0.75rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}
            >
              ← BACK TO HOME
            </button>
          </div>
        </div>

        <style>{`
          @media(max-width:900px){.cert-page-grid{grid-template-columns:repeat(2,1fr)!important}}
          @media(max-width:480px){.cert-page-grid{grid-template-columns:1fr!important}}
        `}</style>
      </section>
    )
  }

  const maxIndex = allCerts.length - VISIBLE

  return (
    <>
      {withPageHero ? (
        <PageHero image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80" eyebrow="PATENTS & LEGALITY" title="LEGALITY CERTIFICATE" />
      ) : null}

      <section id="certificate" style={{ background: '#0a0a0a', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6vw' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
            <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.4em', color: '#00b4d8', marginBottom: '1rem' }}>PATENTS & LEGALITY</div>
            <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' }}>
              INDUSTRIAL DESIGN <span style={{ color: '#00b4d8' }}>CERTIFICATE</span>
            </h2>
          </div>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.2s', overflow: 'hidden', padding: '0 6vw' }}>
          <div style={{ display: 'flex', gap: '12px', transform: `translateX(calc(-${current} * (25% + 3px)))`, transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            {allCerts.map((cert) => (
              <div
                key={cert.id}
                style={{ flexShrink: 0, width: 'calc(25% - 9px)', background: '#fff', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
                }}
              >
                <div style={{ paddingTop: '140%', position: 'relative' }}>
                  <img src={cert.img} alt={cert.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 6vw 0', maxWidth: '1400px', margin: '0 auto', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.3s' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setCurrent((value) => Math.max(0, value - 1))} disabled={current === 0} style={{ width: '48px', height: '48px', borderRadius: '50%', background: current === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: current === 0 ? 'rgba(255,255,255,0.3)' : '#fff', fontSize: '1.1rem', cursor: current === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>←</button>
            <button onClick={() => setCurrent((value) => Math.min(maxIndex, value + 1))} disabled={current >= maxIndex} style={{ width: '48px', height: '48px', borderRadius: '50%', background: current >= maxIndex ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: current >= maxIndex ? 'rgba(255,255,255,0.3)' : '#fff', fontSize: '1.1rem', cursor: current >= maxIndex ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>→</button>
          </div>

          <button onClick={() => navigate('/certificates')} style={{ padding: '0.75rem 2.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}>
            View All Media
          </button>
        </div>
      </section>
    </>
  )
}

export default Certificate
