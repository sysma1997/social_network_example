import { UserUpdateImageRepository } from "./UserUpdateImageRepository";

export class UpdateImageUser {
    private repository: UserUpdateImageRepository

    constructor(repository: UserUpdateImageRepository) {
        this.repository = repository
    }

    async init(image: File): Promise<boolean> {
        return await this.repository.updateImage(image)
    }
}