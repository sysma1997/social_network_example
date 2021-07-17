import { User } from "../../user/domain/User";
import { UserId } from "../../user/domain/UserId";
import { PostDate } from "./PostDate";
import { PostDescription } from "./PostDescription";
import { PostDto } from "./PostDto";
import { PostId } from "./PostId";
import { PostImage } from "./PostImage";
import { PostTitle } from "./PostTitle";

export class Post {
    readonly id: PostId
    readonly userId: UserId

    readonly title: PostTitle
    readonly description: PostDescription
    readonly date: PostDate
    readonly image: PostImage

    readonly user?: User

    constructor(id: PostId, 
        userId: UserId, 
        title: PostTitle, 
        description: PostDescription, 
        date: PostDate, 
        image: PostImage, 
        user?: User) {
        this.id = id
        this.userId = userId
        this.title = title
        this.description = description
        this.date = date
        this.image = image
        
        this.user = user
    }

    toDto(): PostDto {
        return new PostDto(
            this.id.value, 
            this.userId.value, 
            this.title.value, 
            this.description.value, 
            this.date.value, 
            this.image?.value, 
            this.user?.toDto()
        )
    }
}