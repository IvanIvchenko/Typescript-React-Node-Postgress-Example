const formatImageName = (nickname: string, file: Express.Multer.File) => {
    if (file.fieldname === 'mainImage'){
        return 'main_' + nickname.split(" ").join("_") + "_" + Date.now() + "." + file.mimetype.split("/").at(-1)
    }
    return nickname.split(" ").join("_") + "_" + Date.now() + "." + file.mimetype.split("/").at(-1)
}

export default formatImageName