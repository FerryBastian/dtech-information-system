const { pool } = require('../config/db');

// GET /api/achievements - list semua (public)
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, subtitle, description, image_url, award_by, year, is_featured, sort_order
       FROM achievements WHERE status = 'active' ORDER BY sort_order ASC, id DESC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/achievements/:id - detail (public)
const getOne = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM achievements WHERE id = ? AND status = 'active'`, [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Achievement tidak ditemukan' });

    const achievement = rows[0];

    const [images] = await pool.query(
      `SELECT id, image_url, sort_order FROM achievement_images WHERE achievement_id = ? ORDER BY sort_order ASC`,
      [achievement.id]
    );

    const [technologies] = await pool.query(
      `SELECT id, name, description, image_url, sort_order FROM achievement_technologies WHERE achievement_id = ? ORDER BY sort_order ASC`,
      [achievement.id]
    );

    res.json({ success: true, data: { ...achievement, images, technologies } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/achievements/featured - untuk homepage
const getFeatured = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, subtitle, description, image_url, award_by, year
       FROM achievements WHERE status = 'active' AND is_featured = 1 ORDER BY sort_order ASC LIMIT 4`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/achievements (admin)
const create = async (req, res) => {
  try {
    const {
      title, subtitle, description, about_project, complex_challenges,
      industry_challenges, global_recognition_text, global_recognition_image,
      award_by, year, is_featured, status, sort_order
    } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO achievements (title, subtitle, description, about_project, complex_challenges,
        industry_challenges, global_recognition_text, global_recognition_image, image_url,
        award_by, year, is_featured, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, subtitle, description, about_project, complex_challenges,
       industry_challenges, global_recognition_text, global_recognition_image, image_url,
       award_by, year, is_featured || 0, status || 'active', sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Achievement berhasil dibuat', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/achievements/:id (admin)
const update = async (req, res) => {
  try {
    const {
      title, subtitle, description, about_project, complex_challenges,
      industry_challenges, global_recognition_text, global_recognition_image,
      award_by, year, is_featured, status, sort_order
    } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    await pool.query(
      `UPDATE achievements SET title=?, subtitle=?, description=?, about_project=?, complex_challenges=?,
        industry_challenges=?, global_recognition_text=?, global_recognition_image=?, image_url=?,
        award_by=?, year=?, is_featured=?, status=?, sort_order=? WHERE id=?`,
      [title, subtitle, description, about_project, complex_challenges,
       industry_challenges, global_recognition_text, global_recognition_image, image_url,
       award_by, year, is_featured, status, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'Achievement berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/achievements/:id (admin)
const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM achievements WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Achievement berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/achievements/:id/images (admin)
const addImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Gambar wajib diupload' });
    const image_url = `/uploads/${req.file.filename}`;
    const sort_order = req.body.sort_order || 0;
    const [result] = await pool.query(
      'INSERT INTO achievement_images (achievement_id, image_url, sort_order) VALUES (?, ?, ?)',
      [req.params.id, image_url, sort_order]
    );
    res.status(201).json({ success: true, message: 'Gambar berhasil ditambahkan', id: result.insertId, image_url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/achievements/images/:imageId (admin)
const removeImage = async (req, res) => {
  try {
    await pool.query('DELETE FROM achievement_images WHERE id = ?', [req.params.imageId]);
    res.json({ success: true, message: 'Gambar berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/achievements/:id/technologies (admin)
const addTechnology = async (req, res) => {
  try {
    const { name, description, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      'INSERT INTO achievement_technologies (achievement_id, name, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
      [req.params.id, name, description, image_url, sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Teknologi berhasil ditambahkan', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/achievements/technologies/:techId (admin)
const removeTechnology = async (req, res) => {
  try {
    await pool.query('DELETE FROM achievement_technologies WHERE id = ?', [req.params.techId]);
    res.json({ success: true, message: 'Teknologi berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, getFeatured, create, update, remove, addImage, removeImage, addTechnology, removeTechnology };
