import { useState, useEffect } from 'react'
import { portfolioService } from '../services/crudService'

const defaultItems = [
  { title: 'GT40 CHASSIS', category: 'Automotive', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { title: 'CARIO', category: 'Engineering', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80' },
  { title: 'AC COBRA CHASSIS', category: 'Automotive', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80' },
  { title: 'PARKING BOXX', category: 'Smart Parking System', img: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=600&q=80' },
  { title: 'AIREON', category: 'Aerospace', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
  { title: 'HERO VTOL', category: 'Aviation', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
]

const Portfolio = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const result = await portfolioService.getAll()
        if (result.success && result.data.length > 0) {
          setItems(result.data)
        } else {
          setItems(defaultItems)
        }
      } catch (err) {
        setItems(defaultItems)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  const displayItems = items.length > 0 ? items : defaultItems

  return (
    <section id="portfolio" style={{ background: '#0a0a0a', padding: '6rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.4em', color: '#00b4d8', marginBottom: '1rem' }}>OUR WORK</div>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' }}>portfo<span style={{ color: '#00b4d8' }}>l</span>io</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }} className="port-grid">
            {displayItems.slice(0, 6).map((item, i) => (
              <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', cursor: 'pointer', borderRadius: '2px' }}>
                <img src={item.image_url || item.img || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'} alt={item.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: hovered === i ? 'brightness(0.35)' : 'brightness(0.6) grayscale(30%)', transform: hovered === i ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.5s ease' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', color: '#00b4d8', marginBottom: '4px' }}>{item.category || 'Portfolio'}</div>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.08em', color: '#fff', textTransform: 'uppercase' }}>{item.title}</div>
                  {hovered === i && <div style={{ marginTop: '0.5rem', color: '#00b4d8', fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em' }}>VIEW PROJECT →</div>}
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: hovered === i ? '100%' : '0', height: '2px', background: '#00b4d8', transition: 'width 0.4s ease' }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button style={{ padding: '0.85rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px' }}>VIEW ALL MEDIA</button>
        </div>
      </div>
      <style>{`@media(max-width:768px){.port-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.port-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
export default Portfolio