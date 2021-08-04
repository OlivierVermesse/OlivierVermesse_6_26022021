const Sauce = require("../models/sauces");
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
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

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ? //req.file permet de faire controle si il y a nouvelle image ou pas
        {
            ...JSON.parse(req.body.sauce), //ALORS on recup le format objet pour le mettre en format JSON
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body } //SINON si pas de nouveau fichier, on récup le body directement
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(sauce => res.status(200).json({ message: "objet modifié !" }))
        .catch(error => res.status(400).json({ error: error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) //on recherche l'id du produit
        .then(sauce => {
            const filename = sauce.imageUrl.split("/images/")[1]; //on split le nom du fichier qui a tout le temps /images/ ca fera un tableau avec la partie avant et la partie après et on recup la partie après
            fs.unlink(`images/${filename}`, () => { //unlink va supprimer le fichier grace au lien indiqué
                Sauce.deleteOne({ _id: req.params.id }) //pas besoin d'autre info car on delete
                    .then(sauce => res.status(200).json({ message: "objet supprimé !" }))
                    .catch(error => res.status(400).json({ error: error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};