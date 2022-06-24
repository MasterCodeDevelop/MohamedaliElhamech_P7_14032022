var mysql = require('mysql');
const DB = require('./DB')
var db = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});
const color = {
    red: '\x1b[31m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m'
}
// vérifier que la base de donée est bien connecté
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    
    if (error) {
        console.log(color.red, "Connexion à la base de sonée SQL échouée !");
        throw error;
    }

    if (results[0].solution == 2 ) {
        console.log(color.green,'Connexion à la base de sonée SQL réussie !')
    }
});


db.query( DB , (err, res) => {
    if (err) {
        throw err
    } else {
        console.log(color.green,'les tables sql sont OK!')
    }
})


module.exports = db;