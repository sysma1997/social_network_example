import { PostId } from "../../domain/PostId";
import { PostGetImageRepository } from "./PostGetImageRepository";

export class GetImage {
    private repository: PostGetImageRepository

    constructor(repository: PostGetImageRepository) {
        this.repository = repository
    }

    async init(id: string): Promise<string | null> {
        const postImage = await this.repository.getImage(
            new PostId(id)
        )
        
        return postImage.value
    }
}