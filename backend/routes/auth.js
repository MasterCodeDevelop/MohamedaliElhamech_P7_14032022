// Création de route de l'authentification des utilisateur 'user'

const express = require('express'),
router = express.Router(),
userCtrl = require('../controllers/user'),
auth = require('../middleware/auth');

router.get('/', auth, userCtrl.loginByToken);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/user/profil', auth, userCtrl.updateProfil);
router.put('/user/password', auth, userCtrl.updatePassword);
router.delete('/user', auth, userCtrl.delete);

module.exports = router;