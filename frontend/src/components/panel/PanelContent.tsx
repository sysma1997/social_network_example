import { useState } from "react"
import styles from "./Panel.module.css"

import { Posts } from "./content/posts/Post"
import { User } from "../../user/domain/User"

interface Props {
    user: User,
    content?: string
}

export const PanelContent = (props: Props) => {

    return <div className={styles.panel}>
        <Posts user={props.user} />
    </div>
}