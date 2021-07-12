import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserUpdateEmailRepository } from "./UserUpdateEmailRepository";

export class UpdateEmail {
    private repository: UserUpdateEmailRepository

    constructor(repository: UserUpdateEmailRepository) {
        this.repository = repository
    }

    async init(newEmail: string, id: string): Promise<void> {
        await this.repository.updateEmail(
            new UserEmail(newEmail), 
            new UserId(id)
        )
    }
}