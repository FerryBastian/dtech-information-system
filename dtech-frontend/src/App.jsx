import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import UserLayout from './components/user/UserLayout';

// User pages
import HomePage from './pages/user/HomePage';
import AboutPage from './pages/user/AboutPage';
import ProductsPage from './pages/user/ProductsPage';
import ServicesPage from './pages/user/ServicesPage';
import AchievementPage from './pages/user/AchievementPage';
import AchievementDetailPage from './pages/user/AchievementDetailPage';
import TestimonialPage from './pages/user/TestimonialPage';
import ContactPage from './pages/user/ContactPage';
import PortfolioPage from './pages/user/PortfolioPage';
import PortfolioDetailPage from './pages/user/PortfolioDetailPage';
import CertificatePage from './pages/user/CertificatePage';
import LegalityPage from './pages/user/LegalityPage';
import HistoryPage from './pages/user/HistoryPage';
import NewsDetailPage from './pages/user/NewsDetailPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminCertificates from './pages/admin/AdminCertificates';

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
            <Route path="/achievement" element={<AchievementPage />} />
            <Route path="/achievement/:id" element={<AchievementDetailPage />} />
            <Route path="/testimonial" element={<TestimonialPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
            <Route path="/certificates" element={<CertificatePage />} />
            <Route path="/legality" element={<LegalityPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
          </Route>

          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/achievement" element={<AdminAchievements />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
