import { UserId } from "../../domain/UserId";
import { UserGetImageRepository } from "./UserGetImageRepository";

export class GetImage {
    private repository: UserGetImageRepository

    constructor(repository: UserGetImageRepository) {
        this.repository = repository
    }

    public async init(id: string): Promise<string | null> {
        return (await this.repository.getImage(
            new UserId(id)
        )).value
    }
}