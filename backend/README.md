# BACKEND #

## Prerequis ##
1. installer npm
    Vous devez avoir Node and `npm` installés localement sur votre machine.
2. sql:
    Moi je travaille avec l'environement de développement XAMPP il contient MySQL:
    voici le lien https://www.apachefriends.org/fr/index.html

## DB | SQL : CONFIG ##
Je vous ai mis dans le fichier DB.sql les lignes sql à executer pour créer la base de donée.
Après avoir créer les tables, vous pouvez créer un fichier .env où vous mettez les information pour se connecter à la base de donée et pour sécuriser votre TOKEN.
Je vous ai mis en exemple le fichier "exemmple.env".

Voici les informations demandé: 
<pre><code>
    DB_PORT = le Port de la base de données par default (3306)
    DB_HOST = le host de la base de données
    DB_USER = le nom utilsateur de la base de données
    DB_PASSWORD = mot de passe de connexion à la base de données
    DB_NAME = le nom de la base de données
    TOKEN = une chaîne de caractères aléatoire pour sécuriser le token
</code></pre>

## IMAGES ##
    Créer un dossier qui se nomme images dans la racine du dossier backend.


## Installation des dépendances et Démarrage de serveur ##
Tout d'abord éxécutez `npm install`.
Puis vérifier que votre base de donnée est bien éxecuter.
Enfin vous pourrez lancer le serveur avec `node server`. 
Le serveur est accessible sur `localhost` avec le port '3000' par défaut.

Si tout se passe bien, les messages suivants apparaissent dans le terminal :

  Listening on port 3000
  Connexion à la base de donée SQL réussie !

