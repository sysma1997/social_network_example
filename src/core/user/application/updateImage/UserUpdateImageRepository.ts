import { UserId } from "../../domain/UserId";
import { UserImage } from "../../domain/UserImage";

export interface UserUpdateImageRepository {
    updateImage(id: UserId, image: UserImage): Promise<void>
}