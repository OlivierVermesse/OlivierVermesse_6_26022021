const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
require('dotenv').config();

//import des fichiers JS du dossier ROUTES
const usersRoutes = require("./routes/users");

//creation de la variable qui créée l'application EXPRESS
const app = express();

mongoose.connect(process.env.SECRET_DB_USERS,
  { useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
);

//ajout de cette application afin de dire à l'API qu'elle est public et les actions possible à faire par le front
app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//ajout du middleware qui donne le format de ce bodyParser
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

Source: https://prograide.com/pregunta/5098/bodyparser-est-deprecie-express-4
app.use(cors());

//ajout du chemin de la route que les js devront prendre
app.use("/api/auth", usersRoutes);

module.exports = app;