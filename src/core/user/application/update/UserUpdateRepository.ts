import { UserBirthday } from "../../domain/UserBirthday";
import { UserGender } from "../../domain/UserGender";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserUsername } from "../../domain/UserUsername";

export interface UserUpdateRepository {
    update(id: UserId, 
        name: UserName, 
        birthday: UserBirthday, 
        gender: UserGender, 
        username: UserUsername): Promise<void>
}