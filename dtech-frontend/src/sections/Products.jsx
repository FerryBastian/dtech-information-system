import { useState, useEffect } from 'react'
import { productsService } from '../services/crudService'

const getDefaultCategories = () => [
  {
    id: 'machine', label: 'MACHINE',
    desc: 'Next-generation successor to the SEMAR-T CNC, with a strong emphasis on being more compact and designed for heavy-duty usage.',
    bg: '/Supermill1.png',
    items: ['SUPERMILL 400', 'SUPERTURN', 'SUPERMILL MK 2.0', 'SEMAR-T CNC'],
  },
  {
    id: 'motoparts', label: 'ARUMI MOTOPARTS',
    desc: 'Arumi Motoparts operates in the manufacturing of motorcycle components and accessories. It was founded in mid-2020 in Salatiga, Central Java.',
    bg: '/Arumi1.jpg',
    items: ['SWING ARM LENGAN AY', 'SWING ARM', 'COVER RADIATOR', 'KALIPER ARM'],
    gridImages: [
      '/Arumi1.jpg',
      '/Arumi2.jpg',
      '/Arumi3.jpg',
      '/Arumi4.jpg',
    ],
  },
  {
    id: 'trainseat', label: 'TRAIN SEAT',
    desc: "DTECH-ENGINEERING pioneered the domestic production of train seat components to reduce the Indonesian railway industry's dependence on imports.",
    bg: '/Trainseat1.jpg',
    items: ['EXECUTIVE TRAIN SEAT', 'LUXURY TRAIN SEAT'],
  },
]

const Products = () => {
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productsService.getAll()
        setCategories(getDefaultCategories())
      } catch {
        setCategories(getDefaultCategories())
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const displayCats = categories.length > 0 ? categories : getDefaultCategories()
  const cat = displayCats[active]

  return (
    <section id="products" style={{ background: '#000' }}>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 6vw' }}>
        {displayCats.map((c, i) => (
          <button key={c.id} onClick={() => setActive(i)} style={{
            fontFamily: 'Rajdhani', fontSize: '0.85rem', fontWeight: 700,
            letterSpacing: '0.12em', padding: '1.25rem 2rem',
            color: active === i ? '#00b4d8' : 'rgba(255,255,255,0.4)',
            borderBottom: active === i ? '2px solid #00b4d8' : '2px solid transparent',
            background: 'none', border: 'none', cursor: 'pointer',
            textTransform: 'uppercase', transition: 'color 0.2s',
            marginBottom: '-1px',
          }}>{c.label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading...</div>
      ) : (
        <>
          {/* ─── MACHINE ─── */}
          {cat.id === 'machine' && (
            <>
              {/* Hero: full bg photo, text bottom-left, like PDF */}
              <div style={{ position: 'relative', height: 'clamp(580px, 85vh, 860px)', overflow: 'hidden' }}>
                {/* BG image — center-focus, slightly darker */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${cat.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: '60% center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0.5) grayscale(10%)',
                }} />
                {/* Gradient: strong on left where text is */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.1) 75%, transparent)',
                }} />

                {/* Text block — bottom left */}
                <div style={{
                  position: 'absolute', bottom: '3rem', left: '6vw',
                  maxWidth: '400px',
                }}>
                  {/* SUPERMILL logo-style */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '0.85rem' }}>
                    <span style={{
                      fontFamily: 'Barlow Condensed', fontWeight: 900,
                      fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                      color: '#fff', letterSpacing: '0.04em', lineHeight: 1,
                    }}>SUPER</span>
                    <span style={{
                      fontFamily: 'Barlow Condensed', fontWeight: 900,
                      fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                      color: '#fff', letterSpacing: '0.04em', lineHeight: 1,
                    }}>MILL</span>
                    {/* MK 2.0 badge stacked */}
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      marginLeft: '3px', marginBottom: '3px', lineHeight: 1.1,
                    }}>
                      <span style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(0.55rem, 1vw, 0.85rem)', fontWeight: 800, color: '#00b4d8', letterSpacing: '0.08em' }}>MK</span>
                      <span style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(0.55rem, 1vw, 0.85rem)', fontWeight: 800, color: '#00b4d8', letterSpacing: '0.08em' }}>2.0</span>
                    </div>
                  </div>

                  <p style={{
                    fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', fontWeight: 300,
                    color: 'rgba(255,255,255,0.78)', lineHeight: 1.75,
                    marginBottom: '1.5rem',
                  }}>{cat.desc}</p>

                  {/* Rounded Learn More — like PDF */}
                  <button style={{
                    padding: '0.55rem 1.75rem',
                    background: '#00b4d8', color: '#000',
                    fontFamily: 'Rajdhani', fontWeight: 700,
                    fontSize: '0.78rem', letterSpacing: '0.1em',
                    border: 'none', borderRadius: '50px',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#0096b7'}
                    onMouseLeave={e => e.currentTarget.style.background = '#00b4d8'}
                  >Learn More</button>
                </div>
              </div>

              {/* Product name grid */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cat.items.length}, 1fr)`, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {cat.items.map((item, i) => (
                  <div key={i}
                    style={{ padding: '1.4rem 2rem', borderRight: i < cat.items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,180,216,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.82)', textTransform: 'uppercase' }}>{item}</div>
                    <div style={{ width: '22px', height: '2px', background: '#00b4d8', marginTop: '7px' }} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ─── ARUMI MOTOPARTS ─── */}
          {cat.id === 'motoparts' && (
            <>
              {/* Section title */}
              <div style={{ background: '#000', padding: '3rem 6vw 1.5rem', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  UPGRADE THE LOOK, ENHANCE THE COMFORT
                </h2>
              </div>

              {/* Asymmetric photo grid - sesuai figma */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '8px', padding: '0 4vw 2rem', height: '500px' }} className="arumi-grid">
                {/* Big left - span 2 rows */}
                <div style={{ position: 'relative', gridRow: '1 / 3', overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={cat.gridImages[0]} alt="Arumi" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} />
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                    <div style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.06em', lineHeight: 0.9 }}>
                      <span style={{ color: '#00b4d8' }}>A</span>RM
                    </div>
                    <div style={{ fontFamily: 'Rajdhani', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>— A|UMI Moto Parts</div>
                    <p style={{ fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.58)', maxWidth: '200px', lineHeight: 1.6, marginTop: '0.5rem' }}>{cat.desc}</p>
                    <button style={{ marginTop: '0.75rem', padding: '0.45rem 1.25rem', background: '#00b4d8', color: '#000', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>Learn More</button>
                  </div>
                </div>
                {/* Top middle */}
                <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={cat.gridImages[1]} alt="Arumi 2" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }} />
                </div>
                {/* Top right */}
                <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={cat.gridImages[2]} alt="Arumi 3" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }} />
                </div>
                {/* Bottom middle - spans 2 cols */}
                <div style={{ gridColumn: '2 / 4', overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={cat.gridImages[3]} alt="Arumi 4" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }} />
                </div>
              </div>

              {/* Product items */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cat.items.length}, 1fr)`, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {cat.items.map((item, i) => (
                  <div key={i}
                    style={{ padding: '1.4rem 2rem', borderRight: i < cat.items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,180,216,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.82)', textTransform: 'uppercase' }}>{item}</div>
                    <div style={{ width: '22px', height: '2px', background: '#00b4d8', marginTop: '7px' }} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ─── TRAIN SEAT ─── */}
          {cat.id === 'trainseat' && (
            <>
              <div style={{ position: 'relative', height: 'clamp(580px, 85vh, 860px)', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${cat.bg})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  filter: 'brightness(0.45)',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0.1) 75%, transparent)' }} />
                <div style={{ position: 'absolute', bottom: '3rem', left: '6vw', maxWidth: '400px' }}>
                  <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>TRAIN SEAT</h2>
                  <p style={{ fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', fontWeight: 300, color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: '1.5rem' }}>{cat.desc}</p>
                  <button style={{ padding: '0.55rem 1.75rem', background: '#00b4d8', color: '#000', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>Learn More</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cat.items.length}, 1fr)`, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {cat.items.map((item, i) => (
                  <div key={i}
                    style={{ padding: '1.4rem 2rem', borderRight: i < cat.items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,180,216,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.82)', textTransform: 'uppercase' }}>{item}</div>
                    <div style={{ width: '22px', height: '2px', background: '#00b4d8', marginTop: '7px' }} />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <style>{`
        @media(max-width:640px){.arumi-grid{grid-template-columns:1fr!important;grid-template-rows:auto!important}}
        @media(max-width:640px){.arumi-grid>div:first-child{grid-row:auto!important}}
      `}</style>
    </section>
  )
}

export default Products