import { UserId } from "../../domain/UserId";
import { UserImage } from "../../domain/UserImage";

export interface UserGetImageRepository {
    getImage(id: UserId): Promise<UserImage>
}