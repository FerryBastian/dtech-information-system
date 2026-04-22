import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const allCerts = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  title: 'Industrial Design Certificate',
  img: `/cert${i + 1}.jpg`,
}))

const VISIBLE = 4

const Certificate = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    const el = document.getElementById('certificate')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const maxIndex = allCerts.length - VISIBLE
  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1))

  return (
    <section id="certificate" style={{ background: '#0a0a0a', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6vw' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '3rem',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s ease',
        }}>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.4em', color: '#00b4d8', marginBottom: '1rem' }}>PATENTS & LEGALITY</div>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' }}>
            INDUSTRIAL DESIGN <span style={{ color: '#00b4d8' }}>CERTIFICATE</span>
          </h2>
        </div>
      </div>

      {/* Slider area — full width */}
      <div style={{
        opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.2s',
        overflow: 'hidden', padding: '0 6vw',
      }}>
        <div style={{
          display: 'flex', gap: '12px',
          transform: `translateX(calc(-${current} * (25% + 3px)))`,
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          {allCerts.map((cert) => (
            <div key={cert.id} style={{
              flexShrink: 0,
              width: 'calc(25% - 9px)',
              background: '#fff',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <div style={{ paddingTop: '140%', position: 'relative' }}>
                <img src={cert.img} alt={cert.title}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '2rem 6vw 0', maxWidth: '1400px', margin: '0 auto',
        opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
      }}>
        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={prev} disabled={current === 0} style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: current === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: current === 0 ? 'rgba(255,255,255,0.3)' : '#fff',
            fontSize: '1.1rem', cursor: current === 0 ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { if (current !== 0) e.currentTarget.style.background = '#00b4d8' }}
            onMouseLeave={e => { if (current !== 0) e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
          >←</button>
          <button onClick={next} disabled={current >= maxIndex} style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: current >= maxIndex ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: current >= maxIndex ? 'rgba(255,255,255,0.3)' : '#fff',
            fontSize: '1.1rem', cursor: current >= maxIndex ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { if (current < maxIndex) e.currentTarget.style.background = '#00b4d8' }}
            onMouseLeave={e => { if (current < maxIndex) e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
          >→</button>
        </div>

        {/* View All button */}
        <button style={{
          padding: '0.75rem 2.5rem', background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)',
          fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem',
          letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
        onClick={() => navigate('/certificates')}>View All Media</button>
      </div>
    </section>
  )
}

export default Certificate