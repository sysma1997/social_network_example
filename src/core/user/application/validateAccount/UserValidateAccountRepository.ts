import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";

export interface UserValidateAccountRepository {
    validate(id: UserId, email: UserEmail): Promise<void>
}