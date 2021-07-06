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

        const exists = await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .where("email = :email", {
                email: user.email.value
            })
            .getOne()
        if(exists != null) {
            if(!exists.valid) {
                await manager.getRepository(UserEntity)
                    .createQueryBuilder()
                    .delete()
                    .from(UserEntity)
                    .where("id = :id", {
                        id: exists.id
                    })
                    .execute()
            }
            else {
                await this.connection.close()
                throw new Error("Email already registered previously.")
            }
        }

        await manager.save<UserEntity>(userEntity)
            .catch(async error => {
                await this.connection.close()
                throw new Error(error)
            })

        await this.connection.close()
    }
}