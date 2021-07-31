import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import UserController from "./core/user/infrastructure/UserController"
import PostController from "./core/post/infrastructure/PostController"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static("public"))

app.use("/api/user", UserController)
app.use("/api/post", PostController)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listen in port: ${port}`)
})