const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../../database/db');
const { JWT_SECRET } = require('../middleware/auth');

const router = Router();


router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1', [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword]
    );
    const user = result.rows[0];

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ token, user: { id: user.id, email: user.email, created_at: user.created_at } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;