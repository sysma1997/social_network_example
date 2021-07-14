import { Connection } from "typeorm";
import { UserFindRepository } from "../../application/find/UserFindRepository";
import { User } from "../../domain/User";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserName } from "../../domain/UserName";
import { UserId } from "../../domain/UserId";
import { UserBirthday } from "../../domain/UserBirthday";
import { UserGender } from "../../domain/UserGender";
import { UserEmail } from "../../domain/UserEmail";
import { UserUsername } from "../../domain/UserUsername";
import { UserPassword } from "../../domain/UserPassword";
import { UserValid } from "../../domain/UserValid";

export class UserFindTypeormRepository implements UserFindRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async find(id: UserId, name: UserName): Promise<User[]> {
        const manager = this.connection.manager

        return (await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .where("name LIKE :name AND " + 
                "valid = 1 AND " + 
                "id != :id", {
                name: `%${name.value}%`, 
                id: id.value
            })
            .getMany()
            .catch(error => {
                throw new Error(error)
            }))
            .map(user => new User(
                new UserId(user.id), 
                new UserName(user.name), 
                new UserBirthday(user.birthday), 
                new UserGender(user.gender), 
                new UserEmail(user.email), 
                new UserUsername(user.username), 
                new UserPassword(user.password), 
                new UserValid(user.valid)
            ))
    }
}