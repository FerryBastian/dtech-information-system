import { useState } from 'react'
import PageHero from './PageHero'

const servicesData = [
  {
    title: 'DESIGN & ENGINEERING',
    img: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
    items: ['3D parametric CAD design', '2D detail manufacturing drawing', 'Plastic part design', 'Injection mold design', 'Sheet metal design', 'Structural design'],
  },
  {
    title: 'PRODUCT DEVELOPMENT',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    items: ['Concept Design', '3D interactive animation', '3D photorealistic rendering', 'Market research'],
  },
  {
    title: 'ENGINEERING ANALYSIS',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    items: ['Structural analysis', 'FEA (Finite Element Analysis)', 'CFD & flow analysis', 'Thermal analysis', 'Energy Conversion Analysis', 'Mold analysis'],
  },
  {
    title: 'PROTOTYPING SERVICE',
    img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80',
    items: ['CNC machining', '3D printing', 'Scale model development', 'Composite prototyping', 'Small run manufacturing'],
  },
]

const ServiceRow = ({ services }) => (
  <>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="services-page-grid">
      {services.map((service) => (
        <div key={service.title} style={{ aspectRatio: '4/3', backgroundImage: `url(${service.img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '6px' }} />
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '28px', marginBottom: '56px' }} className="services-page-grid">
      {services.map((service) => (
        <div key={service.title} style={{ padding: '0 8px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '0.14em', textAlign: 'center', marginBottom: '20px' }}>{service.title}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {service.items.map((item) => (
              <li key={item} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 2, paddingLeft: '14px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </>
)

const Services = ({ variant = 'page' }) => {
  const [list] = useState(servicesData)

  return (
    <section style={{ fontFamily: "'Open Sans', sans-serif", background: '#000', color: '#fff', paddingTop: variant === 'page' ? '64px' : 0 }}>
      {variant === 'page' ? (
        <PageHero
          image="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=1600&q=80"
          title="Our Services"
          subtitle="We are experienced team with more than 9 years experience. We always committed to providing high-quality design work, prompt communication, and detailed documentation of the project."
          height="calc(100vh - 64px)"
          backgroundPosition="center 30%"
          filter="brightness(0.28) grayscale(20%)"
        />
      ) : null}

      <section style={{ background: '#000', padding: '60px 80px 80px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <ServiceRow services={list.slice(0, 2)} />
          <ServiceRow services={list.slice(2, 4)} />
        </div>
      </section>

      <style>{`@media(max-width:700px){.services-page-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

export default Services
