import express from 'express'

import { Context } from './core/shared/infrastructure/storage/Context'
import { User } from './core/shared/infrastructure/storage/entities/User'

const app = express()
const context = new Context()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/', async (req, res) => {
    if (req.body.id == null ||
        req.body.name == null ||
        req.body.birthday == null ||
        req.body.gender == null ||
        req.body.username == null ||
        req.body.password == null) {
        let message = ""
        if (req.body.id == null)
            message += "Id is required.\n"
        if (req.body.name == null)
            message += "Name is required.\n"
        if (req.body.birthday == null)
            message += "Birthday is required.\n"
        if (req.body.gender == null)
            message += "Gender is required.\n"
        if (req.body.username == null)
            message += "Username is required.\n"
        if (req.body.password == null)
            message += "Password is required."

        res.status(400).send(message)
        return
    }

    const user = new User(
        req.body.id,
        req.body.name,
        req.body.birthday,
        req.body.gender,
        req.body.username,
        req.body.password
    )

    const connection = await context.get()
    await connection.manager.save(user)
    connection.close()

    res.sendStatus(201)
})
app.get('/', (req, res) => {
    res.send("success");
})

app.listen(3000, () => {
    console.log("Listen in port: 3000")
})