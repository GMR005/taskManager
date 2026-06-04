const {Router} = require('express');
const router = Router();
const {pool} = require('../db');

router.post ('/', async (req, res) => {
    try {
        const {title, description} = req.body;
        if (!title) {
            return res.status(400).json({error: 'нужен title'});
        }
        const result = await pool.query (
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})