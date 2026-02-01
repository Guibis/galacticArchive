const pool = require('../db');

const updateEntry = async (req, res) => {
    const { id } = req.params;
    const { name, type, dangerLevel, description } = req.body;
    let result;
    try {
        if(name && type && dangerLevel && description){
            result = await pool.query('UPDATE entries SET name = $1, type = $2, danger_level = $3, description = $4 WHERE id = $5 RETURNING *', [name, type, dangerLevel, description, id]);
        }
        if(name && type && dangerLevel){
            result = await pool.query('UPDATE entries SET name = $1, type = $2, danger_level = $3 WHERE id = $4 RETURNING *', [name, type, dangerLevel, id]);
        }
        if(name && type && description){
            result = await pool.query('UPDATE entries SET name = $1, type = $2, description = $3 WHERE id = $4 RETURNING *', [name, type, description, id]);
        }
        if(name && dangerLevel && description){
            result = await pool.query('UPDATE entries SET name = $1, danger_level = $2, description = $3 WHERE id = $4 RETURNING *', [name, dangerLevel, description, id]);
        }
        if(type && dangerLevel && description){
            result = await pool.query('UPDATE entries SET type = $1, danger_level = $2, description = $3 WHERE id = $4 RETURNING *', [type, dangerLevel, description, id]);
        }
        if(name && type){
            result = await pool.query('UPDATE entries SET name = $1, type = $2 WHERE id = $3 RETURNING *', [name, type, id]);
        }
        if(name && dangerLevel){
            result = await pool.query('UPDATE entries SET name = $1, danger_level = $2 WHERE id = $3 RETURNING *', [name, dangerLevel, id]);
        }
        if(name && description){
            result = await pool.query('UPDATE entries SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
        }
        if(type && dangerLevel){
            result = await pool.query('UPDATE entries SET type = $1, danger_level = $2 WHERE id = $3 RETURNING *', [type, dangerLevel, id]);
        }
        if(type && description){
            result = await pool.query('UPDATE entries SET type = $1, description = $2 WHERE id = $3 RETURNING *', [type, description, id]);
        }
        if(dangerLevel){
            result = await pool.query('UPDATE entries SET danger_level = $1 WHERE id = $2 RETURNING *', [dangerLevel, id]);
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
