const multer = require("multer")
const superheroExistsCheck = require("../utils/superheroExistsCheck.util.js")
const formatImageName = require('../utils/formatImageName.util.js')

// defining image storage location
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./static/images");
    },
    filename: (req, file, cb) => {
        cb(null, formatImageName(req.body.nickname, file));
    }
});
// defining imagesave filters for superhero creation
const fileFilterCreate = async (req, file, cb) => {
    if (!req.body.nickname
        || !req.body.real_name
        || !req.body.origin_description
        || !req.body.superpowers
        || !req.body.catch_phrase
        || !file
    ) {
        cb(null, false);
    } else {
        const superheroExists = await superheroExistsCheck(req.body.nickname)
        if (!superheroExists
            && file.mimetype === "image/png"
            || file.mimetype === "image/jpg"
            || file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}
// defining imagesave filters for superhero edit
const fileFilterEdit = (req, file, cb) => {
    if (file.mimetype === "image/png"
        || file.mimetype === "image/jpg"
        || file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = {
    uploadNew: multer({ storage: storageConfig, fileFilter: fileFilterCreate }),
    uploadEdit: multer({ storage: storageConfig, fileFilter: fileFilterEdit })
}