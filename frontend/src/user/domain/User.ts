import { EmailValue } from "../../shared/domain/EmailValue"
import { UuidValue } from "../../shared/domain/UuidValue"

export class User {
    readonly id: UuidValue

    readonly name: string
    readonly birthday: Date
    readonly gender: boolean
    readonly email: EmailValue
    readonly username: string
    readonly password: string
    readonly valid: boolean
    readonly image: string | null

    constructor(id: UuidValue,
        name: string,
        birthday: Date,
        gender: boolean,
        email: EmailValue,
        username: string,
        password: string,
        valid: boolean,
        image: string | null) {
        this.id = id
        this.name = name
        this.birthday = birthday
        this.gender = gender
        this.email = email
        this.username = username
        this.password = password
        this.valid = valid
        this.image = image
    }
}