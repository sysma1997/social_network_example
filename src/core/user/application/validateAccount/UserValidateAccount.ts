import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserValidateAccountRepository } from "./UserValidateAccountRepository";

export class UserValidateAccount {
    private repository: UserValidateAccountRepository

    constructor(repository: UserValidateAccountRepository) {
        this.repository = repository
    }

    async init(id: UserId, email: UserEmail): Promise<void> {
        this.repository.validate(id, email)
    }
}