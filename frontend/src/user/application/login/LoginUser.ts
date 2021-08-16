import { UserLoginRepository } from "./UserLoginRepository";

export class LoginUser {
    private repository: UserLoginRepository

    constructor(repository: UserLoginRepository) {
        this.repository = repository
    }

    async init(username: string, password: string): Promise<boolean> {
        return await this.repository.login(username, password)
    }
}