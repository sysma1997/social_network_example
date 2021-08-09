import { useState } from "react"
import styles from "./Friends.module.css"

import { UuidValue } from "../../../shared/domain/UuidValue"
import { User } from "../../../user/domain/User"
import { Input } from "../../input/Input"
import { Button } from "../../button/Button"

export const Friends = () => {
    const [showFriends, setShowFriends] = useState<boolean>(false)

    const friends: Array<User> = [
        new User(JSON.stringify({
            id: UuidValue.Generate().value,
            name: "Stiven Moreno Acero"
        })),
        new User(JSON.stringify({
            id: UuidValue.Generate().value,
            name: "Nilsa Acero Acosta"
        })),
        new User(JSON.stringify({
            id: UuidValue.Generate().value,
            name: "Aldemar Moreno Ramirez"
        })),
        new User(JSON.stringify({
            id: UuidValue.Generate().value,
            name: "Santiago Barbosa"
        })),
        new User(JSON.stringify({
            id: UuidValue.Generate().value,
            name: "Juan Pablo Roldan"
        })),
        new User(JSON.stringify({
            id: UuidValue.Generate().value,
            name: "Un Nombre Muy Largo, Tan largo que molesta en la programacion."
        }))
    ]

    const changeShowFriends = () => setShowFriends(!showFriends)

    return <>
        {(showFriends) && <div className={styles.friends}>
            <div className={styles.friendsContent}>
                {(friends.length > 0) && <ul className={styles.list}>
                    {friends.map(user => <li key={user.id}><a href="#">
                        <div></div>
                        <label>{user.name}</label>
                    </a></li>)}
                </ul> || <label className={styles.noList}>No friends added.</label>}
            </div>
            <div className={styles.controls}>
                <Button className={styles.controlHideFriends} onClick={changeShowFriends}>
                    Hide
                </Button>
            </div>
        </div> || <Button className={styles.showFriends} onClick={changeShowFriends}>
                Friends
            </Button>}
    </>
}