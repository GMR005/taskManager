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
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query (
            'SELECT * FROM tasks ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.put ('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const result = await pool.query (
            'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length===0) {
            return res.status(404).json({error: 'задача не найдена'});
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'задача не найдена'});
        }
        res.json({ message: 'Task deleted', task: result.rows[0] });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
    res.json(result.rows[0]);
})

module.exports = router;