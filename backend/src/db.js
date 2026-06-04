const {Pool} = require('pg');

const pool = new Pool ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const initDB = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    } catch (err) {
        console.error('ошибка инициализации бд:', err.message);
    }
}

module.exports = {pool, initDB};
