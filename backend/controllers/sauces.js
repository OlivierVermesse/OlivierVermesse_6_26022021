const Sauce = require("../models/sauces");
// const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.newSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id; //car champ pas dans BDD
    const sauce = new Sauce({
      ...sauceObject, // on copie l'ensemble des informations de la sauce
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Sauce ajoutée" }))
      .catch((error) => res.status(400).json({ error }));
  };