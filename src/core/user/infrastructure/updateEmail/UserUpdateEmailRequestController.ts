import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UpdateEmailRequest } from "../../application/updateEmail/UpdateEmailRequest";
import { UserUpdateEmailRequestNodemailerRepository } from "./UserUpdateEmailRequestNodemailerRepository";

export class UserUpdateEmailRequestController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.put("/updateemail", async (req, res) => {
            const { newEmail } = req.body

            if (!newEmail || typeof(newEmail) !== "string") {
                let message = ""

                if(!newEmail) 
                    message += "New email is required.\n"
                else if(typeof(newEmail) !== "string")
                    message += "New email not is string.\n"
                
                res.status(400).send(message)
                return
            }

            const context = new Context()
            const connection = await context.get()

            const repository = new UserUpdateEmailRequestNodemailerRepository(connection)
            const updateEmailRequest = new UpdateEmailRequest(repository)

            try {
                await updateEmailRequest.init(
                    res.locals.userId, 
                    newEmail
                )
            } catch(error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            connection.close()
            res.sendStatus(200)
        })
    }
}