import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserUpdateEmailRequestRepository } from "./UserUpdateEmailRequestRepository";

export class UpdateEmailRequest {
    private repository: UserUpdateEmailRequestRepository

    constructor(repository: UserUpdateEmailRequestRepository) {
        this.repository = repository
    }

    async init(id: string, newEmail: string): Promise<void> {
        await this.repository.updateEmailRequest(
            new UserId(id), 
            new UserEmail(newEmail)
        )
    }
}