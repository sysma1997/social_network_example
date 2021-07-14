import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { GetUser } from "../../application/get/GetUser";
import { UserDto } from "../../domain/UserDto";
import { UserGetTypeormRepository } from "./UserGetTypeorRepository";

export class UserGetController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.get("/", async (req, res) => {
            const context = new Context()
            const connection = await context.get()

            const repository = new UserGetTypeormRepository(connection)
            const get = new GetUser(repository)

            try {
                const user: UserDto = await get.init(res.locals.userId)
                
                connection.close()
                res.send(user)
            } catch(error: any) {
                connection.close()
                res.status(400).send(error.toString())
            }
        })
    }
}