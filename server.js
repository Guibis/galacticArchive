const express = require('express');
const app = express();
const routesEntries = require('./routes/routesEntries');

app.use(express.json());
app.use(express.static('public'));
app.use('/api', routesEntries);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
