import express from 'express'
import { Context } from './core/shared/infrastructure/storage/Context'
import UserController from './core/user/infrastructure/UserController'

const app = express()
const context = new Context()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send("success");
})

app.use("/api/user", UserController)

app.listen(3000, () => {
    console.log("Listen in port: 3000")
})