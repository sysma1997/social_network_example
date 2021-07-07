import { UserPassword } from "../../domain/UserPassword";
import { UserUsername } from "../../domain/UserUsername";

export interface UserLoginRepository {
    login(username: UserUsername,
        password: UserPassword): Promise<string>
}