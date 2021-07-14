import { UserId } from "../../domain/UserId";
import { UserPassword } from "../../domain/UserPassword";
import { UserUpdatePasswordRepository } from "./UserUpdatePasswordRepository";

export class UpdatePassword {
    private repository: UserUpdatePasswordRepository

    constructor(repository: UserUpdatePasswordRepository) {
        this.repository = repository
    }

    public async init(id: string, 
        currentPassword: string, 
        newPassword: string): Promise<void> {
        await this.repository.updatePassword(
            new UserId(id), 
            new UserPassword(currentPassword), 
            new UserPassword(newPassword)
        )
    }
}