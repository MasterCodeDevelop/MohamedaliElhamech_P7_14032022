/*###################################{  Comment }#######################################*/
const Comment =  require('../models/Comment')

/*##############################  CREATION D'UUN COMMENTAIRE ##########################*/
exports.create = (req, res, next) => {
    const postID = Number(req.params.id),
    content = req.body.content,
    userID = req.auth.userID,
    SET = {
        content,
        user_id: userID,
        post_id: postID,
        createdAt: new Date().getTime()
    };

    //vérification du contenu de l'article 
    if (!content || content =='') return res.status(400).json({ 
        error: true,
        message:"Il faut saisir un contenue"
    });
    
    Comment.create(SET, (id) => Comment.get(id, (data) => {
        res.status(200).json({ data })
    }))
}


/*####################  RECUPERER TOUS LES COMMMENTAIRES D'UN ARTICLE ##################*/
exports.getAll = (req, res) => Comment.getAll(Number(req.params.id), (data) => {
    res.status(200).json({ data})
})
   

/*#############################  MODIFIER UN COMMENTAIRE ##########################*/
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
    Comment.get(id, (data) => {
        // Si le commentaire n'existe pas
        if (!data) return res.status(401).json({ 
            error: true,
            message: "Ce commentaire n'existe pas"
        })
      
        //Vérifier si c'est le même créateur
        if ( data.user_id != userID ) return res.status(401).json({ 
            error: true,
            message: "Requète non autorisé, vous n'êtes pas l'auteur de ce commentaire"
        });

        // Mettre à jour les données
        Comment.update({id, content, userID}, () => {
            res.status(200).json({ message: "commentaire mis à jour" })
        })

    });
}

/*#############################  SUPPRIMER UN COMMENTAIRE ##########################*/
exports.delete = (req, res) => {
    const id = Number(req.params.id);
    const { userID, isAdmin } = req.auth;

    //Récupération des informations du commentaire s'il existe.
    Comment.get(id, (data) => {
        // Si le commentaire n'existe pas
        if (!data) return res.status(401).json({ 
            error: true,
            message: "Ce commentaire n'existe pas"
        })

        //Si ce n'est pas le crèateur du commentaire et n'est pas le l'administrateur renvoie requète non autorisé
        if ( userID != data.user_id && userID != data.post_userId && !isAdmin ) return res.status(401).json({ 
            error: true,
            message: "Requète non autorisé, vous n'êtes pas l'auteur de ce commentaire"
        })

        // suprimée le commentaire
        Comment.delete(id, () => {
            res.status(200).json({ message: "commentaire supprimée" })
        });

    });

}
