import { Connection } from "typeorm";
import { UserUpdateImageRepository } from "../../application/updateImage/UserUpdateImageRepository";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserId } from "../../domain/UserId";
import { UserImage } from "../../domain/UserImage";

export class UserUpdateImageTypeormRepository implements UserUpdateImageRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }
    
    async updateImage(id: UserId, image: UserImage): Promise<void> {
        const manager = this.connection.manager

        await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .update(UserEntity)
            .set({
                image: image?.value
            })
            .where("id = :id AND " + 
                "valid = 1", {
                id: id.value
            })
            .execute()
            .catch(error => {
                throw new Error(error)
            })
    }
}