import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";

export interface UserUpdateEmailRequestRepository {
    updateEmailRequest(id: UserId, newEmail: UserEmail): Promise<void>
}