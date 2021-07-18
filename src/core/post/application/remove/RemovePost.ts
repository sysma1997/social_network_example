import { PostId } from "../../domain/PostId";
import { PostRemoveRepository } from "./PostRemoveRepository";

export class RemovePost {
    private repository: PostRemoveRepository

    constructor(repository: PostRemoveRepository) {
        this.repository = repository
    }

    async init(id: string): Promise<void> {
        await this.repository.remove(
            new PostId(id)
        )
    }
}