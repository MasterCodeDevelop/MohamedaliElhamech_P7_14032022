
// modules bcrypt et jsonwebtoken
const bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken');
const User = require('../models/User');


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
        sessionAt: new Date().getTime()
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
                    const token = jwt.sign({userID: user.id}, process.env.TOKEN ,{ expiresIn: '24h' });

                    // tous est Ok renvoie le token
                    res.status(201).json({
                        error: false,
                        token: token
                    }) 
                });
        })
    })
}