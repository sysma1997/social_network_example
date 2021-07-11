import { UserEmail } from "../../domain/UserEmail";
import { UserPasswordRecoveryRepository } from "./UserPasswordRecoveryRepository";

export class PasswordRecovery {
    private repository: UserPasswordRecoveryRepository

    constructor(repository: UserPasswordRecoveryRepository) {
        this.repository = repository
    }

    async init(email: string): Promise<void> {
        await this.repository.passwordRecovery(new UserEmail(email))
    }
}