import { UuidValue } from "../../shared/domain/UuidValue"
import { User } from "../../user/domain/User"

export class Post {
    readonly id: UuidValue
    readonly userId: UuidValue

    readonly title: string
    readonly description: string
    readonly date: Date
    readonly image: string | null

    readonly user: User

    constructor(id: UuidValue,
        userId: UuidValue,
        title: string,
        description: string,
        date: Date,
        image: string | null,
        user: User) {
        this.id = id
        this.userId = userId
        this.title = title
        this.description = description
        this.date = date
        this.image = image
        this.user = user
    }
}