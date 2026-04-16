import Innovations from '../../sections/Innovations'

const InnovationsPage = () => (
  <div style={{ paddingTop: '64px' }}>
    <div style={{
      height: '300px', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.25) grayscale(40%)' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.4em', color: '#00b4d8', marginBottom: '0.75rem' }}>PT DTECH INOVASI INDONESIA</div>
        <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>INNOVATIONS</h1>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, #00b4d8, transparent)' }} />
    </div>
    <Innovations />
  </div>
)

export default InnovationsPage