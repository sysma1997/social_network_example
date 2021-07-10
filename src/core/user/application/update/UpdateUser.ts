import { User } from "../../domain/User";
import { UserBirthday } from "../../domain/UserBirthday";
import { UserDto } from "../../domain/UserDto";
import { UserEmail } from "../../domain/UserEmail";
import { UserGender } from "../../domain/UserGender";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserUsername } from "../../domain/UserUsername";
import { UserValid } from "../../domain/UserValid";
import { UserUpdateRepository } from "./UserUpdateRepository";

export class UpdateUser {
    private repository: UserUpdateRepository

    constructor(repository: UserUpdateRepository) {
        this.repository = repository
    }

    async init(id: string, 
        name: string, 
        birthday: Date, 
        gender: boolean, 
        username: string): Promise<void> {
        await this.repository.update(
            new UserId(id), 
            new UserName(name), 
            new UserBirthday(birthday), 
            new UserGender(gender), 
            new UserUsername(username)
        )
    }
}