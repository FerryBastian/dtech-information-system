import { useNavigate } from 'react-router-dom'

const allCerts = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  img: `/cert${i + 1}.jpg`,
}))

const CertificatePage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: '64px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '4rem 6vw 3rem' }}>
        <h1 style={{
          fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900, color: '#fff', letterSpacing: '0.05em',
        }}>
          Patents Industrial Design Certificate
        </h1>
        <p style={{ fontFamily: 'Rajdhani', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
          PT Dtech Inovasi Indonesia
        </p>
      </div>

      {/* 4-column grid */}
      <div style={{ padding: '0 6vw', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }} className="cert-page-grid">
          {allCerts.map((cert) => (
            <div key={cert.id}
              style={{
                background: '#fff', borderRadius: '3px', overflow: 'hidden',
                cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <img src={cert.img} alt={`Certificate ${cert.id}`}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          ))}
        </div>

        {/* And more to come */}
        <div style={{ textAlign: 'center', padding: '4rem 0 2rem' }}>
          <p style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, color: '#fff', fontStyle: 'italic' }}>
            "And more to come"
          </p>
        </div>

        {/* Back button */}
        <div style={{ textAlign: 'center', paddingBottom: '6rem' }}>
          <button onClick={() => navigate('/')} style={{
            padding: '0.75rem 3rem', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)',
            fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem',
            letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
          >← BACK TO HOME</button>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.cert-page-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:480px){.cert-page-grid{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  )
}

export default CertificatePage