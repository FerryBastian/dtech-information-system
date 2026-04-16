import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  {
    label: 'About', path: '/about',
    dropdown: ['History', 'Corporate Profile', 'Global Achievement', 'Portfolio', 'Patents', 'Legality Certificate']
  },
  {
    label: 'Products', path: '/products',
    dropdown: [
      { group: 'Machine', items: ['SUPERMILL 400', 'SUPERTURN', 'SUPERMILL MK 2.0', 'SEMAR-T CNC'] },
      { group: 'Arumi Motoparts', items: ['SWING ARM LENGAN AY', 'SWING ARM', 'COVER RADIATOR', 'KALIPER ARM'] },
      { group: 'Train Seat', items: ['EXECUTIV TRAIN SEAT', 'LUXURY TRAIN SEAT'] },
    ]
  },
  {
    label: 'Services', path: '/services',
    dropdown: ['Design Engineering', 'Product Development', 'Engineering Analysis', 'Prototyping Service']
  },
  { label: 'Innovations', path: '/innovations' },
  { label: 'Testimonial', path: '/testimonial' },
  {
    label: 'Contact', path: '/contact',
    dropdown: ['Contact Us', 'Support']
  },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('EN')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const goTo = (path) => {
    navigate(path)
    setMenuOpen(false)
    setOpenDropdown(null)
  }

  const goHome = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 2rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(0,0,0,0.96)' : 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(0,180,216,0.2)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>

        {/* Logo */}
        <div onClick={goHome} style={{ lineHeight: 1, cursor: 'pointer' }}>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
            DTECH-EN<span style={{ color: '#00b4d8' }}>GI</span>NEER<span style={{ color: '#00b4d8' }}>IN</span>G
          </div>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: '#888', marginTop: '2px', fontFamily: 'Rajdhani' }}>
            REDEFINE TECHNOLOGY
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desk-nav">
          {navItems.map((item) => (
            <div key={item.label} style={{ position: 'relative' }}
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => goTo(item.path)}
                style={{
                  fontFamily: 'Rajdhani', fontSize: '0.88rem', fontWeight: 600,
                  letterSpacing: '0.06em', padding: '0.5rem 0.85rem',
                  color: isActive(item.path) ? '#00b4d8' : openDropdown === item.label ? '#00b4d8' : 'rgba(255,255,255,0.85)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  transition: 'color 0.2s',
                  borderBottom: isActive(item.path) ? '2px solid #00b4d8' : '2px solid transparent',
                }}
              >
                {item.label}
              </button>

              {/* Dropdown */}
              {item.dropdown && openDropdown === item.label && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: 'rgba(10,10,10,0.98)',
                  border: '1px solid rgba(0,180,216,0.25)',
                  borderTop: '2px solid #00b4d8',
                  backdropFilter: 'blur(16px)',
                  minWidth: item.label === 'Products' ? '580px' : '220px',
                  padding: '1rem 0',
                  animation: 'fadeIn 0.15s ease',
                  zIndex: 100,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                }}>
                  {item.label === 'Products' ? (
                    <div style={{ display: 'flex', padding: '0.5rem 1.25rem', gap: '0' }}>
                      {item.dropdown.map((group) => (
                        <div key={group.group} style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '1.5rem', marginRight: '1.5rem' }}
                          onClick={() => goTo('/products')}
                        >
                          <div style={{
                            fontFamily: 'Rajdhani', fontSize: '0.7rem', fontWeight: 700,
                            letterSpacing: '0.2em', color: '#00b4d8', textTransform: 'uppercase',
                            marginBottom: '0.75rem', paddingBottom: '0.5rem',
                            borderBottom: '1px solid rgba(0,180,216,0.2)',
                          }}>{group.group}</div>
                          {group.items.map(subItem => (
                            <div key={subItem} style={{
                              padding: '0.45rem 0',
                              fontFamily: 'Barlow Condensed', fontSize: '0.88rem',
                              fontWeight: 600, letterSpacing: '0.04em',
                              color: 'rgba(255,255,255,0.7)',
                              cursor: 'pointer', transition: 'color 0.2s',
                              whiteSpace: 'nowrap',
                            }}
                              onMouseEnter={e => e.currentTarget.style.color = '#00b4d8'}
                              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                              onClick={() => goTo('/products')}
                            >— {subItem}</div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    item.dropdown.map((subItem) => (
                      <div key={subItem}
                        onClick={() => goTo(item.path)}
                        style={{
                          padding: '0.6rem 1.5rem',
                          fontFamily: 'Barlow Condensed', fontSize: '0.9rem',
                          fontWeight: 600, letterSpacing: '0.04em',
                          color: 'rgba(255,255,255,0.75)',
                          cursor: 'pointer', transition: 'all 0.2s',
                          borderLeft: '2px solid transparent',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#00b4d8'
                          e.currentTarget.style.borderLeftColor = '#00b4d8'
                          e.currentTarget.style.paddingLeft = '1.75rem'
                          e.currentTarget.style.background = 'rgba(0,180,216,0.05)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                          e.currentTarget.style.borderLeftColor = 'transparent'
                          e.currentTarget.style.paddingLeft = '1.5rem'
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >{subItem}</div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Language Toggle */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2px', border: '1px solid rgba(255,255,255,0.15)', marginLeft: '0.5rem' }}>
            {['ID', 'EN'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '3px 10px', borderRadius: '16px',
                fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700,
                background: lang === l ? '#00b4d8' : 'transparent',
                color: lang === l ? '#000' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.2s', border: 'none', cursor: 'pointer',
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px', background: '#00b4d8', borderRadius: '2px', transition: 'all 0.3s',
              transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, background: 'rgba(0,0,0,0.97)', zIndex: 999, padding: '1.5rem 2rem', borderBottom: '1px solid rgba(0,180,216,0.2)', maxHeight: '80vh', overflowY: 'auto' }}>
          {navItems.map(item => (
            <div key={item.label}>
              <button onClick={() => goTo(item.path)} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '0.85rem 0',
                fontFamily: 'Barlow Condensed', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.1em',
                color: isActive(item.path) ? '#00b4d8' : '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'none', border: 'none', cursor: 'pointer',
              }}>{item.label}</button>
              {item.dropdown && (
                <div style={{ paddingLeft: '1rem', paddingBottom: '0.5rem' }}>
                  {item.label === 'Products'
                    ? item.dropdown.flatMap(g => g.items).map(sub => (
                      <div key={sub} onClick={() => goTo('/products')} style={{ padding: '0.35rem 0', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Barlow Condensed', letterSpacing: '0.04em', cursor: 'pointer' }}>— {sub}</div>
                    ))
                    : item.dropdown.map(sub => (
                      <div key={sub} onClick={() => goTo(item.path)} style={{ padding: '0.35rem 0', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Barlow Condensed', letterSpacing: '0.04em', cursor: 'pointer' }}>— {sub}</div>
                    ))
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) { .desk-nav { display: none !important; } .hamburger { display: flex !important; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  )
}

export default Navbar