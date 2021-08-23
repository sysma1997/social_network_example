import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UpdateUser } from "../../application/update/UpdateUser";
import { UserUpdateTypeormRepository } from "./UserUpdateTypeormRepository";

export class UserUpdateController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.put("/", async (req, res) => {
            const { name, birthday, gender, username } = req.body

            if ((!name || typeof (name) !== "string") ||
                (!birthday || typeof (birthday) !== "string") ||
                typeof (gender) !== "boolean" ||
                (!username || typeof (username) !== "string")) {
                let message = ""

                if (!name)
                    message += "Name is required.\n"
                else if (typeof (name) !== "string")
                    message += "Name not is string.\n"
                if (!birthday)
                    message += "Birthday is required.\n"
                else if (typeof (birthday) !== "string")
                    message += "Birthday not is string.\n"
                if (typeof (gender) !== "boolean")
                    message += "Gender not is boolean.\n"
                if (!username)
                    message += "Username is required."
                else if (typeof (username) !== "string")
                    message += "Username not is string."

                res.status(400).send(message)
                return
            }

            const context = new Context()
            const connection = await context.get()

            const repository = new UserUpdateTypeormRepository(connection)
            const update = new UpdateUser(repository)

            try {
                await update.init(
                    res.locals.userId,
                    name,
                    new Date(birthday),
                    gender,
                    username
                )
            } catch (error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            connection.close()
            res.sendStatus(200)
        })
    }
}