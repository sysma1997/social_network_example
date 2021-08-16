import { UuidValue } from "../../../shared/domain/UuidValue";

export interface PostPublishRepository {
    publish(id: UuidValue,
        userId: UuidValue,
        title: string,
        description: string,
        date: Date,
        image: File | null): Promise<boolean>
}