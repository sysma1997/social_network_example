import { UserId } from "../../domain/UserId";
import { UserImage } from "../../domain/UserImage";
import { UserUpdateImageRepository } from "./UserUpdateImageRepository";

export class UpdateImage {
    private repository: UserUpdateImageRepository

    constructor(repository: UserUpdateImageRepository) {
        this.repository = repository
    }

    public async init(id: string, image: string): Promise<void> {
        await this.repository.updateImage(
            new UserId(id), 
            new UserImage(image)
        )
    }
}