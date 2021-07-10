import { Connection } from "typeorm";
import { UserValidateAccountRepository } from "../../application/validateAccount/UserValidateAccountRepository";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";

export class UserValidateAccountTypeormRepository implements UserValidateAccountRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async validate(id: UserId, email: UserEmail): Promise<void> {
        const manager = this.connection.manager

        await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .update(UserEntity)
            .set({
                valid: true
            })
            .where("id = :id AND email = :email", {
                id: id.value, 
                email: email.value
            })
            .execute()
            .catch(async error => {
                await this.connection.close()
                throw new Error(error)
            })
        await this.connection.close()
    }    
}