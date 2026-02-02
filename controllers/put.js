const pool = require('../db');

const updateEntry = async (req, res) => {
    const { id } = req.params;
    const { name, type, danger_level, description } = req.body;
    let result;
    try {
        if(name && type && danger_level && description){
            result = await pool.query('UPDATE entries SET name = $1, type = $2, danger_level = $3, description = $4 WHERE id = $5 RETURNING *', [name, type, danger_level, description, id]);
        }
        if(name && type && danger_level){
            result = await pool.query('UPDATE entries SET name = $1, type = $2, danger_level = $3 WHERE id = $4 RETURNING *', [name, type, danger_level, id]);
        }
        if(name && type && description){
            result = await pool.query('UPDATE entries SET name = $1, type = $2, description = $3 WHERE id = $4 RETURNING *', [name, type, description, id]);
        }
        if(name && danger_level && description){
            result = await pool.query('UPDATE entries SET name = $1, danger_level = $2, description = $3 WHERE id = $4 RETURNING *', [name, danger_level, description, id]);
        }
        if(type && danger_level && description){
            result = await pool.query('UPDATE entries SET type = $1, danger_level = $2, description = $3 WHERE id = $4 RETURNING *', [type, danger_level, description, id]);
        }
        if(name && type){
            result = await pool.query('UPDATE entries SET name = $1, type = $2 WHERE id = $3 RETURNING *', [name, type, id]);
        }
        if(name && danger_level){
            result = await pool.query('UPDATE entries SET name = $1, danger_level = $2 WHERE id = $3 RETURNING *', [name, danger_level, id]);
        }
        if(name && description){
            result = await pool.query('UPDATE entries SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
        }
        if(type && danger_level){
            result = await pool.query('UPDATE entries SET type = $1, danger_level = $2 WHERE id = $3 RETURNING *', [type, danger_level, id]);
        }
        if(type && description){
            result = await pool.query('UPDATE entries SET type = $1, description = $2 WHERE id = $3 RETURNING *', [type, description, id]);
        }
        if(danger_level){
            result = await pool.query('UPDATE entries SET danger_level = $1 WHERE id = $2 RETURNING *', [danger_level, id]);
        }
        if(description){
            result = await pool.query('UPDATE entries SET description = $1 WHERE id = $2 RETURNING *', [description, id]);
        }
        if(result.rows.length === 0){
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = updateEntry;
