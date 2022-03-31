const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

require('dotenv').config();

let connection = require('./config/db');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');




const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;