import express from 'express'
import cors from 'cors'
import superheroesRoute from './src/routes/superheroes.route'
import db from "./src/models"

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(function (req, res, next) {
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    next()
})

//db.sequelize.sync();
//db.sequelize.sync({ force: true })

app.use("/public", express.static(__dirname + "/static/images"));

app.use("/superheroes", superheroesRoute);

app.listen(5000, async () => {
    //await db.sequelize.sync()
    await db.sequelize.sync({ force: true })
    console.log("Express server started at localhost:5000")
});