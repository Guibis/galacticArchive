const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
