import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";

export interface UserUpdateEmailRepository {
    updateEmail(id: UserId, newEmail: UserEmail): Promise<void>
}