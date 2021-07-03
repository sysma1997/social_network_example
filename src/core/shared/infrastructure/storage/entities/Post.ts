import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryColumn({
        type: 'uuid'
    })
    readonly id: string
    @Column({
        type: 'uuid'
    })
    readonly userId: string

    @Column()
    readonly title: string
    @Column({
        type: 'text'
    })
    readonly description: string
    @Column({
        nullable: true
    })
    readonly image?: string

    @ManyToOne(() => User, user => user.posts)
    user: User | undefined

    constructor(id: string,
        userId: string,
        title: string,
        description: string,
        image?: string) {
        this.id = id
        this.userId = userId
        this.title = title
        this.description = description
        this.image = image
    }
}