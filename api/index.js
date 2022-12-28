const express = require('express');
const routes = require('./routes');

const app = express();
routes(app);

const port = 4000

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app;