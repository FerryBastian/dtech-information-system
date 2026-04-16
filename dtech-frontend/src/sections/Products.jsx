import { useState, useEffect } from 'react'
import { productsService } from '../services/crudService'

const Products = () => {
  const [categories, setCategories] = useState([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productsService.getAll()
        if (result.success && result.data.length > 0) {
          const grouped = result.data.reduce((acc, product) => {
            const cat = product.category || 'other'
            if (!acc[cat]) {
              acc[cat] = { id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1), items: [], headline: cat.toUpperCase(), desc: `${cat.charAt(0).toUpperCase() + cat.slice(1)} products` }
            }
            acc[cat].items.push(product.name)
            return acc
          }, {})
          const cats = Object.values(grouped)
          if (cats.length > 0) {
            setCategories(cats)
          } else {
            setCategories(getDefaultCategories())
          }
        } else {
          setCategories(getDefaultCategories())
        }
      } catch (err) {
        setCategories(getDefaultCategories())
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const getDefaultCategories = () => [
    { id: 'machine', label: 'Machine', headline: 'SUPERMILL MK 2.0', desc: 'Next-generation successor to the SEMAR-T CNC, with a strong emphasis on being more compact and designed for heavy-duty usage.', bg: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80', items: ['SUPERMILL 400', 'SUPERTURN', 'SUPERMILL MK 2.0', 'SEMAR-T CNC'] },
    { id: 'motoparts', label: 'Arumi Motoparts', headline: 'UPGRADE THE LOOK, ENHANCE THE COMFORT', desc: 'Arumi Motoparts operates in the manufacturing of motorcycle components and accessories. Founded in mid-2020 in Salatiga, Central Java.', bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', items: ['SWING ARM LENGAN AY', 'COVER RADIATOR AIR', 'KALIPER ARM', 'SWING ARM'] },
    { id: 'trainseat', label: 'Train Seat', headline: 'TRAIN SEAT', desc: "DTECH-ENGINEERING pioneered the domestic production of train seat components to reduce the Indonesian railway industry's dependence on imports.", bg: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80', items: ['Executive Train Seat', 'Luxury Train Seat'] },
  ]

  const defaultCategories = getDefaultCategories()
  const displayCategories = categories.length > 0 ? categories : defaultCategories
  const cat = displayCategories[active] || defaultCategories[0]

  return (
    <section id="products" style={{ background: '#000' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 6vw' }}>
        {displayCategories.slice(0, 4).map((c, i) => (
          <button key={c.id} onClick={() => setActive(i)} style={{ fontFamily: 'Rajdhani', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', padding: '1.5rem 2rem', color: active === i ? '#00b4d8' : 'rgba(255,255,255,0.45)', borderBottom: active === i ? '2px solid #00b4d8' : '2px solid transparent', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>{c.label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Loading...</div>
      ) : (
        <>
          <div style={{ position: 'relative', height: 'clamp(300px, 50vh, 520px)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cat.bg || 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, transparent)' }} />
            <div style={{ position: 'absolute', inset: 0, padding: '3rem 6vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '0.04em', color: '#fff', marginBottom: '0.75rem' }}>{cat.headline}</h2>
              <p style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(255,255,255,0.75)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '1.5rem' }}>{cat.desc}</p>
              <button style={{ alignSelf: 'flex-start', padding: '0.6rem 1.75rem', background: '#00b4d8', color: '#000', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>LEARN MORE</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cat.items?.length || 4}, 1fr)`, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {(cat.items || []).map((item, i) => (
              <div key={i} style={{ padding: '1.5rem 2rem', borderRight: i < (cat.items?.length || 4) - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,180,216,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>{item}</div>
                <div style={{ width: '24px', height: '2px', background: '#00b4d8', marginTop: '8px' }} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
export default Products