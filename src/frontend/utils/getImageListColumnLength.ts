const getImageListColumnLength  = (images: File[] | string[] | null) => {
    if(images){
        return images.length > 1 ? images.length === 2 ? 2 : 3 : 1 
    }
    return 0
}

export default getImageListColumnLength 