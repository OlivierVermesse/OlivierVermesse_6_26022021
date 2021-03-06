//import de mongoose
const mongoose = require("mongoose");
const validate = require('../middlewares/sauceValidation');

//création du schéma de données
const saucesSchema = mongoose.Schema ({ //grace a Schema on va pouvoir créer la base via un objet
    userId: {type: String, required:true},
    name: {type: String, required:true, validate: validate.nameValidator },
    manufacturer: {type: String, required:true, validate: validate.manufacturerValidator},
    description: {type: String, required:true, validate: validate.descriptionValidator},
    mainPepper: {type: String, required:true, validate: validate.pepperValidator},
    imageUrl: {type: String, required:true},
    heat: {type: Number, required:true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]},
});

//export du model via le module EXPORTS
module.exports= mongoose.model("sauces", saucesSchema);