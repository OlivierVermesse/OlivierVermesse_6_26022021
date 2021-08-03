const jwt = require("jsonwebtoken");

//on fait ce controle a chaque donnée que l'on veut sécuriser
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];//on va stocker & splitter le token en 2 pour récup ce qui est après le Bear
        const decodeToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);//on va stocké & vérifier que les tokens sont idem
        const userId = decodeToken.userId;//on stocke et décode le userID que l'on a mis dans le token
        if (req.body.userId && req.body.userId !== userId) {//on compare si userId dans la requete et différent à celui du token 
            throw "User ID non valable :";
        } else {
            next(); //si identique on passe au middleware suivant
        }
    } catch (error) { //catch va permettre de sortir l'erreur si problème
        res.status(401).json({ error: error | "Requete non authentifié" }) //soit on aura la 1ère erreur si erreur sur 1 des const ou le msg perso 
    }
};