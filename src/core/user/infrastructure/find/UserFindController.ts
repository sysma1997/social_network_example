import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { FindUser } from "../../application/find/FindUser";
import { UserFindTypeormRepository } from "./UserFindTypeormRepository";

export class UserFindController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.get("/find/:name", async (req, res) => {
            const name = req.params.name

            const context = new Context()
            const connection = await context.get()

            const repository = new UserFindTypeormRepository(connection)
            const find = new FindUser(repository)

            try {
                const users = await find.init(res.locals.userId, name)

                connection.close()
                res.send(users)
            } catch(error: any) {
                connection.close()

                res.status(400).send(error.toString())
            }
        })
    }
}