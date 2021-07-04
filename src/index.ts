import express from 'express'
import { Context } from './core/shared/infrastructure/storage/Context'
import { UserRegisterController } from './core/user/infrastructure/UserRegisterController'
import { UserRegisterTypeormRepository } from './core/user/infrastructure/UserRegisterTypeormRepository'

const app = express()
const context = new Context()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

context.get().then(connection => {
    const userRegisterRepository = new UserRegisterTypeormRepository(connection)
    const userRegisterController = new UserRegisterController(
        express.Router(), userRegisterRepository)

    app.use("/api/user", userRegisterController.router)
})

app.get("/", (req, res) => {
    res.send("success");
})
app.listen(3000, () => {
    console.log("Listen in port: 3000")
})