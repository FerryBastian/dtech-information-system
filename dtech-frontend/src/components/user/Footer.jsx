const Footer = () => (
  <footer style={{ background: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3rem 6vw 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem', marginBottom: '2.5rem' }} className="foot-grid">
        <div>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>PT DTECH INOVASI INDONESIA</div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Jl Nusantara 18 Canden<br />Salatiga, Indonesia 50742</div>
        </div>
        <div>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.68rem', fontWeight: 700, color: '#00b4d8', letterSpacing: '0.2em', marginBottom: '1rem', textTransform: 'uppercase' }}>Contact</div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 2 }}>
            <div>Email: support@dtech-engineering.com</div>
            <div>Phone: (+62) 298 343 0015</div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.68rem', fontWeight: 700, color: '#00b4d8', letterSpacing: '0.2em', marginBottom: '1rem', textTransform: 'uppercase' }}>Follow Us Now</div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>social media</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['IG', 'YT'].map(s => (
              <button key={s} style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontFamily: 'Rajdhani', fontSize: '0.68rem', fontWeight: 700, borderRadius: '4px', cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1.5rem' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>© {new Date().getFullYear()} PT Dtech Inovasi Indonesia. All rights reserved.</div>
        <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)' }}>DTECH-ENGINEERING | REDEFINE TECHNOLOGY</div>
      </div>
    </div>
    <style>{`@media(max-width:640px){.foot-grid{grid-template-columns:1fr!important}}`}</style>
  </footer>
)
export default Footer