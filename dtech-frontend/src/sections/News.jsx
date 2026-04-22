import { useState, useEffect } from 'react'
import { newsService } from '../services/crudService'

const defaultNews = [
  { type: 'News', title: 'Kursi kereta hasil kerjasama antara DTECH-ENGINEERING, SMK-SMK di Salatiga & Madiun, dengan PT INKA & IMST', date: 'December 12, 2023', img: '/news1.png' },
  { type: 'News Releases', title: 'Wapres Gibran Kunjungi DTech Engineering Semarang: Dorong Produk Lokal Inovatif Tembus Pasar Global', date: 'November 7, 2025', img: '/news2.png', featured: true },
  { type: 'News', title: 'Inspiratif! Lulusan SMK Ini Dirikan Industri Teknologi Kelas Dunia di Salatiga', date: 'August 6, 2022', img: '/news3.png' },
]

const News = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const result = await newsService.getAll()
        if (result.success && result.data.length > 0) {
          setNews(result.data)
        } else {
          setNews(defaultNews)
        }
      } catch (err) {
        setNews(defaultNews)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const displayNews = news.length > 0 ? news : defaultNews

  return (
    <section id="news" style={{ background: '#111', padding: '6rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.4em', color: '#00b4d8', marginBottom: '1rem' }}>THE LATEST ON DTECH-ENGINEERING</div>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.06em', color: '#fff', textTransform: 'uppercase', lineHeight: 1.1 }}>SEE WHAT THE WORLD IS <span style={{ color: '#00b4d8' }}>TALKING ABOUT</span></h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="news-grid">
            {displayNews.slice(0, 6).map((item, i) => (
              <article key={i} style={{ background: '#1a1a1a', border: item.is_featured || item.featured ? '1px solid rgba(0,180,216,0.35)' : '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ position: 'relative', paddingTop: '58%', overflow: 'hidden' }}>
                  <img src={item.image_url || item.img} alt={item.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.25rem 0.75rem', background: item.is_featured || item.featured ? '#00b4d8' : 'rgba(0,0,0,0.7)', color: item.is_featured || item.featured ? '#000' : 'rgba(255,255,255,0.8)',
                    fontFamily: 'Rajdhani', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', borderRadius: '2px' }}>{item.category || item.type || 'News'}</div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 500, lineHeight: 1.6, color: '#fff', marginBottom: '1rem' }}>{item.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>Published on {item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : item.date}</span>
                    <span style={{ color: '#00b4d8' }}>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
          {[1, 2, 3].map(n => (
            <button key={n} style={{ width: '36px', height: '36px', background: n === 1 ? '#00b4d8' : 'transparent', color: n === 1 ? '#000' : 'rgba(255,255,255,0.5)', border: n === 1 ? 'none' : '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'Rajdhani', fontSize: '0.85rem', fontWeight: 700, borderRadius: '2px', cursor: 'pointer' }}>{n}</button>
          ))}
          <button style={{ padding: '0 1.25rem', height: '36px', background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Rajdhani', fontSize: '0.78rem',
            fontWeight: 700, letterSpacing: '0.08em', cursor: 'pointer', borderRadius: '2px' }}>Next Page →</button>
        </div>
      </div>
      <style>{`@media(max-width:768px){.news-grid{grid-template-columns:1fr!important}}@media(min-width:480px) and (max-width:768px){.news-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  )
}
export default News