import { UuidValue } from "../../../shared/domain/UuidValue";
import { PostPublishRepository } from "./PostPublishRepository";

export class PublishPost {
    private repository: PostPublishRepository

    constructor(repository: PostPublishRepository) {
        this.repository = repository
    }

    async init(id: UuidValue,
        userId: UuidValue,
        title: string,
        description: string,
        date: Date,
        image: File | null): Promise<boolean> {
        return await this.repository.publish(
            id,
            userId,
            title,
            description,
            date,
            image
        )
    }
}