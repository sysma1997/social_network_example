import { Connection } from "typeorm";
import { UserUpdateRepository } from "../../application/update/UserUpdateRepository";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserName } from "../../domain/UserName";
import { UserBirthday } from "../../domain/UserBirthday";
import { UserGender } from "../../domain/UserGender";
import { UserUsername } from "../../domain/UserUsername";
import { UserId } from "../../domain/UserId";

export class UserUpdateTypeormRepository implements UserUpdateRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async update(id: UserId, 
        name: UserName, 
        birthday: UserBirthday, 
        gender: UserGender, 
        username: UserUsername): Promise<void> {
        const manager = this.connection.manager

        await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .update(UserEntity)
            .set({
                name: name.value, 
                birthday: birthday.value, 
                gender: gender.value, 
                username: username.value
            })
            .where("id = :id", {
                id: id.value
            })
            .execute()
            .catch(async error => {
                await this.connection.close()
                throw new Error(error)
            })
        await this.connection.close()
    }
}