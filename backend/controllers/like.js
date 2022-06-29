/*###################################  LIKES  ########################################*/
// Les imports
const Like = require('../models/Likes'),
Post = require('../models/Post');

/*==========================  Aimer ou ne pas aimmer  =================================*/
exports.like= (req, res) => {
    const userID = req.auth.userID,
    postID = Number(req.params.id);
    const DATA = {
        userID,
        postID
    }

    // vérification de l'article
    Post.get(postID, ($res) =>  {
        // Si l'article n'existe pas
        if ($res.length === 0) return res.status(400).json({
            error: true,
            message: "L'article' que vous voulez liker n'existe pas !"
        })

        Like.get({ userID, postID }, (data) => {
            // liked
            (data.length === 0)?Like.set(DATA, () => {
                res.status(200).json({ message: "post liked" });
            })
            
            // disliked
            :Like.delete(DATA, () => {
                res.status(200).json({ message: "post disliked" });
            })
        })
    });    
}


/*=============== Renvoie tous utilisateur qui ont aimé le poste =====================*/
exports.getLikes= (req, res) => Like.getAll(Number(req.params.id), (data) => {
    res.status(200).json(data);
})
