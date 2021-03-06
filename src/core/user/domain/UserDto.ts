export class UserDto {
    readonly id: string

    readonly name: string
    readonly birthday: Date
    readonly gender: boolean
    readonly email: string
    readonly username: string
    readonly password: string
    readonly valid: boolean
    readonly image: string | null

    constructor(id: string,
        name: string,
        birthday: Date,
        gender: boolean,
        email: string, 
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