const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || '').split(',').map(o => o.trim());




// Middleware
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static folder untuk uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/services', require('./routes/services'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/testimoni', require('./routes/testimoni'));
app.use('/api/team', require('./routes/team'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/news', require('./routes/news'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Dtech API is running', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
