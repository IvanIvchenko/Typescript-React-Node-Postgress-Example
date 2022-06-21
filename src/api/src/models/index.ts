import dbConfig from "../config/db.config"
import {Sequelize} from "sequelize";
import Superhero from './superhero.model'

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as any,
    operatorsAliases: false as any,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.superhero = Superhero(sequelize, Sequelize)

export default db