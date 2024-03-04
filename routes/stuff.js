const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

// express.Router() permet de créer des routeurs séparés pour chaque route principale de l'application
// on y enregistre ensuite les routes individuelles.

router.post("/", stuffCtrl.createThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);
router.get("/:id", stuffCtrl.getOneThing);
router.get("/", stuffCtrl.getAllThings);

module.exports = router;
