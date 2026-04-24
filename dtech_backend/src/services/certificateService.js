const db = require('../config/db');

const isMissingColumnError = (error, columnName) =>
  error?.code === 'ER_BAD_FIELD_ERROR' &&
  error?.sqlMessage?.includes(`'${columnName}'`);

const certificateImageUrl = (id) => `/api/certificates/${id}/image`;

const normalizeBoolean = (value) => {
  if (typeof value === 'boolean') return Number(value);
  if (typeof value === 'string') return ['1', 'true', 'on', 'yes'].includes(value.toLowerCase()) ? 1 : 0;
  return Number(Boolean(value));
};

const mapPayload = (data = {}) => ({
  title: data.title?.trim() || 'Industrial Design Certificate',
  sort_order: Number.isFinite(Number(data.sort_order)) ? Number(data.sort_order) : 0,
  is_active: data.is_active === undefined ? 1 : normalizeBoolean(data.is_active),
});

const mapCertificateRow = (row) => ({
  id: row.id,
  title: row.title,
  sort_order: row.sort_order,
  is_active: row.is_active,
  created_at: row.created_at,
  updated_at: row.updated_at,
  image_url: certificateImageUrl(row.id),
  image_storage: 'database',
});

exports.getAllCertificates = ({ includeInactive = false } = {}) =>
  new Promise((resolve, reject) => {
    const conditions = ['deleted_at IS NULL'];

    if (!includeInactive) {
      conditions.push('is_active = 1');
    }

    const query = `
      SELECT id, title, image_data, sort_order, is_active, created_at, updated_at
      FROM certificates
      WHERE ${conditions.join(' AND ')}
      ORDER BY sort_order ASC, id ASC
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        return reject({ status: 500, message: 'Gagal mengambil data certificate.' });
      }

      resolve(results.map(mapCertificateRow));
    });
  });

exports.getCertificateById = (id) =>
  new Promise((resolve, reject) => {
    const query = `
      SELECT id, title, image_data, sort_order, is_active, created_at, updated_at
      FROM certificates
      WHERE id = ?
      LIMIT 1
    `;

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error(error);
        return reject({ status: 500, message: 'Gagal mengambil detail certificate.' });
      }

      if (!results.length) {
        return reject({ status: 404, message: 'Certificate tidak ditemukan.' });
      }

      resolve(mapCertificateRow(results[0]));
    });
  });

exports.getCertificateImage = (id) =>
  new Promise((resolve, reject) => {
    const query = `
      SELECT id, title, image_data, image_mime_type, image_original_name
      FROM certificates
      WHERE id = ?
      LIMIT 1
    `;

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error(error);
        return reject({ status: 500, message: 'Gagal mengambil gambar certificate.' });
      }

      if (!results.length) {
        return reject({ status: 404, message: 'Certificate tidak ditemukan.' });
      }

      if (!results[0].image_data) {
        return reject({ status: 404, message: 'Gambar certificate tidak ditemukan di database.' });
      }

      resolve(results[0]);
    });
  });

exports.createCertificate = ({ data, file }) =>
  new Promise((resolve, reject) => {
    const payload = mapPayload(data);

    if (!file) {
      return reject({ status: 400, message: 'File gambar certificate wajib diunggah.' });
    }

    const query = `
      INSERT INTO certificates (
        title,
        image_data,
        image_mime_type,
        image_original_name,
        sort_order,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [payload.title, file.buffer, file.mimetype, file.originalname, payload.sort_order, payload.is_active],
      (error, result) => {
        if (error) {
          console.error(error);
          return reject({ status: 500, message: 'Gagal membuat certificate.' });
        }

        resolve({ id: result.insertId });
      }
    );
  });

exports.updateCertificate = (id, { data, file }) =>
  new Promise((resolve, reject) => {
    const payload = mapPayload(data);

    db.query('SELECT id, image_data FROM certificates WHERE id = ? LIMIT 1', [id], (findError, rows) => {
      if (findError) {
        console.error(findError);
        return reject({ status: 500, message: 'Gagal mengambil data certificate.' });
      }

      if (!rows.length) {
        return reject({ status: 404, message: 'Certificate tidak ditemukan.' });
      }

      const current = rows[0];

      if (!file && !current.image_data) {
        return reject({ status: 400, message: 'File gambar certificate wajib diunggah.' });
      }

      const query = file
        ? `
          UPDATE certificates
          SET title = ?, image_data = ?, image_mime_type = ?, image_original_name = ?, sort_order = ?, is_active = ?
          WHERE id = ?
        `
        : `
          UPDATE certificates
          SET title = ?, sort_order = ?, is_active = ?
          WHERE id = ?
        `;

      const values = file
        ? [payload.title, file.buffer, file.mimetype, file.originalname, payload.sort_order, payload.is_active, id]
        : [payload.title, payload.sort_order, payload.is_active, id];

      db.query(query, values, (error, result) => {
        if (error) {
          console.error(error);
          return reject({ status: 500, message: 'Gagal memperbarui certificate.' });
        }

        if (!result.affectedRows) {
          return reject({ status: 404, message: 'Certificate tidak ditemukan.' });
        }

        resolve();
      });
    });
  });

exports.softDeleteCertificate = (id) =>
  new Promise((resolve, reject) => {
    const query = `
      UPDATE certificates
      SET deleted_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
    `;

    db.query(query, [id], (error, result) => {
      if (error) {
        if (isMissingColumnError(error, 'deleted_at')) {
          return db.query('DELETE FROM certificates WHERE id = ?', [id], (deleteError, deleteResult) => {
            if (deleteError) {
              console.error(deleteError);
              return reject({ status: 500, message: 'Gagal menghapus certificate.' });
            }

            if (!deleteResult.affectedRows) {
              return reject({ status: 404, message: 'Certificate tidak ditemukan.' });
            }

            resolve();
          });
        }

        console.error(error);
        return reject({ status: 500, message: 'Gagal menghapus certificate.' });
      }

      if (!result.affectedRows) {
        return reject({ status: 404, message: 'Certificate tidak ditemukan atau sudah dihapus.' });
      }

      resolve();
    });
  });
