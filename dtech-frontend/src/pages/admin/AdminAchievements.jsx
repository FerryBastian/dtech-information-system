import { useEffect, useRef, useState } from 'react'
import api from '../../services/api'
import { resolveMediaUrl } from '../../utils/media'
import AdminLayout from '../../components/admin/AdminLayout'

// ─── helpers ────────────────────────────────────────────────────────────────

const toSlug = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const createSection    = (i = 0) => ({ section_type: 'content', title: '', content: '', image: '', order_index: i })
const createImage      = (i = 0) => ({ image_url: '', order_index: i })
const createTechnology = ()      => ({ name: '', description: '', image: '' })

const createInitialForm = () => ({
  // Hero
  category:           '',
  subtitle:           '',
  title:              '',
  slug:               '',
  short_description:  '',
  hero_description:   '',   // ← khusus hero detail
  thumbnail_image:    '',
  // About
  full_description:   '',
  images:             [createImage(0)],
  // Sections
  sections:           [createSection(0)],
  // Technologies
  technologies:       [createTechnology()],
  // Recognition
  recognition_image:  '',
  // Bottom
  bottom_description: '',
  attendees:          '',
})

const normalizeSections = (arr) =>
  arr
    .map((s, i) => ({ section_type: s.section_type?.trim() || 'content', title: s.title.trim(), content: s.content.trim(), image: s.image.trim(), order_index: i }))
    .filter((s) => s.title || s.content || s.image)

const normalizeImages = (arr) =>
  arr.map((img, i) => ({ image_url: img.image_url.trim(), order_index: i })).filter((img) => img.image_url)

const normalizeTechnologies = (arr) =>
  arr.map((t) => ({ name: t.name.trim(), description: t.description.trim(), image: t.image.trim() })).filter((t) => t.name || t.description || t.image)

const mapDetailToForm = (a) => ({
  category:           a.category           || '',
  subtitle:           a.subtitle           || '',
  title:              a.title              || '',
  slug:               a.slug               || '',
  short_description:  a.short_description  || '',
  hero_description:   a.hero_description   || '',   // ← baru
  thumbnail_image:    a.thumbnail_image    || '',
  full_description:   a.full_description   || '',
  attendees:          a.attendees          || '',
  recognition_image:  a.recognition_image  || '',
  bottom_description: a.bottom_description || '',
  technologies: a.technologies?.length
    ? a.technologies.map((t) => ({ name: t.name || '', description: t.description || '', image: t.image || '' }))
    : [createTechnology()],
  sections: a.sections?.length
    ? a.sections.map((s, i) => ({ section_type: s.section_type || 'content', title: s.title || '', content: s.content || '', image: s.image || '', order_index: s.order_index ?? i }))
    : [createSection(0)],
  images: a.images?.length
    ? a.images.map((img, i) => ({ image_url: img.image_url || '', order_index: img.order_index ?? i }))
    : [createImage(0)],
})

// ─── shared class strings ────────────────────────────────────────────────────

const cx = {
  input:       'w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20',
  textarea:    'w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-y',
  card:        'rounded-3xl border border-slate-800 bg-slate-950/60 p-5',
  panel:       'rounded-[28px] border border-slate-800 bg-slate-900/80 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur',
  sectionHead: 'mb-4 border-b border-slate-800 pb-3',
  label:       'mb-1.5 block text-sm font-medium text-slate-200',
  addBtn:      'mt-4 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20',
  removeBtn:   'text-sm font-medium text-rose-300 transition hover:text-rose-200',
}

// ─── reusable components ─────────────────────────────────────────────────────

function ImageField({ label, value, onChange, onUpload, uploading }) {
  return (
    <div>
      {label && <span className={cx.label}>{label}</span>}
      <div className="space-y-2">
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cx.input} placeholder="/uploads/example.jpg" />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20">
          {uploading ? 'Mengunggah…' : 'Upload Gambar'}
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={onUpload} />
        </label>
        {value && (
          <img src={resolveMediaUrl(value)} alt={label} className="h-36 w-full rounded-2xl border border-slate-800 object-cover" />
        )}
      </div>
    </div>
  )
}

function SectionLabel({ step, title, description }) {
  return (
    <div className={cx.sectionHead}>
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-300">
          {step}
        </span>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      {description && <p className="mt-1 pl-10 text-xs text-slate-400">{description}</p>}
    </div>
  )
}

// ─── main page ───────────────────────────────────────────────────────────────

export default function AdminAchievementPage() {
  const [achievements,  setAchievements]  = useState([])
  const [form,          setForm]          = useState(createInitialForm)
  const [editingId,     setEditingId]     = useState(null)
  const [loadingList,   setLoadingList]   = useState(true)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [submitting,    setSubmitting]    = useState(false)
  const [deletingId,    setDeletingId]    = useState(null)
  const [uploadingKey,  setUploadingKey]  = useState('')
  const [error,         setError]         = useState('')
  const [success,       setSuccess]       = useState('')
  const [slugManual,    setSlugManual]    = useState(false)
  const formRef = useRef(null)

  // ── data ──────────────────────────────────────────────────────────────────

  const loadList = async () => {
    try {
      setLoadingList(true)
      const res = await api.get('/achievements')
      setAchievements(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat daftar.')
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => { loadList() }, [])

  // ── form helpers ──────────────────────────────────────────────────────────

  const clearAlerts = () => { setError(''); setSuccess('') }
  const resetForm   = () => { setForm(createInitialForm()); setEditingId(null); setSlugManual(false) }
  const setField    = (field, value) =>
    setForm((f) => {
      const next = { ...f, [field]: value }
      if (field === 'title' && !slugManual) next.slug = toSlug(value)
      return next
    })

  // ── uploads ───────────────────────────────────────────────────────────────

  const uploadFile = async (file) => {
    const fd = new FormData()
    fd.append('image', file)
    const res = await api.post('/uploads/image', fd)
    return res.data.path
  }

  const handleSingleUpload = async (field, file, key) => {
    if (!file) return
    try { clearAlerts(); setUploadingKey(key); setField(field, await uploadFile(file)); setSuccess('Gambar berhasil diunggah.') }
    catch (err) { setError(err.response?.data?.message || 'Gagal mengunggah.') }
    finally { setUploadingKey('') }
  }

  const handleCollectionUpload = async ({ type, index, field, file, key }) => {
    if (!file) return
    try {
      clearAlerts(); setUploadingKey(key)
      const path = await uploadFile(file)
      if (type === 'sections')     setSectionField(index, field, path)
      if (type === 'images')       setImageValue(index, path)
      if (type === 'technologies') setTechField(index, field, path)
      setSuccess('Gambar berhasil diunggah.')
    } catch (err) { setError(err.response?.data?.message || 'Gagal mengunggah.') }
    finally { setUploadingKey('') }
  }

  // ── collection mutators ───────────────────────────────────────────────────

  const setSectionField = (i, f, v) => setForm((s) => ({ ...s, sections:     s.sections.map((x, idx)     => idx === i ? { ...x, [f]: v } : x) }))
  const setImageValue   = (i, v)    => setForm((s) => ({ ...s, images:       s.images.map((x, idx)       => idx === i ? { ...x, image_url: v } : x) }))
  const setTechField    = (i, f, v) => setForm((s) => ({ ...s, technologies: s.technologies.map((x, idx) => idx === i ? { ...x, [f]: v } : x) }))

  const addSection  = () => setForm((f) => ({ ...f, sections:     [...f.sections,     createSection(f.sections.length)] }))
  const addImage    = () => setForm((f) => ({ ...f, images:       [...f.images,       createImage(f.images.length)] }))
  const addTech     = () => setForm((f) => ({ ...f, technologies: [...f.technologies, createTechnology()] }))

  const removeSection = (i) => setForm((f) => ({ ...f, sections:     f.sections.length     === 1 ? [createSection(0)]   : f.sections.filter((_, idx)     => idx !== i) }))
  const removeImage   = (i) => setForm((f) => ({ ...f, images:       f.images.length       === 1 ? [createImage(0)]     : f.images.filter((_, idx)       => idx !== i) }))
  const removeTech    = (i) => setForm((f) => ({ ...f, technologies: f.technologies.length === 1 ? [createTechnology()] : f.technologies.filter((_, idx) => idx !== i) }))

  // ── CRUD ──────────────────────────────────────────────────────────────────

  const handleEdit = async (id) => {
    try {
      clearAlerts(); setLoadingDetail(true)
      const res = await api.get(`/achievements/${id}`)
      setForm(mapDetailToForm(res.data))
      setEditingId(id); setSlugManual(true)
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (err) { setError(err.response?.data?.message || 'Gagal memuat detail.') }
    finally { setLoadingDetail(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); clearAlerts()
    const payload = {
      category:           form.category.trim(),
      subtitle:           form.subtitle.trim(),
      title:              form.title.trim(),
      slug:               toSlug(form.slug || form.title),
      short_description:  form.short_description.trim(),
      hero_description:   form.hero_description.trim(),   // ← baru
      full_description:   form.full_description.trim(),
      thumbnail_image:    form.thumbnail_image.trim(),
      attendees:          form.attendees.trim(),
      technologies:       normalizeTechnologies(form.technologies),
      recognition_image:  form.recognition_image.trim(),
      bottom_description: form.bottom_description.trim(),
      sections:           normalizeSections(form.sections),
      images:             normalizeImages(form.images),
    }
    if (!payload.title || !payload.slug || !payload.short_description || !payload.thumbnail_image) {
      setError('Title, slug, short description, dan thumbnail wajib diisi.'); return
    }
    try {
      setSubmitting(true)
      if (editingId) { await api.put(`/achievements/${editingId}`, payload); setSuccess('Achievement diperbarui.') }
      else           { await api.post('/achievements', payload);             setSuccess('Achievement ditambahkan.') }
      resetForm(); await loadList()
    } catch (err) { setError(err.response?.data?.message || 'Gagal menyimpan.') }
    finally { setSubmitting(false) }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Hapus "${title}"?`)) return
    try {
      clearAlerts(); setDeletingId(id)
      await api.delete(`/achievements/${id}`)
      setSuccess('Achievement dihapus.')
      if (editingId === id) resetForm()
      await loadList()
    } catch (err) { setError(err.response?.data?.message || 'Gagal menghapus.') }
    finally { setDeletingId(null) }
  }

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* page header */}
        <div className="rounded-[32px] border border-cyan-500/20 bg-slate-950/70 px-6 py-8 shadow-[0_25px_100px_rgba(6,182,212,0.12)] backdrop-blur sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Content Manager
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Kelola Achievement</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Tambah, edit, atau hapus data achievement yang tampil di halaman publik.
              </p>
            </div>
            <button type="button" onClick={() => { clearAlerts(); resetForm() }}
              className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-cyan-400/10">
              + Form Baru
            </button>
          </div>
        </div>

        {/* alerts */}
        {error   && <div className="rounded-2xl border border-rose-500/30    bg-rose-500/10    px-4 py-3 text-sm text-rose-200">{error}</div>}
        {success && <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

        <div className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">

          {/* ══════════════ FORM ══════════════ */}
          <form ref={formRef} onSubmit={handleSubmit} className={`${cx.panel} p-6 sm:p-8 space-y-10`}>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{editingId ? 'Edit Achievement' : 'Tambah Achievement'}</h2>
                <p className="mt-1 text-sm text-slate-400">Isi semua bagian dari atas ke bawah sesuai urutan tampilan halaman.</p>
              </div>
              {loadingDetail && (
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">Memuat…</span>
              )}
            </div>

            {/* ── 1. HERO ── */}
            <section>
              <SectionLabel step="1" title="Hero" description="Tampil paling atas — judul besar, thumbnail, dan deskripsi singkat." />
              <div className="grid gap-4 md:grid-cols-2">

                <label className="block">
                  <span className={cx.label}>Category <span className="font-normal text-slate-500">(contoh: 1ST PLACE)</span></span>
                  <input value={form.category} onChange={(e) => setField('category', e.target.value)} className={cx.input} placeholder="1ST PLACE" />
                </label>

                <label className="block">
                  <span className={cx.label}>Subtitle <span className="font-normal text-slate-500">(contoh: GE & FUSE)</span></span>
                  <input value={form.subtitle} onChange={(e) => setField('subtitle', e.target.value)} className={cx.input} placeholder="GE & FUSE" />
                </label>

                <label className="block md:col-span-2">
                  <span className={cx.label}>Title <span className="font-normal text-slate-500">(nama lengkap event — tampil kecil di bawah judul hero)</span></span>
                  <input value={form.title} onChange={(e) => setField('title', e.target.value)} className={cx.input} placeholder="On-Wing Jet Engine Inspection Design" />
                </label>

                <label className="block md:col-span-2">
                  <span className={cx.label}>Slug</span>
                  <input value={form.slug}
                    onChange={(e) => { setSlugManual(true); setForm((f) => ({ ...f, slug: toSlug(e.target.value) })) }}
                    className={cx.input} placeholder="on-wing-jet-engine-inspection-design" />
                </label>

                {/* short_description — hanya untuk list achievement */}
                <label className="block md:col-span-2">
                  <span className={cx.label}>
                    Short Description
                    <span className="ml-2 rounded-full bg-slate-700 px-2 py-0.5 text-xs font-normal text-slate-400">
                      tampil di halaman list Achievement
                    </span>
                  </span>
                  <textarea value={form.short_description} onChange={(e) => setField('short_description', e.target.value)}
                    className={`${cx.textarea} min-h-24`} placeholder="Ringkasan singkat yang tampil di halaman daftar achievement" />
                </label>

                {/* hero_description — khusus hero di detail page */}
                <label className="block md:col-span-2">
                  <span className={cx.label}>
                    Hero Description
                    <span className="ml-2 rounded-full bg-cyan-400/20 px-2 py-0.5 text-xs font-normal text-cyan-300">
                      tampil di hero halaman detail
                    </span>
                  </span>
                  <textarea value={form.hero_description} onChange={(e) => setField('hero_description', e.target.value)}
                    className={`${cx.textarea} min-h-24`} placeholder="Deskripsi singkat yang tampil di bawah judul pada hero halaman detail" />
                </label>

                <div className="md:col-span-2">
                  <ImageField label="Thumbnail Image (background hero)"
                    value={form.thumbnail_image}
                    onChange={(v) => setField('thumbnail_image', v)}
                    onUpload={(e) => handleSingleUpload('thumbnail_image', e.target.files?.[0], 'thumbnail')}
                    uploading={uploadingKey === 'thumbnail'} />
                </div>
              </div>
            </section>

            {/* ── 2. ABOUT THE PROJECT ── */}
            <section>
              <SectionLabel step="2" title="About the Project" description="Deskripsi lengkap + dua gambar gallery di bawahnya." />
              <div className="space-y-4">
                <label className="block">
                  <span className={cx.label}>Full Description</span>
                  <textarea value={form.full_description} onChange={(e) => setField('full_description', e.target.value)}
                    className={`${cx.textarea} min-h-36`} placeholder="Deskripsi lengkap untuk section About the Project" />
                </label>

                <div className="space-y-3">
                  <span className={cx.label}>Gallery Images <span className="font-normal text-slate-500">(2 gambar pertama dipakai di About section)</span></span>
                  {form.images.map((img, i) => (
                    <div key={i} className={cx.card}>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-300">Gambar {i + 1}</span>
                        <button type="button" onClick={() => removeImage(i)} className={cx.removeBtn}>Hapus</button>
                      </div>
                      <ImageField
                        value={img.image_url}
                        onChange={(v) => setImageValue(i, v)}
                        onUpload={(e) => handleCollectionUpload({ type: 'images', index: i, field: 'image_url', file: e.target.files?.[0], key: `img-${i}` })}
                        uploading={uploadingKey === `img-${i}`} />
                    </div>
                  ))}
                  <button type="button" onClick={addImage} className={cx.addBtn}>+ Tambah Gambar</button>
                </div>
              </div>
            </section>

            {/* ── 3. DETAIL SECTIONS ── */}
            <section>
              <SectionLabel step="3" title="Detail Sections" description="Tampil setelah About — setiap section punya gambar, judul, dan teks." />
              <div className="space-y-4">
                {form.sections.map((sec, i) => (
                  <div key={i} className={cx.card}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">Section {i + 1}</span>
                      <button type="button" onClick={() => removeSection(i)} className={cx.removeBtn}>Hapus</button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className={cx.label}>Judul</span>
                        <input value={sec.title} onChange={(e) => setSectionField(i, 'title', e.target.value)} className={cx.input} placeholder="Complex Challenges" />
                      </label>
                      <label className="block">
                        <span className={cx.label}>Section Type</span>
                        <input value={sec.section_type} onChange={(e) => setSectionField(i, 'section_type', e.target.value)} className={cx.input} placeholder="content" />
                      </label>
                      <label className="block md:col-span-2">
                        <span className={cx.label}>Konten</span>
                        <textarea value={sec.content} onChange={(e) => setSectionField(i, 'content', e.target.value)}
                          className={`${cx.textarea} min-h-24`} placeholder="Isi teks section" />
                      </label>
                      <div className="md:col-span-2">
                        <ImageField label="Gambar Section"
                          value={sec.image}
                          onChange={(v) => setSectionField(i, 'image', v)}
                          onUpload={(e) => handleCollectionUpload({ type: 'sections', index: i, field: 'image', file: e.target.files?.[0], key: `sec-${i}` })}
                          uploading={uploadingKey === `sec-${i}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addSection} className={cx.addBtn}>+ Tambah Section</button>
            </section>

            {/* ── 4. TECHNOLOGIES ── */}
            <section>
              <SectionLabel step="4" title="Technologies Used" description="Kartu teknologi dengan gambar, nama, dan deskripsi." />
              <div className="space-y-4">
                {form.technologies.map((tech, i) => (
                  <div key={i} className={cx.card}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">Teknologi {i + 1}</span>
                      <button type="button" onClick={() => removeTech(i)} className={cx.removeBtn}>Hapus</button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className={cx.label}>Nama</span>
                        <input value={tech.name} onChange={(e) => setTechField(i, 'name', e.target.value)} className={cx.input} placeholder="Smart Automation Device" />
                      </label>
                      <ImageField label="Gambar"
                        value={tech.image}
                        onChange={(v) => setTechField(i, 'image', v)}
                        onUpload={(e) => handleCollectionUpload({ type: 'technologies', index: i, field: 'image', file: e.target.files?.[0], key: `tech-${i}` })}
                        uploading={uploadingKey === `tech-${i}`} />
                      <label className="block md:col-span-2">
                        <span className={cx.label}>Deskripsi</span>
                        <textarea value={tech.description} onChange={(e) => setTechField(i, 'description', e.target.value)}
                          className={`${cx.textarea} min-h-24`} placeholder="Deskripsi singkat teknologi" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addTech} className={cx.addBtn}>+ Tambah Teknologi</button>
            </section>

            {/* ── 5. GLOBAL RECOGNITION ── */}
            <section>
              <SectionLabel step="5" title="Global Recognition" description="Gambar sertifikat / penghargaan yang tampil setelah Technologies." />
              <ImageField label="Recognition Image"
                value={form.recognition_image}
                onChange={(v) => setField('recognition_image', v)}
                onUpload={(e) => handleSingleUpload('recognition_image', e.target.files?.[0], 'recognition')}
                uploading={uploadingKey === 'recognition'} />
            </section>

            {/* ── 6. BOTTOM SECTION ── */}
            <section>
              <SectionLabel step="6" title="Bottom Section" description="Penutup paling bawah halaman — deskripsi panjang dan info peserta." />
              <div className="space-y-4">
                <label className="block">
                  <span className={cx.label}>Bottom Description</span>
                  <textarea value={form.bottom_description} onChange={(e) => setField('bottom_description', e.target.value)}
                    className={`${cx.textarea} min-h-28`} placeholder="Deskripsi penutup halaman detail" />
                </label>
                <label className="block">
                  <span className={cx.label}>Attendees</span>
                  <input value={form.attendees} onChange={(e) => setField('attendees', e.target.value)} className={cx.input}
                    placeholder="Attended by 47 of the best research institutions worldwide" />
                </label>
              </div>
            </section>

            {/* submit */}
            <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row">
              <button type="submit" disabled={submitting}
                className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? 'Menyimpan…' : editingId ? 'Update Achievement' : 'Simpan Achievement'}
              </button>
              <button type="button" onClick={() => { clearAlerts(); resetForm() }}
                className="rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800/80">
                Reset Form
              </button>
            </div>
          </form>

          {/* ══════════════ LIST ══════════════ */}
          <div className={`${cx.panel} p-6 sm:p-8`}>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Daftar Achievement</h2>
                <p className="mt-1 text-sm text-slate-400">Klik Edit untuk memuat data ke form.</p>
              </div>
              <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-slate-300">
                {achievements.length} item
              </span>
            </div>

            {loadingList ? (
              <p className="py-12 text-center text-sm text-slate-400">Memuat daftar…</p>
            ) : achievements.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-700 py-12 text-center text-sm text-slate-400">
                Belum ada data. Tambahkan dari form di sebelah kiri.
              </div>
            ) : (
              <div className="space-y-4">
                {achievements.map((item) => (
                  <article key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-400/40">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <img src={resolveMediaUrl(item.thumbnail_image)} alt={item.title}
                        className="h-24 w-full rounded-2xl object-cover sm:w-36" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                              {item.category} | {item.subtitle}
                            </p>
                            <h3 className="mt-0.5 text-base font-semibold text-white">{item.title}</h3>
                          </div>
                          <span className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-400">#{item.id}</span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{item.short_description}</p>
                        <div className="mt-3 flex gap-3">
                          <button type="button" onClick={() => handleEdit(item.id)}
                            className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20">
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(item.id, item.title)} disabled={deletingId === item.id}
                            className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/20 disabled:opacity-60">
                            {deletingId === item.id ? 'Menghapus…' : 'Hapus'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </AdminLayout>
  )
}
