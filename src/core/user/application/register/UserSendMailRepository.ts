import { User } from "../../domain/User";

export interface UserSendMailRepository {
    sendMail(user: User): Promise<void>
}