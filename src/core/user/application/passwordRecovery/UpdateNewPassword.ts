import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserPassword } from "../../domain/UserPassword";
import { UserUpdateNewPasswordRepository } from "./UserUpdateNewPasswordRepository";

export class UpdateNewPassword {
    private repository: UserUpdateNewPasswordRepository

    constructor(repository: UserUpdateNewPasswordRepository) {
        this.repository = repository
    }

    async init(password: string, id: string, email: string): Promise<void> {
        this.repository.updateNewPassword(
            new UserPassword(password), 
            new UserId(id), 
            new UserEmail(email)
        )
    }
}