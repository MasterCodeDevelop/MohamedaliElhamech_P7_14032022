
// modules bcrypt et jsonwebtoken
let connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const User = require('../models/User');

// Création de nouveau compte d'utilisateur 
exports.signup = (req, res, next) => {
    connection.query('SELECT * FROM `users` WHERE `email` = "'+req.body.email+'"', (error, results, fields) => {

        // Si le compte n'existe pas avec cette email on crée un compte
        if(results.length == 0) {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = {
                    email: req.body.email,
                    password: hash
                };
                connection.query('INSERT INTO `users` VALUES ("auto","'+user.email+'","'+user.password+'")', (error, results, fields) => {
                    if(error == null){
                        res.status(201).json({ 
                            message: {
                                name: "",
                                firstName: "",
                                email: "",
                                password: ""
                            } 
                        }) 
                    }
                })
            })
            .catch(error => res.status(500).json({ error }));
        }else{
            res.status(401).json({ 
                message: {
                    name: "",
                    firstName: "",
                    email: "Cet email est déjà utilisé, merci de choisir un autre",
                    password: ""
                } 
            })
        }
    });
}

//Connexion au compte de l'utilisateur 
exports.login = (req, res, next) => {
    connection.query('SELECT * FROM `users` WHERE `email` = "'+req.body.email+'"', (error, results, fields) => {

        
        //S'il y a un compte avec cette email
        if(results.length == 1) {
            const user = results[0];
            
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {

                if (!valid) {
                    return res.status(401).json({
                        email: "",
                        password: "le mot de passe incorrect"
                    });
                }
                const token = jwt.sign({},'${process.env.TOKEN}',{ expiresIn: '24h' })
                connection.query('UPDATE `users` SET `token` = "'+token+'" ', (error, results, fields) => {

                    if(error == null){
                        res.status(201).json({ 
                            id: user.id,
                            token: token 
                        }) 
                    }
                })

            })
            .catch(error => res.status(500).json({ error }));
        }

        //S'il n'y a pas de compte avec cette addresse email
        else if(results.length == 0) {
            res.status(401).json({ 
                email: "Cet email est déjà utilisé, merci de choisir un autre",
                password: ""
            })
        }

        //S'il y a plusieurs comptes
        else {
            console.log('fatal error: user.js l.55');
        }

    })
    
    /*
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res
                    .status(401).
                    json({  message: 'Ce compte n\'exsiste pas'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'le mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                        { userId: user._id },
                        '${process.env.TOKEN}',
                        { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
        */
};