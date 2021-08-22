import { User } from "../../domain/User";

export interface UserUpdateRepository {
    update(user: User): Promise<boolean>
}