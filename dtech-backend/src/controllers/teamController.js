const { pool } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, position, division, bio, photo_url, email, linkedin_url, sort_order
       FROM team WHERE status = 'active' ORDER BY sort_order ASC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, position, division, bio, email, linkedin_url, status, sort_order } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      'INSERT INTO team (name, position, division, bio, photo_url, email, linkedin_url, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, position, division, bio, photo_url, email, linkedin_url, status || 'active', sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Team member berhasil dibuat', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, position, division, bio, email, linkedin_url, status, sort_order } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : req.body.photo_url;
    await pool.query(
      'UPDATE team SET name=?, position=?, division=?, bio=?, photo_url=?, email=?, linkedin_url=?, status=?, sort_order=? WHERE id=?',
      [name, position, division, bio, photo_url, email, linkedin_url, status, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'Team member berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM team WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Team member berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, remove };
