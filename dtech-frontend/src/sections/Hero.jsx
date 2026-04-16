import { useState, useEffect } from 'react'

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
    title: '"Redefine Technology"',
    subtitle: 'DTECH-ENGINEERING is a research and technology company established in 2009, focusing on mechanical engineering, manufacturing, and research-driven product development.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600&q=80',
    title: 'SUPERMILL MK 2.0',
    subtitle: 'Next-generation successor to the SEMAR-T CNC, with a strong emphasis on being more compact and designed for heavy-duty usage.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
    title: 'ULTRALIGHT AIRCRAFT',
    subtitle: 'A next-generation ultralight aircraft designed for maximum efficiency, precise maneuverability, and internationally certified safety standards.',
  },
]

const Hero = () => {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => { setCurrent(prev => (prev + 1) % slides.length); setFade(true) }, 400)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section id="home" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${slide.bg})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: fade ? 0.45 : 0, transition: 'opacity 0.6s ease',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.95) 100%)' }} />

      <div style={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 6vw 8vh', maxWidth: '900px',
        opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease',
      }}>
        <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: '#00b4d8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '30px', height: '1px', background: '#00b4d8' }} />
          PT DTECH INOVASI INDONESIA
        </div>

        <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.05 }}>
          {slide.title}
        </h1>

        <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', fontWeight: 300, color: 'rgba(255,255,255,0.8)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          {slide.subtitle}
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '0.75rem 2rem', background: '#00b4d8', color: '#000', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.12em', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            LEARN MORE
          </button>
          <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '0.75rem 2rem', background: 'transparent', color: '#fff', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.12em', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '4px', cursor: 'pointer' }}>
            CONTACT US
          </button>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ position: 'absolute', bottom: '2.5rem', right: '6vw', display: 'flex', gap: '8px', zIndex: 3 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true) }, 300) }}
            style={{ width: i === current ? '24px' : '6px', height: '6px', borderRadius: '3px', background: i === current ? '#00b4d8' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, #00b4d8, transparent)' }} />
    </section>
  )
}

export default Hero