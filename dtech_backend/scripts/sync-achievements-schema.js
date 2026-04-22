const db = require('../src/config/db');

const requiredColumns = [
  { name: 'category', definition: 'VARCHAR(100) NULL AFTER slug' },
  { name: 'subtitle', definition: 'VARCHAR(255) NULL AFTER category' },
  { name: 'full_description', definition: 'TEXT NULL AFTER short_description' },
  { name: 'attendees', definition: 'VARCHAR(255) NULL AFTER thumbnail_image' },
  { name: 'technologies', definition: 'JSON NULL AFTER attendees' },
  { name: 'recognition_image', definition: 'VARCHAR(255) NULL AFTER technologies' },
  { name: 'bottom_description', definition: 'TEXT NULL AFTER recognition_image' },
  { name: 'deleted_at', definition: 'TIMESTAMP NULL DEFAULT NULL AFTER updated_at' },
];

const getExistingColumns = () =>
  new Promise((resolve, reject) => {
    db.query('DESCRIBE achievements', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows.map((row) => row.Field));
    });
  });

const runQuery = (sql) =>
  new Promise((resolve, reject) => {
    db.query(sql, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });

async function syncSchema() {
  try {
    const existingColumns = await getExistingColumns();
    const missingColumns = requiredColumns.filter(
      (column) => !existingColumns.includes(column.name)
    );

    if (missingColumns.length === 0) {
      console.log('Schema achievements sudah sinkron.');
      db.end();
      return;
    }

    for (const column of missingColumns) {
      const sql = `ALTER TABLE achievements ADD COLUMN ${column.name} ${column.definition}`;
      await runQuery(sql);
      console.log(`Kolom ditambahkan: ${column.name}`);
    }

    console.log('Sinkronisasi schema achievements selesai.');
    db.end();
  } catch (error) {
    console.error('Gagal sinkron schema achievements:', error);
    db.end();
    process.exit(1);
  }
}

syncSchema();
