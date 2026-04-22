import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{ background: '#111418', borderTop: '1px solid rgba(0,180,216,0.15)', padding: '3rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem', alignItems: 'start' }} className="footer-grid">

        {/* Left: Company info */}
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>
                PT DTECH INOVASI INDONESIA
              </div>
            </Link>
          </div>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontWeight: 500 }}>
            Jl Nusantara 18 Canden<br />
            Salatiga, Indonesia 50742
          </div>
        </div>

        {/* Center: Contact */}
        <div>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 2, fontWeight: 500 }}>
            <div>Email: <a href="mailto:support@dtech-engineering.com" style={{ color: 'rgba(0,180,216,0.8)', textDecoration: 'none' }}>support@dtech-engineering.com</a></div>
            <div>Phone: <a href="tel:+622983430015" style={{ color: 'rgba(0,180,216,0.8)', textDecoration: 'none' }}>(+62) 298 343 0015</a></div>
          </div>
        </div>

        {/* Right: Social */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            Follow us now<br />social media
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/contact" style={{
              width: '36px', height: '36px', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </Link>
            <a href="mailto:support@dtech-engineering.com" style={{
              width: '36px', height: '36px', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr!important; gap:1.5rem!important}}
        @media(max-width:768px){.footer-grid > div:last-child{align-items:flex-start!important}}
      `}</style>
    </footer>
  )
}

export default Footer