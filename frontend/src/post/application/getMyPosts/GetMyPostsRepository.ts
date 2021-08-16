import { Post } from "../../domain/Post";

export interface GetMyPostsRepository {
    getMyPosts(): Promise<Array<Post>>
}