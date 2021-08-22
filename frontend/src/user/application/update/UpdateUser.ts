import { User } from "../../domain/User";
import { UserUpdateRepository } from "./UserUpdateRepository";

export class UpdateUser {
    private repository: UserUpdateRepository

    constructor(repository: UserUpdateRepository) {
        this.repository = repository
    }

    async init(user: User): Promise<boolean> {
        return await this.repository.update(user)
    }
}