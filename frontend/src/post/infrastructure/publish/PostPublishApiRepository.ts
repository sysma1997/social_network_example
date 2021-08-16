import { UuidValue } from "../../../shared/domain/UuidValue";
import { Http } from "../../../shared/infrastructure/Http";
import { PostPublishRepository } from "../../application/publish/PostPublishRepository";

export class PostPublishApiRepository implements PostPublishRepository {
    async publish(id: UuidValue,
        userId: UuidValue,
        title: string,
        description: string,
        date: Date,
        image: File | null): Promise<boolean> {
        const params = new FormData()
        params.append("id", id.value)
        params.append("userId", userId.value)
        params.append("title", title)
        params.append("description", description)
        params.append("date", date.toString())
        if (image)
            params.append("image", image)

        const response = await Http.Init("POST", "post", params)
        if (response.status !== 201) {
            throw new Error(response.result)
        }

        return true
    }
}