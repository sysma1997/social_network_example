import express from 'express'
import { Context } from './core/shared/infrastructure/storage/Context'
import { UserRegisterController } from './core/user/infrastructure/register/UserRegisterController'
import { UserRegisterTypeormRepository } from './core/user/infrastructure/register/UserRegisterTypeormRepository'
import { UserSendMailNodemailerRepository } from './core/user/infrastructure/register/UserSendMailNodemailerRepository'

const app = express()
const context = new Context()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

context.get().then(connection => {
    const userRegisterRepository = new UserRegisterTypeormRepository(connection)
    const userSendMailRepository = new UserSendMailNodemailerRepository()
    const userRegisterController = new UserRegisterController(
        express.Router(), userRegisterRepository, userSendMailRepository)

    app.use("/api/user", userRegisterController.router)
})

app.get("/", (req, res) => {
    res.send("success");
})
app.listen(3000, () => {
    console.log("Listen in port: 3000")
})