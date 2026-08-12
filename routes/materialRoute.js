const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload")
const {createMaterial} = require("../controller/createMaterial");
const {getAllMaterials} = require("../controller/getAllMaterials")
const {deleteMaterial} = require("../controller/deleteMaterial")
const {updateProgress} = require("../controller/updateProgress");

router.get("/",auth,getAllMaterials);
router.post("/",auth,upload.single("file"),createMaterial);
router.delete("/:id",auth,deleteMaterial);
router.patch("/:id/progress",auth,updateProgress)
module.exports = router ;