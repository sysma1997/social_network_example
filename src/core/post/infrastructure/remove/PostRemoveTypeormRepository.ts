import { Connection } from "typeorm";
import { PostRemoveRepository } from "../../application/remove/PostRemoveRepository";
import { Post as PostEntity } from "../../../shared/infrastructure/storage/entities/Post"
import { PostId } from "../../domain/PostId";

export class PostRemoveTypeormRepository implements PostRemoveRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async remove(id: PostId): Promise<void> {
        const manager = this.connection.manager

        await manager.getRepository(PostEntity)
            .createQueryBuilder()
            .delete()
            .from(PostEntity)
            .where("id = :id", {
                id: id.value
            })
            .execute()
            .catch(error => {
                throw new Error(error)
            })
    }
}