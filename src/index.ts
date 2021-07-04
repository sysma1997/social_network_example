import express from 'express'

import { Context } from './core/shared/infrastructure/storage/Context'
import { User } from './core/shared/infrastructure/storage/entities/User'

const app = express()
const context = new Context()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send("success");
})

app.listen(3000, () => {
    console.log("Listen in port: 3000")
})