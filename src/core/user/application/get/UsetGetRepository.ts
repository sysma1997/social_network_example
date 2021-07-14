import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";

export interface UserGetRepository {
    get(id: UserId): Promise<User>
}