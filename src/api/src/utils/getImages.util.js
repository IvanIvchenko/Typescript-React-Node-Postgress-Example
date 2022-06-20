module.exports = (files) => {
    if(!files.length){
        return []
    }
    return files.filter(file => file.fieldname !== 'mainImage').map(file => file.filename)
}