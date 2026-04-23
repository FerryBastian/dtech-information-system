import { useState, useEffect } from 'react'
import { testimoniService } from '../services/crudService'

const Stars = ({ count }) => (
  <div style={{ display: 'inline-flex', gap: '2px', background: '#1a1a2e', borderRadius: '3px', padding: '3px 8px' }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < count ? '#00b4d8' : 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>★</span>
    ))}
  </div>
)

const QuoteIcon = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ marginBottom: '12px' }}>
    <path d="M0 28V17.2C0 14.08 0.64 11.28 1.92 8.8C3.2 6.32 4.96 4.24 7.2 2.56C9.44 0.853333 12.0267 0 15.04 0V4.48C12.5067 4.48 10.4 5.38667 8.72 7.2C7.04 8.98667 6.2 11.2 6.2 13.84H12.4V28H0ZM21.6 28V17.2C21.6 14.08 22.24 11.28 23.52 8.8C24.8 6.32 26.56 4.24 28.8 2.56C31.04 0.853333 33.6267 0 36.64 0V4.48C34.1067 4.48 32 5.38667 30.32 7.2C28.64 8.98667 27.8 11.2 27.8 13.84H34V28H21.6Z" fill="#00b4d8" opacity="0.7"/>
  </svg>
)

const defaultTestimonials = [
  {
    name: 'Renee Smith',
    company: 'ParkingBOXX',
    rating: 4,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    text: 'DTECH-ENGINEERING team is absolutely AMAZING to work with – I highly recommend them! We worked with numerous other contractors before finding him, and he is the ONLY one who was able to grasp our requirements, provide ALL of the needed files, and has great communication to clarify any points. For some of the complex functionality, I greatly appreciate his offers to screen share during a Skype call so that I can see exactly what he\'s working on–basically as if I\'m sitting in his office–so that we can quickly finalize outstanding items. He has completed numerous projects for us from early renderings to complex designs with dozens of components to final renderings for customer presentations. We\'re ending this contract only to start a new one. Thanks DTECH-ENGINEERING team!',
  },
  {
    name: 'Levi Koenig',
    company: 'Industrial Project',
    rating: 4,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    text: 'DTECH-ENGINEERING team was a curial part of our project. They were the main engineer and we gave him full design freedom. He absolutely blew our minds with his work because he thought of every little thing from the biggest structure of the sea can to what kind of bolts to use for putting things together. They finished all his work on schedule and under the amount of time we gave them. They are very professional, had good communication skills, and has vast knowledge in his field and in fields that he says he does not know very well. I will hire DTECH-ENGINEERING team again with out a doubt, no matter what project I do, if not just to check over the work of another engineer has done. Thank you DTECH-ENGINEERING team for doing an amazing job!!',
  },
  {
    name: 'Anne Topper',
    company: 'MiniportWorld',
    rating: 4,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    text: 'DTECH-ENGINEERING helped me with a difficult project where the requirements became increasingly more demanding as the design developed. They were very flexible and always available which made communication easy despite the distance/time difference. The end design is a huge improvement on what I have at the moment which makes me very happy. DTECH-ENGINEERING is absolutely honest with his hours and he does all he can for his clients which is very reassuring.',
  },
  {
    name: 'David Valin',
    company: 'Solar Panel Boost Inc',
    rating: 4,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    text: 'DTECH-ENGINEERING team are a very smart engineers, and he understands the manufacturing process very well, his rates are very worth his capabilities. His creativity can take your simple sketches, and transform them into amazing products.',
  },
]

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await testimoniService.getAll()
        if (result.success && result.data.length > 0) {
          setTestimonials(result.data)
        } else {
          setTestimonials(defaultTestimonials)
        }
      } catch {
        setTestimonials(defaultTestimonials)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const list = testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: '#000', color: '#fff' }}>

      {/* ─── HERO ─── */}
      <section
        style={{
          position: 'relative',
          height: '300px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.2) grayscale(50%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 2rem', maxWidth: '740px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>
            Our Testimonials
          </h1>
          <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }}>
            Several clients who have collaborated with us have kindly shared their experiences through testimonials.
            Their stories and feedback reflect the quality of our services, our professionalism, and our commitment
            to delivering the best solutions for every project we undertake.
          </p>
        </div>
      </section>

      {/* ─── CARDS ─── */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Loading...</div>
      ) : (
        <div style={{ padding: '60px 40px 80px', maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {list.map((t, i) => {
            const isEven = i % 2 === 0
            const imgUrl = t.photo_url || t.img || defaultTestimonials[i % 2].img

            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#fff',
                  minHeight: '260px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                {/* ── Foto KIRI (index genap) ── */}
                {isEven && (
                  <div
                    style={{
                      background: '#fff',
                      padding: '16px',                  // ← space antara foto dan tepi card
                      display: 'flex',
                      alignItems: 'stretch',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        borderRadius: '8px',            // ← foto melengkung sendiri
                        minHeight: '220px',
                      }}
                    />
                  </div>
                )}

                {/* ── Konten ── */}
                <div
                  style={{
                    padding: '24px 28px',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <QuoteIcon />
                      <Stars count={t.rating || 4} />
                    </div>
                    <p style={{ fontSize: '12px', lineHeight: 1.85, color: '#333', fontWeight: 400, textAlign: 'justify', margin: 0 }}>
                      {t.message || t.text}
                    </p>
                  </div>
                  <div style={{ marginTop: '18px', textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#00b4d8', letterSpacing: '0.01em' }}>{t.name}</div>
                    <div style={{ fontSize: '11px', color: '#666', letterSpacing: '0.04em', marginTop: '2px' }}>{t.company}</div>
                  </div>
                </div>

                {/* ── Foto KANAN (index ganjil) ── */}
                {!isEven && (
                  <div
                    style={{
                      background: '#fff',
                      padding: '16px',                  // ← space antara foto dan tepi card
                      display: 'flex',
                      alignItems: 'stretch',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        borderRadius: '8px',            // ← foto melengkung sendiri
                        minHeight: '220px',
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .testi-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default TestimonialPage