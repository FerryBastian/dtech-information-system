const { pool } = require('../config/db');

// GET /api/certificates?type=patent|legality (public)
const getAll = async (req, res) => {
  try {
    const { type } = req.query;
    let query = `SELECT id, title, type, image_url, issued_by, issued_date, sort_order FROM certificates WHERE status = 'active'`;
    const params = [];
    if (type) { query += ' AND type = ?'; params.push(type); }
    query += ' ORDER BY sort_order ASC, id DESC';
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, type, description, issued_by, issued_date, status, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      'INSERT INTO certificates (title, type, description, image_url, issued_by, issued_date, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, type, description, image_url, issued_by, issued_date, status || 'active', sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Sertifikat berhasil dibuat', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, type, description, issued_by, issued_date, status, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
    await pool.query(
      'UPDATE certificates SET title=?, type=?, description=?, image_url=?, issued_by=?, issued_date=?, status=?, sort_order=? WHERE id=?',
      [title, type, description, image_url, issued_by, issued_date, status, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'Sertifikat berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM certificates WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Sertifikat berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, remove };
