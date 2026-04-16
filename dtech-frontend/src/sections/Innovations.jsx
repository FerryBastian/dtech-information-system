import { useState, useEffect } from 'react'
import { achievementsService } from '../services/crudService'

const defaultInnovations = [
  { badge: '🏆 1ST PLACE', title: 'GE & FUSE — On Wing Jet Engine Inspection Design', context: 'Attended by 47 of the best research institutions worldwide', desc: 'We are solving an "almost impossible" problem to upgrade jet engine inspection device. The objective is to improve the safety and efficiency of commercial aircraft by combining smart automation, cloud computing, big data, and artificial intelligence.', img: 'https://images.unsplash.com/photo-1567350136822-f5e7de0b1d46?w=900&q=80', tags: ['Smart Automation', 'Cloud Computing', 'AI', 'Aviation'] },
  { badge: '✈️ INNOVATION', title: 'Ultralight Aircraft Development', context: 'FAA Certified — Manufactured in Wichita, Kansas', desc: 'A next-generation ultralight aircraft designed for maximum efficiency and precise maneuverability. Fuel consumption of only 3.5 liters per hour, capable of loop maneuvers and gliding.', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80', tags: ['FAA Certified', '3.5L/hr Fuel', 'Loop Maneuvers', 'Gliding'] },
  { badge: '🤖 R&D', title: 'SEMAR-T CNC Machine — Fully In-House', context: 'Manufactured in Indonesia by local engineers', desc: 'The SEMAR-T 3-Axis CNC Milling machine, designed and developed in-house, including a controller system fully created and engineered by our own team.', img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=900&q=80', tags: ['CNC', '3-Axis', 'In-house', 'Software Control'] },
]

const Innovations = () => {
  const [innovations, setInnovations] = useState([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInnovations = async () => {
      try {
        const result = await achievementsService.getAll()
        if (result.success && result.data.length > 0) {
          const formatted = result.data.slice(0, 3).map((a, i) => ({
            badge: a.is_featured ? '🏆 FEATURED' : '🎯 INNOVATION',
            title: a.title,
            context: a.subtitle || a.award_by || 'Innovation Project',
            desc: a.description || '',
            img: a.image_url || 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=900&q=80',
            tags: [a.year ? `Since ${a.year}` : 'R&D', 'Innovation'],
          }))
          setInnovations(formatted)
        } else {
          setInnovations(defaultInnovations)
        }
      } catch (err) {
        setInnovations(defaultInnovations)
      } finally {
        setLoading(false)
      }
    }
    fetchInnovations()
  }, [])

  const displayInnovations = innovations.length > 0 ? innovations : defaultInnovations
  const inn = displayInnovations[active] || defaultInnovations[0]

  return (
    <section id="innovations" style={{ background: '#000', padding: '6rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '2px', height: '40px', background: '#00b4d8' }} />
          <span style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: '#00b4d8' }}>GLOBAL ACHIEVEMENT</span>
        </div>
        <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '0.06em', marginBottom: '2rem', textTransform: 'uppercase' }}>g l o b a l &nbsp; a c h i e v e m e n t</h2>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Loading...</div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {displayInnovations.map((item, i) => (
                <button key={i} onClick={() => setActive(i)} style={{ padding: '0.75rem 1.5rem', fontFamily: 'Rajdhani', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', color: active === i ? '#000' : 'rgba(255,255,255,0.5)', background: active === i ? '#00b4d8' : 'transparent', border: active === i ? 'none' : '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', textTransform: 'uppercase', borderRadius: '2px' }}>{item.badge}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="inn-grid">
              <div style={{ position: 'relative' }}>
                <div style={{ paddingTop: '65%', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                  <img src={inn.img} alt={inn.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
                </div>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.4rem 0.9rem', background: '#00b4d8', color: '#000', fontFamily: 'Rajdhani', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.1em', borderRadius: '2px' }}>{inn.badge}</div>
              </div>

              <div>
                <p style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', color: '#00b4d8', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{inn.context}</p>
                <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', fontWeight: 800, letterSpacing: '0.03em', color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem', textTransform: 'uppercase' }}>{inn.title}</h3>
                <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '1.5rem' }}>{inn.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {(inn.tags || []).map(tag => (
                    <span key={tag} style={{ padding: '0.3rem 0.75rem', background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.3)', color: '#00b4d8', fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', borderRadius: '2px' }}>{tag}</span>
                  ))}
                </div>
                <button style={{ padding: '0.7rem 1.75rem', background: 'transparent', border: '1px solid #00b4d8', color: '#00b4d8', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', borderRadius: '4px', cursor: 'pointer' }}>LEARN MORE</button>
              </div>
            </div>
          </>
        )}
      </div>
      <style>{`@media(max-width:768px){.inn-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
export default Innovations