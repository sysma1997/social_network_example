import { Http } from "../../../shared/infrastructure/Http";
import { UserRegisterRepository } from "../../application/register/UserRegisterRepository";
import { User } from "../../domain/User";

export class UserRegisterApiRepository implements UserRegisterRepository {
    async register(user: User): Promise<boolean> {
        const json = {
            id: user.id.value,
            name: user.name,
            birthday: user.birthday,
            gender: user.gender,
            email: user.email.value,
            username: user.username,
            password: user.password
        }

        const response = await Http.Init("POST", "user", JSON.stringify(json))
        if (response.status !== 201) {
            throw new Error(response.result)
        }

        return true
    }
}