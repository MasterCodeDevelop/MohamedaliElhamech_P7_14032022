// Récupération du modèle jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  /*const auth = {
    id: req.body.auth.id,
    token: req.body.auth.token
  }
  console.log(auth)*/
  res.status(201).json({ 
    id: 'A user.id',
    token: 'A token' 
  })
  next();
  /*

  connection.query('SELECT * FROM `users` WHERE `id` = "'+auth.id+'"', (error, results, fields) => {
    console.log(error)
  }


  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '${process.env.TOKEN}');
    const userId = decodedToken.userId;
    console.log(req.body)
    res.status(201).json({ 
      id: 'A user.id',
      token: 'A token' 
    })
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !' });
  }*/
/*
    // Vérification de la concordance entre les clés utilisateurs
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !' });
  }*/
};