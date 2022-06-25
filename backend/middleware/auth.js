// Récupération du modèle jsonwebtoken
const jwt = require('jsonwebtoken');

// AUTHENTIFICATION 
module.exports = (req, res, next) => {
  try {
    // Récupération du token dans le header authorization de 'En-tête de requête'
    const token = req.headers.authorization.split(' ')[1];

    // Décoder le token 
    // jwt.verify(token à vérifier, clé d'encodage);
    const decodedToken = jwt.verify(token, process.env.TOKEN );

    // Extraire le 'userId' qui est à l'intérieur du token décodé
    const { userID, isAdmin} = decodedToken;

    // Ajout de auth  dans la requette
    req.auth = { userID, isAdmin };

    
    if (userID && userID != undefined){
      next();
    } else {
      res.status(401).json({
        error: true,
        message: "Requête non authentifiée ! "
      })
    }
    
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !' });
  }
};