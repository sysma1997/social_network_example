import { Connection } from "typeorm";
import { PostGetImageRepository } from "../../application/getImage/PostGetImageRepository";
import { Post as PostEntity } from "../../../shared/infrastructure/storage/entities/Post"
import { PostId } from "../../domain/PostId";
import { PostImage } from "../../domain/PostImage";

export class PostGetImageTypeormRepository implements PostGetImageRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }
    
    async getImage(id: PostId): Promise<PostImage> {
        const manager = this.connection.manager

        const post = await manager.getRepository(PostEntity)
            .createQueryBuilder()
            .where("id = :id", {
                id: id.value
            })
            .getOne()
            .catch(error => {
                throw new Error(error)
            })
        
        return new PostImage((post != null) ? post.image : null)
    }
}