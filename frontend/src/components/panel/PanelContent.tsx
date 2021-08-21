import styles from "./Panel.module.css"

import { Posts } from "./content/posts/Posts"
import { User } from "../../user/domain/User"
import { Profile } from "./content/profile/Profile"
import { Dispatch, SetStateAction } from "react"

interface Props {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    content: string | string[] | undefined,
    params?: any
}

export const PanelContent = (props: Props) => {
    const { content } = props

    return <div className={styles.panel}>
        {(content === "home") && <Posts user={props.user} /> ||
            (content === "profile") && <Profile user={props.user} setUser={props.setUser} />}
    </div>
}