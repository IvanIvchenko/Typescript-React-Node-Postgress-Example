import superheroExistsCheck from "../utils/superheroExistsCheck.util"
import { Request, Response, NextFunction } from 'express'
import { RequestBody, ResponseError } from '../utils/interfaces';

const superheroValidator = async (req: Request<{}, {}, RequestBody>, res: Response, next: NextFunction) => {
    try {
        if (!req.body.nickname
            || !req.body.real_name
            || !req.body.origin_description
            || !req.body.superpowers
            || !req.body.catch_phrase
            || !req.files
        ) {
            const err: ResponseError = new Error('Superhero data is incomplete');
            err.statusCode = 400;
            throw err;
        } else {
            const superheroExists = await superheroExistsCheck(req.body.nickname)
            if (superheroExists) {
                const err: ResponseError = new Error('Superhero with same nickname already exists');
                err.statusCode = 409;
                throw err;
            }
        }
        next()
    } catch (error: any) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

export default superheroValidator