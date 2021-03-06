const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const saucesController = require("../controllers/sauces");

router.get("/", auth, saucesController.getAllSauces);
router.get("/:id", auth, saucesController.getOneSauce);
router.post("/", auth, multer, saucesController.newSauce);
router.put("/:id", auth, multer, saucesController.updateSauce);
router.delete("/:id", auth, saucesController.deleteSauce);
router.post("/:id/like", auth, saucesController.likeDislike);



module.exports = router;