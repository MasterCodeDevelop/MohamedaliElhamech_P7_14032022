const Comment =  require('../models/Comment')



exports.create = (req, res, next) => {
    const postId = req.params.id,
    content = req.body.content,
    userID = req.auth.userID

    //vérification de l'id de l'article 
    if (!postId) return res.status(400).json({ error: true, message:"manque l'ID" });

    //vérification du contenu de l'article 
    if (!content || content =='') return res.status(400).json({ error: true, message:"Il faut saisir un contenue" });
    
    const SET = {
        content: content,
        user_id: userID,
        post_id: postId,
        createdAt: new Date().getTime()
    }
    Comment.create(SET, (id) => {
        Comment.getById(id, (Data) => {

            res.status(200).json({ data: Data })
        })
    })
}
exports.getAll = (req, res, next) => {
    const post_id = req.params.id;
    Comment.getAllByPostId(post_id, (data) => {
        res.status(200).json({ data: data })
    })
}

exports.update = (req, res ) => {
    const id = Number(req.params.id);
    const content = req.body.content;
    const userID = req.auth.userID;

    //vérification du contenu de l'article 
    if (!content || content =='') return res.status(400).json({
        error: true,
        message:"Il faut saisir un contenue"
    });
    
    //Récupération des informations du commentaire s'il existe.
    Comment.getById(id, ( data, err ) => {
        // Si le commentaire n'existe pas
        if (err) return res.status(401).json({ 
            error: err,
            message: "Ce commentaire n'existe pas"
        })

        //Vérifier si c'est le même créateur
        if ( userID != data.user_id ) return res.status(401).json({ 
            error: true,
            message: "Requète non autorisé, vous n'êtes pas l'auteur de ce commentaire"
        });

        // Mettre à jour les données
        Comment.update({id, content, userID}, () => {
            res.status(200).json({ message: "commentaire mis à jour" })
        })

    });
}
exports.delete = (req, res) => {
    const id = Number(req.params.id);
    const { userID, isAdmin } = req.auth;

    //Récupération des informations du commentaire s'il existe.
    Comment.getById(id, ( data, err ) => {
        // Si le commentaire n'existe pas
        if (err) return res.status(401).json({ 
            error: err,
            message: "Ce commentaire n'existe pas"
        })

        //Si ce n'est pas le crèateur du commentaire et n'est pas le créteur de l'article renvoie requète non autorisé
        if ( userID != data.user_id && userID != data.post_userId && !isAdmin ) return res.status(401).json({ 
            error: true,
            message: "Requète non autorisé, vous n'êtes pas l'auteur de ce commentaire"
        })

        // suprimée le commentaire
        Comment.delete(id, (err) => {
            res.status(200).json({ message: "commentaire supprimée" })
        });

    });

}
