import { useState, useEffect } from 'react'
import { servicesService } from '../services/crudService'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await servicesService.getAll()
        if (result.success && result.data.length > 0) {
          setServices(result.data)
        } else {
          setServices([
            { number: '01', title: 'Design Engineering', desc: 'Comprehensive design engineering services from concept to final product, leveraging advanced CAD/CAM tools and engineering analysis software.' },
            { number: '02', title: 'Product Development', desc: 'End-to-end product development encompassing ideation, design, prototyping, testing, and mass production support for diverse industries.' },
            { number: '03', title: 'Engineering Analysis', desc: 'Advanced finite element analysis (FEA), computational fluid dynamics (CFD), and structural simulations to optimize product performance.' },
            { number: '04', title: 'Prototyping Service', desc: 'Rapid prototyping using CNC machining, 3D printing, and traditional manufacturing methods to quickly validate and refine designs.' },
          ])
        }
      } catch (err) {
        setServices([
          { number: '01', title: 'Design Engineering', desc: 'Comprehensive design engineering services from concept to final product, leveraging advanced CAD/CAM tools and engineering analysis software.' },
          { number: '02', title: 'Product Development', desc: 'End-to-end product development encompassing ideation, design, prototyping, testing, and mass production support for diverse industries.' },
          { number: '03', title: 'Engineering Analysis', desc: 'Advanced finite element analysis (FEA), computational fluid dynamics (CFD), and structural simulations to optimize product performance.' },
          { number: '04', title: 'Prototyping Service', desc: 'Rapid prototyping using CNC machining, 3D printing, and traditional manufacturing methods to quickly validate and refine designs.' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const displayServices = services.length > 0 ? services.map((s, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: s.title,
    desc: s.short_desc || s.description || '',
  })) : [
    { number: '01', title: 'Design Engineering', desc: 'Comprehensive design engineering services from concept to final product, leveraging advanced CAD/CAM tools and engineering analysis software.' },
    { number: '02', title: 'Product Development', desc: 'End-to-end product development encompassing ideation, design, prototyping, testing, and mass production support for diverse industries.' },
    { number: '03', title: 'Engineering Analysis', desc: 'Advanced finite element analysis (FEA), computational fluid dynamics (CFD), and structural simulations to optimize product performance.' },
    { number: '04', title: 'Prototyping Service', desc: 'Rapid prototyping using CNC machining, 3D printing, and traditional manufacturing methods to quickly validate and refine designs.' },
  ]

  return (
    <section id="services" style={{ background: '#111', padding: '6rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '2px', height: '40px', background: '#00b4d8' }} />
          <span style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: '#00b4d8' }}>WHAT WE OFFER</span>
        </div>
        <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '3rem' }}>Our <span style={{ color: '#00b4d8' }}>Services</span></h2>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5px', background: 'rgba(255,255,255,0.06)' }} className="svc-grid">
            {displayServices.map((s, i) => (
              <div key={i} style={{ background: '#111', padding: '3rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,180,216,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = '#111'}>
                <div style={{ position: 'absolute', top: '1rem', right: '2rem', fontFamily: 'Barlow Condensed', fontSize: '5rem', fontWeight: 900, color: 'rgba(0,180,216,0.04)', lineHeight: 1 }}>{s.number}</div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: '#00b4d8', marginBottom: '0.5rem' }}>{s.number}</div>
                <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.04em', color: '#fff', marginBottom: '1rem', textTransform: 'uppercase' }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`@media(max-width:700px){.svc-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
export default Services