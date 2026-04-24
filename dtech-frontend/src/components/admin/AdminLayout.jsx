import { Link, NavLink } from 'react-router-dom'

const panelClassName =
  'rounded-[28px] border border-slate-800 bg-slate-900/80 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur'

const adminMenus = [
  { label: 'Dashboard', path: '/admin', disabled: false },
  { label: 'Achievement', path: '/admin/achievement', disabled: false },
  { label: 'Certificate', path: '/admin/certificates', disabled: false },
  { label: 'Products', path: '/admin/products', disabled: true },
  { label: 'Services', path: '/admin/services', disabled: true },
  { label: 'Testimonials', path: '/admin/testimonials', disabled: true },
  { label: 'Contact', path: '/admin/contact', disabled: true },
]

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#020617_100%)] text-slate-100">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className={`${panelClassName} h-fit p-5 sm:p-6 xl:sticky xl:top-6`}>
            <div className="rounded-[28px] border border-cyan-500/20 bg-slate-950/80 p-5">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Admin Dashboard
              </span>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">DTECH CMS</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Pusat pengelolaan konten website. Modul lain nanti bisa langsung ditambahkan dari sidebar ini.
              </p>
            </div>

            <nav className="mt-6 space-y-2">
              {adminMenus.map((menu) =>
                menu.disabled ? (
                  <div
                    key={menu.label}
                    className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-500"
                  >
                    <span>{menu.label}</span>
                    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
                      Soon
                    </span>
                  </div>
                ) : (
                  <NavLink
                    key={menu.label}
                    to={menu.path}
                    end={menu.path === '/admin'}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
                          : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-cyan-400/30 hover:text-white'
                      }`
                    }
                  >
                    <span>{menu.label}</span>
                    <span className="text-xs uppercase tracking-[0.2em]">Go</span>
                  </NavLink>
                )
              )}
            </nav>

            <Link
              to="/achievement"
              className="mt-6 flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:bg-cyan-400/10"
            >
              Lihat Halaman Public
            </Link>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
