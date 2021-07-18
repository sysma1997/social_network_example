import { PostId } from "../../domain/PostId";
import { PostImage } from "../../domain/PostImage";

export interface PostGetImageRepository {
    getImage(id: PostId): Promise<PostImage>
}