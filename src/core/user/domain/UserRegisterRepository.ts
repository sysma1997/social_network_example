import { User } from "src/core/shared/infrastructure/storage/entities/User";

export interface UserRegisterRepository {
    register(user: User): void
}