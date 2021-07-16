import express from 'express'
import UserController from './core/user/infrastructure/UserController'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("SYSMA Social Network API v1.0.0")
})

app.use("/api/user", UserController)

app.listen(3000, () => {
    console.log("Listen in port: 3000")
})