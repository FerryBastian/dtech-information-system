import { useState, useEffect } from 'react'

const slides = [
  {
    bg: '/AboutCompany.jpg',
    title: '"Redefine Technology"',
    subtitle: 'DTECH-ENGINEERING is a research and technology company established in 2009, focusing on mechanical engineering, manufacturing, and research-driven product development.',
  },
  {
    bg: '/Supermill1.png',
    title: 'SUPERMILL MK 2.0',
    subtitle: 'Next-generation successor to the SEMAR-T CNC, with a strong emphasis on being more compact and designed for heavy-duty usage.',
  },
  {
    bg: '/GA2.png',
    title: 'GLOBAL ACHIEVEMENT',
    subtitle: 'Trusted by 47 of the best research institutions worldwide. 1st Place GE & FUSE On-Wing Jet Engine Inspection Design Challenge.',
  },
  {
    bg: '/Trainseat1.jpg',
    title: 'TRAIN SEAT',
    subtitle: "DTECH-ENGINEERING pioneered the domestic production of train seat components to reduce the Indonesian railway industry's dependence on imports.",
  },
]

const Hero = () => {
  const [current, setCurrent] = useState(0)
  const [nextIndex, setNextIndex] = useState(null)
  const [bgFade, setBgFade] = useState(true)   // kontrol fade gambar
  const [txtFade, setTxtFade] = useState(true) // kontrol fade teks

  useEffect(() => {
    const timer = setInterval(() => triggerSlide((current + 1) % slides.length), 5500)
    return () => clearInterval(timer)
  }, [current])

  const triggerSlide = (i) => {
    if (i === current) return
    setNextIndex(i)

    // 1. Teks fade out dulu
    setTxtFade(false)

    // 2. Setelah teks hilang, ganti gambar dengan crossfade
    setTimeout(() => {
      setBgFade(false)
      setTimeout(() => {
        setCurrent(i)
        setNextIndex(null)
        setBgFade(true)
        // 3. Teks fade in setelah gambar muncul
        setTimeout(() => setTxtFade(true), 200)
      }, 500)
    }, 300)
  }

  const goTo = (i) => { if (i !== current) triggerSlide(i) }

  const slide = slides[current]

  return (
    <section id="home" style={{ position: 'relative', height: '100vh', minHeight: '520px', overflow: 'hidden', background: '#000' }}>

      {/* Background image — crossfade */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${slide.bg})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: bgFade ? 1 : 0,
        transition: 'opacity 0.7s ease',
        filter: 'brightness(0.5)',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.65) 100%)',
        zIndex: 1,
      }} />

      {/* Blue line bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, #00b4d8, transparent)', zIndex: 4 }} />

      {/* Center content — teks punya fade sendiri */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 6vw',
        opacity: txtFade ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <h1 style={{
          fontFamily: 'Barlow Condensed',
          fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
          fontWeight: 800, color: '#fff',
          letterSpacing: '0.03em', lineHeight: 1.05,
          marginBottom: '1.25rem',
          textShadow: '0 2px 24px rgba(0,0,0,0.7)',
          maxWidth: '900px',
          transform: txtFade ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          {slide.title}
        </h1>
        <p style={{
          fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
          fontWeight: 400, color: 'rgba(255,255,255,0.88)',
          maxWidth: '640px', lineHeight: 1.75,
          textShadow: '0 1px 8px rgba(0,0,0,0.8)',
          transform: txtFade ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          {slide.subtitle}
        </p>
      </div>

      {/* Slide dots */}
      <div style={{
        position: 'absolute', bottom: '2.25rem', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 3,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? '28px' : '8px', height: '8px',
            borderRadius: '4px', padding: 0, border: 'none', cursor: 'pointer',
            background: i === current ? '#00b4d8' : 'rgba(255,255,255,0.35)',
            transition: 'all 0.35s ease',
          }} />
        ))}
      </div>
    </section>
  )
}

export default Hero