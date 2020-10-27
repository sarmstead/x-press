const express = require('express');
const app = express();

app.use(require('./middleware'));

const PORT = process.env.PORT || 3000;