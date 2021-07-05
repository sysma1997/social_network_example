import { User } from "../../domain/User";
import { UserBirthday } from "../../domain/UserBirthday";
import { UserDto } from "../../domain/UserDto";
import { UserGender } from "../../domain/UserGender";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRegisterRepository } from "./UserRegisterRepository";
import { UserUsername } from "../../domain/UserUsername";
import { UserValid } from "../../domain/UserValid";
import { UserSendMailRepository } from "./UserSendMailRepository";
import { UserEmail } from "../../domain/UserEmail";

export class RegisterUser {
    private repository: UserRegisterRepository
    private sendMailRepository: UserSendMailRepository

    constructor(repository: UserRegisterRepository, 
        sendMailRepository: UserSendMailRepository) {
        this.repository = repository
        this.sendMailRepository = sendMailRepository
    }

    async init(userDto: UserDto): Promise<void> {
        const user = new User(
            new UserId(userDto.id), 
            new UserName(userDto.name), 
            new UserBirthday(userDto.birthday), 
            new UserGender(userDto.gender), 
            new UserEmail(userDto.email), 
            new UserUsername(userDto.username), 
            new UserPassword(userDto.password), 
            new UserValid(userDto.valid)
        )

        await this.repository.register(user)
        this.sendMailRepository.sendMail(user)
    }
}