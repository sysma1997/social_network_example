import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";

export interface UserUpdateEmailRepository {
    updateEmail(newEmail: UserEmail, id: UserId): Promise<void>
}