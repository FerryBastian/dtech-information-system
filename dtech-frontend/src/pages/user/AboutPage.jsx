import About from '../../sections/About'

const AboutPage = () => (
  <div style={{ paddingTop: '64px' }}>
    {/* Hero Banner */}
    <div style={{
      height: '300px', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.25) grayscale(40%)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.4em', color: '#00b4d8', marginBottom: '0.75rem' }}>PT DTECH INOVASI INDONESIA</div>
        <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>ABOUT US</h1>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, #00b4d8, transparent)' }} />
    </div>

    {/* History Timeline */}
    <section style={{ background: '#0a0a0a', padding: '6rem 6vw' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>History Dtech-Engineering</h2>
        <p style={{ fontFamily: 'Rajdhani', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#00b4d8', marginBottom: '3rem' }}>REDEFINE TECHNOLOGY</p>

        <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
          DTECH-ENGINEERING is a research- and engineering-driven technology company founded in Salatiga, Indonesia, in 2009. Since its founding, the company has positioned research and development as its core competency in delivering innovative, practical, and competitive technology solutions.
        </p>
        <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
          Initially engaged in global engineering projects, DTECH-ENGINEERING later made a strategic decision to focus on building innovation within Indonesia through in-house mastery of design, control systems, software development, and manufacturing processes.
        </p>

        {/* Info */}
        {[
          { label: 'Founded', value: '2009' },
          { label: 'Headquarters', value: 'Salatiga, Indonesia' },
          { label: 'Industry', value: 'Technology, Engineering, Manufacturing' },
          { label: 'Focus', value: 'Innovation-driven engineering and local technology development' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontFamily: 'Rajdhani', fontSize: '0.78rem', fontWeight: 700, color: '#00b4d8', letterSpacing: '0.08em', minWidth: '150px', textTransform: 'uppercase' }}>{item.label}</span>
            <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)' }}>{item.value}</span>
          </div>
        ))}

        {/* Timeline */}
        <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '4rem 0 2rem', textAlign: 'center' }}>Our Journey</h3>
        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(0,180,216,0.3)' }}>
          {[
            { year: 'Present', color: '#00b4d8', text: 'We design and manufacture the SUPERTURN CNC Lathe Machine as part of the company\'s strategic initiative to enhance productivity and strengthen internal innovation capabilities.' },
            { year: '2024', color: '#00b4d8', text: 'We have successfully advanced the development of our CNC milling machines through to Supermill Generation 3. Each generation has been developed through continuous design refinement to deliver significant enhancements in performance, reliability, and operational efficiency.' },
            { year: '2020', color: '#00b4d8', text: 'We began producing the CNC Supermill machine as part of our corporate strategy to strengthen national manufacturing technology capabilities.' },
            { year: '2019', color: '#00b4d8', text: 'We manufacture the SEMAR-T 3-Axis CNC Milling machine, designed and developed in-house, including a controller system that is fully created and engineered by our own team.' },
            { year: '2018', color: '#00b4d8', text: 'We made a strategic decision to discontinue accepting international projects and shift our focus toward building innovation within Indonesia.' },
            { year: '2017', color: '#00b4d8', text: 'We won the General Electric (GE) Jet Engine Inspection Design Challenge, a prestigious international competition in the field of aerospace engineering and design.' },
            { year: '2013', color: '#00b4d8', text: 'We successfully designed and developed an aircraft capable of performing advanced maneuvers. The aircraft has been officially verified by the Federal Aviation Administration (FAA).' },
            { year: '2009', color: '#00b4d8', text: 'DTECH-ENGINEERING began its journey with a strong focus on Research and Development (R&D) as the company\'s core competency.' },
          ].map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '2.5rem' }}>
              <div style={{
                position: 'absolute', left: '-2.65rem', top: '4px',
                width: '12px', height: '12px', borderRadius: '50%',
                background: item.color, border: '2px solid #000',
                boxShadow: `0 0 8px ${item.color}`,
              }} />
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.3rem', fontWeight: 800, color: item.color, marginBottom: '0.5rem' }}>{item.year}</div>
              <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <About />
  </div>
)

export default AboutPage