const Footer = () => {
  return (
    <footer style={{ background: '#111418', borderTop: '1px solid rgba(0,180,216,0.15)', padding: '3rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem', alignItems: 'start' }} className="footer-grid">

        {/* Left: Company info */}
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>
              PT DTECH INOVASI INDONESIA
            </div>
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
            {/* Instagram */}
            <a href="#" style={{
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
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" style={{
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
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
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