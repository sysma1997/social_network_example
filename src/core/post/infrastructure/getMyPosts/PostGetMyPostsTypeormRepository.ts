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
import { User } from "../../../user/domain/User";
import { UserName } from "../../../user/domain/UserName";
import { UserBirthday } from "../../../user/domain/UserBirthday";
import { UserGender } from "../../../user/domain/UserGender";
import { UserEmail } from "../../../user/domain/UserEmail";
import { UserUsername } from "../../../user/domain/UserUsername";
import { UserPassword } from "../../../user/domain/UserPassword";
import { UserValid } from "../../../user/domain/UserValid";
import { UserImage } from "../../../user/domain/UserImage";

export class PostGetMyPostsTypeormRepository implements PostGetMyPostsRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async myPosts(userId: UserId): Promise<Post[]> {
        const manager = this.connection.manager

        return (await manager.getRepository(PostEntity)
            .createQueryBuilder()
            .innerJoinAndSelect("Post.user", "User")
            .where("userId = :userId", {
                userId: userId.value
            })
            .orderBy("date", "DESC")
            .select([
                "Post",
                "User.name",
                "User.gender",
                "User.email",
                "User.username",
                "User.image"
            ])
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
                new PostImage(post.image),
                new User(
                    new UserId(post.userId),
                    new UserName(post.user!.name),
                    new UserBirthday(new Date()),
                    new UserGender(post.user!.gender),
                    new UserEmail(post.user!.email),
                    new UserUsername(post.user!.username),
                    new UserPassword(""),
                    new UserValid(true),
                    new UserImage(post.user!.image)
                )
            ))
    }
}