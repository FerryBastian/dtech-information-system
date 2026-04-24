const db = require('../src/config/db');

const runQuery = (sql) =>
  new Promise((resolve, reject) => {
    db.query(sql, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

async function syncCertificatesSchema() {
  try {
    await runQuery(`
      CREATE TABLE IF NOT EXISTS certificates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL DEFAULT 'Industrial Design Certificate',
        image_data LONGBLOB NULL,
        image_mime_type VARCHAR(100) NULL,
        image_original_name VARCHAR(255) NULL,
        sort_order INT NOT NULL DEFAULT 0,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL
      )
    `);
    await runQuery('ALTER TABLE certificates ADD COLUMN image_data LONGBLOB NULL AFTER title').catch(() => {});
    await runQuery('ALTER TABLE certificates ADD COLUMN image_mime_type VARCHAR(100) NULL AFTER image_data').catch(() => {});
    await runQuery('ALTER TABLE certificates ADD COLUMN image_original_name VARCHAR(255) NULL AFTER image_mime_type').catch(() => {});
    await runQuery('ALTER TABLE certificates DROP COLUMN image_path').catch(() => {});

    console.log('Tabel certificates siap digunakan dan mendukung penyimpanan file di database.');
    db.end();
  } catch (error) {
    console.error('Gagal sinkron schema certificates:', error);
    db.end();
    process.exit(1);
  }
}

syncCertificatesSchema();
