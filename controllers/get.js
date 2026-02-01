const pool = require('../db');

const getEntries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM entries ORDER BY name ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEntryById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM entries WHERE id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getEntries, getEntryById };
