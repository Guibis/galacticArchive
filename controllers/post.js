const pool = require('../db');

const createEntry = async (req, res) => {
    try {
        const { name, type, dangerLevel, description } = req.body;
        const result = await pool.query('INSERT INTO entries (name, type, danger_level, description) VALUES ($1, $2, $3, $4) RETURNING *', [name, type, dangerLevel, description]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = createEntry;
