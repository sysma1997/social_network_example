import { Router } from "express";
import { RegisterUser } from "../application/register/RegisterUser";
import { UserDto } from "../domain/UserDto";
import { UserRegisterRepository } from "../domain/UserRegisterRepository";

export class UserRegisterController {
    readonly router: Router
    private register: RegisterUser

    constructor(router: Router, 
        repository: UserRegisterRepository) {
        this.router = router
        this.register = new RegisterUser(repository)

        this.init()
    }

    private init() {
        this.router.post("/", async (req, res) => {
            const body = req.body

            if ((!body.id || typeof(body.id) !== "string") || 
                (!body.name || typeof(body.name) !== "string") || 
                (!body.birthday || typeof(body.birthday) !== "string") || 
                typeof(body.gender) !== "boolean" || 
                (!body.username || typeof(body.username) !== "string") || 
                (!body.password || typeof(body.password) !== "string")) {
                let message = ""

                if(!body.id) 
                    message += "Id is required.\n"
                else if(typeof(body.id) !== "string") 
                    message += "Id not is string.\n"
                if(!body.name) 
                    message += "Name is required.\n"
                else if(typeof(body.name) !== "string")
                    message += "Name not is string.\n"
                if(!body.birthday) 
                    message += "Birthday is required.\n"
                else if(typeof(body.birthday) !== "string")
                    message += "Birthday not is string.\n"
                if(typeof(body.gender) !== "boolean")
                    message += "Gender not is boolean.\n"
                if(!body.username) 
                    message += "Username is required.\n"
                else if(typeof(body.username) !== "string")
                    message += "Username not is string.\n"
                if(!body.password) 
                    message += "Password is required."
                else if(typeof(body.password) !== "string")
                    message += "Password not is string."

                res.status(400).send(message)
                return
            }

            const id: string = body.id
            const name: string = body.name
            const birthday: Date = new Date(body.birthday)
            const gender: boolean = body.gender
            const username: string = body.username
            const password: string = body.password

            const userDto = new UserDto(
                id, 
                name, 
                birthday, 
                gender, 
                username, 
                password, 
                false
            )

            await this.register.init(userDto)
            res.sendStatus(201)
        })
    }
}