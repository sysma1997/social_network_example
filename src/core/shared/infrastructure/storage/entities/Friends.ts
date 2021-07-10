import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Friend {
    @PrimaryColumn({
        type: 'uuid'
    })
    readonly id: string
    @Column({
        type: 'uuid'
    })
    readonly userId: string
    @Column({
        type: 'uuid'
    })
    readonly friendId: string
    @Column()
    readonly request: boolean

    @ManyToOne(() => User, user => user.usersFriends)
    user: User | undefined
    @ManyToOne(() => User, user => user.friends)
    friend: User | undefined

    constructor(id: string,
        userId: string,
        friendId: string, 
        request: boolean) {
        this.id = id
        this.userId = userId
        this.friendId = friendId
        this.request = request
    }
}