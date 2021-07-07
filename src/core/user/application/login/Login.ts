import { UserPassword } from "../../domain/UserPassword";
import { UserUsername } from "../../domain/UserUsername";
import { UserLoginRepository } from "./UserLoginRepository";

export class Login {
    private repository: UserLoginRepository

    constructor(repository: UserLoginRepository) {
        this.repository = repository
    }

    async init(username: string, password: string): Promise<string> {
        const userUsername = new UserUsername(username)
        const userPassword = new UserPassword(password)

        return await this.repository.login(userUsername, userPassword)
    }
}