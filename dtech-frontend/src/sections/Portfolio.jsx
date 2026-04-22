import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { portfolioService } from '../services/crudService'

const defaultItems = [
  { title: 'GT40 CHASSIS', category: 'Automotive', img: '/porto1.png' },
  { title: 'CARIO', category: 'Engineering', img: '/porto2.png' },
  { title: 'AC COBRA CHASSIS', category: 'Automotive', img: '/porto3.png' },
  { title: 'PARKING BOXX (SMART PARKING SYSTEM)', category: 'Smart System', img: '/porto4.jpg' },
  { title: 'AIREON', category: 'Aerospace', img: '/porto5.png' },
  { title: 'HERO VTOL', category: 'Aviation', img: '/porto6.png' },
]

const Portfolio = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    const el = document.getElementById('portfolio')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const result = await portfolioService.getAll()
        if (result.success && result.data.length > 0) setItems(result.data)
        else setItems(defaultItems)
      } catch { setItems(defaultItems) }
      finally { setLoading(false) }
    }
    fetchPortfolio()
  }, [])

  const displayItems = items.length > 0 ? items : defaultItems

  return (
    <section id="portfolio" style={{ background: '#0a0a0a', padding: '5rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '3rem',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s ease',
        }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            PORTFOLIO
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '2rem' }}>Loading...</div>
        ) : (
          <>
            {/* 3-column grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px',
              opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.2s',
            }} className="port-grid">
              {displayItems.slice(0, 6).map((item, i) => (
                <div key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer', background: '#111' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', paddingTop: '72%', overflow: 'hidden' }}>
                    <img
                      src={item.image_url || item.img}
                      alt={item.title}
                      style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'cover',
                        filter: hovered === i ? 'brightness(0.5)' : 'brightness(0.75) grayscale(15%)',
                        transform: hovered === i ? 'scale(1.06)' : 'scale(1)',
                        transition: 'all 0.5s ease',
                      }}
                    />
                    {hovered === i && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: '#00b4d8' }}>VIEW PROJECT →</span>
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: hovered === i ? '100%' : '0', height: '2px', background: '#00b4d8', transition: 'width 0.4s ease' }} />
                  </div>
                  {/* Title below image */}
                  <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', color: hovered === i ? '#00b4d8' : 'rgba(255,255,255,0.85)', textTransform: 'uppercase', transition: 'color 0.2s' }}>{item.title}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All button */}
            <div style={{ textAlign: 'center', marginTop: '2.5rem', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }}>
              <button onClick={() => navigate('/portfolio')} style={{
                padding: '0.75rem 3rem', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem',
                letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
              >View All Media</button>
            </div>
          </>
        )}
      </div>
      <style>{`
        @media(max-width:768px){.port-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:480px){.port-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}

export default Portfolio