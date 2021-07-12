import { Router } from "express";
import fs from "fs"
import jwt from "jsonwebtoken"
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UpdateEmail } from "../../application/updateEmail/UpdateEmail";
import { UserUpdateEmailTypeormRepository } from "./UserUpdateEmailTypeormRepository";

export class UserUpdateEmailController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.get("updateemail/:token", async (req, res) => {
            const token = req.params.token

            const key = fs.readFileSync("./private.key").toString()
            jwt.verify(token, key, async (error, decode) => {
                if(error) {
                    res.status(400).send(error.message)
                    return
                }

                const newEmail = (<any>decode).newEmail
                const id = (<any>decode).id

                const context = new Context()
                const connection = await context.get()

                const repository = new UserUpdateEmailTypeormRepository(connection)
                const updateEmail = new UpdateEmail(repository)

                try {
                    await updateEmail.init(newEmail, id)
                } catch (error: any) {
                    connection.close()
                    res.status(400).send(error.toString())
                    return
                }

                connection.close()
                res.sendStatus(200)
            })
        })
    }
}