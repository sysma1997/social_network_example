import { UserEmail } from "../../domain/UserEmail";

export interface UserPasswordRecoveryRepository {
    passwordRecovery(email: UserEmail): Promise<void>
}