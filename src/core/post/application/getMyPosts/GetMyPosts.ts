import { UserId } from "../../../user/domain/UserId";
import { PostDto } from "../../domain/PostDto";
import { PostGetMyPostsRepository } from "./PostGetMyPostsRepository";

export class GetMyPosts {
    private repository: PostGetMyPostsRepository

    constructor(repository: PostGetMyPostsRepository) {
        this.repository = repository
    }

    async init(userId: string): Promise<Array<PostDto>> {
        return (await this.repository.myPosts(
            new UserId(userId)
        )).map(post => post.toDto())
    }
}