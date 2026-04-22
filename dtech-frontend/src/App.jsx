import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import UserLayout from './components/user/UserLayout';

// User pages
import HomePage from './pages/user/HomePage';
import AboutPage from './pages/user/AboutPage';
import ProductsPage from './pages/user/ProductsPage';
import ServicesPage from './pages/user/ServicesPage';
import InnovationsPage from './pages/user/InnovationsPage';
import TestimonialPage from './pages/user/TestimonialPage';
import ContactPage from './pages/user/ContactPage';
import PortfolioPage from './pages/user/PortfolioPage';
import PortfolioDetailPage from './pages/user/PortfolioDetailPage';
import CertificatePage from './pages/user/CertificatePage';
import LegalityPage from './pages/user/LegalityPage';
import HistoryPage from './pages/user/HistoryPage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
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
          {/* User Routes (with Navbar + Footer) */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/innovations" element={<InnovationsPage />} />
            <Route path="/testimonial" element={<TestimonialPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
            <Route path="/certificates" element={<CertificatePage />} />
            <Route path="/legality" element={<LegalityPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
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
