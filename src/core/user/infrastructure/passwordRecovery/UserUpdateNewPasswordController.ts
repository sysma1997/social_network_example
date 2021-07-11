import { Router } from "express";
import fs from "fs"
import jwt from "jsonwebtoken";
import sha256 from "crypto-js/sha256"
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UpdateNewPassword } from "../../application/passwordRecovery/UpdateNewPassword";
import { UserUpdateNewPasswordTypeormRepository } from "./UserUpdateNewPasswordTypeormRepository";

export class UserUpdateNewPasswordController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.put("/passwordrecovery", async (req, res) => {
            const { token, password } = req.body

            if ((!token || typeof(token) !== "string") || 
                (!password || typeof(password) !== "string")) {
                let message = ""

                if(!token)
                    message += "Token is required.\n"
                else if(typeof(token) !== "string") 
                    message += "Token not is string.\n"
                if(!password) 
                    message += "Password is required.\n"
                else if(typeof(password) !== "string")
                    message += "Password not is string."
                
                res.status(400).send(message)
                return
            }

            const key = fs.readFileSync("./private.key").toString()
            jwt.verify(token, key, async (error, decode) => {
                if(error) {
                    res.status(400).send(error.message)
                    return
                }

                const id: string = (<any>decode).id
                const email: string = (<any>decode).email

                const context = new Context()
                const connection = await context.get()

                const repository = new UserUpdateNewPasswordTypeormRepository(connection)
                const updatePassword = new UpdateNewPassword(repository)

                try {
                    await updatePassword.init(sha256(password).toString(), id, email)
                } catch(error: any) {
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