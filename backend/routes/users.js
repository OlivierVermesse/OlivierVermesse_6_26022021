const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/users");

//post car le front va envoyer au back
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;