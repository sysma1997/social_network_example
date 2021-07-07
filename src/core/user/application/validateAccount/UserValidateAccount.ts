import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserValidateAccountRepository } from "./UserValidateAccountRepository";

export class UserValidateAccount {
    private repository: UserValidateAccountRepository

    constructor(repository: UserValidateAccountRepository) {
        this.repository = repository
    }

    async init(id: string, email: string): Promise<void> {
        const userId = new UserId(id)
        const userEmail = new UserEmail(email)

        this.repository.validate(userId, userEmail)
    }
}