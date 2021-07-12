import { Connection } from "typeorm";
import { UserUpdateEmailRepository } from "../../application/updateEmail/UserUpdateEmailRepository";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";

export class UserUpdateEmailTypeormRepository implements UserUpdateEmailRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }
    
    async updateEmail(newEmail: UserEmail, id: UserId): Promise<void> {
        const manager = this.connection.manager

        await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .update(UserEntity)
            .set({
                email: newEmail.value
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