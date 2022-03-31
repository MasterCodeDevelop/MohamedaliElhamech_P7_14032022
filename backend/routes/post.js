// Création des routes permettant les actions liées à "sauce"
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
/*
const auth  = (req, res, next) => {
    res.status(201).json({ 
        id: 'A user.id',
        token: 'A token' 
    }) 
    next();
}*/
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');
/*
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
*/
//router.get('/', sauceCtrl.getAllSauce);


router.post('/', auth, multer, postCtrl.setPost);

router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, multer, postCtrl.getOnePost);


router.delete('/:id', auth, postCtrl.deletePost);

router.put('/:id', auth, multer, postCtrl.updatePost);


module.exports = router;