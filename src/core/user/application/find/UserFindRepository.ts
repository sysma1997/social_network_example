import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";

export interface UserFindRepository {
    find(id: UserId, name: UserName): Promise<Array<User>>
}