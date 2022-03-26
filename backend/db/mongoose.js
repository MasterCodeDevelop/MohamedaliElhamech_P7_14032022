
// connexion à la base de donnée
const mongoose = require('mongoose');

const db = {
    user: "master2022",
    password: "master2022",
    name: "piiquante"
}

mongoose.connect(`mongodb+srv://${db.user}:${db.password}@cluster0.hvloi.mongodb.net/${db.name}?retryWrites=true&w=majority`,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


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