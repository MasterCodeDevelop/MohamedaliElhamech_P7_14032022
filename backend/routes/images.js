// Création des routes permettant les actions liées à "sauce"
const express = require('express'),
router = express.Router(),
path = require('path');


router.use('/', express.static(path.join(__dirname, 'images')))
module.exports = router;