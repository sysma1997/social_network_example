import { User } from "../../domain/User";
import { UserDto } from "../../domain/UserDto";
import { UserId } from "../../domain/UserId";
import { UserGetRepository } from "./UsetGetRepository";

export class GetUser {
    private repository: UserGetRepository

    constructor(repository: UserGetRepository) {
        this.repository = repository
    }

    async init(id: string): Promise<UserDto> {
        const user: User = await this.repository.get(
            new UserId(id)
        )

        return user.toDto()
    }
}