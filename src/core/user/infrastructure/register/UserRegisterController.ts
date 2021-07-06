import { Router } from "express";
import { RegisterUser } from "../../application/register/RegisterUser";
import { UserDto } from "../../domain/UserDto";
import { UserRegisterRepository } from "../../application/register/UserRegisterRepository";
import { UserSendMailRepository } from "../../application/register/UserSendMailRepository";
import { EmailValue } from "../../../shared/domain/EmailValue";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UserRegisterTypeormRepository } from "./UserRegisterTypeormRepository";
import { UserSendMailNodemailerRepository } from "./UserSendMailNodemailerRepository";

export class UserRegisterController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.post("/", async (req, res) => {
            const body = req.body

            if ((!body.id || typeof(body.id) !== "string") || 
                (!body.name || typeof(body.name) !== "string") || 
                (!body.birthday || typeof(body.birthday) !== "string") || 
                typeof(body.gender) !== "boolean" || 
                (!body.email || typeof(body.email) !== "string") || 
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
                if(!body.email) 
                    message += "Email is required.\n"
                else if(typeof(body.email) !== "string")
                    message += "Email not is string.\n"
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
            if(!EmailValue.Validate(body.email)) {
                res.status(400).send(`'${body.email}' not is email valid.`)
                return
            }

            const id: string = body.id
            const name: string = body.name
            const birthday: Date = new Date(body.birthday)
            const gender: boolean = body.gender
            const email: string = body.email
            const username: string = body.username
            const password: string = body.password

            const userDto = new UserDto(
                id, 
                name, 
                birthday, 
                gender, 
                email, 
                username, 
                password, 
                false
            )

            const context = new Context()
            const connection = await context.get()

            const storageRepository = new UserRegisterTypeormRepository(connection)
            const sendMailRepository = new UserSendMailNodemailerRepository()
            const register = new RegisterUser(storageRepository, sendMailRepository)

            try {
                await register.init(userDto)
            } catch(error: any) {
                res.status(400).send(error.toString())
                return
            }

            res.sendStatus(201)
        })
    }
}