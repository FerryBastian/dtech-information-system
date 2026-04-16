const { pool } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, short_desc, image_url, sort_order FROM services WHERE status = 'active' ORDER BY sort_order ASC`
    );
    for (const svc of rows) {
      const [items] = await pool.query(
        'SELECT id, item_text, sort_order FROM service_items WHERE service_id = ? ORDER BY sort_order ASC',
        [svc.id]
      );
      svc.items = items;
    }
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM services WHERE id = ? AND status = 'active'`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Service tidak ditemukan' });
    const [items] = await pool.query(
      'SELECT id, item_text, sort_order FROM service_items WHERE service_id = ? ORDER BY sort_order ASC',
      [rows[0].id]
    );
    res.json({ success: true, data: { ...rows[0], items } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, description, short_desc, status, sort_order, items } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      'INSERT INTO services (title, description, short_desc, image_url, status, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, short_desc, image_url, status || 'active', sort_order || 0]
    );
    const serviceId = result.insertId;
    if (items && Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        await pool.query('INSERT INTO service_items (service_id, item_text, sort_order) VALUES (?, ?, ?)', [serviceId, items[i], i]);
      }
    }
    res.status(201).json({ success: true, message: 'Service berhasil dibuat', id: serviceId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, description, short_desc, status, sort_order, items } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
    await pool.query(
      'UPDATE services SET title=?, description=?, short_desc=?, image_url=?, status=?, sort_order=? WHERE id=?',
      [title, description, short_desc, image_url, status, sort_order, req.params.id]
    );
    if (items && Array.isArray(items)) {
      await pool.query('DELETE FROM service_items WHERE service_id = ?', [req.params.id]);
      for (let i = 0; i < items.length; i++) {
        await pool.query('INSERT INTO service_items (service_id, item_text, sort_order) VALUES (?, ?, ?)', [req.params.id, items[i], i]);
      }
    }
    res.json({ success: true, message: 'Service berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Service berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
