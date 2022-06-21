import * as superheroes from "../controllers/superheroes.controller"
import superheroValidator from "../middleware/superheroValidator.middleware"
import errorHandler from "../middleware/errorHandler.middleware"
import { uploadNewPicture, uploadEditPicture } from "../middleware/multer.middleware"

var router = require("express").Router();

// Create a New superhero
router.post("/", uploadNewPicture.any(), superheroValidator, superheroes.create, errorHandler);

// Retrieve ALL superheroes
router.get("/", superheroes.findAll, errorHandler);

// Retrieve SINGLE superhero w/ID but without details 
router.get("/:id", superheroes.findOne, errorHandler);

//Update a superhero w/ID
router.put("/:id", uploadEditPicture.any(), superheroes.update, errorHandler);

//Delete a superhero w/ID
router.delete("/:id", superheroes.deleteOne, errorHandler);

//Delete all superheroes
router.delete("/", superheroes.deleteAll, errorHandler);

export default router
