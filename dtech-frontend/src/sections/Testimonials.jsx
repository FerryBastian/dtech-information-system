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
  const [currentPage, setCurrentPage] = useState(0)
  const [visible, setVisible] = useState(false)
  const totalPages = 3

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    const el = document.getElementById('testimonial')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
    {
      name: 'ALKO KERETA AGIS',
      company: 'Kerjasama ANTARA DTECH-ENGINEERING, SMK-SMK DI SALATIGA & MAGELANG, URBANISME SMK',
      rating: 5,
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80',
      text: 'Peluncuran kereta agis hasil kolaborasi DTECH dengan sekolah-sekolah vokasi unggulan di Jawa Tengah.',
      isNews: true,
    },
    {
      name: 'KUNJUNGAN PT DTECH',
      company: 'Kunjungan industri DTECH-ENGINEERING Semarang: Dorong inovasi lokal, motopart global.',
      rating: 5,
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      text: 'Kunjungan industri yang mendorong sinergi antara teknologi lokal dan pasar global.',
      isNews: true,
    },
    {
      name: 'SERTIFIKASI FAA',
      company: 'DTECH-ENGINEERING: SAH! DAN DIAKUI INDUSTRI TEKNOLOGI MAJU DI DUNIA DI SALATIGA.',
      rating: 5,
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
      text: 'Pengakuan internasional atas inovasi teknologi yang dikembangkan di Salatiga.',
      isNews: true,
    },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : getDefaultTestimonials()

  return (
    <section id="testimonial" style={{ background: '#0a0a0a', padding: '6rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '4rem',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s ease',
        }}>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.4em', color: '#00b4d8', marginBottom: '1rem' }}>
            THE LATEST ON DTECH-ENGINEERING
          </div>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.05em', color: '#fff', textTransform: 'uppercase', lineHeight: 1.1 }}>
            SEE WHAT THE WORLD IS <span style={{ color: '#00b4d8' }}>TALKING ABOUT</span>
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Loading...</div>
        ) : (
          <>
            {/* News Cards Grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)',
              transition: 'all 0.7s ease 0.2s',
            }} className="testi-grid">
              {displayTestimonials.slice(0, 3).map((t, i) => (
                <div key={i} style={{
                  background: '#111', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '4px', overflow: 'hidden', cursor: 'pointer',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,180,216,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none' }}
                >
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
                    <img src={t.photo_url || t.img} alt={t.name}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)', transition: 'transform 0.5s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6))' }} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.25rem' }}>
                    <Stars count={t.rating || 5} />
                    <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0.75rem 0 0.5rem', letterSpacing: '0.03em', lineHeight: 1.3, textTransform: 'uppercase' }}>{t.name}</h3>
                    <p style={{ fontSize: '0.78rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '1rem' }}>{t.company || t.message || t.text}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00b4d8', fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                      READ MORE <span style={{ fontSize: '0.85rem' }}>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: '2.5rem',
              opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.4s',
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i)} style={{
                    width: i === currentPage ? '24px' : '8px', height: '8px',
                    borderRadius: '4px', border: 'none', cursor: 'pointer',
                    background: i === currentPage ? '#00b4d8' : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.3s', padding: 0,
                  }} />
                ))}
              </div>
              <button style={{
                padding: '0.75rem 2.5rem', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.82rem',
                letterSpacing: '0.15em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
              >READ MORE</button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media(max-width:768px){.testi-grid{grid-template-columns:1fr!important}}
        @media(max-width:900px){.testi-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </section>
  )
}

export default Testimonials