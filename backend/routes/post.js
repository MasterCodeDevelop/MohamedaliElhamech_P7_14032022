// Création des routes permettant les actions liées à "sauce"
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');


//router.post('/comments/', auth, multer, commentCtrl.newComment);
router.post('/', auth, multer, postCtrl.create);
router.post('/comment/:id', auth, commentCtrl.create);
router.post('/:id/like', auth, multer, postCtrl.like);

router.get('/user/:id', auth, postCtrl.getPostById);
router.get('/user', auth, postCtrl.getAllByUser);
router.get('/comments/:id', auth, commentCtrl.getAll);
router.get('/', auth, postCtrl.getAll);
router.get('/:id', auth, multer, postCtrl.get);


router.delete('/:id', auth, postCtrl.delete);
router.delete('/comment/:id', auth, commentCtrl.delete);

router.put('/', auth, multer, postCtrl.update);
router.put('/comment/:id', auth, commentCtrl.update);

module.exports = router;