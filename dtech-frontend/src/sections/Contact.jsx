import { useState } from 'react'
import { contactPublicService } from '../services/publicApi'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await contactPublicService.sendMessage(form)
      setSent(true)
      setTimeout(() => setSent(false), 3000)
      setForm({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '0.9rem', outline: 'none' }
  const labelStyle = { display: 'block', fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.5rem' }

  return (
    <section id="contact" style={{ background: '#000', padding: '6rem 6vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }} className="contact-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '2px', height: '40px', background: '#00b4d8' }} />
            <span style={{ fontFamily: 'Rajdhani', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: '#00b4d8' }}>REACH US</span>
          </div>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '2rem', lineHeight: 1.05 }}>Contact <span style={{ color: '#00b4d8' }}>Us</span></h2>
          <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>We're ready to discuss your project, answer your questions, and find the best engineering solution for your needs.</p>

          {[
            { icon: '📍', label: 'Address', value: 'Jl Nusantara 18 Canden, Salatiga, Indonesia 50742' },
            { icon: '📧', label: 'Email', value: 'support@dtech-engineering.com' },
            { icon: '📞', label: 'Phone', value: '(+62) 298 343 0015' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '44px', height: '44px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.2)', borderRadius: '4px', fontSize: '1.1rem' }}>{c.icon}</div>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '0.7rem', fontWeight: 700, color: '#00b4d8', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>{c.label}</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px', padding: '2.5rem' }}>
          <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: '1.3rem', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', marginBottom: '2rem' }}>SEND A MESSAGE</h3>
          {sent && <div style={{ padding: '1rem', background: 'rgba(0,180,216,0.15)', border: '1px solid #00b4d8', borderRadius: '4px', fontFamily: 'Rajdhani', fontSize: '0.85rem', color: '#00b4d8', marginBottom: '1.5rem' }}>✓ Message sent! We'll get back to you soon.</div>}
          {error && <div style={{ padding: '1rem', background: 'rgba(220,53,69,0.15)', border: '1px solid #dc3545', borderRadius: '4px', fontFamily: 'Rajdhani', fontSize: '0.85rem', color: '#dc3545', marginBottom: '1.5rem' }}>✗ {error}</div>}

          <form onSubmit={handleSubmit}>
            {[{ key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' }, { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@company.com' }, { key: 'company', label: 'Company (Optional)', type: 'text', placeholder: 'Your company name' }].map(field => (
              <div key={field.key} style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#00b4d8'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
            ))}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Message</label>
              <textarea placeholder="Tell us about your project..." rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = '#00b4d8'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#666' : '#00b4d8', color: '#000', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.15em', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', textTransform: 'uppercase' }}>{loading ? 'SENDING...' : 'SEND MESSAGE →'}</button>
          </form>
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;gap:3rem!important}} input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.2)}`}</style>
    </section>
  )
}
export default Contact