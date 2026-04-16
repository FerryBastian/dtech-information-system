const { pool } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM testimoni WHERE is_visible = 1 ORDER BY id DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, company, position, message, rating, is_visible } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      'INSERT INTO testimoni (name, company, position, message, rating, photo_url, is_visible) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, company, position, message, rating || 5, photo_url, is_visible !== undefined ? is_visible : 1]
    );
    res.status(201).json({ success: true, message: 'Testimoni berhasil dibuat', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, company, position, message, rating, is_visible } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : req.body.photo_url;
    await pool.query(
      'UPDATE testimoni SET name=?, company=?, position=?, message=?, rating=?, photo_url=?, is_visible=? WHERE id=?',
      [name, company, position, message, rating, photo_url, is_visible, req.params.id]
    );
    res.json({ success: true, message: 'Testimoni berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM testimoni WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Testimoni berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, remove };
