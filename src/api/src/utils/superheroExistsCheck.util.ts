import db from "../models/index"
const Superhero = db.superhero;

const superheroExistsCheck = async (nickname: string) => {
    const superhero = await Superhero.findAll({where:{nickname:nickname}})
    return !!superhero.length
}

export default superheroExistsCheck