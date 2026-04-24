const fs = require('fs');
const path = require('path');
const db = require('../src/config/db');

const certificatesDir = path.join(__dirname, '..', '..', 'dtech-frontend', 'public');

const toMimeType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'image/jpeg';
};

const getCertificateFiles = () =>
  fs
    .readdirSync(certificatesDir)
    .filter((name) => /^cert\d+\.(jpg|jpeg|png|webp)$/i.test(name))
    .sort((a, b) => {
      const aNum = Number(a.match(/\d+/)?.[0] || 0);
      const bNum = Number(b.match(/\d+/)?.[0] || 0);
      return aNum - bNum;
    });

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });

async function migrateCertificates() {
  try {
    const files = getCertificateFiles();

    if (!files.length) {
      console.log('Tidak ada file cert*.jpg/png/webp yang ditemukan di dtech-frontend/public.');
      db.end();
      return;
    }

    for (let index = 0; index < files.length; index += 1) {
      const filename = files[index];
      const sortOrder = index;
      const title = 'Industrial Design Certificate';
      const absolutePath = path.join(certificatesDir, filename);
      const buffer = fs.readFileSync(absolutePath);
      const mimeType = toMimeType(filename);

      const existingRows = await runQuery(
        'SELECT id FROM certificates WHERE sort_order = ? LIMIT 1',
        [sortOrder]
      );

      if (existingRows.length) {
        await runQuery(
          `
            UPDATE certificates
            SET title = ?, image_data = ?, image_mime_type = ?, image_original_name = ?, is_active = 1
            WHERE id = ?
          `,
          [title, buffer, mimeType, filename, existingRows[0].id]
        );
        console.log(`Updated certificate order ${sortOrder} from ${filename}`);
      } else {
        await runQuery(
          `
            INSERT INTO certificates (title, image_data, image_mime_type, image_original_name, sort_order, is_active)
            VALUES (?, ?, ?, ?, ?, 1)
          `,
          [title, buffer, mimeType, filename, sortOrder]
        );
        console.log(`Inserted certificate order ${sortOrder} from ${filename}`);
      }
    }

    console.log('Migrasi certificate ke image_data database selesai.');
    db.end();
  } catch (error) {
    console.error('Gagal migrasi certificate ke database:', error);
    db.end();
    process.exit(1);
  }
}

migrateCertificates();
