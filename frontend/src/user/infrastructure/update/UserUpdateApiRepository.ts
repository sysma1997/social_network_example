import { Http } from "../../../shared/infrastructure/Http";
import { UserUpdateRepository } from "../../application/update/UserUpdateRepository";
import { User } from "../../domain/User";

export class UserUpdateApiRepository implements UserUpdateRepository {
    async update(user: User): Promise<boolean> {
        const json = {
            name: user.name,
            birthday: user.birthday,
            gender: user.gender,
            username: user.username
        }

        const response = await Http.Init("PUT", "user", JSON.stringify(json))
        if (response.status !== 200) {
            throw new Error(response.result)
        }

        return true
    }
}