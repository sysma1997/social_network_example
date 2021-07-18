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
        type: "text"
    })
    readonly description: string
    @Column()
    readonly date: Date
    @Column({
        type: "varchar", 
        nullable: true
    })
    readonly image: string | null

    @ManyToOne(() => User, user => user.posts)
    readonly user?: User

    constructor(id: string,
        userId: string,
        title: string,
        description: string, 
        date: Date, 
        image: string | null, 
        user?: User) {
        this.id = id
        this.userId = userId
        this.title = title
        this.description = description
        this.date = date
        this.image = image
        
        this.user = user
    }
}