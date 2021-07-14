import { UserId } from "../../domain/UserId";
import { UserPassword } from "../../domain/UserPassword";

export interface UserUpdatePasswordRepository {
    updatePassword(id: UserId, 
        currentPassword: UserPassword, 
        newPassword: UserPassword): Promise<void>
}