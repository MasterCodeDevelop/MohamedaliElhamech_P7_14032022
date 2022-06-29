/* Vérifier les tables SQl s'elles n'existe pas on les créer */

    CREATE TABLE IF NOT EXISTS users (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(255) DEFAULT '',
        name VARCHAR(20) DEFAULT NULL,
        familyName VARCHAR(20) DEFAULT NULL,
        poste VARCHAR(20) DEFAULT '',
        isAdmin BOOLEAN  DEFAULT FALSE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
    CREATE TABLE IF NOT EXISTS posts (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        content VARCHAR(255) NOT NULL DEFAULT '',
        imageUrl VARCHAR(255) DEFAULT '',
        createdAt VARCHAR(50) NOT NULL,
        user_id int ,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


    
    CREATE TABLE IF NOT EXISTS posts_likes (
        user_id int ,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        post_id int ,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 
  

    CREATE TABLE IF NOT EXISTS posts_comments (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        content VARCHAR(255) NOT NULL DEFAULT '',
        createdAt VARCHAR(50) NOT NULL,
        user_id int ,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        post_id int ,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 
  