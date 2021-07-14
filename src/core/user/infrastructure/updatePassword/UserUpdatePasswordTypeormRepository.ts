import { Connection } from "typeorm";
import { UserUpdatePasswordRepository } from "../../application/updatePassword/UserUpdatePasswordRepository";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserId } from "../../domain/UserId";
import { UserPassword } from "../../domain/UserPassword";

export class UserUpdatePasswordTypeormRepository implements UserUpdatePasswordRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async updatePassword(id: UserId, 
        currentPassword: UserPassword, 
        newPassword: UserPassword): Promise<void> {
        const manager = this.connection.manager

        await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .update(UserEntity)
            .set({
                password: newPassword.value
            })
            .where("id = :id AND " + 
                "password = :password AND " + 
                "valid = 1", {
                id: id.value, 
                password: currentPassword.value
            })
            .execute()
            .catch(error => {
                throw new Error(error)
            })
    }
}