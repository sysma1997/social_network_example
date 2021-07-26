import express from "express"
import UserController from "./core/user/infrastructure/UserController"
import PostController from "./core/post/infrastructure/PostController"

import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static("public"))

app.use("/api/user", UserController)
app.use("/api/post", PostController)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listen in port: ${port}`)
})