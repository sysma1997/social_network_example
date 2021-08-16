import { User } from "../../domain/User";
import { UserGetRepository } from "./UserGetRepository";

export class GetUser {
    private repository: UserGetRepository

    constructor(repository: UserGetRepository) {
        this.repository = repository
    }

    async init(): Promise<User | null> {
        return await this.repository.get()
    }
}