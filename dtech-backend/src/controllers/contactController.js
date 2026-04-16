const { pool } = require('../config/db');

// POST /api/contact (public - kirim pesan)
const sendMessage = async (req, res) => {
  try {
    const { name, email, company, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Nama, email, dan pesan wajib diisi' });
    }
    await pool.query(
      'INSERT INTO contacts (name, email, company, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, company, phone, subject, message]
    );
    res.status(201).json({ success: true, message: 'Pesan berhasil dikirim. Kami akan segera menghubungi Anda.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/contact (admin only)
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/contact/:id/read (admin only)
const markRead = async (req, res) => {
  try {
    await pool.query('UPDATE contacts SET is_read = 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Pesan ditandai sudah dibaca' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/contact/:id (admin only)
const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Pesan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { sendMessage, getAll, markRead, remove };
