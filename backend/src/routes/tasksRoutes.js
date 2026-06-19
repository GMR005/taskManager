const {Router} = require('express');
const router = Router();
const {pool} = require('../db');
const {auth} = require('../middleware/auth');
const ANALYSIS_URL = process.env.ANALYSIS_URL;

router.use(auth);

router.post ('/', async (req, res) => {
    try {
        const {title, description} = req.body;
        if (!title) {
            return res.status(400).json({error: 'нужен title'});
        }
        const result = await pool.query (
            'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, description, req.userId]
        );
        const task = result.rows[0];

        fetch(ANALYSIS_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, description}),
        })
            .then(r => r.json())
            .then(analysis => {
                pool.query(
                    'UPDATE tasks SET priority = $1, category = $2 WHERE id = $3',
                    [analysis.priority, analysis.category, task.id]
                );
            })
            .catch(err => console.error('analysis error:', err.message));
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query (
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
            [req.userId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {status, priority, category} = req.body;
        const result = await pool.query(
            `UPDATE tasks SET
                status = COALESCE($1, status),
                priority = COALESCE($2, priority),
                category = COALESCE($3, category)
             WHERE id = $4 AND user_id = $5 RETURNING *`,
            [status, priority, category, id, req.userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'задача не найдена'});
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.userId]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'задача не найдена'});
        }
        res.json({ message: 'Task deleted', task: result.rows[0] });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
    
})

module.exports = router;