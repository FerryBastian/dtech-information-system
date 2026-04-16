import { useState, useEffect } from 'react'
import { testimoniService } from '../services/crudService'

const Stars = ({ count }) => (
  <div style={{ display: 'flex', gap: '3px' }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < count ? '#f4c430' : 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>★</span>
    ))}
  </div>
)

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await testimoniService.getAll()
        if (result.success && result.data.length > 0) {
          setTestimonials(result.data)
        } else {
          setTestimonials(getDefaultTestimonials())
        }
      } catch (err) {
        setTestimonials(getDefaultTestimonials())
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const getDefaultTestimonials = () => [
    { name: 'Renee Smith', company: 'ParkingBOXX', rating: 4, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', text: 'DTECH-ENGINEERING team is absolutely AMAZING to work with. They were the ONLY contractor who was able to grasp our requirements and provide ALL of the needed files with great communication. They completed numerous projects from early renderings to complex designs. Thanks DTECH-ENGINEERING team!' },
    { name: 'Levi Koenig', company: 'Industrial Project', rating: 4, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', text: 'DTECH-ENGINEERING team was a crucial part of our project. They were the main engineer and blew our minds with their work. They thought of every little thing and finished all work on schedule and under the time given. Very professional with great communication skills and vast knowledge in their field.' },
    { name: 'Anne Topper', company: 'MiniportWorld', rating: 4, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', text: 'DTECH-ENGINEERING helped me with a difficult project where requirements became increasingly demanding. They were very flexible and always available which made communication easy despite the distance. The end design is a huge improvement and makes me very happy.' },
    { name: 'David Valin', company: 'Solar Panel Boost Inc', rating: 4, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', text: 'DTECH-ENGINEERING are very smart engineers who understand the manufacturing process very well. Their creativity can take your simple sketches and transform them into amazing products. Highly recommended!' },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : getDefaultTestimonials()

  return (
    <section id="testimonial" style={{ background: '#000' }}>
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2) grayscale(50%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 2rem' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Our Testimonials</h2>
          <p style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', maxWidth: '500px', lineHeight: 1.7 }}>Several clients have kindly shared their experiences. Their stories reflect the quality of our services and commitment to delivering the best solutions.</p>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Loading...</div>
      ) : (
        <div style={{ padding: '4rem 6vw', maxWidth: '1200px', margin: '0 auto' }}>
          {displayTestimonials.map((t, i) => {
            const isEven = i % 2 === 0
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: isEven ? '280px 1fr' : '1fr 280px', gap: '0', marginBottom: '1.5rem', background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }} className="testi-card">
                {isEven && <div style={{ minHeight: '220px', backgroundImage: `url(${t.photo_url || t.img || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />}
                <div style={{ padding: '2rem', position: 'relative' }}>
                  <div style={{ fontFamily: 'Georgia', fontSize: '4rem', color: '#00b4d8', lineHeight: 1, marginBottom: '0.5rem', opacity: 0.6 }}>"</div>
                  <Stars count={t.rating || 4} />
                  <p style={{ fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', margin: '1rem 0 1.5rem' }}>{t.message || t.text}</p>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.1rem', fontWeight: 700, color: '#00b4d8' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Rajdhani', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', fontWeight: 600 }}>{t.company}</div>
                </div>
                {!isEven && <div style={{ minHeight: '220px', backgroundImage: `url(${t.photo_url || t.img || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />}
              </div>
            )
          })}
        </div>
      )}
      <style>{`@media(max-width:640px){.testi-card{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
export default Testimonials