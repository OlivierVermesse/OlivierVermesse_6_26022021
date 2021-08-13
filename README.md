## Frontend
1. Cloner le projet depuis Githup <https://github.com/OpenClassrooms-Student-Center/dwj-projet6>
2. Installer NPM avec la commande : NPM install
3. Installer node-sass à part

Le projet a été généré avec Angular version 7.0.2. Pour vérifier votre version utiliser "angular -v"

Une fois, les étapes précédentes réalisées, POUR EXECUTER LE FRONTEND, VOUS DEVEZ :
- Ouvrir un terminal depuis le dossier "frontend"
- puis executer : ng serve
	
Lorsque le serveur est executé, aller dans votre navigateur et lancer l'adresse: http://localhost:4200 

## Backend
1. Créer un fichier .env a la racine du dossier Backend avec les informations ci-dessous :
- SECRET_DB_ADMIN="indiquer le chemin MongoDb du login ADMIN"
- SECRET_DB_USERS="indiquer le chemin MongoDb du login USERS"
- SECRET_TOKEN="indiquer la clé TOKEN de votre choix"
	
2. Exécuter "npm install" pour lancer le server nodejs
(la version de nodejs doit être en version "v14.17.3" pour vérifier votre version utiliser "node -v") 

	
POUR EXECUTER LE BACKEND, VOUS DEVEZ :
- Ouvrir un terminal depuis le dossier "backend"
- puis executer : nodemon server
	
INFORMATION : L'application va se recharger automatiquement grace à "nodemon server" au moement de la sauvegarde de votre fichier modifié.