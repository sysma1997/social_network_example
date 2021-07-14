import { Router } from "express";
import sha256 from "crypto-js/sha256"
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UserUpdatePasswordTypeormRepository } from "./UserUpdatePasswordTypeormRepository";
import { UpdatePassword } from "../../application/updatePassword/UpdatePassword";

export class UserUpdatePasswordController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.put("/updatepassword", async (req, res) => {
            let { currentPassword, newPassword } = req.body

            if ((!currentPassword || typeof(currentPassword) !== "string") || 
                (!newPassword || typeof(newPassword) !== "string")) {
                let message = ""

                if(!currentPassword)
                    message += "Current password is required.\n"
                else if(typeof(currentPassword) !== "string")
                    message += "Current password not is string.\n"
                if(!newPassword)
                    message += "New password is required."
                else if(typeof(newPassword) !== "string")
                    message += "New password not is string."
                
                res.status(400).send(message)
                return 
            }

            currentPassword = sha256(currentPassword).toString()
            newPassword = sha256(newPassword).toString()

            const context = new Context()
            const connection = await context.get()

            const repository = new UserUpdatePasswordTypeormRepository(connection)
            const updatePassword = new UpdatePassword(repository)

            try {
                await updatePassword.init(res.locals.userId, 
                    currentPassword, 
                    newPassword)
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