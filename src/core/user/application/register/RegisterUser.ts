import { User } from "../../domain/User";
import { UserBirthday } from "../../domain/UserBirthday";
import { UserDto } from "../../domain/UserDto";
import { UserGender } from "../../domain/UserGender";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRegisterRepository } from "../../domain/UserRegisterRepository";
import { UserUsername } from "../../domain/UserUsername";
import { UserValid } from "../../domain/UserValid";

export class RegisterUser {
    private repository: UserRegisterRepository

    constructor(repository: UserRegisterRepository) {
        this.repository = repository
    }

    private validate(user: UserDto): boolean {
        let valid = true

        if(user.name != "") 
            valid = false
        if(user.username != "")
            valid = false
        if(user.password != "")
            valid = false

        return valid
    }

    async init(userDto: UserDto): Promise<void> {
        if(!this.validate(userDto)) {
            throw new Error("RegisterUser: Error -> user not valid")
        }

        const user = new User(
            new UserId(userDto.id), 
            new UserName(userDto.name), 
            new UserBirthday(userDto.birthday), 
            new UserGender(userDto.gender), 
            new UserUsername(userDto.username), 
            new UserPassword(userDto.password), 
            new UserValid(userDto.valid)
        )
        await this.repository.register(user)
    }
}