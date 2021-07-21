import { Connection } from "typeorm";
import { UserId } from "../../../user/domain/UserId";
import { PostGetMyPostsRepository } from "../../application/getMyPosts/PostGetMyPostsRepository";
import { Post } from "../../domain/Post";
import { Post as PostEntity } from "../../../shared/infrastructure/storage/entities/Post"
import { PostId } from "../../domain/PostId";
import { PostTitle } from "../../domain/PostTitle";
import { PostDescription } from "../../domain/PostDescription";
import { PostDate } from "../../domain/PostDate";
import { PostImage } from "../../domain/PostImage";

export class PostGetMyPostsTypeormRepository implements PostGetMyPostsRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }
    
    async myPosts(userId: UserId): Promise<Post[]> {
        const manager = this.connection.manager

        return (await manager.getRepository(PostEntity)
            .createQueryBuilder()
            .where("userId = :userId", {
                userId: userId.value
            })
            .getMany()
            .catch(error => {
                throw new Error(error)
            }))
            .map(post => new Post(
                new PostId(post.id), 
                new UserId(post.userId), 
                new PostTitle(post.title), 
                new PostDescription(post.description), 
                new PostDate(post.date), 
                new PostImage(post.image)
            ))
    }
}