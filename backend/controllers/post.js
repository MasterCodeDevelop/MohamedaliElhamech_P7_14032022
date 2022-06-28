/*###################################  POSTS  ########################################*/
// Les imports
const fs = require("fs"),
Post = require('../models/Post');


/*##########################  CREATION D'UN NOUVEL ARTICLE  #########################*/
exports.create = (req, res) => {
    const content = req.body.content;
    var data = {
        user_id: req.auth.userID,
        createdAt: new Date().getTime()
    }

    // vérifier qu'il y a au moins un contenue ou une image
    if ((!content || content=='') && !req.file) return res.status(400).json({ 
        error: true,
        message:"vous devez saisir un contenue et/ou une image" 
    });

    // vérification du contenu
    if (content && content!= '') data.content= content;
    
    // vérification de imageUrl
    if (req.file) data.imageUrl = req.file.filename;

    // Créer l'article avec les donée de "data"
    Post.create(data, (id) => {
        
        // récuprer les donée de nouvelle article
        Post.get(id, (dataTable)=>{
            
            // Renvoies les donée de l'article
            res.status(200).json({ data: dataTable[0] })
        })
    })      
}


/*##################  Renvoie les donées de l'article s'il existe  #####################*/
exports.get = (req, res) => Post.get(Number(req.params.id), ($res) => {
    // Si l'article n'existe pas renvoie erreur
    if($res.length === 0 ) return res.status(401).json({
        error: true,
        message: "Cette article n'existe pas"
    })
    
    // renvoie les donées de l'article 
    res.status(200).json($res[0]);
    
});


/*####################  Renvoie tous les articles qui existe  ########################*/
exports.getAll = (req, res) => Post.all((data)=>{
    res.status(200).json(data)
});


/*###############  Renvoie tous les articles qui existe de l'utilisateur ##############*/
exports.getAllByUser = (req, res) => Post.getAllByUserId(
    { userID: Number(req.auth.userID) },
    data =>  res.status(200).json({ data: data })
);

/*##############################  METTRE A JOUR L'ARTICLE ##########################*/
exports.update = (req, res) => {
    const postID = req.params.id,
    { content, image } = req.body;
    var data = {
        createdAt: new Date().getTime()
    };  

    // vérification de content
    if (content || content ==='') data.content = content;

    // vérification de imageUrl
    if (req.file) data.imageUrl = req.file.filename;
    
    // récupération des informations de la base de sonée s'il existe
    Post.get(postID, ($res) => {
        // L'article n'existe pas
        if($res.length === 0) return res.status(400).json({ 
            error: true, 
            message:"Cette article n'existe pas" 
        });
        let post = $res[0]

        // vérfication qu'il y a au moins un contenue ou un fichier 
        if ( (content =='' || post.content=='' ) && ( (!req.file && post.imageUrl=='') || image=='delete') ) return res.status(400).json({ 
            error: true, 
            message:"vous devez saisir un contenue et / ou une image" 
        }); 
        

        // supprision de l'ancienne photo si elle exigé
        if( post.imageUrl!=='' && (req.file || image==='delete')) {
            fs.unlink(`images/${post.imageUrl}`, () => {
                //console.log('image supprimée')
            })
        }

        // mettre à jour les nouvelles données
        Post.update(data, { id: postID }, () => {
            if(!data.content) post.content = data.content;
            if(!data.imageUrl) post.imageUrl = data.imageUrl;
            res.status(200).json({
                message: 'Votre article est mis à jour !',
                data: post
            })
        });
    });
}

/*##############################  SUPPRISSION DE L'ARTICLE ##########################*/
exports.delete = (req, res) => {
    const { userID, isAdmin } = req.auth,
    postID = req.params.id;

    // récupération des informations de la base de sonée s'il existe
    Post.get(postID, ($res)=>{

        // L'article n'existe pas
        if($res.length === 0) return res.status(400).json({ 
            error: true, 
            message:"Cette article n'existe pas" 
        });

        const post = $res[0]

        // vérifier de l'utilisateur
        if(post.user_id != userID && !isAdmin) return res.status(401).json({
            error: true, 
            message: "Requète non autorisé, Vous n'êtes pas l'autaur de ce poste" 
        });

        //Suppression du fichier avec la methode 'unlink' du package 'fs' s'il existe
        fs.unlink(`images/${post.imageUrl}`, () => {
            // suprission de l'article de la base des donées
            Post.delete(postID, ()=>{
                res.status(200).json({message: "article supprimé !" })
            })
        });
    })
}