import { Connection } from "typeorm";
import { UserUpdateNewPasswordRepository } from "../../application/passwordRecovery/UserUpdateNewPasswordRepository";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserPassword } from "../../domain/UserPassword";

export class UserUpdateNewPasswordTypeormRepository implements UserUpdateNewPasswordRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }
    
    async updateNewPassword(password: UserPassword, 
        id: UserId, 
        email: UserEmail): Promise<void> {
        const manager = this.connection.manager

        await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .update(UserEntity)
            .set({
                password: password.value
            })
            .where("id = :id AND " + 
                "email = :email AND " + 
                "valid = 1", {
                id: id.value, 
                email: email.value
            })
            .execute()
            .catch(async error => {
                throw new Error(error)
            })
    }
}