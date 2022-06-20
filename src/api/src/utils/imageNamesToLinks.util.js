const setup = require('../config/general.config.js')

module.exports = (data) => {
    if(Object.prototype.toString.call(data) === "[object String]"){
        return `${setup.url}/public/${data}`
    }else{
        return data.map(image => {
            return `${setup.url}/public/${image}`
        })
    }
}