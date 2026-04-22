const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

require('dotenv').config();
require('./config/db');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// routes
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Ukuran file maksimal 5MB.' });
    }

    return res.status(400).json({ message: err.message || 'Upload file gagal.' });
  }

  if (err) {
    console.error(err);
    return res.status(400).json({ message: err.message || 'Terjadi kesalahan pada server.' });
  }
});

module.exports = app;
