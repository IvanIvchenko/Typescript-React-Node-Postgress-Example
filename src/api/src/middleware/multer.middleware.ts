import multer, { FileFilterCallback } from "multer"
import { Request } from 'express'
import superheroExistsCheck from "../utils/superheroExistsCheck.util"
import formatImageName from '../utils/formatImageName.util'
import { RequestBody } from "../utils/interfaces"

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
//type FileFilterCallback = (error: Error | null, accept: boolean) => void

// defining image storage location
const storageConfig = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
        cb(null, "./static/images");
    },
    filename: (req: Request<{}, {}, RequestBody>, file: Express.Multer.File, cb: FileNameCallback) => {
        cb(null, formatImageName(req.body.nickname, file));
    }
});
// defining imagesave filters for superhero creation
const fileFilterCreate = async (req: Request<{}, {}, RequestBody>, file: Express.Multer.File, cb:FileFilterCallback) => {
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
const fileFilterEdit = (req: Request<{}, {}, RequestBody>, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/png"
        || file.mimetype === "image/jpg"
        || file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export const uploadNewPicture = multer({ storage: storageConfig, fileFilter: fileFilterCreate })
export const uploadEditPicture = multer({ storage: storageConfig, fileFilter: fileFilterEdit })