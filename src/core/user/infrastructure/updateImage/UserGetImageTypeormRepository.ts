import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User";
import { Connection } from "typeorm";
import { UserGetImageRepository } from "../../application/updateImage/UserGetImageRepository";
import { UserId } from "../../domain/UserId";
import { UserImage } from "../../domain/UserImage";

export class UserGetImageTypeormRepository implements UserGetImageRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }
    
    async getImage(id: UserId): Promise<UserImage> {
        const manager = this.connection.manager

        const user = await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .where("id = :id AND " + 
                "valid = 1", {
                id: id.value
            })
            .getOne()
            .catch(error => {
                throw new Error(error)
            })
        
        if(user == null) {
            throw new Error("User not found.")
        }

        return new UserImage(user.image)
    }
}