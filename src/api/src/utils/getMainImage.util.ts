import { ResponseError } from "./interfaces";

const getMainImage = (files: Express.Multer.File[]) => {
    const mainImage = files.filter(file => file.fieldname === 'mainImage')[0]
    if(!mainImage){
        const err: ResponseError = new Error('Main image is required and was not provided');
        err.statusCode = 500;
        throw err;
    }
    return mainImage.filename
}

export default getMainImage