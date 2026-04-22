const PageHero = ({
  image,
  eyebrow,
  title,
  subtitle,
  height = '300px',
  backgroundPosition = 'center',
  filter = 'brightness(0.25) grayscale(40%)',
}) => (
  <section
    style={{
      height,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition,
        filter,
      }}
    />
    <div style={{ position: 'relative', zIndex: 1, padding: '0 2rem', maxWidth: '760px' }}>
      {eyebrow ? (
        <div
          style={{
            fontFamily: 'Rajdhani',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.4em',
            color: '#00b4d8',
            marginBottom: '0.75rem',
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h1
        style={{
          fontFamily: 'Barlow Condensed',
          fontSize: 'clamp(2rem, 5vw, 5rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '0.04em',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle ? (
        <p
          style={{
            fontSize: '0.88rem',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.85,
            margin: '1rem auto 0',
            maxWidth: '560px',
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(to right, transparent, #00b4d8, transparent)',
      }}
    />
  </section>
)

export default PageHero
