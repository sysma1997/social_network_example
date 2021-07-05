import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";

export interface UserSendMailRepository {
    sendMail(id: UserId, email: UserEmail): Promise<void>
}