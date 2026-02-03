const pool = require('../db');

const updateEntry = async (req, res) => {
    const { id } = req.params;
    try {
        const updates = { name, type, danger_level, description } = req.body;
        const columns = Object.keys(updates).filter(key => updates[key] !== undefined);

        if (columns.length === 0) {
            return res.status(400).json({ message: "No valid fields provided" });
        }

        const setClause = columns
            .map((col, i) => `${col} = $${i + 1}`)
            .join(", ");

        const values = columns.map(col => updates[col]);
        values.push(id);

        const query = `UPDATE entries SET ${setClause} WHERE id = $${values.length} RETURNING *`;
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = updateEntry;
