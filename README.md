# Projet 7 - Groupomania #
7ème projet de la formation développeur web d'Openclassrooms. Créer un réseau social d'entreprise. La stack utilisée pour ce projet:

react Js
NodeJs + express 
Mysql

## PREREQUIE ##
1. installer npm
    Vous devez avoir Node and `npm` installés localement sur votre machine.
2. sql:
    Moi je travaille avec l'environement de développement XAMPP il contient MySQL:
    voici le lien https://www.apachefriends.org/fr/index.html
3. Git
    Clonez ce repository.

## BACKEND INSTALATION ##
Suivre les instructions de README dans le dossier backend

## FRONTEND INSTALATION ##
Suivre les instructions de README dans le dossier fronend

Frontend
Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande:

npm install
puis
npm start
si le navigateur ne s'ouvre pas automatiquement allez à :
http://localhost:3000/




## INSCRIPTION ##
Pour s'inscrire sur le reseau social de Groupomania, il vous faut renseigner :
1. Nom
2. Prenom
3. Une adresse mail valide
4. Un mot de passe 
    Il doit contenir 8 caractères minimum, lettres, chiffres, majuscules et minuscules, caractère special. 
## Info ##
Vous pouvez par la suite modifier votre profil (nom, prenom, poste, photo) en allant sur votre profil. Votre compte peut être supprimé par vous-même.
Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:
des articles
des commentaires
Le modérateur peut les supprimer.
pour etre moderateur , entrez dans la base de données :

UPDATE user SET isAdmmin=1 WHERE id="numero de l'id de l'utilisateur"
(l'admin par defaut est: admin.admin@gmail.com, mot de passe : *Admin14032022)