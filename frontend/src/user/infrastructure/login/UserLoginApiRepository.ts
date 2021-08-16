import { Http } from "../../../shared/infrastructure/Http";
import { UserLoginRepository } from "../../application/login/UserLoginRepository";

export class UserLoginApiRepository implements UserLoginRepository {
    async login(username: string, password: string): Promise<boolean> {
        const params = {
            username,
            password
        }
        const response = await Http.Init("POST", "user/login", JSON.stringify(params))
        if (response.status !== 200) return false

        localStorage.setItem("token", response.result)
        return true
    }
}