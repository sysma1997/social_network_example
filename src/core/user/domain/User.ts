import { UserBirthday } from "./UserBirthday";
import { UserDto } from "./UserDto";
import { UserEmail } from "./UserEmail";
import { UserGender } from "./UserGender";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";
import { UserUsername } from "./UserUsername";
import { UserValid } from "./UserValid";

export class User {
    readonly id: UserId

    readonly name: UserName
    readonly birthday: UserBirthday
    readonly gender: UserGender
    readonly email: UserEmail
    readonly username: UserUsername
    readonly password: UserPassword
    readonly valid: UserValid

    constructor(id: UserId,
        name: UserName,
        birthday: UserBirthday,
        gender: UserGender,
        email: UserEmail, 
        username: UserUsername,
        password: UserPassword,
        valid: UserValid) {
        this.id = id
        this.name = name
        this.birthday = birthday
        this.gender = gender
        this.email = email
        this.username = username
        this.password = password
        this.valid = valid
    }

    toDto(): UserDto {
        return new UserDto(
            this.id.value, 
            this.name.value, 
            this.birthday.value, 
            this.gender.value, 
            this.email.value, 
            this.username.value, 
            this.password.value, 
            this.valid.value
        )
    }
}