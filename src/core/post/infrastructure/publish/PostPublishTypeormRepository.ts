import { Connection } from "typeorm";
import { PostPublishRepository } from "../../application/publish/PostPublishRepository";
import { Post } from "../../domain/Post";
import { Post as PostEntity } from "../../../shared/infrastructure/storage/entities/Post"

export class PostPublishTypeormRepository implements PostPublishRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async publish(post: Post): Promise<void> {
        const manager = this.connection.manager

        const postEntity = new PostEntity(
            post.id.value, 
            post.userId.value, 
            post.title.value, 
            post.description.value, 
            post.date.value, 
            post.image.value
        )

        await manager.save<PostEntity>(postEntity)
            .catch(error => {
                throw new Error(error)
            })
    }
}