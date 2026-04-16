const { pool } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, category, description, image_url, year, is_featured, sort_order
       FROM portfolio WHERE status = 'active' ORDER BY sort_order ASC, id DESC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM portfolio WHERE id = ? AND status = 'active'`, [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Portfolio tidak ditemukan' });
    const portfolio = rows[0];
    const [images] = await pool.query(
      `SELECT id, image_url, sort_order FROM portfolio_images WHERE portfolio_id = ? ORDER BY sort_order ASC`,
      [portfolio.id]
    );
    res.json({ success: true, data: { ...portfolio, images } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFeatured = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, category, image_url, year FROM portfolio
       WHERE status = 'active' AND is_featured = 1 ORDER BY sort_order ASC LIMIT 6`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, category, description, year, is_featured, status, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      `INSERT INTO portfolio (title, category, description, image_url, year, is_featured, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, category, description, image_url, year, is_featured || 0, status || 'active', sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Portfolio berhasil dibuat', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, category, description, year, is_featured, status, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
    await pool.query(
      `UPDATE portfolio SET title=?, category=?, description=?, image_url=?, year=?, is_featured=?, status=?, sort_order=? WHERE id=?`,
      [title, category, description, image_url, year, is_featured, status, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'Portfolio berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Portfolio berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Gambar wajib diupload' });
    const image_url = `/uploads/${req.file.filename}`;
    const [result] = await pool.query(
      'INSERT INTO portfolio_images (portfolio_id, image_url, sort_order) VALUES (?, ?, ?)',
      [req.params.id, image_url, req.body.sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Gambar berhasil ditambahkan', id: result.insertId, image_url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeImage = async (req, res) => {
  try {
    await pool.query('DELETE FROM portfolio_images WHERE id = ?', [req.params.imageId]);
    res.json({ success: true, message: 'Gambar berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, getFeatured, create, update, remove, addImage, removeImage };
