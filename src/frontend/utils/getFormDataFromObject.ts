import { FormState } from './interfaces'

const getFormDataFromObject = (object: FormState): FormData => {
  return (Object.keys(object) as Array<keyof FormState>)
  .reduce((formData, key: keyof FormState)  => {
    if (key === 'images') {
      return addImages(object[key], formData);
    } else {
      formData.append(key, object[key] as File)
    }
    return formData;
  }, new FormData())
};

const addImages = (images: File[], formData: FormData) => {
  images.forEach((img, index) => {
    formData.append(`image${index}`, img);
  })
  return formData
};

export default getFormDataFromObject