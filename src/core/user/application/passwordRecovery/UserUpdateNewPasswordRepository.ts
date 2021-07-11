import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserPassword } from "../../domain/UserPassword";

export interface UserUpdateNewPasswordRepository {
    updateNewPassword(password: UserPassword, id: UserId, email: UserEmail): Promise<void>
}