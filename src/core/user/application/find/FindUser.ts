import { UserDto } from "../../domain/UserDto";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserFindRepository } from "./UserFindRepository";

export class FindUser {
    private repository: UserFindRepository

    constructor(repository: UserFindRepository) {
        this.repository = repository
    }

    async init(id: string, name: string): Promise<Array<UserDto>> {
        return (await this.repository.find(
            new UserId(id), 
            new UserName(name)
        )).map(user => {
            return user.toDto()
        })
    }
}