const { pool } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, source, url, image_url, published_at FROM news WHERE status = 'active' ORDER BY published_at DESC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, source, url, published_at, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      'INSERT INTO news (title, source, url, image_url, published_at, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, source, url, image_url, published_at, status || 'active']
    );
    res.status(201).json({ success: true, message: 'News berhasil dibuat', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, source, url, published_at, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
    await pool.query(
      'UPDATE news SET title=?, source=?, url=?, image_url=?, published_at=?, status=? WHERE id=?',
      [title, source, url, image_url, published_at, status, req.params.id]
    );
    res.json({ success: true, message: 'News berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM news WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'News berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, remove };
