import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentAlt, faTimes } from "@fortawesome/free-solid-svg-icons"
import styles from "./Friends.module.css"

import { UuidValue } from "../../../shared/domain/UuidValue"
import { User } from "../../../user/domain/User"
import { Input } from "../../input/Input"
import { Button } from "../../button/Button"
import { EmailValue } from "../../../shared/domain/EmailValue"

export const Friends = () => {
    const [showFriends, setShowFriends] = useState<boolean>(false)

    const friends: Array<User> = [
        new User(
            UuidValue.Generate(),
            "Stiven Moreno Acero",
            new Date(),
            false,
            new EmailValue("siventma@hotmail.com"),
            "siventMa",
            "",
            true,
            null
        ),
        new User(
            UuidValue.Generate(),
            "Nilsa Acero Acosta",
            new Date(),
            false,
            new EmailValue("nilsacero@hotmail.com"),
            "nacero",
            "",
            true,
            null
        ),
        new User(
            UuidValue.Generate(),
            "Aldemar Moreno Ramirez",
            new Date(),
            false,
            new EmailValue("aldemarmoreno@hotmail.com"),
            "alderio",
            "",
            true,
            null
        ),
    ]

    const changeShowFriends = () => setShowFriends(!showFriends)

    return <>
        {(showFriends) && <div className={styles.friends}>
            <div className={styles.friendsContent}>
                {(friends.length > 0) && <ul className={styles.list}>
                    {friends.map(user => <li key={user.id.value}><a href="#">
                        <div></div>
                        <label>{user.name}</label>
                    </a></li>)}
                </ul> || <label className={styles.noList}>No friends added.</label>}
            </div>
            <div className={styles.controls}>
                <Button className={styles.controlHideFriends} onClick={changeShowFriends}>
                    <FontAwesomeIcon icon={faTimes} size="2x" />
                </Button>
            </div>
        </div> || <Button className={styles.showFriends} onClick={changeShowFriends}>
                <FontAwesomeIcon icon={faCommentAlt} style={{ fontSize: 25 }} />
            </Button>}
    </>
}