const jwt = require("jsonwebtoken");

//on fait ce controle a chaque donnée que l'on veut sécuriser
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];//on va stocker & splitter le token en 2 pour récup ce qui est après le Bear
        const decodeToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
        const userId = decodeToken.userId;
        if (req.body.userId && req.body.userId !== userId) {//on compare si userId dans la requete et différent à celui du token 
            throw "User ID non valable :";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requete non authentifié" })
    }
};