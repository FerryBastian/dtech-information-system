const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE email = ?', [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, role, created_at FROM admin_users WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    res.json({ success: true, user: rows[0] });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/auth/register (superadmin only)
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
    }

    const [existing] = await pool.query(
      'SELECT id FROM admin_users WHERE email = ?', [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO admin_users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role || 'admin']
    );

    res.status(201).json({
      success: true,
      message: 'Admin berhasil dibuat',
      userId: result.insertId,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/auth/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE id = ?', [req.user.id]
    );

    const user = rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Password lama salah' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE admin_users SET password = ? WHERE id = ?', [hashed, req.user.id]
    );

    res.json({ success: true, message: 'Password berhasil diubah' });
  } catch (error) {
    console.error('ChangePassword error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/auth/profile (update own profile)
const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ success: false, message: 'Username dan email wajib diisi' });
    }

    const [existing] = await pool.query(
      'SELECT id FROM admin_users WHERE email = ? AND id != ?', [email, req.user.id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email sudah digunakan' });
    }

    await pool.query(
      'UPDATE admin_users SET username = ?, email = ? WHERE id = ?', [username, email, req.user.id]
    );

    res.json({ success: true, message: 'Profile berhasil diperbarui' });
  } catch (error) {
    console.error('UpdateProfile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/users (admin only - get all users)
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, role, created_at FROM admin_users ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetAllUsers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/users/:id (admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ success: false, message: 'Tidak bisa menghapus akun sendiri' });
    }
    const [result] = await pool.query('DELETE FROM admin_users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }
    res.json({ success: true, message: 'User berhasil dihapus' });
  } catch (error) {
    console.error('DeleteUser error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/users/:id (admin only)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    if (!username || !email || !role) {
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
    }
    const [existing] = await pool.query(
      'SELECT id FROM admin_users WHERE email = ? AND id != ?', [email, id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email sudah digunakan user lain' });
    }
    await pool.query(
      'UPDATE admin_users SET username = ?, email = ?, role = ? WHERE id = ?',
      [username, email, role, id]
    );
    res.json({ success: true, message: 'User berhasil diperbarui' });
  } catch (error) {
    console.error('UpdateUser error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { login, getMe, register, changePassword, updateProfile, getAllUsers, deleteUser, updateUser };
