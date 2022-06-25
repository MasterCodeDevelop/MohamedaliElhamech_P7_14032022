let db = require('../db/mysql');

class User {

  // renvoie les donée d'un utilisateur
  static get (SELECT, WHERE, cb) {
    db.query('SELECT '+SELECT+' FROM `users` WHERE ?', WHERE , (err, row) => {
      if (err) throw err;
      cb(row[0]);
    });
  }

  // créer un nouveau utilisateur
  static set (SET) {
    db.query('INSERT INTO `users` SET ?', SET, (err) => {
      if (err) throw err
    })
  }
  
  //Mettre à jour un ou plusieurs d
  static update (SET, WHERE) {
    db.query('UPDATE `users` SET ? WHERE ?', [ SET, WHERE] , (err) => {
      if (err) throw err
    })
  }

  // suprimer un utilsateur
  static delete (id) {
    db.query('DELETE FROM users WHERE id = ?', id , (err)=>{
      if (err) throw err
    })
}
}

module.exports = User