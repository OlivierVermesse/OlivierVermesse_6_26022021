const express = require("express");
const router = express.Router();
const max = require("../middlewares/limitConnect")
const { body, validationResult } = require('express-validator');

const userCtrl = require("../controllers/users");

const sanitize = (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error })  // code 400: bad request
    }
    next();      // si on ne trouve pas d'erreur par rapport à ce qu'on a demandé, on passe à la suite.
};

router.post("/signup", [
    body('email').isEmail(),                // ici, on utilise express-validator et on précise ce qu'on veut []
], sanitize,                            // on vérifie avec la fonction créée plus haut si on a bien ce qu'on a demandé
    userCtrl.signup);
router.post("/login", [
    body('email').isEmail(),
], sanitize,
    // max.limiter, userCtrl.login);
    userCtrl.login);

module.exports = router;