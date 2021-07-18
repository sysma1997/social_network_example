import { UserDto } from "../../user/domain/UserDto"

export class PostDto {
    readonly id: string
    readonly userId: string

    readonly title: string
    readonly description: string
    readonly date: Date
    readonly image: string | null

    readonly user?: UserDto

    constructor(id: string, 
        userId: string, 
        title: string, 
        description: string, 
        date: Date, 
        image: string | null, 
        user?: UserDto) {
        this.id = id
        this.userId = userId

        this.title = title
        this.description = description
        this.date = date
        this.image = image
        
        this.user = user
    }
}