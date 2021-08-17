const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmail } = require('validator')
const pwdFormat = require("password-validator");
require('dotenv').config();
const User = require("../models/Users");

var pwdSchema = new pwdFormat()


// Add properties to it
pwdSchema
    .is().min(8)
    .is().max(50)
    .has().uppercase(1)
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

function maskEmail(email) {
    if (email.isEmail = true) {
        let headMail = email.slice(0, 2);
        let bodyMail = email.slice(1, email.length - 5);
        let bottomMail = email.slice(email.length - 5, email.length);

        // console.log("headMail : " + headMail);
        // console.log("bodyMail : " + bodyMail);
        // console.log("bottomMail : " + bottomMail);

        let final = [];
        // console.log("final [] : " + final);
        var masked = bodyMail.split('');
        // console.log("masked : " + masked);
        var maskedMail = [];
        for (let i in masked) {
            masked[i] = '*';
            maskedMail += masked[i];

        } 
        // console.log("maskedMail : " + maskedMail);
        final = headMail + maskedMail + bottomMail


        // console.log("final : " + final);
        return final;
    }
    console.log(email + " is not a mail");
    return false
}

//controlleur pour API/auth/signIn
exports.signup = (req, res, next) => {
    console.log(pwdSchema.validate(req.body.password));
    // Verification du schema du mot de passe.
    if (pwdSchema.validate(req.body.password) == false) {
        return res.status(400).json({ message: 'format mot de passe incorrect' })
    }
    bcrypt.hash(req.body.password, 10) //on récup le pwd du front et on le hash x10 // + on hash + c'est long
        .then(hash => { //on récup le pwd hashé
            const user = new User({ //creation d'une nouvelle instance que l'on ajoute à la variable de l'import de la BDD grace a NEW
                email: maskEmail(req.body.email), //on récup l'email du front
                password: hash //on met le pwd hashé qui est dans la promise
            });
            user.save() //on recup la const "user" pour la mettre dans la BDD
                .then(() => res.status(201).json({ message: "Utilisateur créé !" })) //action si OK
                .catch(error => res.status(400).json({ error })) //action si erreur
        })
        .catch(error => res.status(500).json({ error }));
};

//controlleur pour API/auth/login
exports.login = (req, res, next) => {
    User.findOne({ email: maskEmail(req.body.email) }) //on va chercher l'email envoyer par le front lors de l'auth
        .then(user => { //si connection à BDD > recherche du user // résultat en VRAI (trouvé) ou FAUX (pas trouvé)
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            bcrypt.compare(req.body.password, user.password) //comparaison entre le user saisie crypté et celui en BDD
                .then(valid => { //est ce que la comparaison est valid ?
                    if (!valid) { //si pas valide
                        return res.status(401).json({ error: "mot de passe incorrect !" });
                    }
                    res.status(200).json({ //si valide
                        userId: user._id, //on renvoie un objet avec l'ID en BDD de ce user
                        token: jwt.sign( //une réponse de type ROKEN
                            { userId: user._id }, //va permettre de comparer avec le userId de la ligne de dessus pour être certain que le même utilisateur
                            `${process.env.SECRET_TOKEN}`, //code secret contenant le token
                            { expiresIn: "12h" } //validité du token envoyé au front pour validation
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); //erreur si la connexion à la BDD a échoué pour vérifier // Ce n'est pas si utilisateur non trouvé
};