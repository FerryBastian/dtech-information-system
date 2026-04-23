import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { resolveMediaUrl } from '../utils/media'

const Achievement = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await api.get('/achievements')
        setAchievements(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Data achievement gagal dimuat.')
      } finally {
        setLoading(false)
      }
    }

    loadAchievements()
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-8 pb-20 space-y-16">
        {loading && (
          <div className="py-16 text-center text-sm text-gray-400">
            Loading achievement...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        {!loading && !error && achievements.length === 0 && (
          <div className="py-16 text-center text-sm text-gray-400">
            Belum ada data achievement yang tampil.
          </div>
        )}

        {achievements.map((item, i) => (
          <div
            key={item.id}
            data-aos="fade-up"
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
              i % 2 !== 0 ? 'md:[direction:rtl]' : ''
            }`}
          >
            {/* IMAGE */}
            <div className="md:[direction:ltr]">
              <img
                src={resolveMediaUrl(item.thumbnail_image)}
                alt={item.title}
                className="w-full object-cover rounded-lg max-h-72"
              />
            </div>

            {/* TEXT */}
            <div className="md:[direction:ltr] space-y-4">
              <p className="text-sm font-bold tracking-widest text-white uppercase">
                <span className="font-extrabold">{item.category || '1ST PLACE'}</span>
                {item.category && item.title && (
                  <span className="font-normal"> | {item.title}</span>
                )}
              </p>
              {/* Jika ingin tampil seperti Figma: category dan judul event digabung */}
              {/* Uncomment baris ini dan hapus <p> di atas jika category = "1ST PLACE" dan title = nama event */}

              <p className="text-sm leading-relaxed text-gray-300">
                {item.short_description}
              </p>
              {item.attendees && (
                <p className="text-sm italic text-gray-400">
                  {item.attendees}
                </p>
              )}
              <button
                onClick={() => navigate(`/achievement/${item.id}`)}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold rounded-full transition-colors duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Achievement
