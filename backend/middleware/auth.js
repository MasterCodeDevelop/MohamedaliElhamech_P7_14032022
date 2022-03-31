// Récupération du modèle jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const session = JSON.parse(req.headers.authorization);

  try {
    const decodedToken = jwt.verify(session.token, '${process.env.TOKEN}');
    const id = decodedToken.id;

    

    // Vérification de la concordance entre les clés utilisateurs
    if (session.id && session.id != id) {
      throw 'User ID non valable !';
    } else {
      next();
      console.log('auth')
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !' });
  }
};