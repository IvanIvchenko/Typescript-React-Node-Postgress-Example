const getImages = (files: Express.Multer.File[]) => {
    if(!files.length){
        return []
    }
    return files.filter(file => file.fieldname !== 'mainImage').map(file => file.filename)
}

export default getImages