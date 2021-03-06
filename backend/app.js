// IMPORTS
const express = require('express'),
bodyParser = require('body-parser'),
app = express()

//récupérationdes des variables d'environement dans le fichier .env
require('dotenv').config();

// connexion à la base de donée
require('./db/mysql')
const path = require('path');

// récupération des routes 
const authRoutes = require('./routes/auth'),
postRoutes = require('./routes/post');


app.use((req, res, next) => {
    // Permet d'accéder l'API depuis n'importe quelle origine ('*')
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    
    // Permet d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // Renvoie au prochain Middleware
    next();
});

app.use(bodyParser.json());



// Enregistrement du 'router' pour toutes les demandes effectuées
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


//  exports
module.exports = app;