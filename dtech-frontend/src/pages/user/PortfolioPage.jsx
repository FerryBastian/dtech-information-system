import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const allPortfolioItems = [
  {
    id: 'cycloo', title: 'CYCLOO', img: '/cycloo.png',
    detail: { imgs: ['/cycloo.png', '/cycloo2.png', '/cycloo3.png', '/cycloo4.png'] }
  },
  {
    id: 'aireon', title: 'AIREON', img: '/aireon.png',
    detail: { imgs: ['/aireon.png', '/aireon2.png', '/aireon3.png', '/aireon4.png', '/aireon5.png', '/aireon6.png'] }
  },
  {
    id: 'ac-cobra-chassis', title: 'AC COBRA CHASSIS', img: '/ac cobra chassis.png',
    detail: { imgs: ['/ac cobra chassis.png', '/ac cobra chassis2.png', '/ac cobra chassis3.png', '/ac cobra chassis4.png', '/ac cobra chassis5.png'] }
  },
  {
    id: 'mirror', title: 'MIRROR', img: '/mirror.png',
    detail: { imgs: ['/mirror.png', '/mirror2.png', '/mirror3.png', '/mirror4.png', '/mirror5.png'] }
  },
  {
    id: 'gt40-chassis', title: 'GT40 CHASSIS', img: '/gt40 chassis.png',
    detail: { imgs: ['/gt40 chassis.png'] }
  },
  {
    id: 'footura', title: 'FOOTURA', img: '/footura.png',
    detail: { imgs: ['/footura.png'] }
  },
  {
    id: 'blitz', title: 'BLITZ', img: '/blitz.png',
    detail: { imgs: ['/blitz.png'] }
  },
  {
    id: 'pettaro', title: 'PETTARO', img: '/pettaro.png',
    detail: { imgs: ['/pettaro.png'] }
  },
  {
    id: 'acquoz', title: 'ACQUOZ', img: '/acquoz.png',
    detail: { imgs: ['/acquoz.png'] }
  },
  {
    id: 'bazzic', title: 'BAZZIC', img: '/bazzic.png',
    detail: { imgs: ['/bazzic.png'] }
  },
  {
    id: 'hero-vtol', title: 'HERO VTOL', img: '/hero vtol.png',
    detail: { imgs: ['/hero vtol.png'] }
  },
  {
    id: 'cario', title: 'CARIO', img: '/cario.png',
    detail: { imgs: ['/cario.png'] }
  },
  {
    id: 'jackee-system', title: 'JACKEE SYSTEM', img: '/jackee system.png',
    detail: { imgs: ['/jackee system.png'] }
  },
  {
    id: 'paintasy', title: 'PAINTASY', img: '/paintasy.png',
    detail: { imgs: ['/paintasy.png'] }
  },
]

const PortfolioPage = () => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: '64px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '4rem 6vw 3rem' }}>
        <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.1em' }}>
          Portfolio
        </h1>
        <p style={{ fontFamily: 'Rajdhani', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
          PT Dtech Inovasi Indonesia
        </p>
      </div>

      {/* 2-column grid */}
      <div style={{ padding: '0 6vw 6rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }} className="porto-full-grid">
          {allPortfolioItems.map((item, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/portfolio/${item.id}`)}
              style={{ cursor: 'pointer', background: '#111' }}
            >
              <div style={{ paddingTop: '65%', position: 'relative', overflow: 'hidden' }}>
                <img src={item.img} alt={item.title}
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: hovered === i ? 'brightness(0.5)' : 'brightness(0.85)',
                    transform: hovered === i ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.5s ease',
                  }}
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: hovered === i ? '100%' : '0', height: '2px', background: '#00b4d8', transition: 'width 0.4s ease' }} />
                {hovered === i && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Rajdhani', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', color: '#00b4d8' }}>VIEW PROJECT →</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '0.85rem 0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.88rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: hovered === i ? '#00b4d8' : 'rgba(255,255,255,0.82)', transition: 'color 0.2s' }}>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={() => navigate('/')} style={{ padding: '0.75rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
          >← BACK TO HOME</button>
        </div>
      </div>

      <style>{`@media(max-width:640px){.porto-full-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

export default PortfolioPage