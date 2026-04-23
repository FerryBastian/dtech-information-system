import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import AdminLayout from '../../components/admin/AdminLayout'

const panelClassName =
  'rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur'

function AdminDashboardPage() {
  const [achievementCount, setAchievementCount] = useState(0)

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await api.get('/achievements')
        setAchievementCount(response.data.length)
      } catch {
        setAchievementCount(0)
      }
    }

    loadSummary()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-[32px] border border-cyan-500/20 bg-slate-950/70 px-6 py-8 shadow-[0_25px_100px_rgba(6,182,212,0.12)] backdrop-blur sm:px-8">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Admin Home
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Dashboard</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Ini halaman admin dashboard yang terpisah. Dari sini nanti semua modul admin bisa diarahkan lewat sidebar tanpa menumpuk di halaman achievement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className={panelClassName}>
            <p className="text-sm text-slate-400">Modul Aktif</p>
            <p className="mt-2 text-2xl font-bold text-white">Achievement</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Modul CRUD pertama yang sudah aktif penuh di dashboard admin.
            </p>
          </div>
          <div className={panelClassName}>
            <p className="text-sm text-slate-400">Total Achievement</p>
            <p className="mt-2 text-2xl font-bold text-white">{achievementCount} Item</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Jumlah data aktif yang sekarang tersedia di website.
            </p>
          </div>
          <div className={panelClassName}>
            <p className="text-sm text-slate-400">Struktur Admin</p>
            <p className="mt-2 text-2xl font-bold text-white">Sidebar Ready</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Products, services, testimonial, dan contact tinggal disambungkan ke page masing-masing.
            </p>
          </div>
        </div>

        <div className={`${panelClassName} flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between`}>
          <div>
            <h3 className="text-2xl font-semibold text-white">Lanjut Kelola Achievement</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Masuk ke modul achievement untuk tambah, edit, hapus, dan upload gambar lokal.
            </p>
          </div>
          <Link
            to="/admin/achievement"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Buka Modul Achievement
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboardPage
