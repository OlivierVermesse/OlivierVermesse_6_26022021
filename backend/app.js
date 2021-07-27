//import de mongobd
const mongoose = require('mongoose');
//require est la commande pour importer EXPRESS
const express = require("express");
//creation de la variable qui import BODY-PARSER
const bodyParser = require("body-parser")

//import des fichiers JS du dossier ROUTES
const usersRoutes = require("./routes/users");

//creation de la variable qui créée l'application EXPRESS
const app = express();


mongoose.connect('mongodb+srv://Admin:P6Admin2021@cluster0.b0g5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
);
// mongoose.connect('mongodb+srv://Users:P6Users2021@cluster0.b0g5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !')
// );

//ajout de cette application afin de dire à l'API qu'elle est public et les actions possible à faire par le front
// app.use((req, res, next) => { //on ne met pas d'addresse de route afin qu'elle fonctionne pour tous
app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*'); //le * dit que l'on autorise tout le monde
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // on dit qu'elle en tête le front a le droit de voir
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //on dit quelles actions le front a le droit de faire
  next(); //ne pas oublier le next pour passer à la suivante
});

//ajout du middleware qui donne le format de ce bodyParser
app.use(bodyParser.json());

//ajout du chemin de la route que les js devront prendre
app.use("/api/auth", usersRoutes);

module.exports = app;