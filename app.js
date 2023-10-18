const express = require('express');
const cors = require('cors');

// Express
const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

// Database
const connection = require('./db');
connection();

// Routes
const routes = require('./routes/MahasiswaRoute');
app.use(routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})