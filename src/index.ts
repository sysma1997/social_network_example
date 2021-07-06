import express from 'express'
import UserController from './core/user/infrastructure/UserController'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send("success");
})

app.use("/api/user", UserController)

app.listen(3000, () => {
    console.log("Listen in port: 3000")
})