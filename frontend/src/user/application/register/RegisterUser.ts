import { User } from "../../domain/User";
import { UserRegisterRepository } from "./UserRegisterRepository";

export class RegisterUser {
    private repository: UserRegisterRepository

    constructor(repository: UserRegisterRepository) {
        this.repository = repository
    }

    async init(user: User): Promise<boolean> {
        return await this.repository.register(user)
    }
}