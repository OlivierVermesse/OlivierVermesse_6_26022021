const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const User = require ("../models/Users");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //on récup le pwd du front et on le hash x10 // + on hash + c'est long
    .then (hash => { //on récup le pwd hashé
        const user = new User({ //creation d'une nouvelle instance que l'on ajoute à la variable de l'import de la BDD grace a NEW
            email: req.body.email, //on récup l'email du front
            password: hash //on met le pwd hashé qui est dans la promise
        });
        user.save() //on recup la const "user" pour la mettre dans la BDD
          .then(() => res.status(201).json({message: "Utilisateur créé !"})) //action si OK
          .catch(error => res.status(400).json({error})) //action si erreur
    })
    .catch (error => res.status(500).json({error}));
};
