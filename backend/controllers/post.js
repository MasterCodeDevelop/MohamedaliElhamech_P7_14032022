
const Post = require('../models/Post'),
fs = require("fs");


exports.create = (req, res, next) => {
    const content = req.body.content;
    
    // vérifier qu'il y a aumoin un contenue ou ue image
    if (!content && !req.file) return res.status(400).json({ error: true, message:"vous devez saisir un contenue et/ou une image" });

    var data = {
        user_id: req.auth.userID,
        createdAt: new Date().getTime()
    }

    // vérification de content
    if (content && content!= '') {
        data.content= content
    }

    // vérification de imageUrl
    if (req.file) {
        data.imageUrl = req.file.filename;
    }

    Post.create(data, (id) => {

        Post.get(id, (dataTable)=>{
            res.status(200).json({ data: dataTable })
        })
    })
            
}

exports.get = (req, res) => {
    const id = req.params.id
    
    Post.get(id, (data)=>{
        res.status(200).json(data)
    })
}

exports.getAll = (req, res, next) => {
    Post.all((data)=>{
        res.status(200).json(data)
    })
}
exports.getAllByUser = (req, res, next) => {
    const userID = req.auth.userID;

    Post.getAllByUserId(userID, (data) => {
        res.status(200).json({ data: data })
    })
}



exports.delete = (req, res, next) => {
    const { userID, isAdmin } = req.auth,
    id = req.params.id;

    // récupération des informations de la base de sonée s'il existe
    Post.get(id, (post)=>{

        // vérifier de créateur
        if(post.user_id != userID && !isAdmin) return res.status(401).json({
            error: true, 
            message: "Requète non autorisé, Vous n'êtes pas l'autaur de ce poste" 
        });

        //Suppression de ce fichier avec la methode 'unlink' du package 'fs'
        fs.unlink(`images/${post.imageUrl}`, () => {
            // suprission de l'article
            Post.delete(id, ()=>{
                res.status(200).json({message: "post delete" })
            })
        });
      
    })

}
exports.update = (req, res, next) => {
    const id = req.body.id;
    const content = (req.body.content != undefined) ?req.body.content.replace(/[&\/\\#,+()$~%@^'!:*?<>{}]/g, ''):req.body.content;

    var data = {id};
    //vérification de l'id de l'article 
    if (!id) return res.status(400).json({ 
        error: true,
        message:"manque l'ID" 
    });
    
    // vérfication qu'il y a au moins un contenue ou un fichier 
    if ( (!content || content =='') && !req.file ) return res.status(400).json({ 
        error: true, 
        message:"vous devez saisir un contenue et / ou une image" 
    });

    // vérification de content
    if (content) data.content = content;

    // vérification de imageUrl
    if (req.file) data.imageUrl = req.file.filename;
    


    // récupération des informations de la base de sonée s'il existe
    Post.get(id, (post) => {

        if(!post) return res.status(400).json({ 
            error: true, 
            message:"Cette article n'existe pas" 
        });

        // S'il y'avait d'image enregistrer
        if ( post.imageUrl == '' && !req.file) {
            // mettre à jour les nouvelles données
            Post.update(data, WHERE, () => {
                res.status(200).json({ data: data });
            })
        } else {
            // S'il y a déjà une image enregistrer on commence par suprimer l'ancien immage
            fs.unlink(`images/${post.imageUrl}`, () => {

                // mettre à jour les nouvelles données
                Post.update(data, WHERE, () => {
                    res.status(200).json({ data: data });
                })
            })
        }

    });


 
    
}
exports.getPostById = (req, res, next) => {
    const id = Number(req.params.id);
    Post.getAllByUserID(id, (data)=>{
        res.status(200).json({ data: data })
    })
}
exports.like = (req, res, next) => {
    const userID = req.auth.userID;
    const id = Number(req.params.id);

    //Récupérer les informations de le base de donée
    Post.get(id, (data)=>{

        var likes = JSON.parse(data.likes)
        const indexOf = likes.indexOf(userID)
        
        if(indexOf > -1 ) {
            likes.splice(indexOf,1);
        }else {
            likes.push(userID);
        }

        // mettre à jour le like
        Post.like( {id, likes}, (err) => {
            if (err) return res.status(401).json({
                error: err
            });

            res.status(200).json({ data: likes })
        })
    })
}
