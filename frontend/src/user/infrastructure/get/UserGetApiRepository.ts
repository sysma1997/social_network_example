import dayjs from "dayjs"

import { EmailValue } from "../../../shared/domain/EmailValue";
import { UuidValue } from "../../../shared/domain/UuidValue";
import { Http } from "../../../shared/infrastructure/Http";
import { UserGetRepository } from "../../application/get/UserGetRepository";
import { User } from "../../domain/User";

export class UserGetApiRepository implements UserGetRepository {
    async get(): Promise<User | null> {
        const response = await Http.Init("GET", "user", null)
        if (response.status !== 200) return null

        const json = JSON.parse(response.result)
        return new User(
            new UuidValue(json.id),
            json.name,
            dayjs(json.birthday, "YYYY-MM-DD").toDate(),
            json.gender,
            new EmailValue(json.email),
            json.username,
            "",
            json.valid,
            (json.image) ? json.image : null
        )
    }
}