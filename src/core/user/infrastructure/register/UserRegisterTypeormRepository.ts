import { User } from "../../domain/User";
import { User as UserEntity } from '../../../shared/infrastructure/storage/entities/User'
import { Connection } from "typeorm";
import { UserRegisterRepository } from "../../application/register/UserRegisterRepository"

export class UserRegisterTypeormRepository implements UserRegisterRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async register(user: User): Promise<void> {
        const manager = this.connection.manager
        
        const userEntity = new UserEntity(
            user.id.value, 
            user.name.value, 
            user.birthday.value, 
            user.gender.value, 
            user.email.value, 
            user.username.value, 
            user.password.value, 
            user.valid.value
        )

        await manager.save<UserEntity>(userEntity)
        await this.connection.close()
    }
}