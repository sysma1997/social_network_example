import { Router } from "express";
import jwt from 'jsonwebtoken'
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UserValidateAccountTypeormRepository } from "./UserValidateAccountTypeormRepository";
import { UserValidateAccount } from "../../application/validateAccount/UserValidateAccount";

export class UserValidateAccountController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.get("/validate/:token", async (req, res) => {
            const token = req.params.token
            const key = process.env.JSONWEBTOKEN_PRIVATE_KEY as string
            
            jwt.verify(token, key, async (error, decoded) => {
                if(error) {
                    res.status(400).send(error.message)
                    return
                }

                const id: string = (<any>decoded).id
                const email: string = (<any>decoded).email

                const context = new Context()
                const connection = await context.get()
                
                const repository = new UserValidateAccountTypeormRepository(connection)
                const validateAccount = new UserValidateAccount(repository)

                try {
                    await validateAccount.init(id, email)
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