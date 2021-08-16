import { Post } from "../../domain/Post";
import { GetMyPostsRepository } from "./GetMyPostsRepository";

export class GetMyPosts {
    private repository: GetMyPostsRepository

    constructor(repository: GetMyPostsRepository) {
        this.repository = repository
    }

    async init(): Promise<Array<Post>> {
        return await this.repository.getMyPosts()
    }
}