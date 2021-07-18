import { PostId } from "../../domain/PostId";

export interface PostRemoveRepository {
    remove(id: PostId): Promise<void>
}