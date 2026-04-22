import { useParams, useNavigate } from 'react-router-dom'
import { allPortfolioItems } from './PortfolioPage'

const PortfolioDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = allPortfolioItems.find(p => p.id === id)

  if (!item) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: '2rem' }}>Project not found</h2>
          <button onClick={() => navigate('/portfolio')} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: '#00b4d8', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Rajdhani', fontWeight: 700 }}>← Back</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: '64px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '3rem 6vw 2rem' }}>
        <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {item.title}
        </h1>
      </div>

      {/* Detail images stacked */}
      <div style={{ padding: '0 6vw 2rem', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {item.detail.imgs.map((img, i) => (
          <div key={i} style={{ borderRadius: '4px', overflow: 'hidden', background: '#111' }}>
            <img src={img} alt={`${item.title} ${i + 1}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>

      {/* Back button */}
      <div style={{ textAlign: 'center', padding: '2rem 6vw 6rem' }}>
        <button onClick={() => navigate('/portfolio')} style={{ padding: '0.75rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
        >← BACK TO PORTFOLIO</button>
      </div>
    </div>
  )
}

export default PortfolioDetailPage