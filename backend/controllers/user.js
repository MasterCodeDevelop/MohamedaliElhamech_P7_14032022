
// modules bcrypt et jsonwebtoken
const bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
User = require('../models/User'),
fs = require("fs");



// Création de nouveau compte d'utilisateur 
exports.signup = (req, res, next) => {
    const { familyName, name, email, password } = req.body,
    RegName = /^[^@&"()!_$*€£`+=\/;?#\d]+$/,
    RegPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
    RegMail = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i;
    
    // vérfier familyName
    if (  ( !familyName || familyName == '' ) ||  !RegName.test(familyName) ) {
        return res.status(401).json({ 
            error : true,
            message: "saisir un nom de famille correcte"
        })
    } 

    // vérfier name
    if (  ( !name ||  name == '' ) ||  !RegName.test(name) ) {
        return res.status(401).json({ 
            error : true,
            message: "saisir un prénom correcte"
        })
    } 

    // vérification de l'email
    if (  !email || email == '' ||  !RegMail.test(email) ) {
        return res.status(401).json({ 
            error : true,
            message: "saisir un email correcte, comme nom.prenom@gmail.com" 
        });
    }
    
    // vérification du mot de passe
    if ( !password || password == '' || !RegPass.test(password) ) {
        return res.status(401).json({ 
            error : true,
            message: "Saisir un mot de passe , Il doit comporter 8 caractères ou plus dont 1 lettre minuscule et majuscule, 1 nombre et 1 caractère spécial" 
        });
    }

    // donée du nouvel utilsateur
    var newUser = {
        name,
        familyName,
        email,
    }

    // vérifier si l'email n'existe pas // il doit être unique
    User.get('id', {email: email}, (row) => {
        
        // S'il y'a un utilsateur avec le même email renvoie erreur
        if ( row ) return res.status(401).json({ 
            error : true,
            message: "Cette email est déjà utilisé, Merci de choisir une autre!" 
        });
        
        //crypter le mot de passe
        bcrypt.hash(password, 10)
            .then(hash => {
                // ajout du mot de passe hashé dans newUser
                newUser.password = hash,

                // créer le nouveau utilisateur
                User.set(newUser);

                //récupération de l'id
                User.get('id', {email: newUser.email}, (user) => {

                    // créer du token
                    const token = jwt.sign(
                        {
                            userID : user.id,
                            isAdmin: user.isAdmin
                        },
                        process.env.TOKEN,
                        { expiresIn: '24h' }
                    );

                    // tous est Ok renvoie le token
                    res.status(201).json({ token: token }) 
                });
        })
    })
}


//Connexion au compte de l'utilisateur 
exports.login = (req, res, next) => {
    const{ email, password } = req.body;
    // vérifier que tous le champs email est bien remplis
    if(email == undefined || email == '') {
        return res.status(401).json({
            error: true,
            message: "veillez saisir votre email"
        })
    }

    // vérifier que tous le champs password est bien remplis
    if(password == undefined || password == '') {
        return res.status(401).json({
            error: true,
            message:"veillez saisir votre mot de passe"
        })
    }

    // recherche de l'email
    User.get('*', {email: email}, (user) => {
        // si l'email n'existe pas dans la base de sonée
        if(!user) return res.status(401).json({
            error: true,
            message: "Cette email n'existe pas",
        });

        

        // Vérification du mot de passe
        bcrypt.compare(password, user.password)
        .then(valid => {
            // Si le mot de passe n'est pas valide
            if (!valid) return res.status(401).json({
                error: true,
                message: "le mot de passe incorrect"
            });
            

            // création de token
            const token = jwt.sign(
                {
                    userID : user.id,
                    isAdmin: user.isAdmin
                },
                process.env.TOKEN,
                { expiresIn: '24h' }
            );
         
            
            res.status(200).json({ token: token }) 
          
        })
        .catch(error => res.status(500).json({ error }));
        
    })    
}

exports.loginByToken = (req, res) =>{
    const userID = req.auth.userID;
    
    // récupérations des informations de l'utilsateur
    User.get(" id, email, name, familyName, poste, isAdmin, avatar ", {id: userID}, (user) => {

        // vérification de l'utilsateur
        if(!user) return res.status(401).json({
            error: true,
            message: "Cette email n'existe pas",
        });

        //envoie les informations récupérer
        res.status(201).json({ user })    
        
    })
}

exports.updateProfil = (req, res, next) => {
    const userID = req.auth.userID,
    { name, familyName, poste, image} = req.body,
    WHERE = { id : userID };
    var data = {};

    // Si aucune donée n'a été envoyé
    if (!name && !familyName && !poste && !req.file && image != 'delete') return res.status(401).json({
        error: true,
        message: "Vous devez remplir au moins un champ"
    });

    if (name && name!='') data.name = name;
    if (familyName && familyName!='') data.familyName = familyName;
    if (poste && poste!='') data.poste = poste;

    // vérification de imageUrl
    if (req.file) {
        data.avatar = req.file.filename;
    } else if(image == 'delete') {
        data.avatar = '';
    }

    User.get('avatar', WHERE, (user) => {
        const avatar = user.avatar;
       
        // S'il y'avait d'image enregistrer
        if (avatar == '') {
            fs.unlink(`images/${avatar}`, () => {
                // mettre à jour les nouvelles données
                User.update(data, WHERE);
                res.status(200).json({ 
                    message: "profile mis à jour!"
                });
            });
        }else {
            // mettre à jour les nouvelles données
            User.update(data, WHERE);
            res.status(200).json({ 
                message: "profile mis à jour!"
            });
        }
    });
}

exports.updatePassword = (req, res) => {
    const { password, newPassword } = req.body,
    userID = req.auth.userID,
    RegPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    
    
    // vérifier si tous les champs sont bien remplis
    if ( ( !password || password == '' )  ||  ( !newPassword || newPassword == '' ) ) return res.status(401).json({
        error: true,
        message: " Vous devez remplir tous les champs courectement"
    });

    // vérifier si tous les champs sont bien remplis
    if ( password == newPassword ) return res.status(401).json({
        error: true,
        message: "Vous devez saisir un mot de passe different "
    });

    // vérification du nouveau mot de passe
    if ( !RegPass.test(newPassword) ) return res.status(401).json({ 
        error : true,
        message: "Le mot de passe doit comporter 8 caractères ou plus dont 1 lettre minuscule et majuscule, 1 nombre et 1 caractère spécial" 
    });

    // récupération des donée de l'utilisateur
    User.get('password', {id: userID}, (user) => {

        // vérification de l'utilsateur
        if(!user) return res.status(401).json({
            error: true,
            message: "Cet utilsateur n'existe pas",
        });

        // vérifier si le mot de passe est coorecte
        bcrypt.compare(password, user.password)
        .then(valid => {
            // Si le mot de passe n'est pas valide
            if (!valid) return res.status(401).json({
                error: true,
                message: "Votre mot de passe est incorrect"
            });

            // hash le mot de passe
            bcrypt.hash(newPassword, 10)
            .then( hash => {

                User.update(
                    { password: hash },
                    { id: userID }
                );
                res.status(200).json({ message: "Mot de passe mis à jour!" })
            })
            .catch(error => res.status(500).json({ error }));

        })
        .catch(error =>  res.status(500).json({ error }) )

    });
}

exports.delete = (req, res) => { 
    const userID = req.auth.userID;
    const password = req.body.password;

    // vérification du mot de passe
    if ( !password || password == '' ) {
        return res.status(401).json({ 
            error : true,
            message: "Vous devez saisir votre mot de passe" 
        });
    }

     // récupération des donée de l'utilisateur
     User.get('password', {id: userID}, (user) => {
        
        // vérification de l'utilsateur
        if(!user) return res.status(401).json({
            error: true,
            message: "Ce compte n'existe pas",
        });

        // vérifier si le mot de passe est coorecte
        bcrypt.compare(password, user.password)
        .then(valid => {

            // Si le mot de passe n'est pas valide
            if (!valid) return res.status(401).json({
                error: true,
                message: "Votre mot de passe est incorrect"
            });

            User.delete(userID)
            res.status(200).json({ message: "Votre compte est suprimé" })

        })
        .catch(error =>  res.status(500).json({ error }) )

    });
}