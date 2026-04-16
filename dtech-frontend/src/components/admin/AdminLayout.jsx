import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  MdDashboard, MdInventory, MdMiscellaneousServices, MdEmojiEvents,
  MdPhotoLibrary, MdVerified, MdSecurity, MdPeople, MdNewspaper,
  MdEmail, MdLogout, MdMenu, MdClose, MdChevronRight
} from 'react-icons/md';
import { FaQuoteLeft } from 'react-icons/fa';

const menus = [
  { label: 'Dashboard', path: '/admin', icon: MdDashboard, exact: true },
  { label: 'Users', path: '/admin/users', icon: MdSecurity },
  { label: 'Products', path: '/admin/products', icon: MdInventory },
  { label: 'Services', path: '/admin/services', icon: MdMiscellaneousServices },
  { label: 'Achievements', path: '/admin/achievements', icon: MdEmojiEvents },
  { label: 'Portfolio', path: '/admin/portfolio', icon: MdPhotoLibrary },
  { label: 'Certificates', path: '/admin/certificates', icon: MdVerified },
  { label: 'Testimoni', path: '/admin/testimoni', icon: FaQuoteLeft },
  { label: 'Team', path: '/admin/team', icon: MdPeople },
  { label: 'News', path: '/admin/news', icon: MdNewspaper },
  { label: 'Contact', path: '/admin/contact', icon: MdEmail },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} transition-all duration-300 bg-[#161b27] border-r border-[#2a3348] flex flex-col flex-shrink-0`}>
        <div className="flex items-center justify-between p-4 border-b border-[#2a3348]">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">DT</div>
              <span className="text-white font-bold text-sm">Dtech Admin</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white p-1 rounded">
            {sidebarOpen ? <MdClose size={18} /> : <MdMenu size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {menus.map(({ label, path, icon: Icon, exact }) => (
            <NavLink key={path} to={path} end={exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors mb-0.5 ${
                  isActive ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-gray-400 hover:text-white hover:bg-[#1e2535]'
                }`
              }>
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[#2a3348]">
          {sidebarOpen && (
            <div className="mb-3">
              <p className="text-white text-xs font-semibold truncate">{user?.username}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          )}
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs w-full px-2 py-1.5 rounded hover:bg-red-600/10 transition-colors">
            <MdLogout size={16} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
