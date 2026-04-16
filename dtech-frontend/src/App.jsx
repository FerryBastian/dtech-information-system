import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';

// User pages
import Home from './pages/user/Home';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Services from './pages/admin/Services';
import Achievements from './pages/admin/Achievements';
import Portfolio from './pages/admin/Portfolio';
import Certificates from './pages/admin/Certificates';
import Testimoni from './pages/admin/Testimoni';
import Team from './pages/admin/Team';
import News from './pages/admin/News';
import Contact from './pages/admin/Contact';

const AdminRoute = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#161b27', color: '#e8ecf4', border: '1px solid #2a3348', fontSize: '13px' },
        }} />
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><Products /></AdminRoute>} />
          <Route path="/admin/services" element={<AdminRoute><Services /></AdminRoute>} />
          <Route path="/admin/achievements" element={<AdminRoute><Achievements /></AdminRoute>} />
          <Route path="/admin/portfolio" element={<AdminRoute><Portfolio /></AdminRoute>} />
          <Route path="/admin/certificates" element={<AdminRoute><Certificates /></AdminRoute>} />
          <Route path="/admin/testimoni" element={<AdminRoute><Testimoni /></AdminRoute>} />
          <Route path="/admin/team" element={<AdminRoute><Team /></AdminRoute>} />
          <Route path="/admin/news" element={<AdminRoute><News /></AdminRoute>} />
          <Route path="/admin/contact" element={<AdminRoute><Contact /></AdminRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
