const express = require('express');
const app = express();
const routesEntries = require('./routes/routesEntries');
const errorHandling = require('./middleware/errorHandling');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/', routesEntries);
app.use(errorHandling);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
