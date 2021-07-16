import { Connection } from "typeorm";
import { UserGetRepository } from "../../application/get/UsetGetRepository";
import { User } from "../../domain/User";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserBirthday } from "../../domain/UserBirthday";
import { UserGender } from "../../domain/UserGender";
import { UserEmail } from "../../domain/UserEmail";
import { UserUsername } from "../../domain/UserUsername";
import { UserPassword } from "../../domain/UserPassword";
import { UserValid } from "../../domain/UserValid";
import { UserImage } from "../../domain/UserImage";

export class UserGetTypeormRepository implements UserGetRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }
    
    async get(id: UserId): Promise<User> {
        const manager = this.connection.manager

        const userEntity = await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .where("id = :id AND " + 
                "valid = 1", {
                id: id.value
            })
            .getOne()
            .catch(error => {
                throw new Error(error)
            })

        if(userEntity == null) {
            throw new Error("User not found.")
        }

        return new User(
            new UserId(userEntity.id), 
            new UserName(userEntity.name), 
            new UserBirthday(userEntity.birthday), 
            new UserGender(userEntity.gender), 
            new UserEmail(userEntity.email), 
            new UserUsername(userEntity.username), 
            new UserPassword(userEntity.password), 
            new UserValid(userEntity.valid), 
            new UserImage(userEntity.image)
        )
    }
}