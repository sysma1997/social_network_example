import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Friend } from './Friends'
import { Post } from './Post'

@Entity()
export class User {
    @PrimaryColumn({
        type: 'uuid'
    })
    readonly id: string

    @Column()
    readonly name: string
    @Column()
    readonly birthday: Date
    @Column()
    readonly gender: boolean
    @Column({
        unique: true
    })
    readonly email: string
    @Column()
    readonly username: string
    @Column()
    readonly password: string
    @Column()
    readonly valid: boolean
    @Column({
        type: "varchar", 
        nullable: true
    })
    readonly image: string | null

    @OneToMany(() => Friend, friend => friend.user)
    usersFriends: Friend[] | undefined
    @OneToMany(() => Friend, friend => friend.friend)
    friends: Friend[] | undefined

    @OneToMany(() => Post, post => post.user)
    posts: Post[] | undefined

    constructor(id: string,
        name: string,
        birthday: Date,
        gender: boolean,
        email: string, 
        username: string,
        password: string,
        valid: boolean, 
        image: string | null) {
        this.id = id
        this.name = name
        this.birthday = birthday
        this.gender = gender
        this.email = email
        this.username = username
        this.password = password
        this.valid = valid
        this.image = image
    }
}