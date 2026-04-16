import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import {
  MdInventory, MdMiscellaneousServices, MdEmojiEvents, MdPhotoLibrary,
  MdVerified, MdPeople, MdNewspaper, MdEmail, MdArrowForward, MdSecurity
} from 'react-icons/md';
import { FaQuoteLeft } from 'react-icons/fa';
import api from '../../services/api';

const cards = [
  { label: 'Users', endpoint: 'auth/users', icon: MdSecurity, color: 'cyan', path: '/admin/users' },
  { label: 'Products', endpoint: 'products', icon: MdInventory, color: 'blue', path: '/admin/products' },
  { label: 'Services', endpoint: 'services', icon: MdMiscellaneousServices, color: 'purple', path: '/admin/services' },
  { label: 'Achievements', endpoint: 'achievements', icon: MdEmojiEvents, color: 'yellow', path: '/admin/achievements' },
  { label: 'Portfolio', endpoint: 'portfolio', icon: MdPhotoLibrary, color: 'green', path: '/admin/portfolio' },
  { label: 'Certificates', endpoint: 'certificates', icon: MdVerified, color: 'pink', path: '/admin/certificates' },
  { label: 'Testimoni', endpoint: 'testimoni', icon: FaQuoteLeft, color: 'orange', path: '/admin/testimoni' },
  { label: 'Team', endpoint: 'team', icon: MdPeople, color: 'cyan', path: '/admin/team' },
  { label: 'News', endpoint: 'news', icon: MdNewspaper, color: 'red', path: '/admin/news' },
];

const colorMap = {
  blue:   { card: 'border-blue-600/20   bg-blue-600/5',   icon: 'bg-blue-600/20   text-blue-400',   text: 'text-blue-400' },
  purple: { card: 'border-purple-600/20 bg-purple-600/5', icon: 'bg-purple-600/20 text-purple-400', text: 'text-purple-400' },
  yellow: { card: 'border-yellow-600/20 bg-yellow-600/5', icon: 'bg-yellow-600/20 text-yellow-400', text: 'text-yellow-400' },
  green:  { card: 'border-green-600/20  bg-green-600/5',  icon: 'bg-green-600/20  text-green-400',  text: 'text-green-400' },
  pink:   { card: 'border-pink-600/20   bg-pink-600/5',   icon: 'bg-pink-600/20   text-pink-400',   text: 'text-pink-400' },
  orange: { card: 'border-orange-600/20 bg-orange-600/5', icon: 'bg-orange-600/20 text-orange-400', text: 'text-orange-400' },
  cyan:   { card: 'border-cyan-600/20   bg-cyan-600/5',   icon: 'bg-cyan-600/20   text-cyan-400',   text: 'text-cyan-400' },
  red:    { card: 'border-red-600/20    bg-red-600/5',    icon: 'bg-red-600/20    text-red-400',    text: 'text-red-400' },
};

const Dashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState({});
  const [unread, setUnread] = useState(0);
  const [loadingCounts, setLoadingCounts] = useState(true);

  useEffect(() => {
    Promise.all(
      cards.map(({ endpoint }) =>
        api.get(`/${endpoint}`)
          .then(r => ({ endpoint, count: r.data?.data?.length || 0 }))
          .catch(() => ({ endpoint, count: 0 }))
      )
    ).then(results => {
      const map = {};
      results.forEach(({ endpoint, count }) => { map[endpoint] = count; });
      setCounts(map);
      setLoadingCounts(false);
    });
    api.get('/contact').then(r => setUnread((r.data?.data || []).filter(m => !m.is_read).length)).catch(() => {});
  }, []);

  const totalItems = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Selamat datang kembali, <span className="text-blue-400 font-semibold">{user?.username}</span>
          </p>
        </div>

        {/* Summary bar */}
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl p-4 mb-6 flex items-center gap-6">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Total Konten</p>
            <p className="text-white text-2xl font-bold">{loadingCounts ? '—' : totalItems}</p>
          </div>
          <div className="w-px h-10 bg-[#2a3348]" />
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Modul Aktif</p>
            <p className="text-white text-2xl font-bold">{cards.length}</p>
          </div>
          {unread > 0 && (
            <>
              <div className="w-px h-10 bg-[#2a3348]" />
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Pesan Baru</p>
                <p className="text-blue-400 text-2xl font-bold">{unread}</p>
              </div>
            </>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {cards.map(({ label, endpoint, icon: Icon, color, path }) => {
            const c = colorMap[color];
            return (
              <NavLink key={endpoint} to={path}
                className={`border rounded-xl p-5 hover:scale-[1.02] transition-transform cursor-pointer group ${c.card}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.icon}`}>
                    <Icon size={18} />
                  </div>
                  <MdArrowForward size={14} className={`${c.text} opacity-0 group-hover:opacity-100 transition-opacity mt-1`} />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {loadingCounts ? <span className="inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin opacity-30" /> : counts[endpoint] ?? 0}
                </p>
                <p className={`text-xs font-semibold ${c.text}`}>{label}</p>
              </NavLink>
            );
          })}
        </div>

        {/* Unread messages alert */}
        {unread > 0 && (
          <NavLink to="/admin/contact" className="block bg-blue-600/10 border border-blue-600/30 rounded-xl p-4 hover:border-blue-500/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <MdEmail className="text-blue-400" size={16} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Pesan Baru Masuk</p>
                  <p className="text-blue-300 text-xs">Ada <strong>{unread}</strong> pesan yang belum dibaca</p>
                </div>
              </div>
              <MdArrowForward className="text-blue-400" size={18} />
            </div>
          </NavLink>
        )}
      </div>
    </AdminLayout>
  );
};
export default Dashboard;
