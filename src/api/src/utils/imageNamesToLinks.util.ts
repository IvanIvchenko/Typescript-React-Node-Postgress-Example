import setup from '../config/general.config'

const imageNamesToLinks = (data: string[] | string) => {
    if(typeof data === 'string'){
        return `${setup.url}/public/${data}`
    }else{
        return data.map(image => {
            return `${setup.url}/public/${image}`
        })
    }
}

export default imageNamesToLinks