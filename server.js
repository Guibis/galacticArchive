const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
app.use(express.json());
const archive_file = './archive.json';

const readArchive = () => {
    try {
        const data = fs.readFileSync(archive_file);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeArchive = (data) => {
    fs.writeFileSync(archive_file, JSON.stringify(data));
};

app.get('/archive', (req, res) => {
    const archive = readArchive();
    res.json(archive);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});