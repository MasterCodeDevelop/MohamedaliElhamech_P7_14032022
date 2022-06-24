// Vérifier les tables SQl s'elles n'existe pas on les créer
const DB =`
    CREATE TABLE IF NOT EXISTS users (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        familyName VARCHAR(20) DEFAULT NULL,
        name VARCHAR(20) DEFAULT NULL,
        isAdmin BOOLEAN  DEFAULT FALSE,
        avatar VARCHAR(255) DEFAULT NULL,
        sessionAt VARCHAR(20) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`
module.exports = DB;