import { Post } from "../../domain/Post";

export interface PostPublishRepository {
    publish(post: Post): Promise<void>
}