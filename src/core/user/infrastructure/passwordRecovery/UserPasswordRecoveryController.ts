import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { PasswordRecovery } from "../../application/passwordRecovery/PasswordRecovery";
import { UserPasswordRecoveryNodemailerRepository } from "./UserPasswordRecoveryNodemailerRepository";

export class UserPasswordRecoveryController {
    private router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.get("/passwordrecovery/:email", async (req, res) => {
            const email = req.params.email
            
            const context = new Context()
            const connection = await context.get()

            const repository = new UserPasswordRecoveryNodemailerRepository(connection)
            const passwordRepository = new PasswordRecovery(repository)

            try {
                await passwordRepository.init(email)
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