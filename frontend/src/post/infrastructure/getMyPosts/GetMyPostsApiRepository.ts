import { EmailValue } from "../../../shared/domain/EmailValue";
import { UuidValue } from "../../../shared/domain/UuidValue";
import { Http } from "../../../shared/infrastructure/Http";
import { User } from "../../../user/domain/User";
import { GetMyPostsRepository } from "../../application/getMyPosts/GetMyPostsRepository";
import { Post } from "../../domain/Post";

export class GetMyPostsApiRepository implements GetMyPostsRepository {
    async getMyPosts(): Promise<Post[]> {
        const posts = new Array<Post>()

        const response = await Http.Init("GET", "post/myposts", null)
        if (response.status !== 200) {
            throw new Error(response.result)
        }

        const array = JSON.parse(response.result)
        array.map((item: any) => posts.push(new Post(
            new UuidValue(item.id),
            new UuidValue(item.userId),
            item.title,
            item.description,
            new Date(item.date),
            item.image,
            new User(
                new UuidValue(item.userId),
                item.user.name,
                new Date(),
                false,
                new EmailValue(item.user.email),
                item.user.username,
                "",
                true,
                (item.user.image) ? item.user.image : null
            )
        )))

        return posts
    }
}