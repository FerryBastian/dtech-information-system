const { pool } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const { category } = req.query;
    let query = `SELECT id, name, slug, category, short_desc, image_url, price, is_featured, sort_order
                 FROM products WHERE status = 'active'`;
    const params = [];
    if (category) { query += ' AND category = ?'; params.push(category); }
    query += ' ORDER BY sort_order ASC, id DESC';
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM products WHERE (id = ? OR slug = ?) AND status = 'active'`,
      [req.params.id, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    const product = rows[0];
    const [images] = await pool.query(
      'SELECT id, image_url, sort_order FROM product_images WHERE product_id = ? ORDER BY sort_order ASC',
      [product.id]
    );
    res.json({ success: true, data: { ...product, images } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFeatured = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, slug, category, short_desc, image_url FROM products
       WHERE status = 'active' AND is_featured = 1 ORDER BY sort_order ASC LIMIT 6`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, slug, category, description, short_desc, price, is_featured, status, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      `INSERT INTO products (name, slug, category, description, short_desc, image_url, price, is_featured, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, category, description, short_desc, image_url, price, is_featured || 0, status || 'active', sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Produk berhasil dibuat', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, slug, category, description, short_desc, price, is_featured, status, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
    await pool.query(
      `UPDATE products SET name=?, slug=?, category=?, description=?, short_desc=?, image_url=?, price=?, is_featured=?, status=?, sort_order=? WHERE id=?`,
      [name, slug, category, description, short_desc, image_url, price, is_featured, status, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'Produk berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Produk berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Gambar wajib diupload' });
    const image_url = `/uploads/${req.file.filename}`;
    const [result] = await pool.query(
      'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)',
      [req.params.id, image_url, req.body.sort_order || 0]
    );
    res.status(201).json({ success: true, id: result.insertId, image_url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeImage = async (req, res) => {
  try {
    await pool.query('DELETE FROM product_images WHERE id = ?', [req.params.imageId]);
    res.json({ success: true, message: 'Gambar berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, getFeatured, create, update, remove, addImage, removeImage };
