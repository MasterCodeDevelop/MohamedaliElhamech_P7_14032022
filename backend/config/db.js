var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'groupomania'
});
 

/*
connection.connect();

connection.query('SELECT 1 + 2 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.query('SELECT * FROM `users` WHERE `email` = "master.code.develop@gmail.com"', (error, results, fields) => {
    if (error) throw error;
    console.log(results[0]);
});
*/
module.exports = connection;