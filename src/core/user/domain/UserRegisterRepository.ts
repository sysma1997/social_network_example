import { User } from "./User";

export interface UserRegisterRepository {
    register(user: User): Promise<void>
}