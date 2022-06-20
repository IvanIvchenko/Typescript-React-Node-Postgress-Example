const superheroes = require("../controllers/superheroes.controller.js")
const superheroValidator = require("../middleware/superheroValidator.middleware.js")
const errorHandler = require("../middleware/errorHandler.middleware.js")
const multerModule = require("../middleware/multer.middleware.js")
const uploadNewPicture = multerModule.uploadNew
const uploadEditPicture = multerModule.uploadEdit

var router = require("express").Router();

// Create a New superhero
router.post("/", uploadNewPicture.any('pictures'), superheroValidator, superheroes.create, errorHandler);

// Retrieve ALL superheroes
router.get("/", superheroes.findAll, errorHandler);

// Retrieve SINGLE superhero w/ID but without details 
router.get("/:id", superheroes.findOne, errorHandler);

//Update a superhero w/ID
router.put("/:id", uploadEditPicture.any('pictures'), superheroes.update, errorHandler);

//Delete a superhero w/ID
router.delete("/:id", superheroes.delete, errorHandler);

//Delete all superheroes
router.delete("/", superheroes.deleteAll, errorHandler);

export default router
