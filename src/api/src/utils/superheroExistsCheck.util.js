const db = require("../models/index.js")
const Superhero = db.superhero;

module.exports = async (nickname) => {
    const superhero = await Superhero.findAll({where:{nickname:nickname}})
    return !!superhero.length
}