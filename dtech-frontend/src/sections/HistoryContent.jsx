const HERO_IMG = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80'

const timelineData = [
  {
    year: 'Present',
    side: 'left',
    color: '#00b4d8',
    content: `We design and manufacture the SUPERTURN CNC Lathe Machine as part of the company's strategic initiative to enhance productivity and strengthen internal innovation capabilities.

The machine is developed through a standardized engineering process with a strong focus on precision, reliability, and operational efficiency, supporting the company's manufacturing needs and technology development.

The SUPERTURN CNC Lathe Machine plays a critical role within the company's production and innovation ecosystem, enabling a more integrated, efficient, and sustainable development process.`,
  },
  {
    year: '2024',
    side: 'right',
    color: '#00b4d8',
    content: `We have successfully advanced the development of our CNC milling machines, from CNC Supermill Generation 1 through to Supermill Generation 3. Each generation has been developed through continuous design refinement and engineering improvements to deliver significant advancements in performance, reliability, and operational efficiency.

With the introduction of Supermill Generation 3, we implemented the latest features to support higher productivity and efficiency, combined with a more compact machine design without compromising precision or structural stability. This achievement reflects our commitment to continuous innovation and the advancement of manufacturing technology.`,
  },
  {
    year: '2020',
    side: 'left',
    color: '#00b4d8',
    content: `We began producing the CNC Supermill machine as part of our corporate strategy to strengthen national manufacturing technology capabilities. The development of CNC Supermill follows a structured engineering process focused on precision, reliability, and efficiency to meet the needs of industrial and educational sectors in Indonesia.

Beyond product development, the company also implements strategic programs aimed at enhancing workforce competencies and accelerating the adoption of modern manufacturing technologies, contributing to the growth of a sustainable national industrial ecosystem.`,
  },
  {
    year: '2019',
    side: 'right',
    color: '#00b4d8',
    content: `We manufacture the SEMAR-T 3-Axis CNC Milling machine, designed and developed in-house, including a controller system that is fully created and implemented by our own team. The development of this machine is driven by a comprehensive research and engineering process to ensure high precision, stability, and reliability in supporting modern manufacturing requirements.

With full control over both hardware and software architecture, the SEMAR-T 3-Axis CNC Milling machine offers flexibility, seamless integration, and optimal performance for industrial, educational, and research applications. This product represents our commitment to delivering innovative manufacturing technology through locally developed engineering excellence.`,
  },
  {
    year: '2018',
    side: 'left',
    color: '#00b4d8',
    content: `We made a strategic decision to discontinue accepting international projects and shift our focus toward building innovation in Indonesia.

This decision reflects our long-term commitment to strengthening national technological capabilities through research, development, and collaboration with local talent and industries, delivering impactful and sustainable solutions for Indonesia.`,
  },
  {
    year: '2017',
    side: 'right',
    color: '#00b4d8',
    content: `We won the General Electric (GE) Jet Engine Inspection Design Challenge, a prestigious international competition in the field of aerospace engineering and design. Through this competition, we delivered an innovative inspection system design focused on improving efficiency, accuracy, and safety in jet engine inspection processes.

This achievement highlights our team's ability to integrate research, engineering analysis, and practical design solutions to address complex challenges in the global aviation industry. It also represents international recognition of DTECH-ENGINEERING's engineering excellence and innovation capability.`,
  },
  {
    year: '2013',
    side: 'left',
    color: '#00b4d8',
    content: `We successfully designed and developed an aircraft capable of performing advanced maneuvers, including stable looping and efficient gliding, while maintaining exceptional fuel efficiency. Through precise aerodynamic and structural engineering, the aircraft achieves a remarkably low fuel consumption of only 3.5 liters per hour, without compromising performance or flight safety.

The aircraft design has undergone rigorous evaluation and has been officially verified by the Federal Aviation Administration (FAA) in accordance with international aviation safety standards. Beyond the design phase, this aircraft has progressed into full realization, with the design manufactured and produced in Wichita, Kansas, United States, a globally recognized hub of the aerospace industry.`,
  },
  {
    year: '2009',
    side: 'right',
    color: '#00b4d8',
    content: `DTECH-ENGINEERING began its journey with a strong focus on Research and Development (R&D) as the company's core competency.

Since its establishment, R&D has served as the foundation of every technology and engineering solution we develop, encompassing research, design, analysis, and implementation with a strong emphasis on quality, innovation, and global competitiveness.`,
  },
]

const HistoryContent = () => {
  return (
    <section style={{ fontFamily: "'Open Sans', sans-serif", background: '#000', color: '#fff' }}>
      <section
        style={{
          position: 'relative',
          height: '420px',
          overflow: 'hidden',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.95) 100%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 44px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '14px',
            }}
          >
            History Dtech-Engineering
          </h1>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.38em',
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              fontWeight: 300,
            }}
          >
            R e d i f i n e   T e c h n o l o g y
          </p>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(to right, transparent, #00b4d8, transparent)',
          }}
        />
      </section>

      <section style={{ background: '#000', padding: '60px 80px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{ fontSize: '13.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', fontWeight: 300, marginBottom: '16px' }}>
            DTECH-ENGINEERING is a research- and engineering-driven technology company founded in Salatiga, Indonesia, in 2009.
            Since the company has positioned research and development as its core competency in delivering innovative, practical,
            and competitive technology solutions.
          </p>
          <p style={{ fontSize: '13.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', fontWeight: 300, marginBottom: '28px' }}>
            Initially engaged in global engineering projects, DTECH-ENGINEERING later made a strategic decision to focus on building
            innovation within Indonesia. This commitment is realized through in-house mastery of design, control systems, software
            development, and manufacturing processes.
          </p>
          <div style={{ fontSize: '13px', lineHeight: 2, color: 'rgba(255,255,255,0.6)' }}>
            <p><strong style={{ color: '#fff', fontWeight: 600 }}>Founded:</strong> 2009</p>
            <p><strong style={{ color: '#fff', fontWeight: 600 }}>Headquarters:</strong> Salatiga, Indonesia</p>
            <p><strong style={{ color: '#fff', fontWeight: 600 }}>Industry:</strong> Technology, Engineering, Manufacturing</p>
            <p><strong style={{ color: '#fff', fontWeight: 600 }}>Focus:</strong> Innovation-driven engineering and local technology development</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#000', padding: '20px 0 80px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '60px',
            letterSpacing: '0.02em',
          }}
        >
          Our Journey
        </h2>

        <div style={{ position: 'relative', maxWidth: '960px', margin: '0 auto', padding: '0 40px' }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(0,180,216,0.3)',
              transform: 'translateX(50%)',
            }}
          />

          {timelineData.map((item, index) => {
            const paragraphs = item.content.split('\n\n')
            const isLeft = item.side === 'left'

            return (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 40px 1fr',
                  marginBottom: '60px',
                  alignItems: 'start',
                }}
              >
                <div style={{ padding: '0 30px 0 0', textAlign: isLeft ? 'left' : 'right' }}>
                  {isLeft ? (
                    <>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, color: item.color, marginBottom: '12px', letterSpacing: '0.02em' }}>
                        {item.year}
                      </h3>
                      {paragraphs.map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontSize: '12px',
                            lineHeight: 1.85,
                            color: 'rgba(255,255,255,0.65)',
                            fontWeight: 300,
                            marginBottom: i < paragraphs.length - 1 ? '12px' : 0,
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </>
                  ) : null}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#00b4d8',
                      border: '2px solid #00b4d8',
                      boxShadow: '0 0 0 2px #00b4d8',
                      flexShrink: 0,
                    }}
                  />
                </div>

                <div style={{ padding: '0 0 0 30px' }}>
                  {!isLeft ? (
                    <>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, color: item.color, marginBottom: '12px', letterSpacing: '0.02em' }}>
                        {item.year}
                      </h3>
                      {paragraphs.map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontSize: '12px',
                            lineHeight: 1.85,
                            color: 'rgba(255,255,255,0.65)',
                            fontWeight: 300,
                            marginBottom: i < paragraphs.length - 1 ? '12px' : 0,
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}

export default HistoryContent
