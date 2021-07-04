import { User } from "src/core/shared/infrastructure/storage/entities/User";
import { Connection } from "typeorm";
import { UserRegisterRepository } from "../domain/UserRegisterRepository";

export class UserRegisterTypeormRepository implements UserRegisterRepository {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    register(user: User): void {
        throw new Error("Method not implemented.");
    }
}