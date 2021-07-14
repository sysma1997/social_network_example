import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserUpdateEmailRepository } from "./UserUpdateEmailRepository";

export class UpdateEmail {
    private repository: UserUpdateEmailRepository

    constructor(repository: UserUpdateEmailRepository) {
        this.repository = repository
    }

    async init(id: string, newEmail: string): Promise<void> {
        await this.repository.updateEmail(
            new UserId(id), 
            new UserEmail(newEmail)
        )
    }
}