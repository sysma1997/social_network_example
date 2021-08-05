export class User {
    readonly id: string

    readonly name: string
    readonly birthday: Date
    readonly gender: boolean
    readonly email: string
    readonly username: string
    readonly password: string
    readonly valid: boolean
    readonly image: string | null

    constructor(jsonString?: string) {
        if(jsonString != null) {
            const user = JSON.parse(jsonString)
            
            if(user.id) this.id = user.id
            else this.id = ""
            if(user.name) this.name = user.name
            else this.name = "None"
            if(user.birthday) this.birthday = user.birthday
            else this.birthday = new Date()
            if(user.gender) this.gender = user.gender
            else this.gender = false
            if(user.email) this.email = user.email
            else this.email = ""
            if(user.username) this.username = user.username
            else this.username = ""
            if(user.password) this.password = user.password
            else this.password = ""
            if(user.valid) this.valid = user.valid
            else this.valid = false
            if(user.image) this.image = user.image
            else this.image = ""
        }
        else {
            this.id = ""
            this.name = "None"
            this.birthday = new Date()
            this.gender = false
            this.email = ""
            this.username = ""
            this.password = ""
            this.valid = false
            this.image = ""
        }
    }
}