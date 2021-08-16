import { User } from "../../domain/User";

export interface UserGetRepository {
    get(): Promise<User | null>
}