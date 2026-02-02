const pool = require('../db');

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM entries WHERE id = $1 RETURNING *', [id]);
        if(result.rows.length === 0){
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = deleteEntry;
