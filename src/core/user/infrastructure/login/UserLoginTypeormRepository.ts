import { Connection } from "typeorm";
import { UserLoginRepository } from "../../application/login/UserLoginRepository";
import { UserPassword } from "../../domain/UserPassword";
import { UserUsername } from "../../domain/UserUsername";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import fs from 'fs'
import jwt from 'jsonwebtoken'

export class UserLoginTypeormRepository implements UserLoginRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async login(username: UserUsername, password: UserPassword): Promise<string> {
        const manager = this.connection.manager

        const user = await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .where("username = :username AND " + 
                "password = :password AND " + 
                "valid = 1", {
                username: username.value, 
                password: password.value
            })
            .getOne()
        if(user == null) {
            throw new Error("Username or password invalid.")
        }

        const key = fs.readFileSync("./private.key").toString()
        const token = jwt.sign({
            id: user.id
        }, key, {
            expiresIn: "5d"
        })

        return token
    }
}