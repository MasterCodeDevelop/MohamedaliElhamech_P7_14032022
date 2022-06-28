/*###################################  POSTS ROUTES   ########################################*/

// Les imports
const express = require('express'),
router = express.Router(),
auth = require('../middleware/auth'),
multer = require('../middleware/multer-config'),
postCtrl = require('../controllers/post'),
likeCtrl = require('../controllers/like'),
commentCtrl = require('../controllers/comment');




/*###########  POST ROUTER ############*/
router.post('/', auth, multer, postCtrl.create);
router.get('/', auth, postCtrl.getAll);
router.get('/:id', auth, multer, postCtrl.get);
router.get('/user', auth, postCtrl.getAllByUser);
router.put('/:id', auth, multer, postCtrl.update);
router.delete('/:id', auth, postCtrl.delete);

/*###########  LIKES ROUTER ############*/
router.post('/:id/like', auth, likeCtrl.like);
router.get('/:id/like', auth, likeCtrl.getLikes);

/*###########  COMMENT ROUTER  ############*/
router.post('/comment/:id', auth, commentCtrl.create);
router.get('/comments/:id', auth, commentCtrl.getAll);
router.delete('/comment/:id', auth, commentCtrl.delete);
router.put('/comment/:id', auth, commentCtrl.update);



module.exports = router;