const About = () => {
  return (
    <section id="about" style={{ background: '#0a0a0a', padding: '6rem 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ width: '2px', height: '40px', background: '#00b4d8' }} />
        <span style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: '#00b4d8' }}>ABOUT US</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', maxWidth: '1200px', margin: '0 auto' }} className="about-grid">
        <div>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', lineHeight: 1 }}>
            PT Dtech Inovasi<br /><span style={{ color: '#00b4d8' }}>Indonesia</span>
          </h2>
          <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
            DTECH-ENGINEERING is a research and technology company established in 2009, focusing on mechanical engineering, manufacturing, and research-driven product development.
          </p>
          <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
            Initially engaged in global engineering projects, DTECH-ENGINEERING later made a strategic decision to focus on building innovation within Indonesia.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[{ value: '2009', label: 'Founded' }, { value: '15+', label: 'Years Experience' }, { value: '100+', label: 'Projects' }].map(s => (
              <div key={s.label} style={{ borderLeft: '2px solid #00b4d8', paddingLeft: '1rem' }}>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{s.value}</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', fontWeight: 500, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
            We have expanded our world-class team to provide superior services for our customers from around the globe. Our team works tirelessly to provide the best service in the industry.
          </p>
          {[
            { label: 'Headquarters', value: 'Salatiga, Indonesia' },
            { label: 'Industry', value: 'Technology, Engineering, Manufacturing' },
            { label: 'Email', value: 'support@dtech-engineering.com' },
            { label: 'Phone', value: '(+62) 298 343 0015' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: 'Rajdhani', fontSize: '0.78rem', fontWeight: 700, color: '#00b4d8', letterSpacing: '0.08em', minWidth: '130px', textTransform: 'uppercase' }}>{item.label}</span>
              <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
export default About