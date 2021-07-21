import { UserId } from "../../../user/domain/UserId";
import { Post } from "../../domain/Post";

export interface PostGetMyPostsRepository {
    myPosts(userId: UserId): Promise<Array<Post>>
}