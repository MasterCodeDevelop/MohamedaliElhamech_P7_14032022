// Création de route de l'authentification des utilisateur 'user'

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');


router.get('/', auth, userCtrl.loginByToken);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/user/profil', auth, multer, userCtrl.updateProfil);
router.put('/user/password', auth, userCtrl.updatePassword);
router.delete('/user', auth, userCtrl.delete);

module.exports = router;