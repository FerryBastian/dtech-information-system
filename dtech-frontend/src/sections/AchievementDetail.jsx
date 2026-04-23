import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import { resolveMediaUrl } from '../utils/media'

const AchievementDetail = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    api.get(`/achievements/${id}`)
      .then(res => setData(res.data))
  }, [id])

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    )
  }

  const aboutGallery = data.images?.slice(0, 2) || []

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── HERO ── */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={resolveMediaUrl(data.thumbnail_image)}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.25]"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* "1ST PLACE | GE & FUSE" */}
          <h1 className="font-extrabold uppercase tracking-wide leading-tight text-[clamp(1.75rem,4vw,3rem)] text-white">
            {data.category} | {data.subtitle}
          </h1>
          {/* Nama event */}
          <p className="mt-2 text-white text-sm font-semibold uppercase tracking-widest">
            {data.title}
          </p>
          {/* Deskripsi khusus hero — dari field hero_description */}
          {data.hero_description && (
            <p className="mt-3 text-gray-300 text-sm max-w-xl mx-auto">
              {data.hero_description}
            </p>
          )}
        </div>
      </div>

      {/* ── ABOUT THE PROJECT ── */}
      {(data.full_description || aboutGallery.length > 0) && (
        <section className="max-w-6xl mx-auto px-8 py-16">
          {data.full_description && (
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-12 items-start">
              <h2 className="text-[2rem] leading-[1.15] font-medium tracking-wide text-white">
                About
                <br />
                the Project
              </h2>
              <p className="max-w-4xl text-sm leading-relaxed text-gray-300 md:pt-2">
                {data.full_description}
              </p>
            </div>
          )}

          {aboutGallery.length > 0 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-1 overflow-hidden">
              {aboutGallery.map((img, i) => (
                <div key={i} className="bg-neutral-950">
                  <img
                    src={resolveMediaUrl(img.image_url)}
                    alt=""
                    className="h-[230px] w-full object-cover md:h-[320px]"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── DETAIL SECTIONS ── */}
      {data.sections?.length > 0 && (
        <section className="max-w-6xl mx-auto px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-12">
            {data.sections.map(sec => (
              <div key={sec.id}>
                {sec.image && (
                  <img
                    src={resolveMediaUrl(sec.image)}
                    alt={sec.title}
                    className="w-full h-[230px] object-cover"
                  />
                )}
                <div className="pt-5">
                  <h3 className="text-[2rem] font-medium leading-tight tracking-wide text-white mb-4">
                    {sec.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">{sec.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TECHNOLOGIES USED ── */}
      {data.technologies?.length > 0 && (
        <section className="py-16 px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[2rem] font-semibold tracking-[0.14em] text-white mb-4">
              Technologies Used
            </h2>
            <p className="text-gray-300 text-sm mb-12">
              Integrating advanced technologies to deliver optimal accuracy, efficiency, and reliability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.technologies.map((tech, i) => (
                <div key={i} className="overflow-hidden rounded-[18px] bg-[#d9d9d9] text-left text-black">
                  {tech.image && (
                    <img
                      src={resolveMediaUrl(tech.image)}
                      alt={tech.name}
                      className="h-56 w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h4 className="text-[2rem] font-medium leading-tight mb-4">{tech.name}</h4>
                    <p className="text-sm leading-relaxed text-black/80">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── GLOBAL RECOGNITION ── */}
      {data.recognition_image && (
        <section className="py-16 px-8 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[2rem] font-semibold tracking-[0.14em] text-white mb-4">
              Global Recognition
            </h2>
            <p className="text-gray-300 text-sm mb-10">
              Integrating advanced technologies to deliver optimal accuracy, efficiency, and reliability.
            </p>
            <img
              src={resolveMediaUrl(data.recognition_image)}
              alt="Global Recognition"
              className="w-full object-cover"
            />
          </div>
        </section>
      )}

      {/* ── BOTTOM SECTION ── */}
      {data.bottom_description && (
        <section className="max-w-6xl mx-auto px-8 py-14 border-t border-gray-800">
          <h3 className="text-[2rem] font-semibold uppercase mb-4 text-white">
            {data.category} | {data.title}
          </h3>
          <p className="max-w-5xl text-sm leading-relaxed text-gray-300 mb-3">
            {data.bottom_description}
          </p>
          {data.attendees && (
            <p className="text-sm italic text-gray-400">{data.attendees}</p>
          )}
        </section>
      )}

    </div>
  )
}

export default AchievementDetail