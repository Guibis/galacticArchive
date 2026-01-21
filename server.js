const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const archive_file = './archive.json';

const readArchive = () => {
    try {
        const data = fs.readFileSync(archive_file, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeArchive = (data) => {
    fs.writeFileSync(archive_file, JSON.stringify(data, null, 2));
};

app.get('/archive', (req, res) => {
    const archive = readArchive();
    res.json(archive);
});

app.get('/archive/:id', (req, res) => {
    const archive = readArchive();
    const item = archive.find((item) => item.id == req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json(item);
});

app.post('/archive', (req, res) => {
    const archive = readArchive();
    const item = {
        id: Date.now(),
        name: req.body.name,
        type: req.body.type,
        dangerLevel: req.body.dangerLevel,
        description: req.body.description,
    };
    archive.push(item);
    writeArchive(archive);
    res.json(item);
});

app.put('/archive/:id', (req, res) => {
    const archive = readArchive();
    const item = archive.find((item) => item.id == req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    if (req.body.name) item.name = req.body.name;
    if (req.body.type) item.type = req.body.type;
    if (req.body.dangerLevel) item.dangerLevel = req.body.dangerLevel;
    if (req.body.description) item.description = req.body.description;
    writeArchive(archive);
    res.json(item);
});

app.delete('/archive/:id', (req, res) => {
    const archive = readArchive();
    const item = archive.find((item) => item.id == req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    archive.splice(archive.indexOf(item), 1);
    writeArchive(archive);
    res.json(item);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});