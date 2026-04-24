import { useEffect, useMemo, useRef, useState } from 'react'
import api from '../../services/api'
import AdminLayout from '../../components/admin/AdminLayout'
import { resolveMediaUrl } from '../../utils/media'

const createInitialForm = () => ({
  title: 'Industrial Design Certificate',
  sort_order: 0,
  is_active: true,
  image_file: null,
  image_preview: '',
  existing_image_url: '',
})

const cx = {
  input: 'w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20',
  card: 'rounded-3xl border border-slate-800 bg-slate-950/60 p-5',
  panel: 'rounded-[28px] border border-slate-800 bg-slate-900/80 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur',
  label: 'mb-1.5 block text-sm font-medium text-slate-200',
}

function ImageField({ previewUrl, hasExistingImage, onUpload, uploading }) {
  return (
    <div className="space-y-3">
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20">
        {uploading ? 'Memproses...' : hasExistingImage ? 'Ganti Gambar' : 'Upload Gambar'}
        <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={onUpload} />
      </label>
      <p className="text-xs leading-6 text-slate-400">
        File certificate akan disimpan langsung ke database.
      </p>
      {previewUrl ? (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-white/95 p-3">
          <img src={previewUrl} alt="Preview certificate" className="h-64 w-full rounded-2xl object-contain" />
        </div>
      ) : null}
    </div>
  )
}

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState([])
  const [form, setForm] = useState(createInitialForm)
  const [editingId, setEditingId] = useState(null)
  const [loadingList, setLoadingList] = useState(true)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const formRef = useRef(null)

  const totalActive = useMemo(
    () => certificates.filter((item) => Number(item.is_active) === 1).length,
    [certificates]
  )

  const clearAlerts = () => {
    setError('')
    setSuccess('')
  }

  const revokePreviewIfNeeded = (previewUrl) => {
    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl)
    }
  }

  const resetForm = () => {
    revokePreviewIfNeeded(form.image_preview)
    setForm(createInitialForm())
    setEditingId(null)
  }

  useEffect(() => () => revokePreviewIfNeeded(form.image_preview), [form.image_preview])

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const loadCertificates = async () => {
    try {
      setLoadingList(true)
      const response = await api.get('/certificates', { params: { includeInactive: true } })
      setCertificates(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat daftar certificate.')
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => {
    loadCertificates()
  }, [])

  const handleUpload = (file) => {
    if (!file) return

    clearAlerts()
    revokePreviewIfNeeded(form.image_preview)
    const previewUrl = URL.createObjectURL(file)

    setForm((current) => ({
      ...current,
      image_file: file,
      image_preview: previewUrl,
    }))
  }

  const handleEdit = async (id) => {
    try {
      clearAlerts()
      setLoadingDetail(true)
      const response = await api.get(`/certificates/${id}`)
      revokePreviewIfNeeded(form.image_preview)
      setForm({
        title: response.data.title || 'Industrial Design Certificate',
        sort_order: response.data.sort_order ?? 0,
        is_active: Number(response.data.is_active) === 1,
        image_file: null,
        image_preview: '',
        existing_image_url: response.data.image_url || '',
      })
      setEditingId(id)
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat detail certificate.')
    } finally {
      setLoadingDetail(false)
    }
  }

  const buildFormData = () => {
    const formData = new FormData()
    formData.append('title', form.title.trim() || 'Industrial Design Certificate')
    formData.append('sort_order', String(Number(form.sort_order) || 0))
    formData.append('is_active', String(form.is_active))
    if (form.image_file) {
      formData.append('image', form.image_file)
    }
    return formData
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    clearAlerts()

    if (!editingId && !form.image_file) {
      setError('Gambar certificate wajib dipilih saat membuat data baru.')
      return
    }

    try {
      setSubmitting(true)
      const formData = buildFormData()
      if (editingId) {
        await api.put(`/certificates/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setSuccess('Certificate berhasil diperbarui.')
      } else {
        await api.post('/certificates', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setSuccess('Certificate berhasil ditambahkan.')
      }
      resetForm()
      await loadCertificates()
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan certificate.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Hapus certificate "${title}"?`)) return

    try {
      clearAlerts()
      setDeletingId(id)
      await api.delete(`/certificates/${id}`)
      if (editingId === id) resetForm()
      setSuccess('Certificate berhasil dihapus.')
      await loadCertificates()
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus certificate.')
    } finally {
      setDeletingId(null)
    }
  }

  const previewUrl = form.image_preview || resolveMediaUrl(form.existing_image_url)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-[32px] border border-cyan-500/20 bg-slate-950/70 px-6 py-8 shadow-[0_25px_100px_rgba(6,182,212,0.12)] backdrop-blur sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Content Manager
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Kelola Certificate</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Atur certificate yang tampil di slider homepage dan halaman gallery, dengan file gambar tersimpan langsung di database.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { clearAlerts(); resetForm() }}
              className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-cyan-400/10"
            >
              + Form Baru
            </button>
          </div>
        </div>

        {error ? <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        {success ? <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div> : null}

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <form ref={formRef} onSubmit={handleSubmit} className={`${cx.panel} space-y-8 p-6 sm:p-8`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">{editingId ? 'Edit Certificate' : 'Tambah Certificate'}</h3>
                <p className="mt-1 text-sm text-slate-400">Upload gambar, atur judul, lalu tentukan urutan tampilnya.</p>
              </div>
              {loadingDetail ? (
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">Memuat...</span>
              ) : null}
            </div>

            <section className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block md:col-span-2">
                  <span className={cx.label}>Title</span>
                  <input
                    value={form.title}
                    onChange={(event) => setField('title', event.target.value)}
                    className={cx.input}
                    placeholder="Industrial Design Certificate"
                  />
                </label>

                <label className="block">
                  <span className={cx.label}>Urutan Tampil</span>
                  <input
                    type="number"
                    min="0"
                    value={form.sort_order}
                    onChange={(event) => setField('sort_order', event.target.value)}
                    className={cx.input}
                    placeholder="0"
                  />
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(event) => setField('is_active', event.target.checked)}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                  />
                  <span className="text-sm text-slate-200">Tampilkan di website</span>
                </label>
              </div>

              <div>
                <span className={cx.label}>Gambar Certificate</span>
                <ImageField
                  previewUrl={previewUrl}
                  hasExistingImage={Boolean(form.image_preview || form.existing_image_url)}
                  onUpload={(event) => handleUpload(event.target.files?.[0])}
                  uploading={submitting}
                />
              </div>
            </section>

            <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Menyimpan...' : editingId ? 'Update Certificate' : 'Simpan Certificate'}
              </button>
              <button
                type="button"
                onClick={() => { clearAlerts(); resetForm() }}
                className="rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800/80"
              >
                Reset Form
              </button>
            </div>
          </form>

          <div className={`${cx.panel} p-6 sm:p-8`}>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold text-white">Daftar Certificate</h3>
                <p className="mt-1 text-sm text-slate-400">Konten aktif langsung dipakai oleh section certificate di website.</p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-slate-300">
                  {certificates.length} item
                </span>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {totalActive} aktif
                </span>
              </div>
            </div>

            {loadingList ? (
              <p className="py-12 text-center text-sm text-slate-400">Memuat daftar certificate...</p>
            ) : certificates.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-700 py-12 text-center text-sm text-slate-400">
                Belum ada certificate. Tambahkan dari form di sebelah kiri.
              </div>
            ) : (
              <div className="space-y-4">
                {certificates.map((item) => (
                  <article key={item.id} className={cx.card}>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-white p-2 sm:w-36">
                        <img src={resolveMediaUrl(item.image_url)} alt={item.title} className="h-28 w-full rounded-xl object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex flex-wrap gap-2">
                              <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                #{item.id}
                              </span>
                              <span className={`rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-[0.2em] ${Number(item.is_active) === 1 ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-slate-700 text-slate-400'}`}>
                                {Number(item.is_active) === 1 ? 'Active' : 'Hidden'}
                              </span>
                            </div>
                            <h4 className="mt-2 text-base font-semibold text-white">{item.title}</h4>
                          </div>
                          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-xs font-semibold text-cyan-200">
                            Order {item.sort_order ?? 0}
                          </span>
                        </div>

                        <p className="mt-3 break-all text-sm leading-6 text-slate-400">{item.image_url}</p>

                        <div className="mt-4 flex gap-3">
                          <button
                            type="button"
                            onClick={() => handleEdit(item.id)}
                            className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.title)}
                            disabled={deletingId === item.id}
                            className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/20 disabled:opacity-60"
                          >
                            {deletingId === item.id ? 'Menghapus...' : 'Hapus'}
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
