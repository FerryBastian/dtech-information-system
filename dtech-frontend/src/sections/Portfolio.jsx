import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { portfolioService } from '../services/crudService'

export const allPortfolioItems = [
  {
    id: 'cycloo', title: 'CYCLOO', img: '/cycloo.png',
    detail: { imgs: ['/cycloo.png', '/cycloo2.png', '/cycloo3.png', '/cycloo4.png'] },
  },
  {
    id: 'aireon', title: 'AIREON', img: '/aireon.png',
    detail: { imgs: ['/aireon.png', '/aireon2.png', '/aireon3.png', '/aireon4.png', '/aireon5.png', '/aireon6.png'] },
  },
  {
    id: 'ac-cobra-chassis', title: 'AC COBRA CHASSIS', img: '/ac cobra chassis.png',
    detail: { imgs: ['/ac cobra chassis.png', '/ac cobra chassis2.png', '/ac cobra chassis3.png', '/ac cobra chassis4.png', '/ac cobra chassis5.png'] },
  },
  {
    id: 'mirror', title: 'MIRROR', img: '/mirror.png',
    detail: { imgs: ['/mirror.png', '/mirror2.png', '/mirror3.png', '/mirror4.png', '/mirror5.png'] },
  },
  {
    id: 'gt40-chassis', title: 'GT40 CHASSIS', img: '/gt40 chassis.png',
    detail: { imgs: ['/gt40 chassis.png'] },
  },
  {
    id: 'footura', title: 'FOOTURA', img: '/footura.png',
    detail: { imgs: ['/footura.png'] },
  },
  {
    id: 'blitz', title: 'BLITZ', img: '/blitz.png',
    detail: { imgs: ['/blitz.png'] },
  },
  {
    id: 'pettaro', title: 'PETTARO', img: '/pettaro.png',
    detail: { imgs: ['/pettaro.png'] },
  },
  {
    id: 'acquoz', title: 'ACQUOZ', img: '/acquoz.png',
    detail: { imgs: ['/acquoz.png'] },
  },
  {
    id: 'bazzic', title: 'BAZZIC', img: '/bazzic.png',
    detail: { imgs: ['/bazzic.png'] },
  },
  {
    id: 'hero-vtol', title: 'HERO VTOL', img: '/hero vtol.png',
    detail: { imgs: ['/hero vtol.png'] },
  },
  {
    id: 'cario', title: 'CARIO', img: '/cario.png',
    detail: { imgs: ['/cario.png'] },
  },
  {
    id: 'jackee-system', title: 'JACKEE SYSTEM', img: '/jackee system.png',
    detail: { imgs: ['/jackee system.png'] },
  },
  {
    id: 'paintasy', title: 'PAINTASY', img: '/paintasy.png',
    detail: { imgs: ['/paintasy.png'] },
  },
]

const defaultItems = [
  { title: 'GT40 CHASSIS', category: 'Automotive', img: '/porto1.png' },
  { title: 'CARIO', category: 'Engineering', img: '/porto2.png' },
  { title: 'AC COBRA CHASSIS', category: 'Automotive', img: '/porto3.png' },
  { title: 'PARKING BOXX (SMART PARKING SYSTEM)', category: 'Smart System', img: '/porto4.jpg' },
  { title: 'AIREON', category: 'Aerospace', img: '/porto5.png' },
  { title: 'HERO VTOL', category: 'Aviation', img: '/porto6.png' },
]

const Portfolio = ({ variant = 'home' }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (variant !== 'home') return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })

    const element = document.getElementById('portfolio')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [variant])

  useEffect(() => {
    if (variant !== 'home') {
      setLoading(false)
      return
    }

    const fetchPortfolio = async () => {
      try {
        const result = await portfolioService.getAll()
        if (result.success && result.data.length > 0) setItems(result.data)
        else setItems(defaultItems)
      } catch {
        setItems(defaultItems)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [variant])

  if (variant === 'detail') {
    const item = allPortfolioItems.find((portfolioItem) => portfolioItem.id === id)

    if (!item) {
      return (
        <section style={{ background: '#000', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: '2rem' }}>Project not found</h2>
            <button onClick={() => navigate('/portfolio')} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: '#00b4d8', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Rajdhani', fontWeight: 700 }}>
              ← Back
            </button>
          </div>
        </section>
      )
    }

    return (
      <section style={{ background: '#000', minHeight: '100vh', paddingTop: '64px' }}>
        <div style={{ textAlign: 'center', padding: '3rem 6vw 2rem' }}>
          <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {item.title}
          </h1>
        </div>

        <div style={{ padding: '0 6vw 2rem', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {item.detail.imgs.map((img, index) => (
            <div key={index} style={{ borderRadius: '4px', overflow: 'hidden', background: '#111' }}>
              <img src={img} alt={`${item.title} ${index + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '2rem 6vw 6rem' }}>
          <button onClick={() => navigate('/portfolio')} style={{ padding: '0.75rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}>
            ← BACK TO PORTFOLIO
          </button>
        </div>
      </section>
    )
  }

  if (variant === 'page') {
    return (
      <section style={{ background: '#000', minHeight: '100vh', paddingTop: '64px' }}>
        <div style={{ textAlign: 'center', padding: '4rem 6vw 3rem' }}>
          <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.1em' }}>Portfolio</h1>
          <p style={{ fontFamily: 'Rajdhani', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>PT Dtech Inovasi Indonesia</p>
        </div>

        <div style={{ padding: '0 6vw 6rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }} className="porto-full-grid">
            {allPortfolioItems.map((item, i) => (
              <div key={item.id} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} onClick={() => navigate(`/portfolio/${item.id}`)} style={{ cursor: 'pointer', background: '#111' }}>
                <div style={{ paddingTop: '65%', position: 'relative', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: hovered === i ? 'brightness(0.5)' : 'brightness(0.85)', transform: hovered === i ? 'scale(1.04)' : 'scale(1)', transition: 'all 0.5s ease' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: hovered === i ? '100%' : '0', height: '2px', background: '#00b4d8', transition: 'width 0.4s ease' }} />
                  {hovered === i ? (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'Rajdhani', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', color: '#00b4d8' }}>VIEW PROJECT →</span>
                    </div>
                  ) : null}
                </div>
                <div style={{ padding: '0.85rem 0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.88rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: hovered === i ? '#00b4d8' : 'rgba(255,255,255,0.82)', transition: 'color 0.2s' }}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button onClick={() => navigate('/')} style={{ padding: '0.75rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}>
              ← BACK TO HOME
            </button>
          </div>
        </div>

        <style>{`@media(max-width:640px){.porto-full-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
    )
  }

  const displayItems = items.length > 0 ? items : defaultItems

  return (
    <section id="portfolio" style={{ background: '#0a0a0a', padding: '5rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>PORTFOLIO</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '2rem' }}>Loading...</div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }} className="port-grid">
              {displayItems.slice(0, 6).map((item, i) => (
                <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer', background: '#111' }}>
                  <div style={{ position: 'relative', paddingTop: '72%', overflow: 'hidden' }}>
                    <img src={item.image_url || item.img} alt={item.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: hovered === i ? 'brightness(0.5)' : 'brightness(0.75) grayscale(15%)', transform: hovered === i ? 'scale(1.06)' : 'scale(1)', transition: 'all 0.5s ease' }} />
                    {hovered === i ? (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: '#00b4d8' }}>VIEW PROJECT →</span>
                      </div>
                    ) : null}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: hovered === i ? '100%' : '0', height: '2px', background: '#00b4d8', transition: 'width 0.4s ease' }} />
                  </div>
                  <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', color: hovered === i ? '#00b4d8' : 'rgba(255,255,255,0.85)', textTransform: 'uppercase', transition: 'color 0.2s' }}>{item.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }}>
              <button onClick={() => navigate('/portfolio')} style={{ padding: '0.75rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}>
                View All Media
              </button>
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
