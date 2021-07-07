import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { Login } from "../../application/login/Login";
import { UserLoginTypeormRepository } from "./UserLoginTypeormRepository";

export class UserLoginController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.post("/login", async (req, res) => {
            const { username, password } = req.body

            if ((!username || typeof(username) !== "string") || 
                (!password || typeof(password) !== "string")){
                let message = ""

                if(!username) 
                    message += "Username is required.\n"
                else if(typeof(username) !== "string")
                    message += "Username not is string.\n"
                if(!password)
                    message += "Password is required."
                else if(typeof(password) !== "string")
                    message += "Password not is string."

                res.status(400).send(message)
                return
            }

            const context = new Context()
            const connection = await context.get()

            const repository = new UserLoginTypeormRepository(connection)
            const login = new Login(repository)

            let token = ""
            try {
                token = await login.init(username, password)
            } catch(error: any) {
                res.status(400).send(error.toString())
                return
            }

            res.send(token)
        })
    }
}