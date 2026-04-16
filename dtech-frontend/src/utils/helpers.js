export const formatCurrency = (amount) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date));
};

export const formatDateShort = (date) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));
};

// Backend returns paths like "/uploads/filename.jpg"
// VITE_UPLOADS_URL = "http://localhost:5000"
// Result: "http://localhost:5000/uploads/filename.jpg"
export const getImageUrl = (path) => {
  if (!path) return '/placeholder.png';
  if (path.startsWith('http')) return path;
  const base = import.meta.env.VITE_UPLOADS_URL || '';
  return `${base}${path}`;
};

export const truncate = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};
