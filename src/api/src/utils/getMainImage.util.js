module.exports = (files) => {
    const mainImage = files.filter(file => file.fieldname === 'mainImage')[0]
    if(!mainImage){
        const err = new Error('Main image is required and was not provided');
        err.statusCode = 500;
        throw err;
    }
    return mainImage.filename
}