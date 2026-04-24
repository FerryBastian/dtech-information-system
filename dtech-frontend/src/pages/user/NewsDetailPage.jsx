import { useParams, useNavigate } from 'react-router-dom'

const newsData = [
  {
    id: 'kursi-kereta-agis',
    type: 'News',
    title: 'Kursi kereta hasil kerjasama antara DTECH-ENGINEERING, SMK-SMK di Salatiga & Madiun, dengan PT INKA & IMST',
    date: 'December 12, 2023',
    img: '/news1.png',
    content: [
      {
        heading: 'Kolaborasi Inovatif untuk Industri Perkeretaapian Indonesia',
        body: 'DTECH-ENGINEERING bersama SMK-SMK unggulan di Salatiga dan Madiun berhasil mewujudkan sebuah terobosan besar dalam industri perkeretaapian nasional. Melalui program kerjasama strategis dengan PT INKA (Industri Kereta Api) dan IMST, lahirlah kursi kereta berkualitas tinggi yang sepenuhnya diproduksi di dalam negeri.',
      },
      {
        heading: 'Mengurangi Ketergantungan pada Impor',
        body: 'Selama ini, industri perkeretaapian Indonesia masih sangat bergantung pada komponen impor, termasuk kursi penumpang. Melalui kolaborasi ini, DTECH-ENGINEERING membuktikan bahwa talenta lokal mampu menghasilkan produk dengan standar internasional. Kursi kereta yang diproduksi memenuhi standar keamanan dan kenyamanan yang ditetapkan oleh PT INKA.',
      },
      {
        heading: 'Melibatkan Generasi Muda',
        body: 'Proyek ini melibatkan siswa-siswa SMK dari Salatiga dan Madiun yang mendapat pelatihan langsung dari para insinyur DTECH-ENGINEERING. Pengalaman ini memberikan bekal nyata bagi generasi muda untuk terjun ke dunia industri manufaktur yang sesungguhnya.',
      },
      {
        heading: 'Dampak bagi Ekosistem Industri Lokal',
        body: 'Keberhasilan proyek ini diharapkan menjadi model kolaborasi antara industri, sekolah vokasi, dan BUMN yang dapat direplikasi di seluruh Indonesia. PT INKA menyambut baik inisiatif ini sebagai bagian dari program peningkatan kandungan lokal (TKDN) dalam setiap produk kereta api buatan Indonesia.',
      },
    ],
  },
  {
    id: 'wapres-gibran-kunjungi-dtech',
    type: 'News Releases',
    title: 'Wapres Gibran Kunjungi DTech Engineering Semarang: Dorong Produk Lokal Inovatif Tembus Pasar Global',
    date: 'November 7, 2025',
    img: '/news2.png',
    featured: true,
    content: [
      {
        heading: 'Kunjungan Bersejarah ke DTECH-ENGINEERING',
        body: 'Wakil Presiden Republik Indonesia, Gibran Rakabuming Raka, melakukan kunjungan kerja ke fasilitas produksi DTECH-ENGINEERING di Semarang. Kunjungan ini menjadi momen bersejarah bagi perusahaan teknologi engineering asal Salatiga yang telah menorehkan prestasi di kancah internasional.',
      },
      {
        heading: 'Mendorong Inovasi Produk Lokal',
        body: 'Dalam kunjungannya, Wapres Gibran menekankan pentingnya mendorong inovasi produk lokal agar mampu bersaing di pasar global. DTECH-ENGINEERING dinilai sebagai contoh nyata bagaimana perusahaan Indonesia mampu mengembangkan teknologi kelas dunia dari daerah.',
      },
      {
        heading: 'Produk Unggulan yang Dipamerkan',
        body: 'Selama kunjungan, tim DTECH-ENGINEERING mempresentasikan berbagai produk unggulan termasuk mesin CNC SUPERMILL MK 2.0, komponen Arumi Motoparts, dan desain kursi kereta eksekutif. Wapres Gibran terkesan dengan tingkat presisi dan kualitas produk yang dihasilkan oleh putra-putri bangsa.',
      },
      {
        heading: 'Komitmen Menuju Pasar Global',
        body: 'DTECH-ENGINEERING menegaskan komitmennya untuk terus berinovasi dan memperluas jangkauan pasar ke level internasional. Dukungan dari pemerintah melalui kunjungan Wapres ini menjadi motivasi besar bagi seluruh tim untuk terus berkarya dan mengharumkan nama Indonesia di kancah global.',
      },
    ],
  },
  {
    id: 'inspiratif-lulusan-smk',
    type: 'News',
    title: 'Inspiratif! Lulusan SMK Ini Dirikan Industri Teknologi Kelas Dunia di Salatiga',
    date: 'August 6, 2022',
    img: '/news3.png',
    content: [
      {
        heading: 'Dari Lulusan SMK Menjadi Pendiri Perusahaan Teknologi',
        body: 'Kisah sukses pendiri DTECH-ENGINEERING membuktikan bahwa latar belakang pendidikan vokasi bukan halangan untuk membangun perusahaan teknologi bertaraf internasional. Bermula dari semangat untuk membuktikan kemampuan teknisi lokal, perjalanan panjang ini akhirnya berbuah manis.',
      },
      {
        heading: 'Membangun dari Nol di Salatiga',
        body: 'DTECH-ENGINEERING didirikan pada tahun 2009 di Salatiga, Jawa Tengah. Dengan modal keterbatasan yang ada, pendirinya memulai perjalanan dengan tekad kuat untuk menghadirkan solusi engineering berkualitas tinggi yang tidak kalah dengan produk luar negeri.',
      },
      {
        heading: 'Prestasi yang Mendunia',
        body: 'Dalam perjalanannya, DTECH-ENGINEERING berhasil meraih penghargaan internasional bergengsi, termasuk juara pertama dalam kompetisi GE & FUSE On-Wing Jet Engine Inspection Design Challenge. Pencapaian ini membuktikan bahwa inovasi dari Indonesia mampu bersaing di level global.',
      },
      {
        heading: 'Inspirasi bagi Generasi Muda',
        body: 'Kisah ini menjadi inspirasi bagi ribuan lulusan SMK di seluruh Indonesia bahwa dengan kerja keras, dedikasi, dan semangat berinovasi, tidak ada yang tidak mungkin. DTECH-ENGINEERING terus membuka peluang bagi talenta muda untuk berkembang bersama dalam membangun teknologi Indonesia.',
      },
    ],
  },
]

const NewsDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const news = newsData.find(n => n.id === id)

  if (!news) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: '2rem' }}>News not found</h2>
          <button onClick={() => navigate(-1)} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: '#00b4d8', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Rajdhani', fontWeight: 700 }}>← Back</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#111', minHeight: '100vh', paddingTop: '64px' }}>

      {/* Hero image */}
      <div style={{ position: 'relative', height: 'clamp(280px, 45vh, 480px)', overflow: 'hidden' }}>
        <img src={news.img} alt={news.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8))' }} />

        {/* Category badge */}
        <div style={{ position: 'absolute', top: '2rem', left: '6vw' }}>
          <span style={{
            padding: '0.3rem 0.9rem',
            background: news.featured ? '#00b4d8' : 'rgba(0,0,0,0.7)',
            color: news.featured ? '#000' : '#fff',
            fontFamily: 'Rajdhani', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.12em', borderRadius: '2px',
          }}>{news.type}</span>
        </div>

        {/* Title overlay */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '6vw', right: '6vw', maxWidth: '900px' }}>
          <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, letterSpacing: '0.02em' }}>
            {news.title}
          </h1>
          <p style={{ fontFamily: 'Rajdhani', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.75rem', letterSpacing: '0.08em' }}>
            Published on {news.date}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 6vw 6rem' }}>
        {news.content.map((section, i) => (
          <div key={i} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: 'Barlow Condensed', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              fontWeight: 800, color: '#fff', letterSpacing: '0.03em',
              marginBottom: '1rem',
              borderLeft: '3px solid #00b4d8', paddingLeft: '1rem',
            }}>{section.heading}</h2>
            <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
              {section.body}
            </p>
          </div>
        ))}

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '3rem', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
            DTECH-ENGINEERING — {news.date}
          </span>
          <button onClick={() => navigate(-1)} style={{
            padding: '0.65rem 2rem', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)',
            fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.12em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00b4d8'; e.currentTarget.style.color = '#00b4d8' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
          >← BACK TO NEWS</button>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailPage