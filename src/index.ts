import express from "express"
import UserController from "./core/user/infrastructure/UserController"
import PostController from "./core/post/infrastructure/PostController"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static("public"))

app.use("/api/user", UserController)
app.use("/api/post", PostController)

app.listen(8000, () => {
    console.log("Listen in port: 8000")
})