const express = require('express');
const router = express.Router();
const { getEntries, getEntryById } = require('../controllers/get');
const createEntry = require('../controllers/post');
const updateEntry = require('../controllers/put');
const deleteEntry = require('../controllers/delete');

router.get('/api/entries', getEntries);
router.get('/api/entries/:id', getEntryById);
router.post('/api/entries', createEntry);
router.put('/api/entries/:id', updateEntry);
router.delete('/api/entries/:id', deleteEntry);

module.exports = router;
