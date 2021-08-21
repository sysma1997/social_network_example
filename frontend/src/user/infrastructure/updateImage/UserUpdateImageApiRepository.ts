import { Http } from "../../../shared/infrastructure/Http";
import { UserUpdateImageRepository } from "../../application/updateImage/UserUpdateImageRepository";

export class UserUpdateImageApiRepository implements UserUpdateImageRepository {
    async updateImage(image: File): Promise<boolean> {
        const params = new FormData()
        params.append("image", image)

        const response = await Http.Init("PUT", "user/updateimage", params)
        if (response.status !== 200) {
            throw new Error(response.result)
        }

        return true
    }
}