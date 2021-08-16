import { User } from "../../domain/User";

export interface UserRegisterRepository {
    register(user: User): Promise<boolean>
}