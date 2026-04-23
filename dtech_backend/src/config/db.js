const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('❌ DB Error:', err);
    } else {
        console.log('✅ PostgreSQL Connected');
    }
});

module.exports = db;