import { Request, Response } from 'express'
import { ResponseError } from '../utils/interfaces';

const errorHandler = (error: ResponseError, req: Request, res: Response) => {
    if (!error.statusCode) {
        error.statusCode = 500
    };
    res.status(error.statusCode).json({message: error.message})
}

export default errorHandler