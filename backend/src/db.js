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
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR (255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
            user_id INTEGER REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)

        const check = await pool.query(`
            SELECT column_name FROM information_schema.columns
            WHERE table_name = 'tasks' AND column_name = 'user_id'
        `);

        if (check.rows.length===0) {
            await pool.query (
                'ALTER TABLE tasks ADD COLUMN user_id INTEGER REFERENCES users(id)'
            )
        }
       console.log ('база создана');     
    } catch (err) {
        console.error('ошибка инициализации бд:', err.message);
    }

}

module.exports = {pool, initDB};
