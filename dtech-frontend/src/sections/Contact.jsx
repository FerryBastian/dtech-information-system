import { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  return (
    <section
      style={{
        fontFamily: "'Open Sans', sans-serif",
        background: '#000',
        color: '#fff',
        minHeight: '100vh',
        paddingTop: '64px',
      }}
    >
      <div style={{ textAlign: 'center', padding: '80px 20px 40px' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 48px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 300,
          }}
        >
          Feel free to contact us for the further information
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '760px',
          margin: '20px auto 50px',
          padding: '0 20px',
          gap: '20px',
        }}
        className="contact-page-grid"
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            Jl Nusantara 18 Canden
            <br />
            Salatiga, Indonesia 50742
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 2 }}>
            Email: support@dtech-engineering.com
            <br />
            Phone: (+62) 298 343 0015
          </p>
        </div>
      </div>

      {submitted ? (
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto 80px',
            textAlign: 'center',
            padding: '40px 20px',
          }}
        >
          <p style={{ fontSize: '16px', color: '#00b4d8', fontWeight: 600 }}>
            Thank you! Your message has been sent.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '500px',
            margin: '0 auto 80px',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13.5px', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>
              Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', height: '42px', background: '#d9d9d9', border: 'none', borderRadius: '2px', padding: '0 12px', fontSize: '13px', color: '#111', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13.5px', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', height: '42px', background: '#d9d9d9', border: 'none', borderRadius: '2px', padding: '0 12px', fontSize: '13px', color: '#111', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13.5px', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>
              Message <span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={7}
              style={{ width: '100%', background: '#d9d9d9', border: 'none', borderRadius: '2px', padding: '10px 12px', fontSize: '13px', color: '#111', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>

          <div>
            <button
              type="submit"
              style={{ padding: '9px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '3px', color: '#fff', fontSize: '13.5px', fontWeight: 400, cursor: 'pointer', letterSpacing: '0.02em', transition: 'all 0.2s', fontFamily: 'inherit' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.borderColor = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
              }}
            >
              Submit
            </button>
          </div>
        </form>
      )}

      <style>{`
        @media(max-width:640px){.contact-page-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}

export default Contact
